/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import MenuRule from '../validator/menuRule'
import type { MenuQueryData } from '../types'


/**
 * controller
 */
export default class MenusController extends Controller {

  /**
   * Get menus by query info (REST API - GET)
   */
  public async getMenusByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const menus = await ctx.service.menus.getMenusByQuery(ctx.query as unknown as MenuQueryData)
      ctx.success(200, 'success', menus)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * Get menu by ID (Primary key) (REST API - GET)
   */
  public async getMenuById(): Promise<void> {
    const { ctx } = this

    try {
      const menu = await ctx.service.menus.getMenuById(ctx.params.id)
      ctx.success(200, 'success', menu)
    } catch (err) {

    }
  }


  /**
   * Add menu to database (REST API - POST)
   * @return {Promise<void>}
   */
  public async createMenu(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(MenuRule, data)

      // save into database
      await ctx.service.menus.createMenu(data)

      ctx.success(200, 'message.menus.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * Update menu in database (REST API - PUT)
   */
  public async updateMenu(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body
    console.log(data)

    try {
      if (!('menuState' in data)) {
        // validate
        ctx.validate(MenuRule, data)
      }

      // save into database
      const menu = await ctx.service.menus.updateMenu(ctx.params.id, data)

      ctx.success(200, 'message.menus.menu.updated', menu)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * Delete menu in database (REST API - DELETE)
   * @return {Promise<void>}
   */
  public async deleteMenu(): Promise<void> {
    const { ctx } = this

    try {
      const menu = await ctx.service.menus.deleteMenu(ctx.params.id)
      ctx.success(200, 'message.menus.menu.deleted', menu)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }
}
