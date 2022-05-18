const pages: Record<string, string> = {
  // 404
  'pages.404.description': '对不起, 您所访问的页面不存在',
  'pages.404.back': '返回首页',

  // Home
  'pages.home.title': '首页',
  'pages.home.login': '登录',
  'pages.home.register': '注册',
  'pages.home.dashboard': '管理页',
  'pages.home.hi': '您好, ',
  'pages.home.logout': '退出登录',

  // Admin
  // Welcome
  'pages.admin.welcome.title': '欢迎',

  // User List
  'pages.admin.user-list.title': '用户列表',

  // Role List
  'pages.admin.role-list.title': '角色列表',

  // Privilege List
  'pages.admin.privilege-list.title': '权限列表',

  // Login
  'pages.login.title': '登录',
  'pages.login.placeholder.username': '用户名',
  'pages.login.placeholder.password': '密码',
  'pages.login.placeholder.email': '邮箱 example@domain.xxx',
  'pages.login.placeholder.captcha': '验证码',
  'pages.login.login-type.account': '账号密码登录',
  'pages.login.login-type.email': '邮箱登录',
  'pages.login.actions.remember-me': '记住我',
  'pages.login.actions.forgot-password': '忘记密码',
  'pages.login.other': '其他登录方式',
  'pages.login.register': '创建一个新账号',
  'pages.login.login': '登录',
  'pages.login.or': '或',
  'pages.login.error-message.username.missing': '请输入用户名',
  'pages.login.error-message.password.missing': '请输入密码',
  'pages.login.error-message.email.missing': '请输入邮箱',
  'pages.login.error-message.email.invalid': '邮箱不正确',
  'pages.login.error-message.captcha.missing': '请输入验证码',
  'pages.login.error-message.captcha.invalid': '验证码不正确',
  'pages.login.error-message.data.invalid': '登录数据不正确',

  // Register
  'pages.register.title': '注册',
  'pages.register.placeholder.username': '用户名',
  'pages.register.placeholder.password': '密码',
  'pages.register.placeholder.password-check': '确认密码',
  'pages.register.placeholder.email': '邮箱 example@domain.xxx',
  'pages.register.placeholder.captcha': '验证码',
  'pages.register.register-type.account': '账号密码注册',
  'pages.register.register-type.email': '邮箱注册',
  'pages.register.register': '注册',
  'pages.register.login': '已经拥有账号? 登录',
  'pages.register.or': '或',
  'pages.register.agreement.text': '我同意',
  'pages.register.agreement.terms': '条款和条件',
  'pages.register.password.strength': '强度',
  'pages.register.password.low': '低',
  'pages.register.password.medium': '中',
  'pages.register.password.high': '高',
  'pages.register.error-message.username.missing': '请输入用户名',
  'pages.register.error-message.username.rule': '用户名必须由a-z, A-Z或0-9组成, 并且长度在6-20个字符之间',
  'pages.register.error-message.password.missing': '请输入密码',
  'pages.register.error-message.password.rule': '密码必须包括字母, 数字和特殊符号, 并且长度在8-20个字符之间',
  'pages.register.error-message.password-check.missing': '请再次输入密码',
  'pages.register.error-message.password-check.invalid': '密码不匹配',
  'pages.register.error-message.email.missing': '请输入邮箱',
  'pages.register.error-message.email.invalid': '邮箱地址不正确',
  'pages.register.error-message.captcha.missing': '请输入验证码',
  'pages.register.error-message.captcha.invalid': '验证码不正确',
  'pages.register.error-message.agreement.missing': '请同意"条款和条件"',
  'pages.register.error-message.data.invalid': '注册数据不正确',
  'pages.register.captcha.button.send': '发送验证码',
  'pages.register.captcha.button.resend': '重新发送验证码',
  'pages.register.message.send-captcha.success': '验证码发送成功',
  'pages.register.message.send-captcha.error': '验证码发送失败',

  // OAuth
  'pages.oauth.title': '绑定账号',
  'pages.oauth.id.invalid': 'OAuth ID 不正确',
  'pages.oauth.github.subtitle': '绑定您的账号到此GitHub',

  // Reset password
  'pages.reset-password.title': '重置密码',
  'pages.reset-password.verify.subtitle': '重置密码 - 验证您的邮箱',
  'pages.reset-password.verify.verify': '验证',
  'pages.reset-password.reset.subtitle': '重置密码',
  'pages.reset-password.reset.reset': '重置密码',
  'pages.reset-password.reset.email.not-verified': '邮箱地址未验证'
}

export default pages
