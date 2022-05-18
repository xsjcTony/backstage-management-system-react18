import { PageContainer } from '@ant-design/pro-layout'
import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'
import { breadcrumbItemRender } from '../../utils'
import type { PageContainerProps } from '@ant-design/pro-layout'


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
  const breadcrumb: PageContainerProps['breadcrumb'] = {
    itemRender: breadcrumbItemRender,
    routes: [
      {
        path: '/',
        breadcrumbName: 'Home'
      },
      {
        path: '',
        breadcrumbName: 'User List'
      }
    ]
  }


  /**
   * Component
   */
  return (
    <PageContainer
      breadcrumb={breadcrumb}
      title="User List"
    >
      Welcome
    </PageContainer>
  )
}

export default Users
