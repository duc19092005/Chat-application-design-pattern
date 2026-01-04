// Repository for identity and access management using MongoDB

import { IUserRepository } from "../../../domain/repositories/i-identity-access.repository";
import { userEntity } from "../../../domain/entities/user.entity";
import { UserProfileModel } from "./schemas/user-profile.schema";
import { UserModel } from "./schemas/user.schema";
import { BCryptProvider } from "../provider/bcrypt-provider";
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUserProfile } from "src/modules/identity-access/domain/entities/user-profile.entity";
import { IUserProfilePersistence } from "./interfaces/i-user-profile.interface";
import { userProfileMapping } from "./mappings/user-profile.mapping";



export class identityAccessRepository implements IUserRepository {
     // Tìm Không User bằng Id
    public async findUserById(userId: string): Promise<userEntity | null>{
        return null;
    }
    // Tìm kiếm người dùng bằng username và password
    public async findUserByUsernameAndPassword(username: string, password: string): Promise<string | null>{
        // Truy Vấn database
        const findUser = await UserModel.findOne({
            username : username
        })

        if(!findUser || !findUser.password)
        {
            // Cái nầy mốt có thể custom lại
            throw new UnauthorizedException("Can't Find User")
        }


        const verifyPassword = BCryptProvider.verifyPassword(password , findUser.password)

        if(!verifyPassword)
        {
            throw new UnauthorizedException("Can't Find User")
        }
        console.log("ABC")
        return null
    }

    public async findUserProfileByUserId(userId : string) : Promise<IUserProfile>{
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