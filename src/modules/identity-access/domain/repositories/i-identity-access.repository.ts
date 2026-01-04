import { userEntity } from "../entities/user.entity";
import { IUserProfile } from "../entities/user-profile.entity";
import { IUserEntity } from "../entities/user.entity";
import { userProfileEntity } from "../entities/user-profile.entity";

export interface IUserRepository {
    // Tìm Không User bằng Id
    findUserById(userId: string): Promise<userEntity | null>;
    // Tìm kiếm người dùng bằng username và password
    findUserByUsernameAndPassword(username: string, password: string): Promise<userEntity>;
    // Tìm kiếm người dùng bằng email và subId từ nhà cung cấp OAuth2
    findUserByEmailAndSubId(email: string, subId: string): Promise<string | null>;

    findUserProfileByUserId(userId : string) : Promise<userProfileEntity>
}