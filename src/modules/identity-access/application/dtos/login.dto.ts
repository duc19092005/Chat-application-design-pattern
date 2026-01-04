import { IsEmail , IsNotEmpty, IsString } from "class-validator";
import { profileCompletionEnum } from "../../domain/enums/account-completion.enum";
import { baseResDTO } from "src/shared/baseResDTOs/baseResDTO";
import { UserRoleEnum } from "../../domain/enums/user-role.enum";

export class LoginUsernamePasswordReqDto {
    @IsEmail()
    @IsNotEmpty({ message: 'MISSING_EMAIL' })
    username: string;
    @IsString()
    @IsNotEmpty({ message: 'MISSING_PASSWORD' })
    password: string;
}

export class loginOAuth2ReqDto {
    @IsNotEmpty({ message: 'MISSING_ACCESS_TOKEN' })
    @IsString()
    authorzationToken: string;
}

export interface ILoginResponseDto{
    userId: string,
    email: string,
    role: UserRoleEnum,
    joinedAt: Date,
    lastPasswordUpdated?: Date,
    personalInfo: {
        username: string,
        avatar: string,
        lastProfileUpdate: Date,
        completion: {
            uncompleteFields : string[],
            percentage: number,
            status: profileCompletionEnum
        }
    }
}