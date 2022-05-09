import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'


const Roles = (): JSX.Element => {
  const intl = useIntl()

  useTitle(`${intl.formatMessage({ id: 'pages.admin.role-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)

  return (
    <div>Roles</div>
  )
}

export default Roles
