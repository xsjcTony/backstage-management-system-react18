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
  'message.register.email.exist': '邮箱已存在',
  'message.register.success': '注册成功, 请登录',
  'message.login.success': '登录成功',
  'message.login.wrong-username': '用户名或密码错误',
  'message.login.wrong-email': '邮箱或密码错误',

  // OAuth
  'message.oauth.bind.success': '绑定账号成功',
  'message.oauth.invalid': 'OAuth ID 不正确',

  // Reset password
  'message.reset-password.verify.success': '验证成功',
  'message.reset-password.verify.email.invalid': `邮箱地址没有和账号绑定`,
  'message.reset-password.reset.success': '重置密码成功, 请登录',

  // Permission
  'message.permission.denied': '没有权限',

  // Admin
  // Users
  'message.users.user.missing': '用户不存在',
  'message.users.user.updated': '更新用户成功',
  'message.users.user.deleted': '删除用户成功',
  'message.users.export.no-user': '没有用户'
}

export default message
