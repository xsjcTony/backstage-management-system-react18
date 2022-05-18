import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl'
import styled from 'styled-components'


/**
 * Style
 */
const WelcomeContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    
    h1 {
        font-size: 100px;
    }
`


/**
 * Component
 */
const Welcome = (): JSX.Element => {

  /**
   * Hook
   */
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.admin.welcome.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Component
   */
  return (
    <WelcomeContainer>
      <img alt="Logo" src="/src/assets/images/logo.png" />
      <h1>{intl.formatMessage({ id: 'pages.admin.welcome.title' })}</h1>
    </WelcomeContainer>
  )
}

export default Welcome
