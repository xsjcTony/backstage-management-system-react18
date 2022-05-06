import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Privileges = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: 'pages.admin.privilege-list.title',
      defaultMessage: 'Privilege List'
    })} - ${intl.formatMessage({
      id: 'title',
      defaultMessage: `Aelita's BMS`
    })}`
  }, [intl])

  return (
    <div>Privileges</div>
  )
}

export default Privileges
