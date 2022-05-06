import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CheckOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { LoginForm, ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form'
import { Tabs, Divider, Button, Form, Popover, Progress, message } from 'antd'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'


/**
 * Types
 */
type RegisterType = 'account' | 'email'


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

    .register-form-container {
        flex: 1;
        padding: 30px 0;

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
const { useWatch } = Form

const passwordProgressMap = {
  high: 'success' as const,
  medium: 'normal' as const,
  low: 'exception' as const
}

const StyledProgress = styled(Progress)`
    &.ant-progress-status-normal .ant-progress-bg {
        background: #faad14;
    }
`


/**
 * Component
 */
const Register = (): JSX.Element => {
  /**
   * Hooks
   */
  const [registerType, setRegisterType] = useState<RegisterType>('account')
  const intl = useIntl()
  const navigate = useNavigate()
  const [formInstance] = useForm()
  const password = useWatch<string | undefined>('password', formInstance)
  const [passwordPopoverVisible, setPasswordPopoverVisible] = useState<boolean>(false)
  const [emailSent, setEmailSent] = useState<boolean>(false)

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.register.title' })} - ${intl.formatMessage({ id: 'title' })}`
  })


  /**
   * Data & Methods
   */
  const passwordStrengthMap: Record<string, JSX.Element> = {
    low: (
      <div style={{ color: '#f5222d' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.low' })}
      </div>
    ),
    medium: (
      <div style={{ color: '#faad14' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.medium' })}
      </div>
    ),
    high: (
      <div style={{ color: '#52c41a' }}>
        {intl.formatMessage({ id: 'pages.register.password.strength' })}
        {': '}
        {intl.formatMessage({ id: 'pages.register.password.high' })}
      </div>
    )
  }

  const getPasswordStatus = (): 'high' | 'low' | 'medium' => {
    if (password && password.length >= 9) {
      return 'high'
    }

    if (password && password.length >= 5) {
      return 'medium'
    }

    return 'low'
  }

  const renderPasswordProgress = (): JSX.Element => {
    const passwordStatus = getPasswordStatus()

    return (
      <StyledProgress
        percent={password ? password.length * 10 > 100 ? 100 : password.length * 10 : 0}
        showInfo={false}
        status={passwordProgressMap[passwordStatus]}
        strokeWidth={6}
      />
    )
  }

  const checkPassword = async (_: unknown, value: string): Promise<void> => {
    const regex = /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/

    if (!value) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password.missing' }))
    }

    void formInstance.validateFields(['password-check'])

    if (!regex.test(value)) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password.rule' }))
    }

    return Promise.resolve()
  }

  const checkConfirmPassword = async (_: unknown, value: string): Promise<void> => {
    if (value && value !== password) {
      return Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.password-check.invalid' }))
    }
    return Promise.resolve()
  }


  /**
   * Component
   */
  const passwordForm = (
    <>
      <Popover
        content={(
          <div style={{ padding: '4px 0' }}>
            {passwordStrengthMap[getPasswordStatus()]}
            {renderPasswordProgress()}
            <div style={{ marginTop: 10 }}>
              {intl.formatMessage({ id: 'pages.register.error-message.password.rule' })}
            </div>
          </div>
        )}
        overlayStyle={{ width: 240 }}
        placement="right"
        visible={passwordPopoverVisible}
      >
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefix-icon" />,
            onFocus: () => void setPasswordPopoverVisible(true),
            onBlur: () => void setPasswordPopoverVisible(false)
          }}
          name="password"
          placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password' })}
          rules={[{ validator: checkPassword }]}
        />
      </Popover>
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <SafetyOutlined className="prefix-icon" />
        }}
        name="password-check"
        placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.register.error-message.password-check.missing' })
          },
          { validator: checkConfirmPassword }
        ]}
      />
    </>
  )

  return (
    <LoginContainer>
      <div className="language">
        <SelectLanguage size="24" />
      </div>
      <div className="register-form-container">
        <LoginForm
          actions={(
            <>
              <Divider plain className="divider">
                {intl.formatMessage({ id: 'pages.register.or' })}
              </Divider>
              <Button
                className="login-button"
                size="large"
                onClick={() => void navigate('/login', { replace: false })}
              >
                {intl.formatMessage({ id: 'pages.register.login' })}
              </Button>
            </>
          )}
          form={formInstance}
          logo={logo}
          submitter={{
            render: props => (
              <Button
                className="register-button"
                size="large"
                type="primary"
                onClick={() => { /* TODO */ }}
              >
                {intl.formatMessage({ id: 'pages.register.register' })}
              </Button>
            )
          }}
          subTitle={intl.formatMessage({ id: 'subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
        >
          <Tabs
            activeKey={registerType}
            onChange={activeKey => void setRegisterType(activeKey as RegisterType)}
          >
            <TabPane
              key="account"
              tab={intl.formatMessage({ id: 'pages.register.register-type.account' })}
            />
            <TabPane
              key="email"
              tab={intl.formatMessage({ id: 'pages.register.register-type.email' })}
            />
          </Tabs>
          {registerType === 'account' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefix-icon" />,
                  maxLength: 20,
                  showCount: true
                }}
                name="username"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.username' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'pages.register.error-message.username.missing' })
                  },
                  {
                    pattern: /^[A-Za-z0-9]{6,20}$/,
                    message: intl.formatMessage({ id: 'pages.register.error-message.username.rule' })
                  }
                ]}
              />
              {passwordForm}
              <div className="captcha-container">
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <CheckOutlined className="prefix-icon" />,
                    maxLength: 4,
                    showCount: true
                  }}
                  name="captcha"
                  placeholder={intl.formatMessage({ id: 'pages.register.placeholder.captcha' })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.missing' })
                    },
                    {
                      pattern: /^[A-Za-z0-9]{4}$/,
                      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.invalid' })
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
            </>
          )}
          {registerType === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className="prefix-icon" />
                }}
                name="email"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.email' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'pages.register.error-message.email.missing' })
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: intl.formatMessage({ id: 'pages.register.error-message.email.invalid' })
                  }
                ]}
              />
              {passwordForm}
              <ProFormCaptcha
                captchaProps={{
                  size: 'large'
                }}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count}s`
                  }
                  return emailSent
                    ? intl.formatMessage({ id: 'pages.register.captcha.button.resend' })
                    : intl.formatMessage({ id: 'pages.register.captcha.button.send' })
                }}
                countDown={60}
                fieldProps={{
                  size: 'large',
                  prefix: <CheckOutlined className="prefix-icon" />,
                  showCount: true,
                  maxLength: 4
                }}
                name="captcha"
                phoneName="email"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.captcha' })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'pages.register.error-message.captcha.missing' })
                  },
                  {
                    pattern: /^[A-Za-z0-9]{4}$/,
                    message: intl.formatMessage({ id: 'pages.register.error-message.captcha.invalid' })
                  }
                ]}
                onGetCaptcha={async (email) => {
                  void message.success(intl.formatMessage({ id: 'pages.register.message.send-captcha.success' }))
                  setEmailSent(true)
                }}
              />
            </>
          )}

        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </LoginContainer>
  )
}

export default Register
