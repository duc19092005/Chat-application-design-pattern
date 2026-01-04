// Repository for identity and access management using MongoDB

import { IUserRepository } from "../../../domain/repositories/i-identity-access.repository";
import { IUserEntity, userEntity } from "../../../domain/entities/user.entity";
import { UserProfileModel } from "./schemas/user-profile.schema";
import { UserModel } from "./schemas/user.schema";
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUserProfile } from "src/modules/identity-access/domain/entities/user-profile.entity";
import { IUserProfilePersistence } from "./interfaces/i-user-profile.interface";
import { userProfileMapping } from "./mappings/user-profile.mapping";
import { userMapping } from "./mappings/user.mapping";
import { IUserPersistence } from "./interfaces/i-user-interface";
import { loginMethodEnum } from "src/modules/identity-access/domain/enums/login-method.enum";
import { UserRoleEnum } from "src/modules/identity-access/domain/enums/user-role.enum";
import { accountStatusEnum } from "src/modules/identity-access/domain/enums/account-status.enum";
import { userProfileEntity } from "src/modules/identity-access/domain/entities/user-profile.entity";
import type { IBcyptProvider } from "src/modules/identity-access/domain/interfaces/bcrypt-provider-interface";

export class identityAccessRepository implements IUserRepository {
    constructor(
        @Inject('IBcyptProvider')
        private readonly bcryptProvider: IBcyptProvider
    ){
        
    }
     // Tìm Không User bằng Id
    public async findUserById(userId: string): Promise<userEntity | null>{
        return null;
    }
    // Tìm kiếm người dùng bằng username và password
    public async findUserByUsernameAndPassword(username: string, password: string): Promise<userEntity>{
        // Truy Vấn database
        const findUser = await UserModel.findOne({
            username : username
        })

        if(!findUser || !findUser.password)
        {
            // Cái nầy mốt có thể custom lại
            throw new UnauthorizedException("Can't Find User")
        }

        const verifyPassword = await this.bcryptProvider.verifyPassword(password , findUser.password)

        if(!verifyPassword)
        {
            throw new UnauthorizedException("Can't Find User")
        }
        
        const userProfile = await this.findUserProfileByUserId(findUser.id)

        const userPersistence : IUserPersistence = {
            userId : findUser.id ,
            email : findUser.email ,
            refreshToken : findUser.refreshToken ?? undefined ,
            loginMethod : findUser.loginMethod as loginMethodEnum,
            subId : findUser.subId ?? undefined ,
            role : findUser.role as UserRoleEnum ,
            createdAt : findUser.createdAt ,
            updatedAt : findUser.updatedAt ,
            accountStatus : findUser.accountStatus as accountStatusEnum ,
            userProfile : userProfile.getUserProfile(),
        }

        return userMapping.ToEntities(userPersistence)
        // Convert And Return for user
    }

    public async findUserProfileByUserId(userId : string) : Promise<userProfileEntity>{
        const userProfile = await UserProfileModel.findOne({
            userId : userId
        })
        if(!userProfile)
        {
            throw new NotFoundException("Can't Not Find User Profile Information")
        }
        const userProfilePersistence : IUserProfilePersistence = userProfile as unknown as IUserProfilePersistence
        return userProfileMapping.ToEntities(userProfilePersistence)
    }
    // Tìm kiếm người dùng bằng email và subId từ nhà cung cấp OAuth2
    public async findUserByEmailAndSubId(email: string, subId: string): Promise<string | null>{
        return null
    }
}