import {
  SmileOutlined,
  SettingOutlined,
  UserOutlined,
  UnlockOutlined,
  EyeOutlined,
  VerifiedOutlined
} from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'
import logo from '/src/assets/images/Logo.png'
import SelectLanguage from '../../locales/components/SelectLanguage'
import type { BasicLayoutProps } from '@ant-design/pro-layout/es'
import type { HeaderViewProps } from '@ant-design/pro-layout/es/Header'


const route = {
  path: '/admin',
  routes: [
    {
      path: '/admin',
      name: (
        <FormattedMessage
          id="menu.welcome"
          defaultMessage="Welcome"
        />
      ),
      icon: <SmileOutlined />
    },
    {
      name: (
        <FormattedMessage
          id="menu.user-management"
          defaultMessage="User Management"
        />
      ),
      icon: <SettingOutlined />,
      routes: [
        {
          path: '/admin/users',
          name: (
            <FormattedMessage
              id="menu.user-management.user-list"
              defaultMessage="User List"
            />
          ),
          icon: <UserOutlined />
        }
      ]
    },
    {
      name: (
        <FormattedMessage
          id="menu.privilege-management"
          defaultMessage="Privilege Management"
        />
      ),
      icon: <UnlockOutlined />,
      routes: [
        {
          path: '/admin/roles',
          name: (
            <FormattedMessage
              id="menu.privilege-management.role-list"
              defaultMessage="Role List"
            />
          ),
          icon: <EyeOutlined />
        },
        {
          path: '/admin/privileges',
          name: (
            <FormattedMessage
              id="menu.privilege-management.privilege-list"
              defaultMessage="Privilege List"
            />
          ),
          icon: <VerifiedOutlined />
        }
      ]
    }
  ]
}

const layoutDefaultProps: BasicLayoutProps = {
  logo,
  layout: 'mix',
  navTheme: 'light',
  headerTheme: 'dark',
  breakpoint: 'lg',
  siderWidth: 220,
  rightContentRender: (props: HeaderViewProps) =>
    <SelectLanguage color={props.headerTheme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .85)'} />,
  pageTitleRender: (props, defaultPageTitle) => defaultPageTitle?.replace(`Aelita's Backstage Management System`, `Aelita's BMS`) ?? `Aelita's BMS`,
  route
}

export default layoutDefaultProps
