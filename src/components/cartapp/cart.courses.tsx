'use client'
import { useCourseContext } from "@/lib/course.wrapper"
import { deleteOneUserCart } from "@/utils/actions/action"
import ConfigProvider from "antd/es/config-provider"
import Divider from "antd/es/divider"
import Rate from "antd/es/rate"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface IProps {
    data : IProduct[],
}
const CartCourses=(props: IProps)=>{
    const {data} = props
    const {data:session} = useSession()
    const router = useRouter()
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const [money,setMoney] = useState<number>(0)
    
    const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
    }
    const handleMoney=()=>{
        let num : number = 0
        data.forEach((item)=>{
            num += item.price
        })
        setMoney(num)
    }
    const handleDeleteUserCart= async (id :string)=>{
        const result =  await deleteOneUserCart(id)
        if(result){
          router.refresh()
        }
    }
    useEffect(()=>{
       handleMoney()
       setCurrentCourse(({...currentCourse,isCourse:true}))
    },[data])
    return(
        <div style={{margin:'30px 150px 300px 150px'}}>
            <div style={{marginBottom:40,fontSize:40,fontWeight:'bold'}}>Giỏ hàng</div>
            <div style={{display:'flex',height:'auto',width:'100%',justifyContent:"space-between"}}>
                <div style={{width:'70%'}}>
                    <div style={{fontSize:18,color:'blue'}}>{data.length} khóa học trong giỏ hàng</div>
                    {data.map((item,index)=>{
                        return(
                        <div key={index} style={{height:110}}>
                            <Divider style={{margin:'10px 0 10px 0'}}/>
                            <div style={{display:'flex'}}>
                            <Link href={`/course/${item.id}`}>
                                <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={135} height={75} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                            </Link>
                            <div style={{margin:'0 0 0px 20px',display:'flex',flexDirection:"column",gap:5,width:540}}>
                                <div style={{fontSize:18,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                                <div style={{fontSize:16}}>{item.description}</div>
                                <div style={{fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                                <div style={{display:'flex',gap:'7px'}}>
                                <div style={{fontSize:16,fontWeight:'inherit'}}>{item.evaluate}</div>
                                <div>
                                    <ConfigProvider
                                    theme={{
                                        token:{
                                        marginXS:3
                                        }
                                    }}     
                                    >
                                    <Rate disabled defaultValue={item.evaluate} style={{fontSize:13,color:'#D2691E'}}/>
                                    </ConfigProvider>                       
                                </div>
                                <div>({convertToDecimalString(item.numberStudents)})</div>
                                </div>
                            </div>
                            <div style={{width:70,color:'#800080'}} onClick={()=>handleDeleteUserCart(item.id)}>Xóa</div>
                            <div style={{fontSize:17,color:"#9932CC"}}>
                                {convertToDecimalString(item.price)} VNĐ
                            </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                {
                    data.length > 0 ? 
                    <div style={{width:'25%'}}>
                    <div style={{fontSize:22,fontWeight:'bold'}}>Tóm tắt</div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:30,fontSize:17}}>
                       <div>Giá gốc:</div>
                       <div>{convertToDecimalString(money)} VNĐ</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:10,fontSize:17,background:"yellow"}}>
                       <div>Ưu đãi đã áp dụng:</div>
                       <div>0%</div>
                    </div>
                    <Divider style={{marginTop:10,marginBottom:0}}/>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
                         <div style={{fontWeight:"bold",fontSize:17}}>Tổng:</div>
                         <div style={{fontSize:20,color:"#9932CC"}}>{convertToDecimalString(money)} VNĐ</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
                         <div style={{fontSize:17}}>Số ưu đãi còn lại:</div>
                         <div style={{fontSize:17}}>0%</div>
                    </div>
                    <div style={{cursor:"pointer",fontSize:17,color:"whitesmoke",background:'#9400D3',marginTop:20,height:55,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:4}} onClick={()=>router.push(`/payment/many/${session?.user.id}`)}>
                       <div>Thanh toán</div>
                    </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
export default CartCourses