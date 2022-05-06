import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Users = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: 'pages.admin.user-list.title',
      defaultMessage: 'User List'
    })} - ${intl.formatMessage({
      id: 'title',
      defaultMessage: `Aelita's BMS`
    })}`
  }, [intl])

  return (
    <div>Users</div>
  )
}

export default Users
