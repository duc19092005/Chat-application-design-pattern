import { UserRoleEnum } from "../../infrastructure/repositories/mongoDB/enums/user-role.enum";
import { accountStatusEnum } from "../../infrastructure/repositories/mongoDB/enums/account-status.enum";
import { loginMethodEnum } from "../../infrastructure/repositories/mongoDB/enums/login-method.enum";
import { userEntityValidate } from "../validations/user-entity.validate";

interface IUserEntity {
    userId: string;
    password: string;
    username : string;
    email: string;
    refreshToken: string;
    loginMethod: loginMethodEnum
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
    accountStatus: accountStatusEnum;
}
export class userEntity {

    private properties: IUserEntity;

    constructor(userId : string, username: string, email: string, password: string, role: UserRoleEnum, refreshToken: string, loginMethod: loginMethodEnum, createdAt: Date, updatedAt: Date, accountStatus: accountStatusEnum) {
        this.properties.userId = userId;
        if (!userEntityValidate.validateUserName(username)) {
            // Tạm thời throw Error, sau này có thể custom lỗi
            throw new Error("Username must be between 3 and 30 characters");
        }
        if (!userEntityValidate.validateEmail(email)) {
            // Tạm thời throw Error, sau này có thể custom lỗi
            throw new Error("Invalid email format");
        }
        if (!userEntityValidate.validatePassword(password)) {
            // Tạm thời throw Error, sau này có thể custom lỗi
            throw new Error("Password must be between 8 and 100 characters and must contain at least one uppercase and one lowercase letter");
        }
        if (!Object.values(UserRoleEnum).includes(role)) {
            throw new Error("Invalid user role");
        }
        if (!Object.values(loginMethodEnum).includes(loginMethod)) {
            throw new Error("Invalid login method");
        }
        if (!Object.values(accountStatusEnum).includes(accountStatus)) {
            throw new Error("Invalid account status");
        }
        this.properties.username = username;
        this.properties.email = email;
        this.properties.password = password;
        this.properties.role = role;
        this.properties.refreshToken = refreshToken;
        this.properties.loginMethod = loginMethod;
        this.properties.createdAt = createdAt;
        this.properties.updatedAt = updatedAt;
        this.properties.accountStatus = accountStatus;
    }
}