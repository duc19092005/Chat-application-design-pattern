import { IsEmail , IsNotEmpty, IsString } from "class-validator";

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

export class loginResponseDto {
    statusCode: number;
    message: string;
    userInfo : {
        userId : string ,
        userName : string,
        email : string,
    }
}