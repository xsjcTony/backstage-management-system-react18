"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Oauth_1 = require("./Oauth");
const Role_1 = require("./Role");
const UserRole_1 = require("./UserRole");
const { INTEGER, STRING, BOOLEAN } = sequelize_typescript_1.DataType;
let User = class User extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^[A-Za-z0-9]{6,20}$/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(true),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(BOOLEAN),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "github", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(BOOLEAN),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "userState", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)('/public/assets/images/avatars/avatar.jpg'),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Oauth_1.Oauth),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "oauths", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Role_1.Role, () => UserRole_1.UserRole),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'User'
    })
], User);
exports.User = User;
exports.default = () => User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNFQUFzRTtBQUN0RSw2REFBNkQ7QUFDN0QsMkRBQTJEO0FBQzNELGdFQUFnRTs7OztBQUVoRSwrREFlNkI7QUFDN0IsbUNBQStCO0FBQy9CLGlDQUE2QjtBQUM3Qix5Q0FBcUM7QUFHckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsK0JBQVEsQ0FBQTtBQUs3QyxJQUFhLElBQUksR0FBakIsTUFBYSxJQUFLLFNBQVEsNEJBQVc7Q0FxRHBDLENBQUE7QUFoREM7SUFIQyxpQ0FBVTtJQUNWLG9DQUFhO0lBQ2IsSUFBQSw2QkFBTSxFQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O2dDQUNQO0FBTWxCO0lBSkMsSUFBQSxnQ0FBUyxFQUFDLElBQUksQ0FBQztJQUNmLElBQUEsNkJBQU0sRUFBQyxJQUFJLENBQUM7SUFDWixJQUFBLHlCQUFFLEVBQUMscUJBQXFCLENBQUM7SUFDekIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7c0NBQ1M7QUFNeEI7SUFKQyxJQUFBLGdDQUFTLEVBQUMsSUFBSSxDQUFDO0lBQ2YsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQztJQUNaLDhCQUFPO0lBQ1AsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7bUNBQ007QUFLckI7SUFIQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxLQUFLLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsTUFBTSxDQUFDOztzQ0FDUztBQU14QjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsOEJBQU8sRUFBQyxLQUFLLENBQUM7SUFDZCxJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDOztvQ0FDTztBQU12QjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsOEJBQU8sRUFBQyxJQUFJLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDOzt1Q0FDVTtBQU0xQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxJQUFJLENBQUM7SUFDZixJQUFBLDZCQUFNLEVBQUMsS0FBSyxDQUFDO0lBQ2IsSUFBQSw4QkFBTyxFQUFDLDBDQUEwQyxDQUFDO0lBQ25ELElBQUEsNkJBQU0sRUFBQyxNQUFNLENBQUM7O3VDQUNVO0FBR3pCO0lBREMsSUFBQSw4QkFBTyxFQUFDLEdBQUcsRUFBRSxDQUFDLGFBQUssQ0FBQzs7b0NBQ0U7QUFHdkI7SUFEQyxJQUFBLG9DQUFhLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLG1CQUFRLENBQUM7O21DQUNNO0FBR2hEO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTt1Q0FBQTtBQUd2QjtJQURDLGdDQUFTO3NDQUNTLElBQUk7dUNBQUE7QUFwRFosSUFBSTtJQUhoQixJQUFBLDRCQUFLLEVBQUM7UUFDTCxTQUFTLEVBQUUsTUFBTTtLQUNsQixDQUFDO0dBQ1csSUFBSSxDQXFEaEI7QUFyRFksb0JBQUk7QUF1RGpCLGtCQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQSJ9