/* eslint-disable react-hooks/exhaustive-deps */

import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { useTitle } from 'ahooks'
import { Button, message, PageHeader, Switch, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import SubpageContainer from '../../components/SubpageContainer'
import { getUsersByQuery } from '../../services/users'
import { breadcrumbItemRender } from '../../utils'
import type { ResponseData } from '../../services/types'
import type { RootState } from '../../store'
import type { User, UserQueryResponse } from '../../types'
import type { ProColumns } from '@ant-design/pro-table'
import type { PageHeaderProps } from 'antd'


/**
 * Types
 */
export interface UserQueryData {
  role: string
  origin: '' | 'github' | 'local'
  type: '' | 'email' | 'username'
  keyword: string
  currentPageNumber?: number
  pageSize?: number
}


/**
 * Style
 */
const StyledSubpageContainer = styled(SubpageContainer)`
    .actions {
        display: flex;
        gap: 10px;
        
        .ant-btn {
            border-radius: 4px;
        }
        
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
  const [queryData, setQueryData] = useState<UserQueryData>({
    role: '',
    origin: '',
    type: '',
    keyword: '',
    currentPageNumber: 1,
    pageSize: parseInt(sessionStorage.getItem('userTablePageSize') ?? '10') || 10
  })

  const queryUsers = async (queryData: UserQueryData): Promise<void> => {
    let response: ResponseData<UserQueryResponse>

    try {
      response = await getUsersByQuery(queryData)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return
    }

    if (response.code !== 200) {
      void message.error(intl.formatMessage({ id: response.msg }), 3)
      return
    }

    setUsers(response.data.rows)
    setTotalUserCounts(response.data.count)
  }

  const query = () => { /* TODO: query button */ }

  // query users when component is first time loaded
  useEffect(() => {
    void queryUsers(queryData)
  }, [])


  /**
   * Data
   */
  const [users, setUsers] = useState<User[]>([])
  const [totalUserCounts, setTotalUserCounts] = useState<number>(0)


  /**
   * Table
   */
  const columns: ProColumns<User>[] = [
    {
      key: 'index',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'E-mail',
      dataIndex: 'email'
    },
    {
      key: 'roles',
      title: 'Role',
      render: (value, record) => record.roles.map(role => <Tag key={role.id} color="processing">{role.roleName}</Tag>)
    },
    {
      title: 'State',
      dataIndex: 'userState',
      render: (value, record) => <Switch checked={record.userState} />
    },
    {
      title: (
        <div>
          <Tag color="processing">Edit</Tag>
          <Tag color="warning">Assign roles</Tag>
          <Tag color="error">Delete</Tag>
        </div>
      ),
      render: (value, record) => (
        <div className="actions">
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
      <ProTable<User>
        bordered
        columns={columns}
        dataSource={users}
        rowClassName={record => record.id === currentUser?.id ? 'current-user-row' : ''}
        rowKey={record => record.id}
      />
    </StyledSubpageContainer>
  )
}

export default Users
