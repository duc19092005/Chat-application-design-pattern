export interface ISocialProfile {
    // Đây là các thông tin cơ bản để so sánh trong db
    SubId : string;
    email : string;
    fullName : string;
}

export interface ISocialProvider {
    getUserProfile(authorzationToken: string): Promise<ISocialProfile>;
}