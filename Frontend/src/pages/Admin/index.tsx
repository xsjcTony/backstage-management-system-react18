import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { Layout, Menu, Avatar } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import SelectLanguage from '../../locales/components/SelectLanguage'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type React from 'react'


/**
 * Constants
 */
const { Header, Content, Sider } = Layout


/**
 * Utils
 */
const createItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemType[]
): ItemType => {
  return {
    key,
    icon,
    children,
    label
  }
}

/**
 * Data
 */
const items: ItemType[] = [
  createItem('Option 1', '1', <PieChartOutlined />),
  createItem('Option 2', '2', <DesktopOutlined />),
  createItem('User', 'sub1', <UserOutlined />, [
    createItem('Tom', '3', <UserOutlined />),
    createItem('Bill', '4'),
    createItem('Alex', '5'),
    createItem('Bill', '10'),
    createItem('Alex', '11'),
    createItem('Bill', '12'),
    createItem('Alex', '13'),
    createItem('Bill', '14'),
    createItem('Alex', '15'),
    createItem('Bill', '16'),
    createItem('Alex', '17'),
    createItem('Bill', '18')
  ]),
  createItem('Team', 'sub2', <TeamOutlined />, [createItem('Team 1', '6'), createItem('Team 2', '8')]),
  createItem('Files', '9', <FileOutlined />)
]


/**
 * Style
 */
const StyledLayout = styled(Layout)`
    width: 100%;
    height: 100%;

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

        .header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
                height: 30px;
                margin-right: 10px;
            }

            h1 {
                color: #fff;
                line-height: 48px;
                font-size: 20px;
                font-weight: 700;
            }
        }
        
        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 8px;
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
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const intl = useIntl()

  return (
    <StyledLayout>
      <Header className="header">
        <div className="header-left">
          <img src="/src/assets/images/logo.png" alt="logo" />
          <h1>
            {intl.formatMessage({
              id: 'header.title',
              defaultMessage: `Aelita's Backstage Management System`
            })}
          </h1>
        </div>
        <div className="header-right">
          <Avatar
            size="default"
            src="/src/assets/images/avatar.jpg"
            icon={<UserOutlined />}
            alt="avatar"
            shape="circle"
          />
          Place Holder
          <SelectLanguage color="#fff" size="20" />
        </div>
      </Header>
      <Layout className="main-container">
        <Sider
          collapsible
          breakpoint="lg"
          className="menu-container"
          collapsed={collapsed}
          theme="light"
          trigger={null}
          width={220}
          collapsedWidth={58}
          onCollapse={() => void setCollapsed(!collapsed)}
        >
          <Menu
            className="menu"
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
          <ul className="menu-footer">
            <li className="menu-collapse-trigger" onClick={() => void setCollapsed(!collapsed)}>
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
