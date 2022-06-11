/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import type { RoleMenu } from '../model/RoleMenu'
import type { Sequelize } from 'sequelize'


/**
 * controller
 */
export default class RoleMenuController extends Controller {

  /**
   * Assign menus to a role (REST API - POST)
   * @return {Promise<void>}
   */
  public async assignRoleMenus(): Promise<void> {
    const { ctx } = this
    const roleId: number = ctx.request.body.roleId
    const menuIds: number[] = ctx.request.body.menuIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedMenuIds = (await ctx.service.roleMenu.findRoleMenus({ roleId })).map(roleMenu => (roleMenu.toJSON() as RoleMenu).menuId)

      // menus' id need to be added and removed
      const addMenuIds = menuIds.filter(menuId => !assignedMenuIds.includes(menuId))
      const removeMenuIds = assignedMenuIds.filter(menuId => !menuIds.includes(menuId))

      // assign menus
      for (const menuId of addMenuIds) {
        // @ts-ignore
        await ctx.service.roleMenu.createRoleMenu({ roleId, menuId }, { transaction })
      }

      // unassign menus
      for (const menuId of removeMenuIds) {
        await ctx.service.roleMenu.deleteRoleMenu({ roleId, menuId }, { transaction })
      }

      await transaction.commit()

      ctx.success(200, 'message.roles.assign-menus.success', menuIds)
    } catch (err) {
      await transaction.rollback()

      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Failed to assign menus', err)
      }
    }
  }
}
