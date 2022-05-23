/* eslint-disable react-hooks/exhaustive-deps */

import {
  DeleteOutlined,
  EditOutlined, ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useTitle } from 'ahooks'
import { Avatar, Button, message, PageHeader, Switch, Tag } from 'antd'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import SubpageContainer from '../../components/SubpageContainer'
import { getUsersByQuery, updateUserState } from '../../services/users'
import { breadcrumbItemRender } from '../../utils'
import type { ResponseData } from '../../services/types'
import type { RootState } from '../../store'
import type { User, UserQueryResponse } from '../../types'
import type { ProColumns, ProTableProps } from '@ant-design/pro-table'
import type { PageHeaderProps } from 'antd'


/**
 * Types
 */
export interface UserQueryData {
  username?: string
  email?: string
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


  /**
   * Query
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

  const changeUserState = async (user: User, checked: boolean): Promise<void> => {
    let res: ResponseData<User>

    try {
      res = await updateUserState(user.id, checked)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return
    }

    if (res.code !== 200) {
      void message.error(intl.formatMessage({ id: res.msg }), 3)
      return
    }

    void message.success(intl.formatMessage({ id: 'pages.admin.user-list.user.state.updated' }), 3)
    user.userState = checked
    return
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
          onChange={checked => void changeUserState(record, checked)}
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
            <Button danger type="primary">
              <DeleteOutlined />
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
      <Button key="importUsers" icon={<ImportOutlined />} type="primary">
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.import-users' })}
      </Button>,
      <Button key="exportUsers" icon={<ExportOutlined />} type="primary">
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.export-users' })}
      </Button>
    ]
  }


  /**
   * Component
   */
  return (
    <StyledSubpageContainer
      footer={<Footer />}
      header={(
        <PageHeader
          breadcrumb={breadcrumb}
          ghost={false}
          title={intl.formatMessage({ id: 'pages.admin.user-list.title' })}
        />
      )}
    >
      <ProTable<User, UserQueryData>
        bordered
        columns={columns}
        request={request}
        rowClassName={record => record.id === currentUser?.id ? 'current-user-row' : ''}
        rowKey={record => record.id}
        toolbar={toolbar}
      />
    </StyledSubpageContainer>
  )
}

export default Users
