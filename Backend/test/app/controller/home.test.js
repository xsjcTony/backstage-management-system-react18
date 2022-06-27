"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const bootstrap_1 = require("egg-mock/bootstrap");
describe('test/app/controller/home.test.ts', () => {
    it('should GET /', async () => {
        const result = await bootstrap_1.app.httpRequest().get('/').expect(200);
        (0, assert_1.default)(result.text === 'hi, egg');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUEyQjtBQUMzQixrREFBd0M7QUFHeEMsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDM0QsSUFBQSxnQkFBTSxFQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9