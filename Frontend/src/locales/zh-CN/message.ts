/**
 * Server returned message
 */
const message: Record<string, string> = {
  // Register & Login
  'message.captcha.expired': '验证码已过期, 输入新的验证码',
  'message.captcha.incorrect': '验证码不正确, 输入新的验证码',
  'message.verification-code.expired': '验证码已过期, 点击"重新发送"获取新的验证码',
  'message.verification-code.incorrect': '验证码不正确',
  'message.register.username.exist': '用户名已存在',
  'message.register.email.exist': '邮箱已存在'
}

export default message
