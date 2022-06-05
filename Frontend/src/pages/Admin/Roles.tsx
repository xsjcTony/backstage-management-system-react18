import { DeleteOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest, useTitle } from 'ahooks'
import { Button, message, PageHeader, Switch, Table, Tag } from 'antd'
import { Fragment, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import SubpageContainer from '@/components/SubpageContainer'
import AddRoleModalForm from '@/pages/Admin/Roles/components/AddRoleModalForm'
import AssignPrivilegesModalForm from '@/pages/Admin/Roles/components/AssignPrivilegesModalForm'
import EditRoleModalForm from '@/pages/Admin/Roles/components/EditRoleModalForm'
import { getPrivilegeById } from '@/services/privileges'
import { deleteRole, getRolesByQuery, updateRoleState } from '@/services/roles'
import { breadcrumbItemRender, flatToTree } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Privilege, Role, RoleQueryResponse } from '@/types'
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table'
import type { PageHeaderProps } from 'antd'


/**
 * Types
 */
export interface RoleQueryData {
  roleName?: string
  current?: number
  pageSize?: number
}


/**
 * Style
 */
const StyledSubpageContainer = styled(SubpageContainer)`
    .ant-tag {
        margin-right: 0;
    }
    
    .actions-header {
        display: flex;
        gap: 8px;
        margin: 0 10px;
    }
    
    .actions-body {
        display: flex;
        gap: 10px;
        justify-content: center;
        
        .setting {
            background-color: #faad14;
            border-color: #faad14;
            
            &:hover {
                background-color: #ffc53d;
                border-color: #ffc53d;
            }
        }
    }
    
    .privilege-row {
        .privilege-container {
            padding: 20px 0;
            display: grid;
            grid-template-columns: 1fr 3fr;
            row-gap: 50px;
            
            & > div {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 8px;
            }
        }
    }
`


/**
 * Component
 */
