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
const privilegeRule_1 = tslib_1.__importDefault(require("../validator/privilegeRule"));
/**
 * controller
 */
class PrivilegesController extends egg_1.Controller {
    /**
     * @api {get} /api/v1/privileges Query privileges
     * @apiVersion 1.0.0
     * @apiName queryPrivileges
     * @apiGroup Privilege manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiQuery {string} [privilegeName] Privilege's name
     * @apiQuery {number} [parentId] Parent privilege's ID
     * @apiQuery {string} [requestMethod] `get | post | put | delete`
     * @apiQuery {number} [level] `1 | 2`
     * @apiQuery {string} [levelSorting] Whether `level` is sorted or not
     * <br>
     * One of `asc | desc`
     * @apiQuery {string} [current] Current page number
     * @apiQuery {string} [pageSize] The size of each page
     *
     * @apiDescription Query privileges by conditions provided.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {object} data `{ rows: Privilege[], count: number }`
     * <br>
     * Data and count for queried privileges
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     rows: // Privilege[],
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
     * @apiSampleRequest /api/v1/privileges
     */
    async getPrivilegesByQuery() {
        const { ctx } = this;
        try {
            const privileges = await ctx.service.privileges.getPrivilegesByQuery(ctx.query);
            ctx.success(200, 'success', privileges);
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
     * @api {get} /api/v1/privileges/:id Query privilege by ID
     * @apiVersion 1.0.0
     * @apiName queryPrivilegeById
     * @apiGroup Privilege manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Privilege's ID
     *
     * @apiDescription Query privilege by the ID provided.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Privilege} data The privilege found in the database
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     // Privilege
     *   }
     * }
     *
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) PrivilegeNotFound No privilege with the provided ID is found in the database
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 500,
     *   msg: "Privilege does not exist",
     *   data: {}
     * }
     *
     * @apiSampleRequest /api/v1/privileges/:id
     */
    async getPrivilegeById() {
        const { ctx } = this;
        try {
            const privilege = await ctx.service.privileges.getPrivilegeById(ctx.params.id);
            ctx.success(200, 'success', privilege);
        }
        catch (err) {
            ctx.error(500, err instanceof Error ? err.message : 'Error', err);
        }
    }
    /**
     * @api {post} /api/v1/privileges Create privilege
     * @apiVersion 1.0.0
     * @apiName createPrivilege
     * @apiGroup Privilege manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {string} privilegeName Privilege's name
     * @apiBody {string} privilegeDescription Privilege's description
     * @apiBody {number} level Privilege's level
     * <br>
     * One of `1 | 2`
     * @apiBody {string} [requestMethod] Request method
     * <br>
     * **Required** for `level 2` privilege
     * <br>
     * One of `get | post | put | delete`
     * @apiBody {string} [privilegeUrl] Privilege's request URL
     * <br>
     * **Required** for `level 2` privilege
     * @apiBody {number} parentId Parent privilege's ID
     * <br>
     * Should be `0` for `level 1` privilege
     *
     * @apiDescription Create a privilege.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Privilege has been added"
     * }
     *
     * @apiError (Error 400) PrivilegeNameExist Privilege's name already exists
     * @apiError (Error 400) PrivilegeDescriptionExist Privilege's description already exists
     * @apiError (Error 400) InvalidPrivilegeData Invalid privilege data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Privilege name already exists",
     *   data: {}
     * }
     */
    async createPrivilege() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            // validate
            ctx.validate(privilegeRule_1.default, data);
            // save into database
            await ctx.service.privileges.createPrivilege(data);
            ctx.success(200, 'message.privileges.add.success');
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
     * @api {put} /api/v1/privileges/:id Update privilege
     * @apiVersion 1.0.0
     * @apiName updatePrivilege
     * @apiGroup Privilege manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Privilege's ID
     *
     * @apiBody {string} privilegeName Privilege's name
     * @apiBody {string} privilegeDescription Privilege's description
     * @apiBody {number} level Privilege's level
     * <br>
     * One of `1 | 2`
     * @apiBody {string} requestMethod Request method
     * <br>
     * One of `get | post | put | delete` for `level 2` privilege
     * <br>
     * Should be `null` for `level 1` privilege
     * @apiBody {string} privilegeUrl Privilege's request URL
     * <br>
     * Should be `null` for `level 1` privilege
     * @apiBody {number} parentId Parent privilege's ID
     * <br>
     * Should be `0` for `level 1` privilege
     * @apiBody {boolean} [privilegeState] Whether the privilege is enabled
     *
     * @apiDescription Update a privilege.
     * <br>
     * Missing properties will remain as is.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Privilege} data Data of the updated privilege
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Privilege has been updated",
     *   data: {
     *     // Updated privilege
     *   }
     * }
     *
     * @apiError (Error 400) PrivilegeNameExist Privilege's name already exists
     * @apiError (Error 400) PrivilegeDescriptionExist Privilege's description already exists
     * @apiError (Error 400) InvalidPrivilegeData Invalid privilege data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Privilege's name already exists",
     *   data: {}
     * }
     */
    async updatePrivilege() {
        const { ctx } = this;
        const data = ctx.request.body;
        console.log(data);
        try {
            if (!('privilegeState' in data)) {
                // validate
                ctx.validate(privilegeRule_1.default, data);
            }
            // save into database
            const privilege = await ctx.service.privileges.updatePrivilege(ctx.params.id, data);
            ctx.success(200, 'message.privileges.privilege.updated', privilege);
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
     * @api {delete} /api/v1/privileges/:id Delete privilege
     * @apiVersion 1.0.0
     * @apiName deletePrivilege
     * @apiGroup Privilege manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id Privilege's ID
     *
     * @apiDescription Delete a privilege.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {Privilege} data Data of the deleted privilege
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Privilege has been deleted",
     *   data: {
     *     // Deleted privilege
     *   }
     * }
     *
     * @apiError (Error 400) PrivilegeNotFound No privilege with the provided ID is found in the database
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Privilege doesn't exist",
     *   data: {}
     * }
     */
    async deletePrivilege() {
        const { ctx } = this;
        try {
            const privilege = await ctx.service.privileges.deletePrivilege(ctx.params.id);
            ctx.success(200, 'message.privileges.privilege.deleted', privilege);
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
exports.default = PrivilegesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmlsZWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByaXZpbGVnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsZ0VBQWdFOzs7QUFHaEU7O0dBRUc7QUFDSCw2QkFBZ0M7QUFDaEMsdUZBQXNEO0FBSXREOztHQUVHO0FBQ0gsTUFBcUIsb0JBQXFCLFNBQVEsZ0JBQVU7SUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcURHO0lBQ0ksS0FBSyxDQUFDLG9CQUFvQjtRQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRXBCLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFzQyxDQUFDLENBQUE7WUFDaEgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQ3hDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO0lBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQ0c7SUFDSSxLQUFLLENBQUMsZ0JBQWdCO1FBQzNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFcEIsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9B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