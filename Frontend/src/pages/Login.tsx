import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons'
import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form'
import { message, Tabs, Space } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import logo from '/src/assets/images/logo.png'
import Footer from '../components/Footer'
import SelectLanguage from '../locales/components/SelectLanguage'
import type { CSSProperties } from 'react'


type LoginType = 'account' | 'phone'

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer'
}


/**
 * Style
 */
const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #f0f2f5 url('/src/assets/images/login-bg.svg') center 110px / 100% no-repeat;
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
    }
`


/**
 * Constants
 */


/**
 * Component
 */
const Login = (): JSX.Element => {
  const [loginType, setLoginType] = useState<LoginType>('phone')
  const intl = useIntl()

  return (
    <LoginContainer>
      <div className="language">
        <SelectLanguage size="24" />
      </div>
      <div className="login-form-container">
        <LoginForm
          actions={(
            <Space>
              其他登录方式
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          )}
          logo={logo}
          subTitle="全球最大同性交友网站"
          title={intl.formatMessage({ id: 'title' })}
        >
          <Tabs activeKey={loginType} onChange={activeKey => void setLoginType(activeKey as LoginType)}>
            <Tabs.TabPane key="account" tab="账号密码登录" />
            <Tabs.TabPane key="phone" tab="手机号登录" />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />
                }}
                name="username"
                placeholder="用户名: admin or user"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!'
                  }
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />
                }}
                name="password"
                placeholder="密码: ant.design"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！'
                  }
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className="prefixIcon" />
                }}
                name="mobile"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！'
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！'
                  }
                ]}
              />
              <ProFormCaptcha
                captchaProps={{
                  size: 'large'
                }}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`
                  }
                  return '获取验证码'
                }}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />
                }}
                name="captcha"
                placeholder="请输入验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！'
                  }
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234')
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                'float': 'right'
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer iconSize="18" textSize="16" />
    </LoginContainer>
  )
}

export default Login
