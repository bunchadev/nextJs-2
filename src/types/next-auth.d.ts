import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
interface IUser {
      id: string,
      userName: string,
      password: string,
      role: string,
      money: number,
      phoneNumber: string,
      email: string
}
declare module "next-auth/jwt" {
    interface JWT {
        access_token: string,
        refresh_token: string,
        user: IUser
    }
}
declare module "next-auth" {
    interface Session {
        access_token: string,
        refresh_token: string,
        user: IUser
    }

}