import mongoose from "mongoose";
import { accountStatusEnum } from "../../../../domain/enums/account-status.enum";
import { UserRoleEnum } from "../../../../domain/enums/user-role.enum";
import { convertEnumToArray } from "src/shared/ultis/convert-enum.ulti";
import { loginMethodEnum } from "../../../../domain/enums/login-method.enum";

const userSchema = new mongoose.Schema({
    email : { type: String, required: true },
    password : { type: String, required: false },
    role : { type: String , enum : convertEnumToArray(UserRoleEnum), required: true },
    subId : { type: String , default: null, required: false },
    refreshToken : { type: String , default: null , required: false},
    loginMethod : { type: String , enum : convertEnumToArray(UserRoleEnum), required: true },
    createdAt : { type: Date, default: Date.now },
    updatedAt : { type: Date, default: Date.now },
    accountStatus : { type: String , enum : convertEnumToArray(UserRoleEnum), required: true },
});

export const UserModel = mongoose.model('User', userSchema);