import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GithubOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { LoginForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form'
import { Tabs, Divider } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'


/**
 * Types
 */
type LoginType = 'account' | 'email'


/**
 * Style
 */
const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;
    display: flex;
    flex-direction: column;

    .language {
        text-align: right;

        span {
            margin: 5px 25px 0 0;
        }
    }

    .login-form-container {
        flex: 1;
        padding: 30px 0;

        .actions {
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
        }

        .captcha-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;

            .captcha-image {
                height: 40px;
                cursor: pointer;
            }
        }

        .ant-pro-form-login-other {
            .other-login {
                display: flex;
                align-items: center;

                .anticon {
                    font-size: 24px;
                    color: rgba(0, 0, 0, .2);
                    cursor: pointer;
                    transition: all .3s;
                    margin-left: 15px;

                    &:hover {
                        color: #000;
                    }
                }
            }

            .divider {
                user-select: none;
                color: #ccc;
            }
        }

        .prefix-icon {
            color: #ccc;
        }
    }
`


/**
 * Constants
 */
const { TabPane } = Tabs


/**
 * Component
 */
const Login = (): JSX.Element => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const intl = useIntl()
  const navigate = useNavigate()

  return (
    <LoginContainer>
      <div className="language">
        <SelectLanguage size="24" />
      </div>
      <div className="login-form-container">
        <LoginForm
          actions={(
            <>
              <div className="other-login">
                {intl.formatMessage({ id: 'pages.login.other' })}
                <GithubOutlined />
              </div>
              <Divider plain className="divider">
                {intl.formatMessage({ id: 'pages.login.or' })}
              </Divider>
              <a
                role="button"
                onClick={() => void navigate('/register', { replace: false })}
              >
                {intl.formatMessage({ id: 'pages.login.register' })}
              </a>
            </>
          )}
          logo={logo}
          subTitle={intl.formatMessage({ id: 'subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
        >
          <Tabs
            activeKey={loginType}
            onChange={activeKey => void setLoginType(activeKey as LoginType)}
          >
            <TabPane
              key="account"
              tab={intl.formatMessage({ id: 'pages.login.login-type.account' })}
            />
            <TabPane
              key="email"
              tab={intl.formatMessage({ id: 'pages.login.login-type.email' })}
            />
          </Tabs>
          {loginType === 'account' && (
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className="prefix-icon" />,
                maxLength: 20
              }}
              name="username"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.username' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'pages.login.error-message.username.missing' })
                }
              ]}
            />
          )}
          {loginType === 'email' && (
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className="prefix-icon" />
              }}
              name="email"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.email' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'pages.login.error-message.email.missing' })
                },
                {
                  pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: intl.formatMessage({ id: 'pages.login.error-message.email.invalid' })
                }
              ]}
            />
          )}
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefix-icon" />
            }}
            name="password"
            placeholder={intl.formatMessage({ id: 'pages.login.placeholder.password' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'pages.login.error-message.password.missing' })
              }
            ]}
          />
          <div className="captcha-container">
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <CheckOutlined className="prefix-icon" />,
                maxLength: 4,
                showCount: true
              }}
              name="captcha"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.captcha' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'pages.login.error-message.captcha.missing' })
                },
                {
                  pattern: /^[A-Za-z0-9]{4}$/,
                  message: intl.formatMessage({ id: 'pages.login.error-message.captcha.invalid' })
                }
              ]}
            />
            <img
              alt="captcha"
              className="captcha-image"
              // src={`http://127.0.0.1:7001/captcha?t=${Date.now()}`}
              src="/src/assets/images/captcha_test.svg"
              onClick={() => { /* TODO */ }}
            />
          </div>
          <div className="actions">
            <ProFormCheckbox noStyle>
              {intl.formatMessage({ id: 'pages.login.actions.remember-me' })}
            </ProFormCheckbox>
            <a>{intl.formatMessage({ id: 'pages.login.actions.forgot-password' })}</a>
          </div>
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </LoginContainer>
  )
}

export default Login
