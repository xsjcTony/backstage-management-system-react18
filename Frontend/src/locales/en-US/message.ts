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

  // Reset password
  'message.reset-password.verify.success': 'Verify Success',
  'message.reset-password.verify.email.invalid': `E-mail address isn't associated with an account`,
  'message.reset-password.reset.success': 'Successfully reset password, Please log in',

  // Permission
  'message.permission.denied': 'Permission denied',

  // Admin
  // Users
  'message.users.user.missing': `User doesn't exist`,
  'message.users.user.updated': 'User has been updated',
  'message.users.user.deleted': 'User has been deleted',
  'message.users.export.no-user': 'No users',
  'message.users.import.invalid': 'Invalid user data',
  'message.users.import.success': 'Users have been imported',
  'message.users.add.success': 'User has been added',
  'message.users.avatar.upload.success': 'Avatar has been uploaded',
  'message.users.avatar.upload.error': 'Failed to upload avatar'
}

export default message
