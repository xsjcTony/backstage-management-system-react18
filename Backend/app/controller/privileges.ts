/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import PrivilegeRule from '../validator/privilegeRule'
import type { PrivilegeQueryData } from '../types'


/**
 * controller
 */
export default class PrivilegesController extends Controller {

  /**
   * Get privileges by query info (REST API - GET)
   * @return {Promise<void>}
   */
  public async getPrivilegesByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const privileges = await ctx.service.privileges.getPrivilegesByQuery(ctx.query as unknown as PrivilegeQueryData)
      ctx.success(200, 'success', privileges)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * Get privilege by ID (Primary key) (REST API - GET)
   */
  public async getPrivilegeById(): Promise<void> {
    const { ctx } = this

    try {
      const privilege = await ctx.service.privileges.getPrivilegeById(ctx.params.id)
      ctx.success(200, 'success', privilege)
    } catch (err) {

    }
  }


  /**
   * Add privilege to database (REST API - POST)
   * @return {Promise<void>}
   */
  public async createPrivilege(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(PrivilegeRule, data)

      // save into database
      await ctx.service.privileges.createPrivilege(data)

      ctx.success(200, 'message.privileges.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * Update privilege in database (REST API - PUT)
   * @return {Promise<void>}
   */
  public async updatePrivilege(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body
    console.log(data)

    try {
      if (!('privilegeState' in data)) {
        // validate
        ctx.validate(PrivilegeRule, data)
      }

      // save into database
      const privilege = await ctx.service.privileges.updatePrivilege(ctx.params.id, data)

      ctx.success(200, 'message.privileges.privilege.updated', privilege)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * Delete privilege in database (REST API - DELETE)
   * @return {Promise<void>}
   */
  public async deletePrivilege(): Promise<void> {
    const { ctx } = this

    try {
      const privilege = await ctx.service.privileges.deletePrivilege(ctx.params.id)
      ctx.success(200, 'message.privileges.privilege.deleted', privilege)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }
}
