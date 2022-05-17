/* eslint '@typescript-eslint/unbound-method': 'off' */

import type { Application } from 'egg'


export default (app: Application): void => {
  const { controller, router } = app

  /**
   * Normal
   */
  router.post('/register', controller.user.create)
  router.post('/login', controller.user.login)
  router.get('/is-logged-in', controller.user.isLoggedIn)


  /**
   * OAuth - GitHub
   */
  router.get('/github', controller.github.getLoginView)
  router.get('/github/callback', controller.github.getAccessToken)


  /**
   * OAuth - bind account
   */
  router.post('/oauth/bind', controller.user.bindAccount)


  /**
   * Reset password
   */
  router.post('/reset-password/verify-email', controller.user.verifyEmail)
  router.put('/reset-password/reset', controller.user.resetPassword)
}
