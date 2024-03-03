import PayCourses from "@/components/paycourse/pay.courses"
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
import { sendRequest } from "@/utils/api";
const PaymentManyPage=async({ params }: { params: { slug: string } })=>{
    const session = await getServerSession(authOptions)
    const products = await sendRequest<IBackendRes<IProduct[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/UserCart/${session?.user.id}`,
      method: "GET",
      nextOption: {
        next : {tags: ['courseCartDelete']}
    }
    })
    return(
        <>
           <PayCourses data={products.data ? products.data : []}/>
        </>
    )
}
export default PaymentManyPage