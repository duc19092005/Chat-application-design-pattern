export interface ISocialProfile {
    // Đây là các thông tin cơ bản để so sánh trong db và sẽ trả về
    SubId : string;
    email : string;
    fullName : string;
    avatarUrl? : string;
}

export interface ISocialProvider {
    getUserProfile(authorzationToken: string): Promise<ISocialProfile>;
}