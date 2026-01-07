import { loginMethodEnum } from "src/modules/identity-access/domain/enums/login-method.enum";
import { UserRoleEnum } from "src/modules/identity-access/domain/enums/user-role.enum";
import { accountStatusEnum } from "src/modules/identity-access/domain/enums/account-status.enum";
import { IUserProfile, userProfileEntity } from "src/modules/identity-access/domain/entities/user-profile.entity";

export interface ICreateUserPersistence
{
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