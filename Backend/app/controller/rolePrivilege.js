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
class RolePrivilegeController extends egg_1.Controller {
    /**
     * @api {post} /api/v1/role-privilege Assign privileges
     * @apiVersion 1.0.0
     * @apiName assignPrivileges
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {number} roleId The role's ID to assign privileges to
     * @apiBody {number[]} privilegeIds Array of ID of privileges to be assigned
     *
     * @apiDescription Assign specified privileges to a role.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {number[]} data Array of IDs of assigned privileges
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Privileges have been assigned",
     *   data: [1, 2, // ...]
     * }
     *
     * @apiError (Error 400) PrivilegeAssigned Privilege has been assigned, cannot reassign
     * @apiError (Error 400) PrivilegeNotAssigned Privilege has not been assigned, cannot cancel
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 500,
     *   msg: "Internal server error",
     *   data: {}
     * }
     */
    async assignRolePrivileges() {
        const { ctx } = this;
        const roleId = ctx.request.body.roleId;
        const privilegeIds = ctx.request.body.privilegeIds;
        const transaction = await ctx.model.transaction();
        try {
            const assignedPrivilegeIds = (await ctx.service.rolePrivilege.findRolePrivileges({ roleId })).map(rolePrivilege => rolePrivilege.toJSON().privilegeId);
            // privileges' id need to be added and removed
            const addPrivilegeIds = privilegeIds.filter(privilegeId => !assignedPrivilegeIds.includes(privilegeId));
            const removePrivilegeIds = assignedPrivilegeIds.filter(privilegeId => !privilegeIds.includes(privilegeId));
            // assign roles
            for (const privilegeId of addPrivilegeIds) {
                // @ts-ignore
                await ctx.service.rolePrivilege.createRolePrivilege({ roleId, privilegeId }, { transaction });
            }
            // unassign roles
            for (const privilegeId of removePrivilegeIds) {
                await ctx.service.rolePrivilege.deleteRolePrivilege({ roleId, privilegeId }, { transaction });
            }
            await transaction.commit();
            ctx.success(200, 'message.roles.assign-privileges.success', privilegeIds);
        }
        catch (err) {
            await transaction.rollback();
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'Failed to assign privileges', err);
            }
        }
    }
}
exports.default = RolePrivilegeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZVByaXZpbGVnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGVQcml2aWxlZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsZ0VBQWdFO0FBQ2hFLHVEQUF1RDs7QUFHdkQ7O0dBRUc7QUFDSCw2QkFBZ0M7QUFLaEM7O0dBRUc7QUFDSCxNQUFxQix1QkFBd0IsU0FBUSxnQkFBVTtJQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUNHO0lBQ0ksS0FBSyxDQUFDLG9CQUFvQjtRQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLE1BQU0sTUFBTSxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUM5QyxNQUFNLFlBQVksR0FBYSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUE7UUFFNUQsTUFBTSxXQUFXLEdBQUcsTUFBTyxHQUFHLENBQUMsS0FBOEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUUzRSxJQUFJO1lBQ0YsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUUsYUFBYSxDQUFDLE1BQU0sRUFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUV6Syw4Q0FBOEM7WUFDOUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7WUFDdkcsTUFBTSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtZQUUxRyxlQUFlO1lBQ2YsS0FBSyxNQUFNLFdBQVcsSUFBSSxlQUFlLEVBQUU7Z0JBQ3pDLGFBQWE7Z0JBQ2IsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7YUFDOUY7WUFFRCxpQkFBaUI7WUFDakIsS0FBSyxNQUFNLFdBQVcsSUFBSSxrQkFBa0IsRUFBRTtnQkFDNUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7YUFDOUY7WUFFRCxNQUFNLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUUxQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSx5Q0FBeUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtTQUMxRTtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFNUIsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO2dCQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQ25EO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFoRkQsMENBZ0ZDIn0=