import { create } from "axios";
import { IUserProfile } from "src/modules/identity-access/domain/entities/user-profile.entity";
import { IUserProfilePersistence } from "../interfaces/i-user-profile.interface";
import { IUserPersistence } from "../interfaces/i-user-interface";
import { IUserEntity } from "src/modules/identity-access/domain/entities/user.entity";
import { userEntity } from "src/modules/identity-access/domain/entities/user.entity";
export class userMapping{
    public static ToEntities(
        userPersistence : IUserPersistence
    ) : userEntity{
        const userProfile : IUserEntity = {
            userId : userPersistence.userId.toString(),
            password : userPersistence.password,
            email : userPersistence.email,
            refreshToken : userPersistence.refreshToken,
            loginMethod : userPersistence.loginMethod,
            subId : userPersistence.subId,
            role : userPersistence.role,
            createdAt : userPersistence.createdAt ,
            updatedAt : userPersistence.updatedAt ,
            accountStatus : userPersistence.accountStatus ,
            userProfile : userPersistence.userProfile
        }       
        return userEntity.fromPersistence(userProfile);
    }

    public static ToPersistence(
        userEntity : IUserEntity
    ) : IUserPersistence{
        const userPersistence : IUserPersistence = {
           userId : userEntity.userId.toString(),
            password : userEntity.password,
            email : userEntity.email,
            refreshToken : userEntity.refreshToken,
            loginMethod : userEntity.loginMethod,
            subId : userEntity.subId,
            role : userEntity.role,
            createdAt : userEntity.createdAt ,
            updatedAt : userEntity.updatedAt ,
            accountStatus : userEntity.accountStatus ,
            userProfile : userEntity.userProfile
        }       
        return userEntity
    }
}