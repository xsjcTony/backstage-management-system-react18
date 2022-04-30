/* eslint 'indent': 'off' */

import ProLayout, { PageContainer } from '@ant-design/pro-layout'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useAntdLocale from '../../hooks/useAntdLocale'
import defaultProps from './layoutDefaultProps'
import type { SiderMenuProps } from '@ant-design/pro-layout/es/components/SiderMenu/SiderMenu'
import type { MenuTheme } from 'antd/es/menu/MenuContext'


/**
 * Style
 */
const MenuFooter = styled.p<{ navTheme: MenuTheme }>`
    padding: 10px 17px;
    color: ${(props) => {
        switch (props.navTheme) {
            case 'light':
                return 'rgba(0, 0, 0, .85)'
            case 'dark':
            default:
                return '#fff'
        }
    }};
`


/**
 * Component
 */
const Admin = (): JSX.Element => {
  const location = useLocation()
  const antdLocale = useAntdLocale() // TODO: test responsive!

  return (
    <ProLayout
      {...defaultProps}

      location={location}
      menuFooterRender={(menuProps: SiderMenuProps) =>
        <MenuFooter navTheme={menuProps.navTheme}>{menuProps.collapsed ? 'v1' : 'v1.0.0'}</MenuFooter>}
      locale={antdLocale}
    >
      <PageContainer />
    </ProLayout>
  )
}

export default Admin