const Roles = (): JSX.Element => {

  /**
   * Hooks
   */
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.role-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Header
   */
  const breadcrumb: PageHeaderProps['breadcrumb'] = {
    itemRender: breadcrumbItemRender,
    routes: [
      {
        path: 'admin',
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.home' })
      },
      {
        path: '',
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.role-list.title' })
      }
    ]
  }

  const header = (
    <PageHeader
      breadcrumb={breadcrumb}
      ghost={false}
      title={intl.formatMessage({ id: 'pages.admin.role-list.title' })}
    />
  )


  /**
   * Methods
   */
  const request: ProTableProps<Role, RoleQueryData>['request'] = async (params) => {
    let data: ResponseData<RoleQueryResponse>

    try {
      data = await getRolesByQuery(params)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return {
        data: undefined,
        success: false,
        total: 0
      }
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return {
        data: undefined,
        success: false,
        total: 0
      }
    }

    const roles = data.data.rows

    // Build privilege tree
    for (const role of roles) {
      const t = [...role.privileges]

      for (const item of t) {
        if (
          item.parentId !== 0
          && t.findIndex(i => i.id === item.parentId) === -1
        ) {
          let d: ResponseData<Privilege>

          try {
            d = await getPrivilegeById(item.parentId)
          } catch (err) {
            void message.error(intl.formatMessage({ id: 'error.network' }), 3)
            continue
          }

          if (d.code !== 200) {
            void message.error(intl.formatMessage({ id: data.msg }), 3)
            return {
              data: undefined,
              success: false,
              total: 0
            }
          }

          t.push(d.data)
        }
      }

      role.privilegeTree = flatToTree(t)
    }

    return {
      data: roles,
      success: true,
      total: data.data.count
    }
  }

  // change role state
  const _changeRoleState = async (id: number, checked: boolean): Promise<void> => {
    let res: ResponseData<Role>

    try {
      res = await updateRoleState(id, checked)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return Promise.reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return Promise.reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: 'pages.admin.role-list.role.state.updated' }), 3)
    return Promise.resolve()
  }

  const { loading: changingRoleState, run: changeRoleState } = useRequest(_changeRoleState, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // delete role
  const _removeRole = async (id: number): Promise<void> => {
    let res: ResponseData<Role>

    try {
      res = await deleteRole(id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return Promise.reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return Promise.reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: res.msg }), 3)
    return Promise.resolve()
  }

  const { loading: deletingRole, run: removeRole } = useRequest(_removeRole, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Table
   */
  const tableRef = useRef<ActionType>()

  const columns: ProColumns<Role>[] = [
    {
      key: 'index',
      align: 'center',
      width: 50,
      search: false,
      render: (value, record, index) => (currentPageNumber - 1) * pageSize + index + 1
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.role-list.table.header.role-name' }),
      dataIndex: 'roleName'
    },
    {
      align: 'center',
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.role-list.table.header.role-description' }),
      dataIndex: 'roleDescription'
    },
    Table.EXPAND_COLUMN,
    {
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.role-list.table.header.state' }),
      dataIndex: 'roleState',
      render: (value, record) => (
        <Switch
          checked={record.roleState}
          loading={changingRoleState}
          onChange={checked => void changeRoleState(record.id, checked)}
        />
      )
    },
    {
      width: 1,
      search: false,
      title: (
        <div className="actions-header">
          <Tag color="processing">
            {intl.formatMessage({ id: 'pages.admin.role-list.table.header.actions.edit' })}
          </Tag>
          <Tag color="warning">
            {intl.formatMessage({ id: 'pages.admin.role-list.table.header.actions.assign-privileges' })}
          </Tag>
          <Tag color="error">
            {intl.formatMessage({ id: 'pages.admin.role-list.table.header.actions.delete' })}
          </Tag>
        </div>
      ),
      render: (value, record) => (
        <div className="actions-body">
          <EditRoleModalForm
            initialValues={record}
            reloadTable={tableRef.current?.reload}
          />
          <AssignPrivilegesModalForm
            reloadTable={tableRef.current?.reload}
            role={record}
          />
          <Button danger loading={deletingRole} type="primary">
            <DeleteOutlined onClick={() => void removeRole(record.id)} />
          </Button>
        </div>
      )
    }
  ]

  const toolbar: ProTableProps<Role, RoleQueryData>['toolbar'] = {
    actions: [
      <AddRoleModalForm
        key="addRole"
        reloadTable={tableRef.current?.reload}
      />
    ],
    title: (
      <>
        <Tag color="volcano" style={{ marginRight: 8 }}>
          {`${intl.formatMessage({ id: 'pages.admin.privilege-list.table.level.level' })} 1`}
        </Tag>
        <Tag color="green" style={{ marginRight: 8 }}>
          {`${intl.formatMessage({ id: 'pages.admin.privilege-list.table.level.level' })} 2`}
        </Tag>
      </>
    ),
    tooltip: intl.formatMessage({ id: 'pages.admin.role-list.table.tooltip' })
  }

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(parseInt(sessionStorage.getItem('roleTablePageSize') ?? '5') || 5)

  const pagination: ProTableProps<Role, RoleQueryData>['pagination'] = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 15, 30],
    defaultPageSize: pageSize,
    onChange: (page, pageSize) => {
      setCurrentPageNumber(page)
      setPageSize(pageSize)
      sessionStorage.setItem('roleTablePageSize', pageSize.toString(10))
    }
  }

  const expandable: ProTableProps<Role, RoleQueryData>['expandable'] = {
    expandedRowRender: record => (
      <div className="privilege-container">
        {record.privilegeTree?.map(privilege => (
          <Fragment key={privilege.id}>
            <div>
              <Tag color="volcano">{privilege.privilegeName}</Tag>
            </div>
            <div>
              {privilege.children?.map(childPrivilege =>
                <Tag key={childPrivilege.id} color="green">{childPrivilege.privilegeName}</Tag>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    ),
    columnWidth: 50,
    rowExpandable: record => record.privileges.length !== 0,
    expandedRowClassName: () => 'privilege-row',
    expandIcon: ({ expanded, onExpand, record, expandable }) =>
      expandable && (
        expanded
          ? <MinusCircleTwoTone style={{ fontSize: 20 }} onClick={e => void onExpand(record, e)} />
          : <PlusCircleTwoTone style={{ fontSize: 20 }} onClick={e => void onExpand(record, e)} />
      )
  }


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={header}
    >
      <ProTable<Role, RoleQueryData>
        bordered
        actionRef={tableRef}
        columns={columns}
        expandable={expandable}
        pagination={pagination}
        request={request}
        rowKey={record => record.id}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Roles
