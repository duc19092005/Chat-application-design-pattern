import mongoose from "mongoose";
import { accountStatusEnum } from "../enums/account-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { convertEnumToArray } from "src/shared/ultis/convert-enum.ulti";
import { loginMethodEnum } from "../enums/login-method.enum";

const userSchema = new mongoose.Schema({
    username : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    role : { type: convertEnumToArray(UserRoleEnum), required: true },
    refreshToken : { type: String , default: null },
    loginMethod : { type: convertEnumToArray(loginMethodEnum), required: true },
    createdAt : { type: Date, default: Date.now },
    updatedAt : { type: Date, default: Date.now },
    accountStatus : { type: convertEnumToArray(accountStatusEnum), required: true },
});

export const UserModel = mongoose.model('User', userSchema);