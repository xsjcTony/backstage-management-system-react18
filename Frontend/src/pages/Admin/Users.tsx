import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'


const Users = (): JSX.Element => {
  const intl = useIntl()

  useTitle(`${intl.formatMessage({ id: 'pages.admin.user-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)

  return (
    <div>Users</div>
  )
}

export default Users
