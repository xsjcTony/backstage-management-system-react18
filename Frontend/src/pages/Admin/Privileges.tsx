import { DeleteOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest, useTitle } from 'ahooks'
import { Button, message, PageHeader, Switch, Tag } from 'antd'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import SubpageContainer from '@/components/SubpageContainer'
import AddRoleModalForm from '@/pages/Admin/Roles/components/AddRoleModalForm'
import EditRoleModalForm from '@/pages/Admin/Roles/components/EditRoleModalForm'
import { deletePrivilege, getPrivilegesByQuery, updatePrivilegeState } from '@/services/privileges'
import { breadcrumbItemRender } from '@/utils'
import type { ResponseData } from '@/services/types'
import type { Privilege, PrivilegeQueryResponse, Role } from '@/types'
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table'
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender'
import type { PageHeaderProps } from 'antd'
import AddPrivilegeModalForm from '@/pages/Admin/Privileges/components/AddPrivilegeModalForm'


/**
 * Types
 */
export interface PrivilegeQueryData {
  privilegeName?: string
  parentId?: number
  requestMethod?: 'delete' | 'get' | 'post' | 'put'
  level?: 1 | 2
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
        justify-content: center;
    }
    
    .actions-body {
        display: flex;
        gap: 10px;
        margin: 0 10px;
        justify-content: center;
    }
`


/**
 * Component
 */
const Privileges = (): JSX.Element => {

  /**
   * Hooks
   */
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.privilege-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)


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
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.privilege-list.title' })
      }
    ]
  }

  const header = (
    <PageHeader
      breadcrumb={breadcrumb}
      ghost={false}
      title={intl.formatMessage({ id: 'pages.admin.privilege-list.title' })}
    />
  )


  /**
   * Methods
   */
  const request: ProTableProps<Privilege, PrivilegeQueryData>['request'] = async (params) => {
    let data: ResponseData<PrivilegeQueryResponse>

    try {
      data = await getPrivilegesByQuery(params)
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

    return {
      data: data.data.rows,
      success: true,
      total: data.data.count
    }
  }

  // change privilege state
  const _changePrivilegeState = async (id: number, checked: boolean): Promise<void> => {
    let res: ResponseData<Privilege>

    try {
      res = await updatePrivilegeState(id, checked)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return Promise.reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return Promise.reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: 'pages.admin.privilege-list.privilege.state.updated' }), 3)
    return Promise.resolve()
  }

  const { loading: changingPrivilegeState, run: changePrivilegeState } = useRequest(_changePrivilegeState, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // delete role
  const _removePrivilege = async (id: number): Promise<void> => {
    let res: ResponseData<Privilege>

    try {
      res = await deletePrivilege(id)
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

  const { loading: deletingPrivilege, run: removePrivilege } = useRequest(_removePrivilege, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Table
   */
  const tableRef = useRef<ActionType>()

  const columns: ProColumns<Privilege>[] = [
    {
      key: 'index',
      align: 'center',
      width: 50,
      search: false,
      render: (value, record, index) => (currentPageNumber - 1) * pageSize + index + 1
    },
    {
      align: 'center',
      width: 90,
      search: false,
      sorter: (a, b) => a.level - b.level,
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.level' }),
      dataIndex: 'level',
      render: (value, record) => (
        <Tag color={record.level === 1 ? 'red' : 'green'}>
          {`${intl.formatMessage({ id: 'pages.admin.privilege-list.table.level.level' })} ${record.level}`}
        </Tag>
      )
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.privilege-name' }),
      dataIndex: 'privilegeName'
    },
    {
      align: 'center',
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.privilege-description' }),
      dataIndex: 'privilegeDescription'
    },
    {
      align: 'center',
      valueType: 'select',
      valueEnum: {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        'delete': 'DELETE'
      },
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.request-method' }),
      dataIndex: 'requestMethod',
      render: (value, record) => record.requestMethod?.toUpperCase() ?? '-'
    },
    {
      align: 'center',
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.privilege-url' }),
      dataIndex: 'privilegeUrl'
    },
    {
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.state' }),
      dataIndex: 'roleState',
      render: (value, record) => (
        <Switch
          checked={record.privilegeState}
          loading={changingPrivilegeState}
          onChange={checked => void changePrivilegeState(record.id, checked)}
        />
      )
    },
    {
      width: 1,
      search: false,
      title: (
        <div className="actions-header">
          <Tag color="blue">
            {intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.actions.edit' })}
          </Tag>
          <Tag color="red">
            {intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.actions.delete' })}
          </Tag>
        </div>
      ),
      render: (value, record) => (
        <div className="actions-body">
          <EditRoleModalForm
            initialValues={record}
            reloadTable={tableRef.current?.reload}
          />
          <Button danger loading={deletingPrivilege} type="primary">
            <DeleteOutlined onClick={() => void removePrivilege(record.id)} />
          </Button>
        </div>
      )
    },
    {
      hideInTable: true,
      key: 'parentId',
      title: intl.formatMessage({ id: 'pages.admin.privilege-list.table.header.parentId' }),
      valueType: 'select',
      request: async () => {
        let data: ResponseData<PrivilegeQueryResponse>

        try {
          data = await getPrivilegesByQuery({ level: 1 })
        } catch (err) {
          void message.error(intl.formatMessage({ id: 'error.network' }), 3)
          return []
        }

        if (data.code !== 200) {
          void message.error(intl.formatMessage({ id: data.msg }), 3)
          return []
        }

        return data.data.rows.map((privilege) => {
          return {
            label: privilege.privilegeName,
            value: privilege.id
          }
        })
      }
    }
  ]

  const toolbar: ProTableProps<Privilege, PrivilegeQueryData>['toolbar'] = {
    actions: [
      <AddPrivilegeModalForm
        key="addPrivilege"
        reloadTable={tableRef.current?.reload}
      />
    ]
  }

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(parseInt(sessionStorage.getItem('privilegeTablePageSize') ?? '5') || 5)

  const pagination: ProTableProps<Role, PrivilegeQueryData>['pagination'] = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 15, 30],
    defaultPageSize: pageSize,
    onChange: (page, pageSize) => {
      setCurrentPageNumber(page)
      setPageSize(pageSize)
      sessionStorage.setItem('privilegeTablePageSize', pageSize.toString(10))
    }
  }

  const search: SearchConfig = {
    defaultCollapsed: false,
    labelWidth: 'auto'
  }


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={header}
    >
      <ProTable<Privilege, PrivilegeQueryData>
        bordered
        actionRef={tableRef}
        columns={columns}
        pagination={pagination}
        request={request}
        rowKey={record => record.id}
        search={search}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Privileges
