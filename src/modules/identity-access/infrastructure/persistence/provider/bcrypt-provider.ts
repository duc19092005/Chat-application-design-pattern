import bcrypt from "bcrypt"
import { error } from "console"
import {IBcyptProvider} from "../../../domain/interfaces/bcrypt-provider-interface"
import { Injectable } from "@nestjs/common";
const saltRounds = 10

@Injectable()
export class BCryptProvider implements IBcyptProvider{
    private readonly saltRounds = 10;

    async genHashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}