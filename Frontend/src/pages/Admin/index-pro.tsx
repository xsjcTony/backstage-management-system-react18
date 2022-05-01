/* eslint 'indent': 'off' */

import ProLayout from '@ant-design/pro-layout'
import { useIntl } from 'react-intl'
import { Outlet, useLocation } from 'react-router-dom'
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
    color: ${props => props.navTheme === 'light' ? 'rgba(0, 0, 0, .85)' : '#fff'};
`


/**
 * Component
 */
const Admin = (): JSX.Element => {
  const location = useLocation()
  const antdLocale = useAntdLocale()
  const intl = useIntl()

  return (
    <ProLayout
      {...defaultProps}

      title={intl.formatMessage({
        id: 'header.title',
        defaultMessage: `Aelita's Backstage Management System`,
        description: `Title in Admin page's header`
      })}
      location={location}
      menuFooterRender={(menuProps: SiderMenuProps) =>
        <MenuFooter navTheme={menuProps.navTheme}>{menuProps.collapsed ? 'v1' : 'v1.0.0'}</MenuFooter>}
      locale={antdLocale}
    >
      <Outlet />
    </ProLayout>
  )
}

export default Admin
