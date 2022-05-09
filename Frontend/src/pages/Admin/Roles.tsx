import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Roles = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.admin.role-list.title' })} - ${intl.formatMessage({ id: 'title' })}`
  }, [intl])

  return (
    <div>Roles</div>
  )
}

export default Roles
