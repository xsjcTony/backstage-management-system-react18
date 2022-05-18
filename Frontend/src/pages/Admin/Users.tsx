import ProTable from '@ant-design/pro-table'
import { useTitle } from 'ahooks'
import { PageHeader } from 'antd'
import { useIntl } from 'react-intl'
import Footer from '../../components/Footer'
import SubpageContainer from '../../components/SubpageContainer'
import { breadcrumbItemRender } from '../../utils'
import type { PageHeaderProps } from 'antd'


/**
 * Style
 */


/**
 * Component
 */
const Users = (): JSX.Element => {

  /**
   * Hook
   */
  const intl = useIntl()


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
   * Component
   */
  return (
    <SubpageContainer
      footer={<Footer />}
      header={(
        <PageHeader
          breadcrumb={breadcrumb}
          ghost={false}
          title={intl.formatMessage({ id: 'pages.admin.user-list.title' })}
        />
      )}
    >
      <ProTable />
    </SubpageContainer>
  )
}

export default Users
