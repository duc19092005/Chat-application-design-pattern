import { create } from "axios";
import { IUserProfile } from "src/modules/identity-access/domain/entities/user-profile.entity";
import { IUserProfilePersistence } from "../interfaces/i-user-profile.interface";

export class userProfileMapping{
    public static ToEntities(
        userProfilePersistence : IUserProfilePersistence
    ) : IUserProfile{
        const userProfile : IUserProfile= {
            userId : userProfilePersistence.userId.toString(),
            username : userProfilePersistence.username,
            userAvatar : userProfilePersistence.userAvatar,
            bio: userProfilePersistence.bio ?? undefined,
            phoneNumber: userProfilePersistence.phoneNumber ?? undefined ,
            address : userProfilePersistence.address ?? undefined ,
            dateOfBirth : userProfilePersistence.dateOfBirth  ?? undefined,
            createdAt : userProfilePersistence.createdAt ,
            updatedAt : userProfilePersistence.updatedAt,
            profileStatus: {
                profileCompletionStatus: userProfilePersistence.profileStatus.profileCompletionStatus,
                completedPercentage: userProfilePersistence.profileStatus.completedPercentage,
                uncompletedFields: userProfilePersistence.profileStatus.uncompletedFields || [],
                completedFields: userProfilePersistence.profileStatus.completedFields || []
            }
        }       
        return userProfile
    }

    public static ToPersistence(
        userProfile : IUserProfile
    ) : IUserProfilePersistence{
        const userProfilePersistence : IUserProfilePersistence = {
            userId : userProfile.userId,
            username : userProfile.username,
            userAvatar : userProfile.userAvatar,
            bio: userProfile.bio,
            phoneNumber: userProfile.phoneNumber ,
            address : userProfile.address ,
            dateOfBirth : userProfile.dateOfBirth ,
            createdAt : userProfile.createdAt ,
            updatedAt : userProfile.createdAt,
            profileStatus : userProfile.profileStatus

        }       
        return userProfile
    }
}