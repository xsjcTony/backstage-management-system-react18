/**
 * Server returned message
 */
const message: Record<string, string> = {
  // Register & Login
  'message.captcha.expired': 'Captcha has expired. Re-try the new one',
  'message.captcha.incorrect': 'Incorrect Captcha, Re-try the new one',
  'message.verification-code.expired': 'Code has expired. Click to send another verification email',
  'message.verification-code.incorrect': 'Incorrect verification code',
  'message.register.username.exist': 'Username already exists',
  'message.register.email.exist': 'E-mail address already exists',
  'message.register.success': 'Successfully registered. Please login',
  'message.login.success': 'Successfully logged in',
  'message.login.wrong-username': 'Invalid username or password',
  'message.login.wrong-email': 'Invalid e-mail address or password',

  // OAuth
  'message.oauth.bind.success': 'Successfully bound account',
  'message.oauth.invalid': 'Invalid OAuth ID',

  // Permission
  'message.permission.denied': 'Permission denied'
}

export default message
