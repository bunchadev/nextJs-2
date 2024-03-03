import SearchCourses from '@/components/search/search.courses'
import { sendRequest } from '@/utils/api'
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
const Search = async ({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {
    const session = await getServerSession(authOptions)
    const products = await sendRequest<IBackendRes<IProduct[]>>({
       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/Search?query=${searchParams.q}&id=${session?.user?.id}`,
       method: "GET",
       nextOption: {
           cache :'no-store'
        //    next : {tags: ['course-by-id']}
       }
    })
    return(
        <>
          <SearchCourses data={products.data ? products.data : []}
                         search={searchParams.q}
          />
        </>
    )
}
export default Search



