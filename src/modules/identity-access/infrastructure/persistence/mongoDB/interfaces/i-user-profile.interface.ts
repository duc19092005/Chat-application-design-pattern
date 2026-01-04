import { profileCompletionEnum } from "src/modules/identity-access/domain/enums/account-completion.enum"

export interface IUserProfilePersistence{
    userId : string,
    username : string,
    userAvatar : string,
    bio? : string ,
    phoneNumber? : string ,
    address? : string,
    dateOfBirth? : Date,
    createdAt : Date ,
    updatedAt : Date ,
    profileStatus : {
        profileCompletionStatus : profileCompletionEnum ,
        completedPercentage : number,
        uncompletedFields : string[] ,
        completedFields : string []
    }
}