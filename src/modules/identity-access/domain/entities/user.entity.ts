import { UserRoleEnum } from "../enums/user-role.enum";
import { accountStatusEnum } from "../enums/account-status.enum";
import { loginMethodEnum } from "../enums/login-method.enum";
import { userProfileEntity , IUserProfile } from "./user-profile.entity";
import { ILoginResponseDto } from "../../application/dtos/login.dto";

export interface IUserCreateEntity {

}
export interface IUserEntity {
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
    userProfile : IUserProfile
}

export class userEntity {

    private properties: IUserEntity;
    private profile : userProfileEntity;

    // Static Factory Method

    private constructor(
        userEntity : IUserEntity
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
        this.profile = new userProfileEntity(userEntity.userProfile)
    }

    // Áp dụng dụng Entites này dùng để thêm xóa sửa luôn
    // Này là xem data
    
    public static fromPersistence(props: IUserEntity): userEntity {
        return new userEntity(props);
    }

    public toPersistence() :  any {
        const { userId, ...rest } = this.properties;

        return {
            ...(userId ? {_id : userId} : {}) ,
            ...rest,
            userProfile : this.properties.userProfile
        }
    }

    // Này là để thêm xóa sửa data
    // Thêm data allow 
    public static createNewUserRegularMethod(property :
        Omit<IUserEntity , 'userId' | 'createdAt' | 'updatedAt'>
    ) : userEntity{
        const entityProps : IUserEntity = {
            ... property ,
            userId : '' ,
            createdAt : new Date() ,
            updatedAt : new Date()
        }
        return new userEntity(entityProps)
    }




    public getuserInfo() : ILoginResponseDto {
        const p = this.profile; 
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