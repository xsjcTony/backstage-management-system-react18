import {
  DeleteOutlined,
  EditOutlined, ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useRequest, useTitle } from 'ahooks'
import { Avatar, Button, message, PageHeader, Switch, Tag, Upload } from 'antd'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import SubpageContainer from '../../components/SubpageContainer'
import { deleteUser, exportAllUsers, getUsersByQuery, updateUserState } from '../../services/users'
import { breadcrumbItemRender, downloadFile } from '../../utils'
import type { ResponseData } from '../../services/types'
import type { RootState } from '../../store'
import type { User, UserQueryResponse } from '../../types'
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table'
import type { PageHeaderProps, UploadProps } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'


/**
 * Types
 */
export interface UserQueryData {
  username?: string
  email?: string
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
        margin: 0 10px;
        
        .setting {
            background-color: #faad14;
            border-color: #faad14;
            
            &:hover {
                background-color: #ffc53d;
                border-color: #ffc53d;
            }
        }
    }
    
    .current-user-row {
        background-color: #e1f3d8;
    }
`


/**
 * Component
 */
const Users = (): JSX.Element => {

  /**
   * Hook
   */
  const intl = useIntl()
  const currentUser = useSelector((state: RootState) => state.authentication.currentUser)
  const assetBaseUrl = useSelector((state: RootState) => state.layout.assetBaseUrl)
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.welcome.title' })} - ${intl.formatMessage({ id: 'title' })}`)


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
        breadcrumbName: intl.formatMessage({ id: 'pages.admin.user-list.title' })
      }
    ]
  }

  const header = (
    <PageHeader
      breadcrumb={breadcrumb}
      ghost={false}
      title={intl.formatMessage({ id: 'pages.admin.user-list.title' })}
    />
  )


  /**
   * Methods
   */
  const request: ProTableProps<User, UserQueryData>['request'] = async (params) => {
    let data: ResponseData<UserQueryResponse>

    try {
      data = await getUsersByQuery(params)
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

  // change user state
  const _changeUserState = async (id: number, checked: boolean): Promise<void> => new Promise(async (resolve, reject) => {
    let res: ResponseData<User>

    try {
      res = await updateUserState(id, checked)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: 'pages.admin.user-list.user.state.updated' }), 3)
    return void resolve()
  })

  const { loading: changingUserState, run: changeUserState } = useRequest(_changeUserState, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // delete user
  const _removeUser = async (id: number): Promise<void> => new Promise(async (resolve, reject) => {
    let res: ResponseData<User>

    try {
      res = await deleteUser(id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    await tableRef.current?.reload()
    void message.success(intl.formatMessage({ id: res.msg }), 3)
    return void resolve()
  })

  const { loading: deletingUser, run: removeUser } = useRequest(_removeUser, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // export all users
  const _exportUsers = async (): Promise<void> => new Promise(async (resolve, reject) => {
    let res: Blob | ResponseData

    try {
      res = await exportAllUsers()
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if ('code' in res) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return void reject()
    }

    downloadFile(res, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'users.xlsx')
    return void resolve()
  })

  const { loading: exportingUsers, run: exportUsers } = useRequest(_exportUsers, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  // import users
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
    const isLt500KB = file.size / 1024 <= 500 // <= 500kb

    if (!isXLSX) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.import.file.type' }), 3)
      return false
    }

    if (!isLt500KB) {
      void message.error(intl.formatMessage({ id: 'pages.admin.user-list.users.import.file.type' }), 3)
      return false
    }

    return true
  }

  const handleUpload: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile<ResponseData>>) => {
    const { file: { status, response } } = info

    if (status === 'error') {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return
    }

    if (status === 'done') {
      if (response?.code !== 200) {
        void message.error(intl.formatMessage({ id: response?.msg ?? 'error.network' }), 3)
        return
      }

      void tableRef.current?.reloadAndRest?.()
      void message.success(intl.formatMessage({ id: response.msg }), 3)
      return
    }
  }


  /**
   * Table
   */
  const columns: ProColumns<User>[] = [
    {
      key: 'index',
      align: 'center',
      width: 50,
      search: false,
      render: (value, record, index) => index + 1
    },
    {
      key: 'avatar',
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.avatar' }),
      render: (value, record) => (
        <Avatar
          alt="avatar"
          icon={<UserOutlined />}
          shape="circle"
          size="default"
          src={`${assetBaseUrl}${record.avatarUrl}`}
        />
      )
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.username' }),
      dataIndex: 'username'
    },
    {
      align: 'center',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.email' }),
      dataIndex: 'email'
    },
    {
      align: 'center',
      search: false,
      key: 'roles',
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.role' }),
      render: (value, record) => {
        if (record.roles.length === 0) {
          return '-'
        } else {
          return record.roles.map(role => (
            <Tag key={role.id} color="processing">
              {role.roleName}
            </Tag>
          ))
        }
      }
    },
    {
      align: 'center',
      width: 80,
      search: false,
      title: intl.formatMessage({ id: 'pages.admin.user-list.table.header.state' }),
      dataIndex: 'userState',
      render: (value, record) => (
        <Switch
          checked={record.userState}
          loading={changingUserState}
          onChange={checked => void changeUserState(record.id, checked)}
        />
      )
    },
    {
      width: 1,
      search: false,
      title: (
        <div className="actions-header">
          <Tag color="processing">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.edit' })}
          </Tag>
          <Tag color="warning">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.assign-roles' })}
          </Tag>
          <Tag color="error">
            {intl.formatMessage({ id: 'pages.admin.user-list.table.header.actions.delete' })}
          </Tag>
        </div>
      ),
      render: (value, record) => (
        <div className="actions-body">
          <Button type="primary">
            <EditOutlined />
          </Button>
          <Button className="setting" type="primary">
            <SettingOutlined />
          </Button>
          {record.id !== currentUser?.id && (
            <Button danger loading={deletingUser} type="primary">
              <DeleteOutlined onClick={() => void removeUser(record.id)} />
            </Button>
          )}
        </div>
      )
    }
  ]

  const toolbar: ProTableProps<User, UserQueryData>['toolbar'] = {
    title: <Tag color="success">You</Tag>,
    actions: [
      <Button key="addUsers" icon={<PlusOutlined />} type="primary">
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.add-users' })}
      </Button>,
      <Upload
        key="importUsers"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        action={`${apiBaseUrl}/api/v1/import-users`}
        beforeUpload={beforeUpload}
        headers={{ Authorization: localStorage.getItem('token') ?? '' }}
        method="post"
        name="file"
        showUploadList={false}
        onChange={handleUpload}
      >
        <Button icon={<ImportOutlined />} type="primary">
          {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.import-users' })}
        </Button>
      </Upload>,
      <Button
        key="exportUsers"
        icon={<ExportOutlined />}
        loading={exportingUsers}
        type="primary"
        onClick={exportUsers}
      >
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.export-users' })}
      </Button>
    ]
  }

  const pagination: ProTableProps<User, UserQueryData>['pagination'] = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20, 30, 50],
    defaultPageSize: parseInt(sessionStorage.getItem('userTablePageSize') ?? '10') || 10,
    onShowSizeChange: (page, size) => {
      sessionStorage.setItem('userTablePageSize', size.toString(10))
    }
  }

  const tableRef = useRef<ActionType>()


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={header}
    >
      <ProTable<User, UserQueryData>
        bordered
        actionRef={tableRef}
        columns={columns}
        pagination={pagination}
        request={request}
        rowClassName={record => record.id === currentUser?.id ? 'current-user-row' : ''}
        rowKey={record => record.id}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Users
