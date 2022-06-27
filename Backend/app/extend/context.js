"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    success(code = 200, msg = 'success', data = {}) {
        this.status = 200;
        this.body = {
            code,
            msg,
            data
        };
    },
    error(code = 500, msg = 'error', data = {}) {
        this.status = 200;
        this.body = {
            code,
            msg,
            data
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLE9BQU8sQ0FBZ0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxNQUFlLFNBQVMsRUFBRSxPQUFnQixFQUFFO1FBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixJQUFJO1lBQ0osR0FBRztZQUNILElBQUk7U0FDTCxDQUFBO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBZ0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxNQUFlLE9BQU8sRUFBRSxPQUFnQixFQUFFO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixJQUFJO1lBQ0osR0FBRztZQUNILElBQUk7U0FDTCxDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUEifQ==