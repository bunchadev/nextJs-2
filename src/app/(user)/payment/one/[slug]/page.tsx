import PayCourses from "@/components/paycourse/pay.courses"
import { sendRequest } from "@/utils/api"

const PaymentOnePage= async ({ params } : { params: { slug: string } })=>{
    const product = await sendRequest<IBackendRes<IProduct[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/one/${params.slug}`,
        method: "POST",
        nextOption: {
            cache: 'no-store',
        }
    })
    return(
        <>
           <PayCourses data={product?.data ? product?.data : []}/>
        </>
    )
}
export default PaymentOnePage