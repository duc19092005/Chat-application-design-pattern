import bcrypt from "bcrypt"
import { error } from "console"

const saltRounds = 10

export class BCryptProvider{
    public static genHashPassword(password : string) : string{
        var passwordHash = ""
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err)
            {
                console.error("Hash Error - Details Error : " + err?.message)
                throw new Error("Password Hash Error")
            }else{
                passwordHash = hash
            }
        })
        return passwordHash
    }

    public static verifyPassword(inputPassword : string , hashPassword : string) : boolean
    {
        bcrypt.compare(inputPassword, hashPassword, function(err, result) {
            if(err)
            {
                return false
            }else{
                return true
            }
        });
        return false
    }
}