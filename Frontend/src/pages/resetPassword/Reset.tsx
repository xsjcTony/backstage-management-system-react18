import { MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-form'
import { useBoolean, useRequest, useTitle } from 'ahooks'
import { Button, Form, Popover, message } from 'antd'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../../components/Footer'
import PasswordStrength from '../../components/PasswordStrength'
import SelectLanguage from '../../locales/components/SelectLanguage'
import { resetPassword as resetPasswordRequest } from '../../services/resetPassword'
import { isResetPasswordInfo, ResetPasswordInfo } from '../../types/locationState'
import type { ResponseData } from '../../services/types'
import type { LoginFormProps } from '@ant-design/pro-form'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'


/**
 * Types
 */
export interface ResetPasswordData {
  email: string
  password: string
  'password-check': string
}


/**
 * Style
 */
const ResetPasswordContainer = styled.div`
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

        .prefix-icon {
            color: #ccc;
        }

        .reset-button {
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
const Reset = (): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()
  const navigate = useNavigate()
  const { state: locationState } = useLocation()


  /**
   * Email verified check
   */
  useEffect(() => {
    if (!isResetPasswordInfo(locationState)) {
      void message.error(intl.formatMessage({ id: 'pages.reset-password.reset.email.not-verified' }))
      navigate('/reset_password/verify', { replace: true })
    }
  })


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
        className="reset-button"
        loading={resetting}
        size="large"
        type="primary"
        onClick={() => void formInstance.submit()}
      >
        {intl.formatMessage({ id: 'pages.reset-password.reset.reset' })}
      </Button>
    )
  }


  /**
   * Email
   */
  const emailFieldProps: ProFormFieldItemProps['fieldProps'] = {
    size: 'large',
    prefix: <MailOutlined className="prefix-icon" />
  }


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
   * Reset password
   */
  const _resetPassword = async (err: ValidateErrorEntity<ResetPasswordData>): Promise<void> => new Promise(async (resolve, reject) => {
    console.log(err)
    const { errorFields, values } = err

    if (errorFields.length !== 0) {
      void message.error(intl.formatMessage({ id: 'pages.register.error-message.data.invalid' }))
      return void reject()
    }

    let data: ResponseData

    try {
      data = await resetPasswordRequest(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return void reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return void reject()
    }

    void message.success(intl.formatMessage({ id: data.msg }), 3)
    navigate('/login', { replace: false })
    resolve()
  })

  const { loading: resetting, run: resetPassword } = useRequest(_resetPassword, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Component
   */
  return (
    <ResetPasswordContainer>
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
          subTitle={intl.formatMessage({ id: 'pages.reset-password.reset.subtitle' })}
          title={intl.formatMessage({ id: 'title' })}
          onFinishFailed={err => void resetPassword(err)}
        >
          <ProFormText
            disabled
            fieldProps={emailFieldProps}
            initialValue={(locationState as ResetPasswordInfo).email}
            name="email"
          />
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
            placeholder={intl.formatMessage({ id: 'pages.register.placeholder.password-check' })}
            rules={passwordCheckRules}
          />
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </ResetPasswordContainer>
  )
}

export default Reset
