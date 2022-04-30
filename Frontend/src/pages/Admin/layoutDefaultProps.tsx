import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons'
import logo from '/src/assets/images/Logo.png'
import SelectLanguage from '../../locales/components/SelectLanguage'
import type { BasicLayoutProps } from '@ant-design/pro-layout/es'
import type { HeaderViewProps } from '@ant-design/pro-layout/es/Header'


const route = {
  path: '/',
  routes: [
    {
      path: '/admin',
      name: '欢迎',
      icon: <SmileOutlined />
    },
    {
      path: '/admin/admin',
      name: '管理页',
      icon: <CrownOutlined />,
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/sub-page1',
          name: '一级页面',
          icon: <CrownOutlined />
        },
        {
          path: '/admin/sub-page2',
          name: '二级页面',
          icon: <CrownOutlined />
        },
        {
          path: '/admin/sub-page3',
          name: '三级页面',
          icon: <CrownOutlined />
        }
      ]
    },
    {
      name: '列表页',
      icon: <TabletOutlined />,
      path: '/list',
      routes: [
        {
          path: '/list/sub-page',
          name: '一级列表页面',
          icon: <CrownOutlined />,
          routes: [
            {
              path: 'sub-sub-page1',
              name: '一一级列表页面',
              icon: <CrownOutlined />
            },
            {
              path: 'sub-sub-page2',
              name: '一二级列表页面',
              icon: <CrownOutlined />
            },
            {
              path: 'sub-sub-page3',
              name: '一三级列表页面',
              icon: <CrownOutlined />
            }
          ]
        },
        {
          path: '/list/sub-page2',
          name: '二级列表页面',
          icon: <CrownOutlined />
        },
        {
          path: '/list/sub-page3',
          name: '三级列表页面',
          icon: <CrownOutlined />
        }
      ]
    },
    {
      path: 'https://ant.design',
      name: 'Ant Design 官网外链',
      icon: <AntDesignOutlined />
    }
  ]
}

const layoutDefaultProps: BasicLayoutProps = {
  title: `Aelita's Backstage Management System`,
  logo,
  layout: 'mix',
  navTheme: 'light',
  headerTheme: 'dark',
  breakpoint: 'lg',
  rightContentRender: (props: HeaderViewProps) =>
    <SelectLanguage color={props.headerTheme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .85)'} />,
  pageTitleRender: (props, defaultPageTitle) => defaultPageTitle?.replace(`Aelita's Backstage Management System`, `Aelita's BMS`) ?? `Aelita's BMS`,
  route
}

export default layoutDefaultProps
