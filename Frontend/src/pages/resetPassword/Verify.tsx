import { MailOutlined, CheckOutlined } from '@ant-design/icons'
import { LoginForm, ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form'
import { useBoolean, useRequest, useTitle } from 'ahooks'
import { Button, Form, message } from 'antd'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../../components/Footer'
import SelectLanguage from '../../locales/components/SelectLanguage'
import { sendVerificationEmail } from '../../services/register'
import { verifyEmail } from '../../services/resetPassword'
import type { ResponseData } from '../../services/types'
import type { LoginFormProps, ProFormCaptchaProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'
import type { ReactNode } from 'react'


/**
 * Types
 */
export interface VerifyEmailData {
  email: string
  captcha: string
}


/**
 * Style
 */
const VerifyEmailContainer = styled.div`
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

    .verify-form-container {
        flex: 1;
        padding: 30px 0;

        .prefix-icon {
            color: #ccc;
        }

        .verify-button {
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
const Verify = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()


  /**
   * Title
   */
  useTitle(`${intl.formatMessage({ id: 'pages.reset-password.title' })} - ${intl.formatMessage({ id: 'title' })}`)


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: LoginFormProps<Record<string, any>>['submitter'] = {
    render: () => (
      <Button
        className="verify-button"
        loading={verifying}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.reset-password.verify.verify' })}
      </Button>
    )
  }


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
   * Verify
   */
  const _verify = async (values: VerifyEmailData): Promise<void> => new Promise(async (resolve, reject) => {
    let data: ResponseData

    try {
      data = await verifyEmail(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return void reject()
    }

    void message.success(intl.formatMessage({ id: data.msg }), 3)
    navigate('/reset_password/reset', {
      replace: false,
      state: {
        email: values.email,
        verified: true
      }
    })
    resolve()
  })

  const { loading: verifying, run: verify } = useRequest(_verify, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Component
   */
  return (
    <VerifyEmailContainer>
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
      <div className="verify-form-container">
        <LoginForm
          form={formInstance}
          logo={logo}
          submitter={formSubmitter}
          subTitle={intl.formatMessage({ id: 'pages.reset-password.verify.subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinish={async (values: VerifyEmailData) => void verify(values)}
        >
          <ProFormText
            fieldProps={emailFieldProps}
            name="email"
            placeholder={intl.formatMessage({ id: 'pages.register.placeholder.email' })}
            rules={emailRules}
          />
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
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </VerifyEmailContainer>
  )
}

export default Verify
