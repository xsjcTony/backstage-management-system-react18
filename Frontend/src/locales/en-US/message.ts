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
  'message.users.avatar.upload.error': 'Failed to upload avatar',
  'message.users.assign-roles.already-assigned': 'Role has already been assigned to user',
  'message.users.assign-roles.not-assigned': `Role has not assigned to user`,
  'message.users.assign-roles.success': 'Roles have been assigned',

  // Roles
  'message.roles.role.updated': 'Role has been updated',
  'message.roles.role.missing': `Role doesn't exist`,
  'message.roles.role.deleted': 'Role has been deleted',
  'message.roles.add.success': 'Role has been added',
  'message.roles.role-name.exist': 'Role name already exists',
  'message.roles.role-description.exist': 'Role description already exists',

  // Privileges
  'message.privileges.privilege-name.exist': 'Privilege name already exists',
  'message.privileges.privilege-description.exist': 'Privilege description already exists',
  'message.privileges.privilege.updated': 'Privilege has been updated',
  'message.privileges.privilege.deleted': 'Privilege has been deleted',
  'message.privileges.privilege.missing': `Privilege doesn't exist`
}

export default message
