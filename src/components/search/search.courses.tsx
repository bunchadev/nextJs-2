'use client'
import Select from "antd/es/select"
import { useEffect, useState } from "react"
import AlignCenterOutlined  from '@ant-design/icons/AlignCenterOutlined';
import { useCourseContext } from "@/lib/course.wrapper";
import SearchContent from "./search.menu";
interface IProps {
    data : IProduct[],
    search:string | string[] | undefined
  }
const SearchCourses=(props: IProps)=>{
    const {data,search} = props
    const [menu,setMenu] = useState<number>(1)
    const [checkFilter,setCheckFilter] = useState<boolean>(false)
    const [dataHi,setDataHi] = useState<number>(data.length)
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const handleChange = (value: string) => {
        if(value === 'Phổ biến nhất'){
           setMenu(1)
        }else if (value === 'Xếp hạng cao nhất' || value === 'Mới nhất'){
           setMenu(2) 
        };
    };
    useEffect(()=>{
        setCurrentCourse(({...currentCourse,isCourse:true}))
    },[data])
    return(
        <div style={{margin:'50px 120px 30px 120px',height:'auto'}}>
             <div style={{fontSize:30,fontWeight:'bold'}}>{data.length} kết quả cho `{search}`</div>
             <div style={{marginTop:30,display:'flex',justifyContent:'space-between'}}> 
              <div style={{display:'flex',gap:15}}>
                 <div style={{border:'1px solid black',width:100,height:60,display:'flex',justifyContent:'center',alignItems:'center',fontSize:17,fontWeight:'bold',gap:10}}>
                    <AlignCenterOutlined /> Bộ lọc
                 </div>
                 <div style={{border:'1px solid black',width:180}}>
                    <div style={{fontSize:15,fontWeight:'bold',margin:'8px 0 0 20px'}}>Sắp xếp theo</div>
                    <Select
                      defaultValue="Phổ biến nhất"
                      variant="borderless"
                      style={{width:160,marginLeft:9}}
                      onChange={handleChange}
                      options={[
                        { value: 'Phổ biến nhất', label: 'Phổ biến nhất' },
                        { value: 'Xếp hạng cao nhất', label: 'Xếp hạng cao nhất' },
                        { value: 'Mới nhất', label: 'Mới nhất' },
                      ]}
                    />
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,color:'blue'}}>
                   {checkFilter === true ? <div onClick={()=>setCheckFilter(false)}>Xóa bộ lọc</div> : null}
                </div>  
              </div>
              <div style={{fontSize:18,display:"flex",alignItems:'center'}}>
                {dataHi} kết quả
              </div>
             </div>
             <div style={{marginTop:50,display:'flex',gap:20}}>
                <SearchContent data={data.length > 0 ? data : []}
                               menu={menu}
                               setMenu={setMenu}
                               setCheckFilter={setCheckFilter}
                               checkFilter={checkFilter}
                               setDataHi={setDataHi}
                />
            </div>
        </div>
    )
}
export default SearchCourses