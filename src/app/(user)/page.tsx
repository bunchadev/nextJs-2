import ContentApp from "@/components/content/content.app";
import { sendRequest } from "@/utils/api";
import { authOptions } from "@/app/api/auth/auth.options";
import { getServerSession } from "next-auth/next"
const Home = async ()=> {
  const session = await getServerSession(authOptions)
  const productIt = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product`,
    method: "POST",
    body:{
      type: "IT",
      userId: session?.user?.id
    },
    nextOption: {
        cache: 'no-store',
      }
  })
  const productKt = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product`,
    method: "POST",
    body:{
      type: "KT",
      userId: session?.user?.id
    },
    nextOption: {
        cache: 'no-store',
      }
  })
  const productSk = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product`,
    method: "POST",
    body:{
      type: "SK",
      userId: session?.user?.id
    },
    nextOption: {
        cache: 'no-store',
      }
  })
  return (
    <>
      <ContentApp productIT={productIt?.data ? productIt.data : []}
                  productKT={productKt.data ? productKt.data : []}
                  productSK={productSk.data ? productSk.data : []}
      />
    </>
  )
}
export default Home
