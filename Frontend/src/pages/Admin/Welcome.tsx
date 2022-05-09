import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'


const Welcome = (): JSX.Element => {
  const intl = useIntl()

  useTitle(`${intl.formatMessage({ id: 'pages.admin.welcome.title' })} - ${intl.formatMessage({ id: 'title' })}`)

  return (
    <div>Welcome</div>
  )
}

export default Welcome
