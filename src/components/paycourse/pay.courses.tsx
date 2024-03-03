'use client'
import { useCourseContext } from "@/lib/course.wrapper"
import { createUserProduct, deleteManyUserCart, updateUser } from "@/utils/actions/action"
import { message } from "antd"
import Divider from "antd/es/divider"
import Radio from "antd/es/radio"
import Select from "antd/es/select"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface IProps{
    data:IProduct[] 
}
const PayCourses=(props: IProps)=>{
    const {data} = props
    const router = useRouter()
    const {data:session} = useSession()
    const [money,setMoney] = useState<number>(0)
    const [productId,setProductId] = useState<string[]>([])
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const handleMoney=()=>{
        let num : number = 0
        let myArr :string[] = []
        data.forEach((item)=>{
            num += item.price
            myArr.push(item.id)
        })
        setProductId(myArr)
        setMoney(num)
    }
    const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
    }
    const handlePayment= async ()=>{
        if(session?.user.money! < money)
        {
          message.error('Số dư trong tài khoản không đủ thanh toán')
        }
        else
        {
          const data = await createUserProduct(productId)
          const data1 = await deleteManyUserCart(productId)
          const data2 = await updateUser(money)
          if(data && data1 && data2){
             router.push('/mycourse')
          }
        }
    }
    useEffect(()=>{
         handleMoney()
         setCurrentCourse(({...currentCourse,isCourse:true}))
    },[])
    return(
        <div style={{display:"flex",marginBottom:140}}>
            <div style={{width:'56%',height:'auto'}}>
                <div style={{width:'100%',margin:"40px 0 0 290px"}}>
                      <div style={{fontSize:30,fontWeight:'bolder'}}>Thanh toán</div>
                      <div style={{fontSize:25,fontWeight:'bolder',marginTop:30}}>Địa chỉ thanh toán</div>
                      <div style={{marginTop:15,display:'flex',gap:130}}>
                        <div>Quốc gia</div>
                        <div>Bắt buộc</div>
                      </div>
                      <div style={{marginTop:15}}>
                        <Select
                           defaultValue={'Việt Nam'}
                           style={{ width: 250,height:50 }}
                           options={[
                              { value: 'USA', label: 'USA' },
                              { value: 'Trung Quốc', label: 'Trung Quốc' },
                              { value: 'Đức', label: 'Đức' },
                            ]}
                        />
                      </div>
                      <div style={{marginTop:30,fontSize:25,fontWeight:'bolder'}}>
                        Phương thức thanh toán
                      </div>
                      <Radio.Group style={{display:'flex',flexDirection:'column',gap:7,marginTop:15}}>
                         <Radio value={1} style={{color:'#7B68EE',fontSize:16}}>Thanh toán bằng thẻ visa</Radio>
                         <Radio value={2} style={{color:'#800080',fontSize:16}}>Thanh toán bằng paypal</Radio>
                      </Radio.Group>
                      <div style={{marginTop:40,fontSize:25}}>Thông tin đặt hàng</div>
                      <div style={{marginTop:20}}>
                      {data.map((item,index)=>{
                        return(
                        <div key={index} style={{marginTop: index > 0 ? 15 : 0}}>
                          <div style={{display:'flex'}}>
                            <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={70} height={40}/>
                            <div style={{fontSize:18,fontWeight:'bolder',color:'black',margin:'10px 0 0 20px',width:300}}>{item.productName}</div>
                            <div style={{fontSize:17,margin:'10px 0 0 0'}}>
                                {convertToDecimalString(item.price)} VNĐ
                            </div>
                          </div>
                        </div>
                        )
                    })}
                      </div>
                </div>
            </div>
            <div style={{width:'46%',background:'#F5F5F5',height:700}}>
                <div style={{margin:'140px 0 0 50px',width:'45%'}}>
                    <div style={{display:"flex",gap:15}}>
                      <div style={{fontSize:22,fontWeight:'bold'}}>Tóm tắt</div>
                      <div style={{marginTop:4}}>(Số dư TK: {session?.user.money.toLocaleString('vi-VN')} VNĐ)</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:30,fontSize:17}}>
                       <div>Giá gốc:</div>
                       <div>{convertToDecimalString(money)} VNĐ</div>
                    </div>
                    <Divider style={{marginTop:10,marginBottom:0}}/>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
                         <div style={{fontWeight:"bold",fontSize:17}}>Tổng:</div>
                         <div style={{fontSize:20,color:"#9932CC"}}>{convertToDecimalString(money)} VNĐ</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
                         <div style={{fontSize:17}}>Số ưu đãi:</div>
                         <div style={{fontSize:17}}>0%</div>
                    </div>
                    <div style={{cursor:"pointer",fontSize:17,color:"whitesmoke",background:'#9400D3',marginTop:20,height:55,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:4}} onClick={handlePayment}>
                       <div>Thanh toán</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PayCourses