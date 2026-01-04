import { UserRoleEnum } from "../enums/user-role.enum";
import { accountStatusEnum } from "../enums/account-status.enum";
import { loginMethodEnum } from "../enums/login-method.enum";
import { userProfileEntity , IUserProfile } from "./user-profile.entity";
import { ILoginResponseDto } from "../../application/dtos/login.dto";

interface IUserEntity {
    userId: string;
    password?: string;
    email: string;
    refreshToken?: string;
    loginMethod: loginMethodEnum ,
    subId? : string
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
    accountStatus: accountStatusEnum;
    userProfile : userProfileEntity
}
export class userEntity {

    private properties: IUserEntity;

    constructor(userEntity : IUserEntity
    ) {
        // if (!userEntityValidate.validateUserName(username)) {
        //     // Tạm thời throw Error, sau này có thể custom lỗi
        //     throw new Error("Username must be between 3 and 30 characters");
        // }
        // if (!userEntityValidate.validateEmail(email)) {
        //     // Tạm thời throw Error, sau này có thể custom lỗi
        //     throw new Error("Invalid email format");
        // }
        // if (!userEntityValidate.validatePassword(password)) {
        //     // Tạm thời throw Error, sau này có thể custom lỗi
        //     throw new Error("Password must be between 8 and 100 characters and must contain at least one uppercase and one lowercase letter");
        // }
        if (!Object.values(UserRoleEnum).includes(userEntity.role)) {
            throw new Error("Invalid user role");
        }
        if (!Object.values(loginMethodEnum).includes(userEntity.loginMethod)) {
            throw new Error("Invalid login method");
        }
        if (!Object.values(accountStatusEnum).includes(userEntity.accountStatus)) {
            throw new Error("Invalid account status");
        }
        this.properties = userEntity
    }

    public getprofile(): userProfileEntity {
        return this.properties.userProfile;
    }

    public getuserInfo() : ILoginResponseDto {
        const p = this.getprofile(); 
        const status = p.getProfileStatus(); 

        return {
            userId: this.properties.userId,
            email: this.properties.email,
            role: this.properties.role,
            joinedAt: this.properties.createdAt,
            lastPasswordUpdated: this.properties.updatedAt || null,
            
            personalInfo: {
                username: p.getUsername(),
                avatar: p.getUserAvatar(),
                lastProfileUpdate: p.getUpdateAt(),
                completion: {
                    uncompleteFields : status.uncompletedFields,
                    percentage: status.completedPercentage,
                    status: status.profileCompletionStatus
                }
            }
        };
    }
}