import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GithubOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { LoginForm, ProFormText, ProFormCheckbox, ProForm } from '@ant-design/pro-form'
import { useRequest, useTitle } from 'ahooks'
import { Tabs, Divider, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'
import { loginUser } from '../services/login'
import { getUserById } from '../services/users'
import { setCurrentUser, setLoggedIn } from '../store/authentication/authenticationSlice'
import { isPromptInfo } from './types'
import type { ResponseData } from '../services/types'
import type { AppDispatch, RootState } from '../store'
import type { User, UserWithJWT } from '../types'
import type { LoginFormProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { TabsProps } from 'antd'


/**
 * Types
 */
type LoginType = 'account' | 'email'

interface BaseLoginData {
  password: string
  captcha: string
  remember: boolean
}

export interface AccountLoginData extends BaseLoginData {
  username: string
}

export interface EmailLoginData extends BaseLoginData {
  email: string
}


/**
 * Style
 */
const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login_bg.svg') center 110px / 100% no-repeat;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;

        .logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            margin-left: 25px;

            img {
                height: 30px;
                margin-right: 10px;
            }

            h1 {
                line-height: 30px;
                font-size: 18px;
            }
        }

        & > span {
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

        .register-button,
        .login-button {
            width: 100%;
        }
    }
`


/**
 * Constants
 */
const { TabPane } = Tabs
const { useForm } = ProForm


/**
 * Component
 */
const Login = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.login.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Prompt
   */
  useEffect(() => {
    if (isPromptInfo(location.state)) {
      const { type, intlId, duration } = location.state.promptInfo
      void message[type](intl.formatMessage({ id: intlId }), duration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  /**
   * Tabs
   */
  const [loginType, setLoginType] = useState<LoginType>('account')

  const changeTab: TabsProps['onChange'] = (activeKey: string): void => {
    formInstance.resetFields()
    setLoginType(activeKey as LoginType)
  }


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formActions: LoginFormProps<Record<string, any>>['actions'] = (
    <>
      <div className="other-login">
        {intl.formatMessage({ id: 'pages.login.other' })}
        <GithubOutlined />
      </div>
      <Divider plain className="divider">
        {intl.formatMessage({ id: 'pages.login.or' })}
      </Divider>
      <Button
        className="register-button"
        size="large"
        onClick={() => void navigate('/register', { replace: false })}
      >
        {intl.formatMessage({ id: 'pages.login.register' })}
      </Button>
    </>
  )

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="login-button"
        loading={loggingIn}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.login.login' })}
      </Button>
    )
  }


  /**
   * Account
   */
  const usernameFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <UserOutlined className="prefix-icon" />,
    maxLength: 20
  }

  const usernameRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.username.missing' })
    }
  ]


  /**
   * Email
   */
  const emailFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <MailOutlined className="prefix-icon" />
  }

  const emailRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.email.missing' })
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: intl.formatMessage({ id: 'pages.login.error-message.email.invalid' })
    }
  ]


  /**
   * Password
   */
  const passwordFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <LockOutlined className="prefix-icon" />
  }

  const passwordRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.password.missing' })
    }
  ]


  /**
   * Captcha
   */
  const [captchaSrc, setCaptchaSrc] = useState<string>(`${apiBaseUrl}/captcha?t=${Date.now()}`)

  const refreshCaptcha = (): void => void setCaptchaSrc(`${apiBaseUrl}/captcha?t=${Date.now()}`)

  const captchaFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <CheckOutlined className="prefix-icon" />,
    maxLength: 4,
    showCount: true
  }

  const captchaRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.login.error-message.captcha.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: intl.formatMessage({ id: 'pages.login.error-message.captcha.invalid' })
    }
  ]


  /**
   * Login
   */
  const _login = async (values: AccountLoginData | EmailLoginData): Promise<void> => new Promise(async (resolve, reject) => {
    // Remember me: default to false (Because it won't be in values if it's not changed at all)
    if (!values.remember) {
      values.remember = false
    }

    let loginResponse: ResponseData<UserWithJWT>

    try {
      loginResponse = await loginUser(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (loginResponse.code !== 200) {
      void message.error(intl.formatMessage({ id: loginResponse.msg }), 3)
      refreshCaptcha()
      return void reject()
    }

    // save JWT token into Local Storage
    localStorage.setItem('token', loginResponse.data.token)

    // fetch user data with roles
    let userResponse: ResponseData<User>

    try {
      userResponse = await getUserById(loginResponse.data.id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (userResponse.code !== 200) {
      void message.error(intl.formatMessage({ id: userResponse.msg }), 3)
      refreshCaptcha()
      return void reject()
    }

    const user = userResponse.data

    // build privilege tree
    // TODO: 处理 Privilege tree

    // Redux
    dispatch(setLoggedIn(true))
    dispatch(setCurrentUser(user))

    void message.success(intl.formatMessage({ id: loginResponse.msg }), 3)
    navigate('/admin', { replace: false })
    resolve()
  })

  const { loading: loggingIn, run: login } = useRequest(_login, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })

  /**
   * Component
   */
  return (
    <LoginContainer>
      <div className="header">
        <div
          className="logo"
          onClick={() => void navigate('/', { replace: false })}
        >
          <img alt="logo" src="/src/assets/images/logo.png" />
          <h1>{intl.formatMessage({ id: 'header.title' })}</h1>
        </div>
        <SelectLanguage size="24" />
      </div>
      <div className="login-form-container">
        <LoginForm
          actions={formActions}
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinish={async (values: AccountLoginData | EmailLoginData) => void login(values)}
          onFinishFailed={() => void message.error(intl.formatMessage({ id: 'pages.login.error-message.data.invalid' }))}
        >
          <Tabs
            activeKey={loginType}
            onChange={changeTab}
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
              fieldProps={usernameFieldProps}
              name="username"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.username' })}
              rules={usernameRules}
            />
          )}
          {loginType === 'email' && (
            <ProFormText
              fieldProps={emailFieldProps}
              name="email"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.email' })}
              rules={emailRules}
            />
          )}
          <ProFormText.Password
            fieldProps={passwordFieldProps}
            name="password"
            placeholder={intl.formatMessage({ id: 'pages.login.placeholder.password' })}
            rules={passwordRules}
          />
          <div className="captcha-container">
            <ProFormText
              fieldProps={captchaFieldProps}
              name="captcha"
              placeholder={intl.formatMessage({ id: 'pages.login.placeholder.captcha' })}
              rules={captchaRules}
            />
            <img
              alt="captcha"
              className="captcha-image"
              src={captchaSrc}
              onClick={refreshCaptcha}
            />
          </div>
          <div className="actions">
            <ProFormCheckbox noStyle name="remember">
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
