import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Users = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.admin.user-list.title' })} - ${intl.formatMessage({ id: 'title' })}`
  }, [intl])

  return (
    <div>Users</div>
  )
}

export default Users
