"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * imports
 */
const egg_1 = require("egg");
/**
 * controller
 */
class UserRoleController extends egg_1.Controller {
    /**
     * @api {post} /api/v1/user-role Assign roles
     * @apiVersion 1.0.0
     * @apiName assignRoles
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {number} userId The user's ID to assign roles to
     * @apiBody {number[]} roleIds Array of ID of roles to be assigned
     *
     * @apiDescription Assign specified roles to a user.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {number[]} data Array of IDs of assigned roles
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Roles have been assigned",
     *   data: [1, 2, // ...]
     * }
     *
     * @apiError (Error 400) RoleAssigned Role has been assigned, cannot reassign
     * @apiError (Error 400) RoleNotAssigned Role has not been assigned, cannot cancel
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 500,
     *   msg: "Internal server error",
     *   data: {}
     * }
     */
    async assignUserRoles() {
        const { ctx } = this;
        const userId = ctx.request.body.userId;
        const roleIds = ctx.request.body.roleIds;
        const transaction = await ctx.model.transaction();
        try {
            const assignedRoleIds = (await ctx.service.userRole.findUserRoles({ userId })).map(userRole => userRole.toJSON().roleId);
            // roles' id need to be added and removed
            const addRoleIds = roleIds.filter(roleId => !assignedRoleIds.includes(roleId));
            const removeRoleIds = assignedRoleIds.filter(roleId => !roleIds.includes(roleId));
            // assign roles
            for (const roleId of addRoleIds) {
                // @ts-ignore
                await ctx.service.userRole.createUserRole({ userId, roleId }, { transaction });
            }
            // unassign roles
            for (const roleId of removeRoleIds) {
                await ctx.service.userRole.deleteUserRole({ userId, roleId }, { transaction });
            }
            await transaction.commit();
            ctx.success(200, 'message.users.assign-roles.success', roleIds);
        }
        catch (err) {
            await transaction.rollback();
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'Failed to assign roles', err);
            }
        }
    }
}
exports.default = UserRoleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxnRUFBZ0U7QUFDaEUsdURBQXVEOztBQUd2RDs7R0FFRztBQUNILDZCQUFnQztBQUtoQzs7R0FFRztBQUNILE1BQXFCLGtCQUFtQixTQUFRLGdCQUFVO0lBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Q0c7SUFDSSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLE1BQU0sTUFBTSxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUM5QyxNQUFNLE9BQU8sR0FBYSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFFbEQsTUFBTSxXQUFXLEdBQUcsTUFBTyxHQUFHLENBQUMsS0FBOEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUUzRSxJQUFJO1lBQ0YsTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBRSxRQUFRLENBQUMsTUFBTSxFQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFdEkseUNBQXlDO1lBQ3pDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUM5RSxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFFakYsZUFBZTtZQUNmLEtBQUssTUFBTSxNQUFNLElBQUksVUFBVSxFQUFFO2dCQUMvQixhQUFhO2dCQUNiLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTthQUMvRTtZQUVELGlCQUFpQjtZQUNqQixLQUFLLE1BQU0sTUFBTSxJQUFJLGFBQWEsRUFBRTtnQkFDbEMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO2FBQy9FO1lBRUQsTUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUE7WUFFMUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsb0NBQW9DLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDaEU7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBRTVCLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLENBQUMsQ0FBQTthQUM5QztTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBaEZELHFDQWdGQyJ9