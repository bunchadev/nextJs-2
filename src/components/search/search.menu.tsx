'use client'
import Menu from "antd/es/menu/menu"
import Checkbox, { CheckboxProps } from "antd/es/checkbox/Checkbox";
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
    setMenu:(v: number) => void,
    setCheckFilter:(v: boolean) => void,
    checkFilter:boolean,
    setDataHi:(v :number) => void
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
const SearchContent=(props: IProps)=>{
    const { data , menu } = props
    const [dataFake,setDataFake] = useState<IProduct[]>([])
    const [dataP,setdataP] = useState<IProduct[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [check,setCheck] = useState<any>({value1:false,value2:false,value3:false,value4:false})
    const [itemsPerPage,setItemsPerPage] = useState<number>(5); 
    const { setCurrentCourse } = useCourseContext() as ICourseContext
    const items: MenuProps['items'] = [
      { type: 'divider' },
      getItem(<div style={{fontSize:18,fontWeight:'bold',marginLeft:30}}>Xếp hạng</div>, 'sub1','',[
          getItem(<div style={{display:'flex',gap:10,marginLeft:'-5px',width:100,paddingLeft:"10px"}}>
                  <div>
                      <Checkbox  onClick={(e)=>onChangeCheckBox(e,1)} checked={check.value1}/>
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
                      <Checkbox  onClick={(e)=>onChangeCheckBox(e,2)} checked={check.value2}/>
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
                      <Checkbox  onClick={(e)=>onChangeCheckBox(e,3)} checked={check.value3}/>
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
                      <Checkbox onClick={(e)=>onChangeCheckBox(e,4)} checked={check.value4}/>
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
    const onChangeCheckBox = (e :any,num :number) => {
      const arrayCheck = Object.keys(check)
      if(e.target.checked === true){
        props.setCheckFilter(true)
        for (let i = 0;i<arrayCheck.length;i++){
          if(i !== num - 1){
              const myCheck1 = arrayCheck[i]
              setCheck((prev :any)=>({...prev,[myCheck1]: false}))
          }else{
              const myCheck2 = arrayCheck[i]
              setCheck((prev :any)=>({...prev,[myCheck2]: true}))
          }
      }
      }else{
        props.setCheckFilter(false)
        const myCheck3 = arrayCheck[num-1]
        setCheck((prev :any)=>({...prev,[myCheck3]: false}))
      }
    };
    const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
      }
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
      setCurrentPage(pageNumber)
      const indexOfLastItem = pageNumber * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = dataP.slice(indexOfFirstItem, indexOfLastItem);
      props.setDataHi(dataP.length)
      setDataFake(currentItems)
    };
    const onClick: MenuProps['onClick'] = (e) => {
        let dataPhake : IProduct[] = []
        if(e.key==='0'){
          dataPhake = data.filter(i => i.evaluate >= 4.5)
        }if(e.key==='1'){
          dataPhake = data.filter(i => i.evaluate >= 4)
        }if(e.key==='2'){
          dataPhake = data.filter(i => i.evaluate >= 3.5)
        }if(e.key==='3'){
          dataPhake = data.filter(i => i.evaluate >= 3)
        }
          setdataP(dataPhake)
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = dataPhake.slice(indexOfFirstItem, indexOfLastItem);
          props.setDataHi(dataPhake.length)
          setDataFake(currentItems)
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
      props.setDataHi(dataPhake.length)
      setDataFake(currentItems)
    }
    const handleCheckFilter=()=>{
        if(props.checkFilter===false){
          setCheck((prev :any)=>({...prev,value1 : false,value2:false,value3:false,value4:false}))
        }
    }
    useEffect(()=>{
       handleCheckFilter()
       handleMenu()
    },[menu,data,props.checkFilter])
    return(
         <>
            <Menu
                onClick={onClick}
                style={{ width: 330,border:'none'}}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <div style={{width:1100}}>
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
                              <Rate disabled defaultValue={item.evaluate} style={{fontSize:14,color:'#D2691E'}}/>
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
export default SearchContent