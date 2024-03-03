import CourseDetail from "@/components/course/course.detail"
import { sendRequest } from "@/utils/api"
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
const CourseApp = async ({ params }: { params: { slug: string } })=>{
    const session = await getServerSession(authOptions)
    const product = await sendRequest<IBackendRes<IProduct>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/${params.slug}`,
        method: "POST",
        body: `${session?.user.id}`,
        nextOption: {
            next : {tags: ['courseCart']}
        }
      })
      const videos= await sendRequest<IVideo[]>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Video/${params.slug}`,
        method: "GET",
        nextOption: {
            cache: 'no-store',
          }
      })
      const lesson = await sendRequest<ILessonContent>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/LessonContent/${params.slug}`,
        method: "GET",
        nextOption: {
            cache: 'no-store',
          }
      })
      const comments = await sendRequest<IBackendRes<IComment[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Comment/${params.slug}`,
        method: "GET",
        nextOption: {
            next : {tags: ['comment']}
          }
      })
    return(
        <>
            <CourseDetail
                product={product.data ? product.data : null}
                videos={videos ? videos: null}
                lesson={lesson ? lesson : null}
                comments={comments.data ? comments.data : []}
                // @ts-ignore
                checked={product.check} 
                 // @ts-ignore
                checkType={product.checkType}
            />
        </>
    )
}
export default CourseApp