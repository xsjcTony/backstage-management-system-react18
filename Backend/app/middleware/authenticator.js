"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const canRequest = async (ctx, id) => {
    const requestMethod = ctx.method.toLowerCase();
    const requestUrl = ctx.url;
    const user = await ctx.service.users.getUserById(id.toString(10));
    let ownPrivileges = [];
    user.roles.forEach(role => void ownPrivileges.push(...role.privileges));
    ownPrivileges = ctx.helper.uniqueArray(ownPrivileges, 'id');
    return ownPrivileges.some(privilege => requestMethod === privilege.requestMethod
        && requestUrl.startsWith(privilege.privilegeUrl));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.default = (options, app) => async (ctx, next) => {
    const token = ctx.get('Authorization');
    try {
        const user = jwt.verify(token, app.config.keys);
        await canRequest(ctx, user.id)
            ? await next()
            : ctx.error(401, 'message.permission.denied');
    }
    catch (err) {
        ctx.error(401, 'message.permission.denied', err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQW1DO0FBT25DLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBVSxFQUFvQixFQUFFO0lBQ3RFLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDOUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUUxQixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakUsSUFBSSxhQUFhLEdBQWdCLEVBQUUsQ0FBQTtJQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQ3ZFLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFM0QsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ3BDLGFBQWEsS0FBSyxTQUFTLENBQUMsYUFBYTtXQUN0QyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FDakQsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELDhEQUE4RDtBQUM5RCxrQkFBZSxDQUFDLE9BQXNDLEVBQUUsR0FBZ0IsRUFBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFVLEVBQUUsRUFBRTtJQUNuSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRXRDLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBUyxDQUFBO1FBRXZELE1BQU0sVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRTtZQUNkLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFBO0tBQ2hEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSwyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUNqRDtBQUNILENBQUMsQ0FBQSJ9