import { useTitle } from 'ahooks'
import { Button } from 'antd'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'
import type { RootState } from '../store'


/**
 * Style
 */
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;

    .language {
        text-align: right;

        span {
            margin: 5px 25px 0 0;
        }
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        gap: 100px;

        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            user-select: none;

            img {
                height: 100px;
                margin-right: 10px;
            }

            h1 {
                font-size: 40px;
            }
        }

        .actions {
            display: flex;
            gap: 30px;
        }
    }
`


/**
 * Component
 */
const Home = (): JSX.Element => {
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
  const navigate = useNavigate()
  const intl = useIntl()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.home.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Component
   */
  return (
    <HomeContainer>
      <div className="language">
        <SelectLanguage size="24" />
      </div>
      <div className="container">
        <div className="title">
          <img alt="logo" src="/src/assets/images/logo.png" />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        {
          loggedIn
            ? (
              <Button
                size="large"
                type="primary"
                onClick={() => void navigate('/admin', { replace: false })}
              >
                {intl.formatMessage({ id: 'pages.home.dashboard' })}
              </Button>
            )
            : (
              <div className="actions">
                <Button
                  size="large"
                  type="primary"
                  onClick={() => void navigate('/login', { replace: false })}
                >
                  {intl.formatMessage({ id: 'pages.home.login' })}
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => void navigate('/register', { replace: false })}
                >
                  {intl.formatMessage({ id: 'pages.home.register' })}
                </Button>
              </div>
            )
        }
      </div>
      <Footer iconSize="18" textSize="16" />
    </HomeContainer>
  )
}

export default Home
