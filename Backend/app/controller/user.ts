/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */

/**
 * imports
 */
import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
import AccountUserRule from '../validator/accountUserRule'
import BindAccountRule from '../validator/BindAccountRule'
import EmailUserRule from '../validator/emailUserRule'
import type { User } from '../model/User'
import type { RegisterData, LoginData, OAuthBindData } from '../types'


/**
 * controller
 */
export default class UserController extends Controller {

  /**
   * Register user and create corresponding row in database.
   * @return {Promise<void>} - Result.
   */
  public async create(): Promise<void> {
    const { ctx } = this

    try {
      // validate
      this._validateUserInfo()

      // save into database
      const user = await ctx.service.user.createUser(ctx.request.body)

      ctx.success(200, 'message.register.success', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * Login user and save login status
   * @return {Promise<void>}
   */
  public async login(): Promise<void> {
    const { ctx } = this
    const data: LoginData = ctx.request.body

    try {
      ctx.helper.verifyCaptcha(data.captcha)
      const user = (await ctx.service.user.loginUser(data)).toJSON() as User

      const expiresIn = data.remember ? '30d' : '7d'

      // JWT
      const token = jwt.sign(user, this.config.keys, { expiresIn })

      ctx.success(200, 'message.login.success', { ...user, token })
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  public async isLoggedIn(): Promise<void> {
    const { ctx } = this

    const token = ctx.get('Authorization')

    try {
      const data = jwt.verify(token, this.config.keys)
      ctx.success(200, 'Logged in', data)
    } catch (err) {
      ctx.error(400, 'not logged in', err)
    }
  }


  public async bindAccount(): Promise<void> {
    const { ctx } = this

    try {
      // validate
      await this._validateOAuthBindInfo()

      // save into database
      const user = (await ctx.service.user.createFullUser(ctx.request.body)).toJSON() as User

      // Bind user to OAuth
      await ctx.service.oauth.updateOAuthUser(parseInt((ctx.request.body as OAuthBindData).oauthId), user.id)

      // JWT
      const token = jwt.sign(user, this.config.keys, { expiresIn: '7d' })

      ctx.success(200, 'message.oauth.bind.success', { ...user, token })
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * Helper functions
   */

  /**
   * Validate helper.
   * @private
   */
  private _validateUserInfo(): void {
    const { ctx } = this
    const data: RegisterData = ctx.request.body

    if ('username' in data) {
      ctx.validate(AccountUserRule, data)
      ctx.helper.verifyCaptcha(data.captcha)
    } else if ('email' in data) {
      ctx.validate(EmailUserRule, data)
      ctx.helper.verifyEmail(data.captcha)
    } else {
      throw new Error(`Register type is invalid`)
    }
  }

  private async _validateOAuthBindInfo(): Promise<void> {
    const { ctx } = this
    const data: OAuthBindData = ctx.request.body

    // OAuth
    try {
      await ctx.service.oauth.getOAuthById({
        id: parseInt(data.oauthId, 10),
        provider: data.provider
      })
    } catch (err) {
      throw new Error('message.oauth.invalid')
    }

    ctx.validate(BindAccountRule, data)
    ctx.helper.verifyEmail(data.captcha)
  }
}
