import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Privileges = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.admin.privilege-list.title' })} - ${intl.formatMessage({ id: 'title' })}`
  }, [intl])

  return (
    <div>Privileges</div>
  )
}

export default Privileges
