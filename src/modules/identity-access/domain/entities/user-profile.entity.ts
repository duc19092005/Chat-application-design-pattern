import mongoose from "mongoose";
import { accountStatusEnum } from "../enums/account-status.enum";
import { profileCompletionEnum } from "../enums/account-completion.enum";
import { convertEnumToArray } from "src/shared/ultis/convert-enum.ulti";

export interface IUserProfile{
    userId : string,
    username : string;
    userAvatar : string;
    bio? : string;
    phoneNumber? : string;
    address? : string;
    dateOfBirth? : Date;
    createdAt : Date;
    updatedAt : Date;
    profileStatus : {
        profileCompletionStatus : profileCompletionEnum ,
        completedPercentage : number,
        uncompletedFields : string[] ,
        completedFields : string []
    }
}

export class userProfileEntity {
    private props: IUserProfile;   
    constructor(props: IUserProfile) {
        this.props = props;
        this.refreshProfileStatus()
    }
    public getUsername() : string {
        return this.props.username;
    }
    public getUserAvatar() : string {
        return this.props.userAvatar;
    }
    public getBio() : string | undefined {
        return this.props.bio;
    }   
    public getPhoneNumber() : string | undefined {
        return this.props.phoneNumber;
    }
    public getAddress() : string | undefined {
        return this.props.address;
    }   
    public getDateOfBirth() : Date | undefined {
        return this.props.dateOfBirth;
    }
    public getUpdateAt(){
        return this.props.updatedAt
    }
    public getProfileStatus() : {
        profileCompletionStatus : profileCompletionEnum ,
        completedPercentage : number,
        uncompletedFields : string[]
    } {
        return this.props.profileStatus;
    }
    public getCreatedAt() : Date {
        return this.props.createdAt;
    }

    public updateProfile(data: any) {
        for (const key in data) {
            if (key in this.props && key !== 'createdAt' && key !== 'profileStatus') {
                this.props[key] = data[key];
            }
        }

        this.props.updatedAt = new Date();

        this.refreshProfileStatus();
    }
    
    private refreshProfileStatus() {
        const requiredFields = ['bio', 'phoneNumber', 'address', 'dateOfBirth'];
        const completedFields = requiredFields.filter(field => this.props[field])
        const uncompletedFields = requiredFields.filter(field => !this.props[field]);
        const completedPercentage = ((requiredFields.length - uncompletedFields.length) / requiredFields.length) * 100;

        this.props.profileStatus.completedPercentage = completedPercentage
        this.props.profileStatus.uncompletedFields = uncompletedFields
        this.props.profileStatus.completedFields = completedFields
        if(completedPercentage == 1)
        {
            this.props.profileStatus.profileCompletionStatus = profileCompletionEnum.Complete
        }else{
            this.props.profileStatus.profileCompletionStatus = profileCompletionEnum.Incomplete
        }
    }
}