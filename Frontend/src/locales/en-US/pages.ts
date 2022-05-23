const pages: Record<string, string> = {
  // 404
  'pages.404.description': 'Sorry, the page you visited does not exist',
  'pages.404.back': 'Back to Home',

  // Home
  'pages.home.title': 'Home',
  'pages.home.login': 'Login',
  'pages.home.register': 'Register',
  'pages.home.dashboard': 'Dashboard',
  'pages.home.hi': 'Hi, ',
  'pages.home.logout': 'Log out',

  // Admin
  'pages.admin.home': 'Home',

  // Welcome
  'pages.admin.welcome.title': 'Welcome',

  // User List
  'pages.admin.user-list.title': 'User List',
  'pages.admin.user-list.table.header.avatar': 'Avatar',
  'pages.admin.user-list.table.header.username': 'Username',
  'pages.admin.user-list.table.header.email': 'E-mail',
  'pages.admin.user-list.table.header.role': 'Role',
  'pages.admin.user-list.table.header.state': 'State',
  'pages.admin.user-list.table.header.actions.edit': 'Edit',
  'pages.admin.user-list.table.header.actions.assign-roles': 'Assign roles',
  'pages.admin.user-list.table.header.actions.delete': 'Delete',
  'pages.admin.user-list.table.actions.add-users': 'Add user',
  'pages.admin.user-list.table.actions.import-users': 'Import users',
  'pages.admin.user-list.table.actions.export-users': 'Export users',
  'pages.admin.user-list.user.state.updated': 'User state has been updated',

  // Role List
  'pages.admin.role-list.title': 'Role List',

  // Privilege List
  'pages.admin.privilege-list.title': 'Privilege List',

  // Login
  'pages.login.title': 'Login',
  'pages.login.placeholder.username': 'Username',
  'pages.login.placeholder.password': 'Password',
  'pages.login.placeholder.email': 'E-mail example@domain.xxx',
  'pages.login.placeholder.captcha': 'Captcha',
  'pages.login.login-type.account': 'Account',
  'pages.login.login-type.email': 'E-mail',
  'pages.login.actions.remember-me': 'Remember me',
  'pages.login.actions.forgot-password': 'Forgot password',
  'pages.login.other': 'Other login methods',
  'pages.login.register': 'Create a new account',
  'pages.login.login': 'Login',
  'pages.login.or': 'OR',
  'pages.login.error-message.username.missing': 'Please input username',
  'pages.login.error-message.password.missing': 'Please input password',
  'pages.login.error-message.email.missing': 'Please input E-mail',
  'pages.login.error-message.email.invalid': 'Invalid E-mail address',
  'pages.login.error-message.captcha.missing': 'Please input captcha',
  'pages.login.error-message.captcha.invalid': 'Invalid Captcha',
  'pages.login.error-message.data.invalid': 'Invalid login data',

  // Register
  'pages.register.title': 'Register',
  'pages.register.placeholder.username': 'Username',
  'pages.register.placeholder.password': 'Password',
  'pages.register.placeholder.password-check': 'Confirm password',
  'pages.register.placeholder.email': 'E-mail example@domain.xxx',
  'pages.register.placeholder.captcha': 'Captcha',
  'pages.register.register-type.account': 'Account',
  'pages.register.register-type.email': 'E-mail',
  'pages.register.register': 'Register',
  'pages.register.login': 'Already have an account? Login',
  'pages.register.or': 'OR',
  'pages.register.agreement.text': 'I agree to the ',
  'pages.register.agreement.terms': 'Terms and Conditions',
  'pages.register.password.strength': 'Strength',
  'pages.register.password.low': 'Low',
  'pages.register.password.medium': 'Medium',
  'pages.register.password.high': 'High',
  'pages.register.error-message.username.missing': 'Please input username',
  'pages.register.error-message.username.rule': 'Username must be any of a-z, A-Z or 0-9, and between 6 and 20 (both inclusive) characters long',
  'pages.register.error-message.password.missing': 'Please input password',
  'pages.register.error-message.password.rule': 'Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.',
  'pages.register.error-message.password-check.missing': 'Please input password again',
  'pages.register.error-message.password-check.invalid': `Password doesn't match`,
  'pages.register.error-message.email.missing': 'Please input E-mail',
  'pages.register.error-message.email.invalid': 'Invalid E-mail address',
  'pages.register.error-message.captcha.missing': 'Please input captcha',
  'pages.register.error-message.captcha.invalid': 'Invalid Captcha',
  'pages.register.error-message.agreement.missing': 'Please agree to the "Terms and Conditions"',
  'pages.register.error-message.data.invalid': 'Invalid registration data',
  'pages.register.captcha.button.send': 'Send email',
  'pages.register.captcha.button.resend': 'Resend email',
  'pages.register.message.send-captcha.success': 'Verification email has been sent',
  'pages.register.message.send-captcha.error': 'Failed to send verification email',

  // OAuth
  'pages.oauth.title': 'Bind account',
  'pages.oauth.id.invalid': 'Invalid OAuth ID',
  'pages.oauth.github.subtitle': 'Bind your account with GitHub',

  // Reset password
  'pages.reset-password.title': 'Reset password',
  'pages.reset-password.verify.subtitle': 'Reset password - verify your E-mail address',
  'pages.reset-password.verify.verify': 'Verify',
  'pages.reset-password.reset.subtitle': 'Reset password',
  'pages.reset-password.reset.reset': 'Reset password',
  'pages.reset-password.reset.email.not-verified': 'E-mail address is not verified'
}

export default pages
