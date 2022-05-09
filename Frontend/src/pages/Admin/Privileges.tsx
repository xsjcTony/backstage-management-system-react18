import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'


const Privileges = (): JSX.Element => {
  const intl = useIntl()
  
  useTitle(`${intl.formatMessage({ id: 'pages.admin.privilege-list.title' })} - ${intl.formatMessage({ id: 'title' })}`)

  return (
    <div>Privileges</div>
  )
}

export default Privileges
