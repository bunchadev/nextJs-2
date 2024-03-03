'use client'

import { useCourseContext } from "@/lib/course.wrapper";
import { getUserProduct } from "@/utils/actions/action";
import { message } from "antd";
import Tabs, { TabsProps } from "antd/es/tabs"
import Link from "next/link";
import { useEffect, useState } from "react";

const MyCourseApp=()=>{
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const [data,setData] = useState<IProduct[]>([])
    const onChange = async(key: string) => {
          if(key==='1'){
            const result = await getUserProduct('KH')
            if(result.statusCode==='200'){
                setData(result.data!)
            }
          } else if (key==='2'){
            const result = await getUserProduct('TG')
            if(!result.data?.length){
                 message.info("Bạn chưa dạy khóa học nào hay Upload !!!")
                 setData([])
            }
            if(result.statusCode==='200'){
                setData(result.data!)
            }
          }
      };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <div style={{color:"whitesmoke",fontSize:20}}>Khóa học của tôi</div>,
          children: <></>
        },
        {
          key: '2',
          label: <div style={{color:"whitesmoke",fontSize:20}}>Khóa học tôi dạy</div>,
          children: <></>
        }
      ];
    useEffect(()=>{
      setCurrentCourse(({...currentCourse,isCourse:true}))
      onChange('1')
    },[])
    return(
        <div style={{position:"relative",marginBottom:160}}>
            <div style={{width:'100%',background:'#303030',height:200}}>
                <div style={{margin:"0 0 0 300px",color:'white',fontSize:40,position:"absolute",top:60}}>Quá trình học tập và dạy của tôi</div>
            </div>
            <div style={{position:"absolute",marginLeft:300,top:145}}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
            </div>
            <div style={{display:'flex',gap:20,flexWrap:"wrap",margin:"50px 300px 0 300px"}}>
            {data.map((item,index)=>{
                 return(
                  <div key={index} style={{flexBasis:'20%'}}>
                     <Link href={`/course/${item.id}`}>
                     <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={235} height={130} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                     </Link>
                     <div style={{marginTop:'20px',fontSize:19,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                     <div style={{marginTop:'5px',fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                  </div>
                 )
               })}
            </div>
        </div>
    )
}
export default MyCourseApp