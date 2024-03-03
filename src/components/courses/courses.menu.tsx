'use client'
import Menu from "antd/es/menu/menu"
import Checkbox from "antd/es/checkbox/Checkbox";
import { useCourseContext } from "@/lib/course.wrapper";
import { useEffect, useState } from "react";
import ConfigProvider from "antd/es/config-provider"
import Divider from "antd/es/divider"
import { MenuProps } from "antd/es/menu/menu"
import Pagination, { PaginationProps } from "antd/es/pagination/Pagination"
import Rate from "antd/es/rate"
import Link from "next/link"
import _ from "lodash";
interface IProps {
  data : IProduct[],
  menu:number,
  setMenu:(v: number) => void
}
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuProps['items'] = [
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Xếp hạng</div>, 'sub1','',[
        getItem(<div style={{display:'flex',gap:10,marginLeft:'-5px',width:100,paddingLeft:"10px"}}>
                <div>
                    <Checkbox/>
                </div>
                <div>
                <ConfigProvider
                    theme={{
                            token:{
                                marginXS:3
                            }
                           }}     
                >
                    <Rate disabled allowHalf defaultValue={4.5} style={{fontSize:14,color:'#D2691E'}}/>
                </ConfigProvider>
                </div>
                <div>Từ 4.5 trở lên</div>    
                </div>, '0'),
         getItem(<div style={{display:'flex',gap:10,marginLeft:'-5px',width:100,paddingLeft:"10px"}}>
                  <div>
                    <Checkbox/>
                  </div>
                  <div>
                    <ConfigProvider
                      theme={{
                        token:{
                          marginXS:3
                        }
                      }}     
                    >
                       <Rate disabled allowHalf defaultValue={4} style={{fontSize:14,color:'#D2691E'}}/>
                    </ConfigProvider>
                  </div>
                  <div>Từ 4.0 trở lên</div>    
                 </div>, '1'),
         getItem(<div style={{display:'flex',gap:10,marginLeft:'-5px',width:100,paddingLeft:"10px"}}>
                   <div>
                    <Checkbox/>
                   </div>
                   <div>
                     <ConfigProvider
                        theme={{
                           token:{
                             marginXS:3
                           }
                        }}     
                     >
                       <Rate disabled allowHalf defaultValue={3.5} style={{fontSize:14,color:'#D2691E'}}/>
                     </ConfigProvider>
                   </div>
                   <div>Từ 3.5 trở lên</div>    
                 </div>, '2'),
         getItem(<div style={{display:'flex',gap:10,marginLeft:'-5px',width:100,paddingLeft:"10px"}}>
                   <div>
                    <Checkbox/>
                   </div>
                   <div>
                     <ConfigProvider
                        theme={{
                          token:{
                            marginXS:3
                        }
                        }}     
                     >
                       <Rate disabled allowHalf defaultValue={3} style={{fontSize:14,color:'#D2691E'}}/>
                     </ConfigProvider>
                   </div>
                   <div>Từ 3.0 trở lên</div>    
                 </div>, '3'),
         ]),
        { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Thời lượng video</div>, 'sub2'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Chủ đề</div>, 'sub3'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Thể loại con</div>, 'sub4'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Cấp độ</div>, 'sub5'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Ngôn ngữ</div>, 'sub6'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Giá</div>, 'sub7'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Đặc điểm</div>, 'sub8'),
    { type: 'divider' },
    getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Phụ đề</div>, 'sub9'),
  ];
const CoursesMenu=(props: IProps)=>{
    const { data,menu } = props
    const [dataFake,setDataFake] = useState<IProduct[]>(data.slice(0, 5))
    const [dataP,setdataP] = useState<IProduct[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const { setCurrentCourse } = useCourseContext() as ICourseContext
    const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
      }
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
      setCurrentPage(pageNumber)
      const indexOfLastItem = pageNumber * itemsPerPage; // code phan trang 
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = dataP.slice(indexOfFirstItem, indexOfLastItem);
      setDataFake(currentItems)
    };
    const onClick: MenuProps['onClick'] = (e) => {
        let dataPhake : IProduct[] = []
        if(e.key==='0'){
          dataPhake = dataP.filter(i => i.evaluate >= 4.5)
        }else if (e.key==='1'){
          dataPhake = dataP.filter(i => i.evaluate >= 4)
        }else if(e.key==='2'){
          dataPhake = dataP.filter(i => i.evaluate >= 3.5)
        }else if(e.key==='3'){
          dataPhake = dataP.filter(i => i.evaluate >= 3)
        }
        if(dataPhake.length > 0){
          setdataP(dataPhake)
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = dataPhake.slice(indexOfFirstItem, indexOfLastItem);
          setDataFake(currentItems)
        }
    };
    const handleMenu=()=>{
      let dataPhake: IProduct[] = []
      if(menu === 1){
         dataPhake = _.orderBy(data, ['numberStudents'], ['desc']);
      }else if (menu === 2 || menu === 3){
         dataPhake = _.orderBy(data, ['evaluate'], ['desc']);
      };
      setdataP(dataPhake)
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = dataPhake.slice(indexOfFirstItem, indexOfLastItem);
      setDataFake(currentItems)
    }
    useEffect(()=>{
        handleMenu()
    },[menu])
    return(
        <>
            <Menu
                onClick={onClick}
                style={{ width: 330,border:'none'}}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <div style={{width:1000}}>
            {dataFake.map((item,index)=>{
                 return(
                  <div key={index}>
                    <div style={{display:'flex'}}>
                      <Link href={`/course/${item.id}`}>
                        <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={300} height={170} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                      </Link>
                      <div style={{margin:'0 0 20px 20px',display:'flex',flexDirection:"column",gap:8,width:532}}>
                        <div style={{fontSize:22,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                        <div style={{fontSize:17}}>{item.description}</div>
                        <div style={{fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                        <div style={{display:'flex',gap:'7px'}}>
                          <div style={{fontSize:18,fontWeight:'inherit'}}>{item.evaluate}</div>
                          <div>
                            <ConfigProvider
                              theme={{
                                token:{
                                  marginXS:3
                                }
                              }}     
                            >
                              <Rate disabled defaultValue={item.evaluate} style={{fontSize:14,color:'#D2691E'}} allowHalf/>
                            </ConfigProvider>                       
                          </div>
                         <div>({convertToDecimalString(item.numberStudents)})</div>
                        </div>
                      </div>
                      <div style={{fontWeight:550,fontSize:20,alignItems:''}}>
                           {convertToDecimalString(item.price)} VNĐ
                      </div>
                     </div>
                     <Divider/>
                   </div>
                 )
               })}
              <Pagination defaultCurrent={1} total={100} onChange={onChange} style={{margin:'50px 0 0 220px'}}/>
            </div>
        </>
    )
}
export default CoursesMenu