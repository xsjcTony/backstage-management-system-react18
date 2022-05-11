import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  SettingOutlined,
  UnlockOutlined,
  EyeOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Layout, Menu, Avatar, Dropdown, message } from 'antd'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SelectLanguage from '../locales/components/SelectLanguage'
import { isPromptInfo } from './types'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { ReactNode, Key } from 'react'


/**
 * Constants
 */
const { Header, Content, Sider } = Layout


/**
 * Utils
 */
const createItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: ItemType[]
): ItemType => {
  return { key, icon, children, label }
}


/**
 * Style
 */
const StyledLayout = styled(Layout)`
    width: 100%;
    height: 100%;
    min-width: 700px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 48px;
        padding: 0 20px;
        color: #fff;
        min-width: 700px;

        .ant-dropdown-trigger {
            height: 48px;
            line-height: 48px;
            cursor: pointer;

            &.ant-dropdown-open {
                background: #444;
            }
        }

        .header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;

            img {
                height: 30px;
                margin-right: 10px;
            }

            h1 {
                color: #fff;
                line-height: 48px;
                font-size: 18px;
            }
        }

        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

            .user-container {
                padding: 0 10px;

                .ant-avatar {
                    margin-right: 10px;
                }
            }
        }
    }

    .main-container {
        margin-top: 48px;

        .menu-container {
            height: 100%;

            .ant-layout-sider-children {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .menu {
                    li {
                        cursor: pointer;
                    }

                    .ant-menu-sub.ant-menu-inline {
                        background: #fff;
                    }
                }

                .menu-footer {
                    li {
                        border-top: 1px solid #ddd;
                        padding: 10px 20px;
                    }

                    .menu-collapse-trigger {
                        font-size: 18px;
                        cursor: pointer;
                        transition: color .3s;

                        &:hover {
                            color: #1890ff;
                        }
                    }
                }
            }
        }
    }
`


/**
 * Component
 */
const Admin = (): JSX.Element => {

  /**
   * Utils
   */
  const [collapsed, { toggle: toggleMenuCollapse }] = useBoolean(false)
  const intl = useIntl()
  const location = useLocation()
  const navigate = useNavigate()


  /**
   * Prompt
   */
  useEffect(() => {
    if (isPromptInfo(location.state)) {
      const { type, intlId, duration, path, noPrivilege } = location.state.promptInfo
      void message[type](`${intl.formatMessage({ id: intlId })}${noPrivilege ? ` "${path}"` : ''}`, duration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const items: ItemType[] = [
    createItem(
      intl.formatMessage({ id: 'menu.welcome' }),
      '/admin',
      <SmileOutlined />
    ),
    createItem(
      intl.formatMessage({ id: 'menu.user-management' }),
      'user-management',
      <SettingOutlined />,
      [
        createItem(
          intl.formatMessage({ id: 'menu.user-management.user-list' }),
          '/admin/users',
          <UserOutlined />
        )
      ]
    ),
    createItem(
      intl.formatMessage({ id: 'menu.privilege-management' }),
      'privilege-management',
      <UnlockOutlined />,
      [
        createItem(
          intl.formatMessage({ id: 'menu.privilege-management.role-list' }),
          '/admin/roles',
          <EyeOutlined />
        ),
        createItem(
          intl.formatMessage({ id: 'menu.privilege-management.privilege-list' }),
          '/admin/privileges',
          <SafetyCertificateOutlined />
        )
      ]
    )
  ]


  // TODO: logout user
  const logout = (): void => void navigate('/login', { replace: false })

  const userDropdownMenu = (
    <Menu
      items={[
        createItem(
          intl.formatMessage({ id: 'header.user-dropdown.logout' }),
          'logout',
          <LogoutOutlined />
        )
      ]}
      onClick={logout}
    />
  )


  return (
    <StyledLayout>
      <Header className="header">
        <div
          className="header-left"
          onClick={() => void navigate('/', { replace: false })}
        >
          <img alt="logo" src="/src/assets/images/logo.png" />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        <div className="header-right">
          <Dropdown overlay={userDropdownMenu} placement="bottom">
            <div className="user-container">
              <Avatar
                alt="avatar"
                icon={<UserOutlined />}
                shape="circle"
                size="default"
                src="/src/assets/images/avatar.jpg"
              />
              Aelita Schaeffer
            </div>
          </Dropdown>
          <SelectLanguage color="#fff" size="20" />
        </div>
      </Header>
      <Layout className="main-container">
        <Sider
          collapsible
          breakpoint="lg"
          className="menu-container"
          collapsed={collapsed}
          collapsedWidth={58}
          theme="light"
          trigger={null}
          width={230}
          onCollapse={toggleMenuCollapse}
        >
          <Menu
            className="menu"
            defaultOpenKeys={['user-management', 'privilege-management']}
            items={items}
            mode="inline"
            selectedKeys={[location.pathname]}
            theme="light"
            onClick={({ key }) => void navigate(key, { replace: false })}
          />
          <ul className="menu-footer">
            <li className="menu-collapse-trigger" onClick={toggleMenuCollapse}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </li>
            <li>
              {collapsed ? 'v1' : 'v1.0.0'}
            </li>
          </ul>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  )
}

export default Admin
