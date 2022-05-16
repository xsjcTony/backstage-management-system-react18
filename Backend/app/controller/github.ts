/* eslint 'camelcase': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */

import { URLSearchParams } from 'node:url'
import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
import type { OAuthUserData } from '../types'


export default class GithubController extends Controller {

  /**
   * Get third-party login page
   * @return {Promise<void>}
   */
  public async getLoginView(): Promise<void> {
    const baseURL = 'https://github.com/login/oauth/authorize'
    const options = {
      client_id: 'f9c9bc30f7f29b46a30a',
      scope: 'user'
    }

    const url = `${baseURL}?${new URLSearchParams(options).toString()}`
    this.ctx.redirect(url)
  }


  public async getAccessToken(): Promise<void> {
    const { ctx } = this
    const code = ctx.query.code

    const baseURL = 'https://github.com/login/oauth/access_token'
    const options = {
      client_id: 'f9c9bc30f7f29b46a30a',
      client_secret: '37f38f5f231a0510cda6c65da08f88948caaa0dc',
      code
    }

    const res = await ctx.curl(baseURL, {
      method: 'POST',
      data: options,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    await this._getGithubUserInfo(res.data['access_token'] as string)
  }


  private async _getGithubUserInfo(accessToken: string): Promise<void> {
    const baseURL = 'https://api.github.com/user'
    const res = await this.ctx.curl(baseURL, {
      method: 'GET',
      dataType: 'json',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
      }
    })

    await this._goToAdmin({ ...res.data, provider: 'github' }, accessToken)
  }


  private async _goToAdmin(data: OAuthUserData, accessToken: string): Promise<void> {
    const { ctx } = this

    try {
      const oauth = await ctx.service.oauth.getOAuth(data)

      const user = oauth.user

      if (!user.userState) {
        await ctx.service.oauth.deleteOAuth(oauth.id)
        throw new Error('Account is closed, create a new account')
      }

      /**
       * User already exists -> login straight away
       */
      const token = jwt.sign(user.toJSON(), this.config.keys, { expiresIn: '7d' })

      ctx.cookies.set('token', token, {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 1 day,
        httpOnly: false,
        signed: false
      })

      ctx.redirect('http://127.0.0.1:3000/admin')
    } catch (err) {
      /**
       * User doesn't exist
       * 1. Save user's OAuth info (1 for temp userId)
       */
      const oauth = await ctx.service.oauth.createOAuth(accessToken, data.provider, data.id, 1)

      /**
       * 2. Bind username, e-mail and password (redirect to '/oauth/github')
       */
      const params = { oauthId: oauth.id.toString() }
      ctx.redirect(`http://127.0.0.1:3000/oauth/github?${new URLSearchParams(params).toString()}`)
    }
  }
}
