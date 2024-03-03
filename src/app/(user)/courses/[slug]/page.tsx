import CoursesDetail from "@/components/courses/courses.detail"
import { sendRequest } from "@/utils/api"
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
const Courses= async({ params }: { params: { slug: string } })=>{
    const session = await getServerSession(authOptions)
    const products = await sendRequest<IBackendRes<IProduct[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product`,
        method: "POST",
        body:{
            type: `${params.slug}`,
            userId: session?.user?.id
        },
        nextOption: {
            cache: 'no-store',
        }
      })
    return(
        <div>
           <CoursesDetail data={products.data ? products?.data : []}
                          title={params.slug}
           />
        </div>
    )
}
export default Courses