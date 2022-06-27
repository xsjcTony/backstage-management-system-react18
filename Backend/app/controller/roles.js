"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * imports
 */
const egg_1 = require("egg");
const roleRule_1 = tslib_1.__importDefault(require("../validator/roleRule"));
/**
 * controller
 */
class RolesController extends egg_1.Controller {
    /**
     * @api {get} /api/v1/roles Query roles
     * @apiVersion 1.0.0
     * @apiName queryRoles
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiQuery {string} [roleName] Role's name
     * @apiQuery {string} [current] Current page number
     * @apiQuery {string} [pageSize] The size of each page
     *
     * @apiDescription Query roles by conditions provided.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {object} data `{ rows: Role[], count: number }`
     * <br>
     * Data and count for queried roles (with privileges and menus)
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     rows: // Role[],
     *     count: 3
     *   }
     * }
     *
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 401,
     *   msg: "Permission denied",
     *   data: {}
     * }
     *
     * @apiSampleRequest /api/v1/roles
     */
    async getRolesByQuery() {
        const { ctx } = this;
        try {
            const roles = await ctx.service.roles.getRolesByQuery(ctx.query);
            ctx.success(200, 'success', roles);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(500, err.message, err);
            }
            else {
                ctx.error(500, 'Error', err);
            }
        }
    }
    /**
     * @api {get} /api/v1/roles/:id Query role by ID
     * @apiVersion 1.0.0
     * @apiName queryRoleById
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Role's ID
     *
     * @apiDescription Query role by the ID provided.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Role} data The role found in the database (with privileges and menus)
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     // Role
     *   }
     * }
     *
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) RoleNotFound No role with the provided ID is found in the database
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 500,
     *   msg: "Role does not exist",
     *   data: {}
     * }
     *
     * @apiSampleRequest /api/v1/roles/:id
     */
    async getRoleById() {
        const { ctx } = this;
        try {
            const role = await ctx.service.roles.getRoleById(ctx.params.id);
            ctx.success(200, 'success', role);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(500, err.message, err);
            }
            else {
                ctx.error(500, 'Error', err);
            }
        }
    }
    /**
     * @api {post} /api/v1/roles Create role
     * @apiVersion 1.0.0
     * @apiName createRole
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {string} roleName Role's name
     * @apiBody {string} roleDescription Role's description
     *
     * @apiDescription Create a role.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Role has been added"
     * }
     *
     * @apiError (Error 400) RoleNameExist Role's name already exists
     * @apiError (Error 400) RoleDescriptionExist Role's description already exists
     * @apiError (Error 400) InvalidRoleData Invalid role data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Role name already exists",
     *   data: {}
     * }
     */
    async createRole() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            // validate
            ctx.validate(roleRule_1.default, data);
            // save into database
            await ctx.service.roles.createRole(data);
            ctx.success(200, 'message.roles.add.success');
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'Error', err);
            }
        }
    }
    /**
     * @api {delete} /api/v1/roles/:id Delete role
     * @apiVersion 1.0.0
     * @apiName deleteRole
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Role's ID
     *
     * @apiDescription Delete a role.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Role} data Data of the deleted role (with privileges and menus)
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Role has been deleted",
     *   data: {
     *     // Deleted role
     *   }
     * }
     *
     * @apiError (Error 400) RoleNotFound No role with the provided ID is found in the database
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Role doesn't exist",
     *   data: {}
     * }
     */
    async deleteRole() {
        const { ctx } = this;
        try {
            const role = await ctx.service.roles.deleteRole(ctx.params.id);
            ctx.success(200, 'message.roles.role.deleted', role);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'Error', err);
            }
        }
    }
    /**
     * @api {put} /api/v1/roles/:id Update role
     * @apiVersion 1.0.0
     * @apiName updateRole
     * @apiGroup Role manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Role's ID
     *
     * @apiBody {string} roleName Role's name
     * @apiBody {string} roleDescription Role's description
     * @apiBody {boolean} [roleState] Whether the role is enabled
     *
     * @apiDescription Update a role.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Role} data Data of the updated role (with privileges and menus)
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Role has been updated",
     *   data: {
     *     // Updated role
     *   }
     * }
     *
     * @apiError (Error 400) RoleNameExist Role's name already exists
     * @apiError (Error 400) RoleDescriptionExist Role's description already exists
     * @apiError (Error 400) InvalidRoleData Invalid role data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Role's name already exists",
     *   data: {}
     * }
     */
    async updateRole() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            if (!('roleState' in data)) {
                // validate
                ctx.validate(roleRule_1.default, data);
            }
            // save into database
            const role = await ctx.service.roles.updateRole(ctx.params.id, data);
            ctx.success(200, 'message.roles.role.updated', role);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'Error', err);
            }
        }
    }
}
exports.default = RolesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxnRUFBZ0U7OztBQUdoRTs7R0FFRztBQUNILDZCQUFnQztBQUNoQyw2RUFBNEM7QUFJNUM7O0dBRUc7QUFDSCxNQUFxQixlQUFnQixTQUFRLGdCQUFVO0lBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStDRztJQUNJLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFcEIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFpQyxDQUFDLENBQUE7WUFDNUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ25DO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO0lBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQ0c7SUFDSSxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRXBCLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcs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