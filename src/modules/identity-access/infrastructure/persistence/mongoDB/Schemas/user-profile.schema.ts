import mongoose from "mongoose";
import { accountStatusEnum } from "../../../../domain/enums/account-status.enum";
import { accountCompletionEnum } from "../../../../domain/enums/account-completion.enum";
import { convertEnumToArray } from "src/shared/ultis/convert-enum.ulti";

// Mặc định Flow như sau nếu đăng nhập bằng các Method trong loginMethodEnum
// 1. EmailPassword => profile sẽ có đầy đủ thông tin bắt buộc
// 2. Google, Facebook => profile sẽ có thông tin cơ bản, user cần bổ sung thêm thông tin bắt buộc để hoàn thiện profile
// Khi đăng nhập bằng Google , Facebook thì Username mặc định sẽ là Email của user đó tùy vào thông tin Payload GG trả về
const userProfileSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    username : { type: String, required: true },
    userAvatar : { type: String, default: null },
    bio : { type: String, default: null,required: false },
    phoneNumber : { type: String, default: null },
    address : { type: String, default: null , required: false },
    dateOfBirth : { type: Date, default: null },
    createdAt : { type: Date, default: Date.now },
    updatedAt : { type: Date, default: Date.now },
    profileCompletionStatus : { type: convertEnumToArray(accountCompletionEnum), required: true },
});

export const UserModel = mongoose.model('userProfile', userProfileSchema);