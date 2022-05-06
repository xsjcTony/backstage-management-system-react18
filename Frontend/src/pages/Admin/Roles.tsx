import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Roles = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: 'pages.admin.role-list.title',
      defaultMessage: 'Role List'
    })} - ${intl.formatMessage({
      id: 'title',
      defaultMessage: `Aelita's BMS`
    })}`
  }, [intl])

  return (
    <div>Roles</div>
  )
}

export default Roles
