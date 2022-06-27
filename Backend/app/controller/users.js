"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * imports
 */
const fs = tslib_1.__importStar(require("node:fs/promises"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const egg_1 = require("egg");
const node_xlsx_1 = tslib_1.__importDefault(require("node-xlsx"));
const addUserRule_1 = tslib_1.__importDefault(require("../validator/addUserRule"));
const editUserRule_1 = tslib_1.__importDefault(require("../validator/editUserRule"));
/**
 * controller
 */
class UsersController extends egg_1.Controller {
    /**
     * @api {get} /api/v1/users Query users
     * @apiVersion 1.0.0
     * @apiName queryUsers
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiQuery {string} [username] Username
     * @apiQuery {string} [email] E-mail address
     * @apiQuery {string} [current] Current page number
     * @apiQuery {string} [pageSize] The size of each page
     *
     * @apiDescription Query users by conditions provided.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {object} data `{ rows: User[], count: number }` <br> Data and count for queried users (with roles)
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     rows: // User[],
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
     * @apiSampleRequest /api/v1/users
     */
    async getUsersByQuery() {
        const { ctx } = this;
        try {
            const users = await ctx.service.users.getUsersByQuery(ctx.query);
            ctx.success(200, 'success', users);
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
     * @api {post} /api/v1/users Create user
     * @apiVersion 1.0.0
     * @apiName createUser
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {string} [username] Username
     * @apiBody {string} [email] E-mail address. Is optional when importing user
     * @apiBody {string} password Password
     * @apiBody {boolean} [userState] Whether the account is enabled <br> Can also be a `number`, `1` means `true`, `0` means `false`
     * @apiBody {boolean} [github] Whether the account is associated to GitHub OAuth <br> Can also be a `number`, `1` means `true`, `0` means `false`
     * @apiBody {string} [avatarUrl] User's avatar's path
     *
     * @apiDescription Create a user.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "User has been added"
     * }
     *
     * @apiError (Error 400) UsernameExist Username already exists
     * @apiError (Error 400) EmailExist E-mail address already exists
     * @apiError (Error 400) InvalidUserData Invalid user data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Username already exists",
     *   data: {}
     * }
     */
    async createUser() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            // validate
            ctx.validate(addUserRule_1.default, data);
            // save into database
            await ctx.service.users.createUser(data);
            ctx.success(200, 'message.users.add.success');
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
     * @api {delete} /api/v1/users/:id Delete user
     * @apiVersion 1.0.0
     * @apiName deleteUser
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id User's ID
     *
     * @apiDescription Delete a user.
     * Will also delete the user's avatar image.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Data of the deleted user (with roles)
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "User has been deleted",
     *   data: {
     *     // User
     *   }
     * }
     *
     * @apiError (Error 400) UserNotFound No user with the provided ID is found in the database
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "User doesn't exist",
     *   data: {}
     * }
     */
    async deleteUser() {
        const { ctx } = this;
        try {
            const user = await ctx.service.users.deleteUser(ctx.params.id);
            ctx.success(200, 'message.users.user.deleted', user);
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
     * @api {put} /api/v1/users/:id Update user
     * @apiVersion 1.0.0
     * @apiName updateUser
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id User's ID
     *
     * @apiBody {string} [username] Username
     * @apiBody {string} email E-mail address
     * @apiBody {string} [password] Password
     * @apiBody {boolean} [userState] Whether the account is enabled
     *
     * @apiDescription Update a user.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Data of the updated user (with roles and privileges)
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "User has been updated",
     *   data: {
     *     // Updated user
     *   }
     * }
     *
     * @apiError (Error 400) UsernameExist Username already exists
     * @apiError (Error 400) EmailExist E-mail address already exists
     * @apiError (Error 400) InvalidUserData Invalid user data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Username already exists",
     *   data: {}
     * }
     */
    async updateUser() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            if (!('userState' in data)) {
                // validate
                ctx.validate(editUserRule_1.default, data);
            }
            // save into database
            const user = await ctx.service.users.updateUser(ctx.params.id, data);
            ctx.success(200, 'message.users.user.updated', user);
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
     * @api {get} /api/v1/users/:id Query user by ID
     * @apiVersion 1.0.0
     * @apiName queryUserById
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiParam {string} id User's ID
     *
     * @apiDescription Query user by ID provided.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data The user found in the database (with roles, privileges and menus)
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "success",
     *   data: {
     *     // User
     *   }
     * }
     *
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) UserNotFound No user with the provided ID is found in the database
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 500,
     *   msg: "User does not exist",
     *   data: {}
     * }
     *
     * @apiSampleRequest /api/v1/users/:id
     */
    async getUserById() {
        const { ctx } = this;
        try {
            const user = await ctx.service.users.getUserById(ctx.params.id);
            ctx.success(200, 'success', user);
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
     * @api {post} /api/v1/upload-user-avatar Upload avatar
     * @apiVersion 1.0.0
     * @apiName uploadAvatar
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {File} file The avatar image file to be uploaded <br> Image format is limited to `.png` and `.jpg`
     *
     * @apiDescription Upload user's avatar image file.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {string} data The file path of the uploaded avatar
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Avatar has been uploaded",
     *   data: "/public/assets/..."
     * }
     *
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 500,
     *   msg: "Failed to upload avatar",
     *   data: {}
     * }
     */
    async uploadAvatar() {
        const { ctx } = this;
        const avatar = ctx.request.files[0];
        const fileName = ctx.helper.encryptByMd5(`${avatar.filename}${Date.now()}`) + node_path_1.default.extname(avatar.filename);
        const filePath = node_path_1.default.join('/public/assets/images/avatars', fileName)
            .replace(/\\/g, '/');
        const absoluteFilePath = node_path_1.default.join(this.config.baseDir, 'app', filePath);
        // copy file
        try {
            const avatarContent = await fs.readFile(avatar.filepath);
            await fs.writeFile(absoluteFilePath, avatarContent);
        }
        catch (err) {
            ctx.error(500, 'message.users.avatar.upload.error', err);
        }
        finally {
            void ctx.cleanupRequestFiles(); // clear temp file
        }
        ctx.success(200, 'message.users.avatar.upload.success', filePath);
    }
    /**
     * @api {post} /api/v1/import-users Import users
     * @apiVersion 1.0.0
     * @apiName importUsers
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {File} file The Excel sheet (`.xlsx`) contain users' data
     *
     * @apiDescription Import users by Excel sheet.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "Users have been imported",
     * }
     *
     * @apiError (Error 400) InvalidUserData Invalid user data
     * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
     * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
     * @apiError (Error 500) UsernameExist Username already exists
     * @apiError (Error 500) EmailExist E-mail address already exists
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 400,
     *   msg: "Invalid user data",
     *   data: {}
     * }
     */
    async importUsers() {
        const { ctx } = this;
        let users;
        try {
            users = ctx.helper.excelToUsers(ctx.request.files[0]);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
            void ctx.cleanupRequestFiles();
            return;
        }
        finally {
            void ctx.cleanupRequestFiles();
        }
        const transaction = await ctx.model.transaction();
        try {
            for (const user of users) {
                // @ts-ignore
                await ctx.service.users.createUser(user, { transaction });
            }
            await transaction.commit();
            ctx.success(200, 'message.users.import.success');
        }
        catch (err) {
            await transaction.rollback();
            if (err instanceof Error) {
                ctx.error(500, err.message, err);
            }
            else {
                ctx.error(500, 'error', err);
            }
        }
        finally {
            void ctx.cleanupRequestFiles();
        }
    }
    /**
     * @api {get} /api/v1/export-all-users Export all users
     * @apiVersion 1.0.0
     * @apiName exportAllUsers
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiDescription Export all users to an Excel (`.xlsx`) file.
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {Blob} blob A blob to be downloaded
     *
     * @apiSuccessExample {Blob} Success response (example)
     * Blob file: users.xlsx
     *
     * @apiSampleRequest /api/v1/export-all-users
     */
    async exportAllUsers() {
        const { ctx } = this;
        const users = (await ctx.service.users.getAllUsers()).map(user => user.toJSON());
        if (users.length === 0) {
            ctx.error(500, 'message.users.export.no-user');
            return;
        }
        const keys = Object.keys(users[0]);
        const data = [keys];
        users.forEach(user => void data.push(ctx.helper.userToExcel(user)));
        const buffer = node_xlsx_1.default.build([{
                name: 'Users',
                data,
                options: {}
            }]);
        ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        ctx.attachment('users.xlsx');
        ctx.body = buffer;
    }
    /**
     * @api {post} /api/v1/delete-temp-avatars Delete avatars
     * @apiVersion 1.0.0
     * @apiName deleteAvatars
     * @apiGroup User manager
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiBody {string[]} avatarUrls Array of path of avatars to be deleted
     *
     * @apiDescription Delete specified avatar image files.
     * <br>
     * Should be used when uploading avatars to delete unnecessary files.
     * <br>
     * User's JWT Token must be provided to pass the authentication.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiSuccessExample {json} Success response (example)
     * {
     *   code: 200,
     *   msg: "success"
     * }
     *
     * @apiError (Error 500) InternalServerError Internal server error
     *
     * @apiErrorExample {json} Error response (example)
     * {
     *   code: 500,
     *   msg: "Internal server error",
     *   data: {}
     * }
     */
    async deleteTempAvatars() {
        const { ctx } = this;
        const avatarUrls = ctx.request.body
            .filter(avatarUrl => !avatarUrl.endsWith('avatar.jpg'));
        for (const avatarUrl of avatarUrls) {
            try {
                const avatarPath = node_path_1.default.join(this.config.baseDir, 'app', avatarUrl);
                await ctx.helper.removeFile(avatarPath);
            }
            catch (err) {
                ctx.error(500, err instanceof Error ? err.message : 'error', err);
            }
        }
        ctx.success(200, 'success');
    }
}
exports.default = UsersController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxnRUFBZ0U7QUFDaEUsdURBQXVEOzs7QUFHdkQ7O0dBRUc7QUFDSCw2REFBc0M7QUFDdEMsa0VBQTRCO0FBQzVCLDZCQUFnQztBQUNoQyxrRUFBNEI7QUFDNUIsbUZBQWtEO0FBQ2xELHFGQUFvRDtBQU1wRDs7R0FFRztBQUNILE1BQXFCLGVBQWdCLFNBQVEsZ0JBQVU7SUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZDRztJQUNJLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFcEIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFpQyxDQUFDLENBQUE7WUFDNUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ25DO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDakM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO0lBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQ0c7SUFDSSxLQUFLLENBQUMsVUFBVTtRQUNyQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLE1B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