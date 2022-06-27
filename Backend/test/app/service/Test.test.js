"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const bootstrap_1 = require("egg-mock/bootstrap");
describe('test/app/service/Test.test.js', () => {
    let ctx;
    before(async () => {
        ctx = bootstrap_1.app.mockContext();
    });
    it('sayHi', async () => {
        const result = await ctx.service.test.sayHi('egg');
        (0, assert_1.default)(result === 'hi, egg');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBNkQ7QUFDN0QsdURBQXVEO0FBQ3ZELGdFQUFnRTs7O0FBRWhFLDREQUEyQjtBQUUzQixrREFBd0M7QUFHeEMsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLEdBQVksQ0FBQTtJQUVoQixNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDaEIsR0FBRyxHQUFHLGVBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN6QixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEQsSUFBQSxnQkFBTSxFQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=