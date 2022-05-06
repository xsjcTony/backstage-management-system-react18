import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Welcome = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: 'pages.admin.welcome.title',
      defaultMessage: 'Welcome'
    })} - ${intl.formatMessage({
      id: 'title',
      defaultMessage: `Aelita's BMS`
    })}`
  }, [intl])

  return (
    <div>Welcome</div>
  )
}

export default Welcome
