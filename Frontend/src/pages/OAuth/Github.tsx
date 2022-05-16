import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CheckOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { LoginForm, ProForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { useBoolean, useRequest, useTitle } from 'ahooks'
import { Button, Form, Popover, message } from 'antd'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../../components/Footer'
import PasswordStrength from '../../components/PasswordStrength'
import SelectLanguage from '../../locales/components/SelectLanguage'
import { bindAccount } from '../../services/oauth'
import { sendVerificationEmail } from '../../services/register'
import { getUserById } from '../../services/users'
import { setCurrentUser, setLoggedIn } from '../../store/authentication/authenticationSlice'
import type { ResponseData } from '../../services/types'
import type { AppDispatch } from '../../store'
import type { UserWithJWT, User } from '../../types'
import type { LoginFormProps, ProFormCaptchaProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { InternalFieldProps } from 'rc-field-form/es/Field'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'
import type { ReactNode } from 'react'


/**
 * Types
 */
export interface OAuthRegisterData {
  username: string
  email: string
  password: string
  'password-check': string
  captcha: string
  agreement: boolean
  oauthId: string
  provider: 'github'
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
const { useForm } = ProForm
const { useWatch } = Form


/**
 * Component
 */
const Github = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const oauthId = searchParams.get('oauthId')


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.oauth.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="register-button"
        loading={registering}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.register.register' })}
      </Button>
    )
  }


  /**
   * Username
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
  const [passwordPopoverVisible, { setTrue: showPopover, setFalse: hidePopover }] = useBoolean(false)

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
    onFocus: showPopover,
    onBlur: hidePopover
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


  /**
   * Verification code
   */
  const [emailSent, { setTrue: setEmailSent }] = useBoolean(false)

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
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      throw new Error()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: 'pages.register.message.send-captcha.error' }), 3)
      throw new Error()
    }

    void message.success(intl.formatMessage({ id: 'pages.register.message.send-captcha.success' }), 3)
    setEmailSent()
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
  const _register = async (err: ValidateErrorEntity<OAuthRegisterData>): Promise<void> => new Promise(async (resolve, reject) => {
    let { errorFields, values } = err

    if (errorFields.length !== 0) {
      void message.error(intl.formatMessage({ id: 'pages.register.error-message.data.invalid' }))
      return void reject()
    }

    if (!oauthId) {
      void message.error(intl.formatMessage({ id: 'pages.oauth.id.invalid' }))
      return void reject()
    }

    values = {
      ...values,
      oauthId,
      provider: 'github'
    }

    let data: ResponseData<UserWithJWT>

    try {
      data = await bindAccount(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return void reject()
    }

    // save JWT token into Local Storage
    localStorage.setItem('token', data.data.token)

    // fetch user data with roles
    let userResponse: ResponseData<User>

    try {
      userResponse = await getUserById(data.data.id)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (userResponse.code !== 200) {
      void message.error(intl.formatMessage({ id: userResponse.msg }), 3)
      return void reject()
    }

    const user = userResponse.data

    // build privilege tree
    // TODO: 处理 Privilege tree

    // Redux
    dispatch(setLoggedIn(true))
    dispatch(setCurrentUser(user))

    void message.success(intl.formatMessage({ id: data.msg }), 3)
    navigate('/admin', { replace: false })
    resolve()
  })

  const { loading: registering, run: register } = useRequest(_register, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Component
   */
  const passwordForm = (
    <>
      <Popover
        content={<PasswordStrength password={password} />}
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
      <div className="register-form-container">
        <LoginForm
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'pages.oauth.github.subtitle' })}
          title={intl.formatMessage({ id: 'pages.oauth.title' })}
          onFinishFailed={err => void register(err)}
        >
          <ProFormText
            fieldProps={usernameFieldProps}
            name="username"
            placeholder={intl.formatMessage({ id: 'pages.register.placeholder.username' })}
            rules={usernameRules}
          />
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
          <ProFormCheckbox
            name="agreement"
            rules={agreementRule}
          >
            {intl.formatMessage({ id: 'pages.register.agreement.text' })}
            <a
              href="https://github.com/xsjcTony"
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

export default Github
