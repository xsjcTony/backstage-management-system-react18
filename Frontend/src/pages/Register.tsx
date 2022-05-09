import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CheckOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { LoginForm, ProForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { Tabs, Divider, Button, Form, Popover, Progress, message } from 'antd'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'
import { sendVerificationEmail } from '../services/register'
import type { ResponseData } from '../services/types'
import type { RootState } from '../store'
import type { LoginFormProps, ProFormCaptchaProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { TabsProps } from 'antd'
import type { InternalFieldProps } from 'rc-field-form/es/Field'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'
import type { ReactNode } from 'react'


/**
 * Types
 */
type RegisterType = 'account' | 'email'

export interface AccountData {
  username: string
  password: string
  'password-check': string
  captcha: string
  agreement: boolean
}

export interface EmailData {
  email: string
  password: string
  'password-check': string
  captcha: string
  agreement: boolean
}


/**
 * Style
 */
const RegisterContainer = styled.div`
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
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()
  const apiBaseUrl = useSelector((state: RootState) => state.layout.apiBaseUrl)


  /**
   * Title
   */
  useEffect(() => {
    document.title = `${intl.formatMessage({ id: 'pages.register.title' })} - ${intl.formatMessage({ id: 'title' })}`
  }, [intl])


  /**
   * Tabs
   */
  const [registerType, setRegisterType] = useState<RegisterType>('account')

  const changeTab: TabsProps['onChange'] = (activeKey: string): void => {
    formInstance.resetFields()
    setRegisterType(activeKey as RegisterType)
  }


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formActions: LoginFormProps<Record<string, any>>['actions'] = (
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
  )

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="register-button"
        htmlType="submit"
        size="large"
        type="primary"
      >
        {intl.formatMessage({ id: 'pages.register.register' })}
      </Button>
    )
  }


  /**
   * Account
   */
  const usernameFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <UserOutlined className="prefix-icon" />,
    maxLength: 20,
    showCount: true
  }

  const usernameRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.username.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{6,20}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.username.rule' })
    }
  ]


  /**
   * Email
   */
  const email = useWatch<string | undefined>('email', formInstance)

  const emailFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <MailOutlined className="prefix-icon" />
  }

  const emailRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.email.missing' })
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.email.invalid' })
    }
  ]


  /**
   * Password
   */
  const password = useWatch<string | undefined>('password', formInstance)
  const [passwordPopoverVisible, setPasswordPopoverVisible] = useState<boolean>(false)

  // validate methods
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

  // props
  const passwordFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <LockOutlined className="prefix-icon" />,
    onFocus: () => void setPasswordPopoverVisible(true),
    onBlur: () => void setPasswordPopoverVisible(false)
  }

  const passwordCheckFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <SafetyOutlined className="prefix-icon" />
  }

  // rules
  const passwordCheckRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.password-check.missing' })
    },
    { validator: checkConfirmPassword }
  ]

  // strength
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


  /**
   * Verification code
   */
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const getCaptcha: ProFormCaptchaProps['onGetCaptcha'] = async (): Promise<void> => {
    try {
      await formInstance.validateFields(['email'])
    } catch (err) {
      void message.error((err as ValidateErrorEntity).errorFields[0].errors[0], 3)
      throw new Error()
    }

    if (!email) {
      void message.error('Invalid E-mail address')
      throw new Error()
    }

    let data: ResponseData

    try {
      data = await sendVerificationEmail({ email })
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }))
      throw new Error()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: 'pages.register.message.send-captcha.error' }))
      throw new Error()
    }

    void message.success(intl.formatMessage({ id: 'pages.register.message.send-captcha.success' }), 3)
    setEmailSent(true)
  }

  const captchaTextRender: ProFormCaptchaProps['captchaTextRender'] = (timing: boolean, count: number): ReactNode =>
    timing ? `${count}s` : emailSent
      ? intl.formatMessage({ id: 'pages.register.captcha.button.resend' })
      : intl.formatMessage({ id: 'pages.register.captcha.button.send' })

  const verificationCodeFieldProps: ProFormCaptchaProps['fieldProps'] = {
    size: 'large',
    prefix: <CheckOutlined className="prefix-icon" />,
    showCount: true,
    maxLength: 4
  }

  const verificationCodeRules: ProFormCaptchaProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.invalid' })
    }
  ]

  /**
   * Captcha
   */
  const [captchaSrc, setCaptchaSrc] = useState<string>(`${apiBaseUrl}/captcha?t=${Date.now()}`)

  const captchaRules: ProFormFieldItemProps['rules'] = [
    {
      required: true,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.missing' })
    },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: intl.formatMessage({ id: 'pages.register.error-message.captcha.invalid' })
    }
  ]

  const captchaFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <CheckOutlined className="prefix-icon" />,
    maxLength: 4,
    showCount: true
  }


  /**
   * Agreement
   */
  const agreementRule: InternalFieldProps['rules'] = [
    {
      validator: async (_rule, value) => value
        ? Promise.resolve()
        : Promise.reject(intl.formatMessage({ id: 'pages.register.error-message.agreement.missing' }))
    }
  ]


  /**
   * Register
   */
  const register = async (err: ValidateErrorEntity): Promise<void> => {
    if (registerType === 'account') {
      // account
      const { errorFields, values } = err as ValidateErrorEntity<AccountData>

      if (errorFields.length !== 0) {
        void message.error(intl.formatMessage({ id: 'pages.register.error-message.data.invalid' }))
        return
      }

      console.log(values)
    } else {
      // email
      const { errorFields, values } = err as ValidateErrorEntity<EmailData>

      if (errorFields.length !== 0) {
        void message.error(intl.formatMessage({ id: 'pages.register.error-message.data.invalid' }))
        return
      }

      console.log(values)
    }
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
          fieldProps={passwordFieldProps}
          name="password"
          placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password' })}
          rules={[{ validator: checkPassword }]}
        />
      </Popover>
      <ProFormText.Password
        fieldProps={passwordCheckFieldProps}
        name="password-check"
        placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password' })}
        rules={passwordCheckRules}
      />
    </>
  )

  return (
    <RegisterContainer>
      <div className="language">
        <SelectLanguage size="24" />
      </div>
      <div className="register-form-container">
        <LoginForm
          actions={formActions}
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinishFailed={err => void register(err)}
        >
          <Tabs
            activeKey={registerType}
            onChange={changeTab}
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
                fieldProps={usernameFieldProps}
                name="username"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.username' })}
                rules={usernameRules}
              />
              {passwordForm}
              <div className="captcha-container">
                <ProFormText
                  fieldProps={captchaFieldProps}
                  name="captcha"
                  placeholder={intl.formatMessage({ id: 'pages.register.placeholder.captcha' })}
                  rules={captchaRules}
                />
                <img
                  alt="captcha"
                  className="captcha-image"
                  src={captchaSrc}
                  onClick={() => void setCaptchaSrc(`${apiBaseUrl}/captcha?t=${Date.now()}`)}
                />
              </div>
            </>
          )}
          {registerType === 'email' && (
            <>
              <ProFormText
                fieldProps={emailFieldProps}
                name="email"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.email' })}
                rules={emailRules}
              />
              {passwordForm}
              <ProFormCaptcha
                captchaProps={{ size: 'large' }}
                captchaTextRender={captchaTextRender}
                countDown={60}
                fieldProps={verificationCodeFieldProps}
                name="captcha"
                placeholder={intl.formatMessage({ id: 'pages.register.placeholder.captcha' })}
                rules={verificationCodeRules}
                onGetCaptcha={getCaptcha}
              />
            </>
          )}
          <ProFormCheckbox
            name="agreement"
            rules={agreementRule}
          >
            {intl.formatMessage({ id: 'pages.register.agreement.text' })}
            <a
              href="https://www.google.com/"
              rel="noreferrer noopener"
              target="_blank"
            >
              {intl.formatMessage({ id: 'pages.register.agreement.terms' })}
            </a>
          </ProFormCheckbox>
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </RegisterContainer>
  )
}

export default Register
