'use server'
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
import { sendRequest, sendRequestFile } from "../api";
import { revalidateTag } from "next/cache";
export async function createUserCart(productId:any) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<IBackendRes<IProduct>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserCart/create`,
            method: "POST",
            // headers: {
            //     Authorization: `Bearer ${session?.access_token}`,
            // },
            body:{
                userId: session?.user.id,
                productId : productId
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    revalidateTag("courseCart")
    return result
}
export async function deleteOneUserCart(productId: string) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserCart/delete/one`,
            method: "POST",
            body:{
                userId: session?.user.id,
                productId : productId
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    revalidateTag("courseCartDelete")
    return result
}
export async function createUserProduct(productId: string[]) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserProduct/create`,
            method: "POST",
            body:{
                userId: session?.user.id,
                productId : productId
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    revalidateTag("courseCart")
    return result
}
export async function deleteManyUserCart(productId: string[]) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserCart/delete/many`,
            method: "POST",
            body:{
                userId: session?.user.id,
                productId : productId
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function updateUser(money:number) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/update`,
            method: "POST",
            body:{
                userId: session?.user.id,
                money: money
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function createProduct(productName:string,description:string,price:number,type:string,fileName:string) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/create`,
            method: "POST",
            body:{
                userId: session?.user.id,
                productName: productName,
                description: description,
                author: session?.user.userName,
                price: price,
                type: type,
                fileName: fileName
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function uploadFile(file:any) {
    const result = await sendRequestFile<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/upload`,
            method: "POST",
            body: file ,
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function getUserProduct(type:string) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<IBackendRes<IProduct[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserProduct/${session?.user.id}`,
            method: "POST",
            body: type,
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function createComment(productId:string, title:string,evaluate:number) {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Comment`,
            method: "POST",
            body: {
                productId: productId,
                userName: session?.user.userName,
                title: title,
                evaluate: evaluate
            },
            nextOption: {
                cache: 'no-store',
            }
    })
    revalidateTag("comment")
    return result
}
export async function registerUser(user:any) {
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/register`,
            method: "POST",
            body: user,
            nextOption: {
                cache: 'no-store',
            }
    })
    return result
}
export async function refreshMyToken() {
    const session = await getServerSession(authOptions)
    const result = await sendRequest<any>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/refresh_token`,
            method: "POST",
            body:session?.refresh_token,
            nextOption: {
                cache: 'no-store',
            }
    })
    if(result){
        return result
    }
}