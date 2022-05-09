import { useEffect } from 'react'
import { useIntl } from 'react-intl'


const Welcome = (): JSX.Element => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.admin.welcome.title' })} - ${intl.formatMessage({ id: 'title' })}`
  }, [intl])

  return (
    <div>Welcome</div>
  )
}

export default Welcome
