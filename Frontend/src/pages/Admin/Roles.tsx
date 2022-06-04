import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest, useTitle } from 'ahooks'
import { Button, message, PageHeader, Switch, Tag } from 'antd'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import SubpageContainer from '@/components/SubpageContainer'
import AddRoleModalForm from '@/pages/Admin/Roles/components/AddRoleModalForm'
import AssignPrivilegesModalForm from '@/pages/Admin/Roles/components/AssignPrivilegesModalForm'
import EditRoleModalForm from '@/pages/Admin/Roles/components/EditRoleModalForm'
import { deleteRole, getRolesByQuery, updateRoleState } from '@/services/roles'
import { breadcrumbItemRender } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Role, RoleQueryResponse } from '@/types'
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
    .actions-header {
        display: flex;
        gap: 8px;
        margin: 0 10px;
        
        span {
            margin-right: 0;
        }
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
    console.log(data.data)

    return {
      data: data.data.rows,
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
    ]
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
        pagination={pagination}
        request={request}
        rowKey={record => record.id}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Roles
