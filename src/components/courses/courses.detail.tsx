'use client'
import Tabs, { TabsProps } from "antd/es/tabs";
import CoursesSlider from "./courses.slider";
import _ from 'lodash';
import { useEffect, useState } from "react";
import CoursesOut from "./courses.out";
import Select from "antd/es/select";
import CoursesMenu from "./courses.menu";
import AlignCenterOutlined  from '@ant-design/icons/AlignCenterOutlined';
import { useCourseContext } from "@/lib/course.wrapper";
interface IProps {
  data : IProduct[],
  title: string
}
const CoursesDetail=(props: IProps)=>{
    const { data } = props
    const [products,setProducts] = useState<IProduct[]>([])
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const [titleCourses,setTitleCourses] = useState<string>('')
    const [menu,setMenu] = useState<number>(1)
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <div style={{fontSize:17}}>Phổ biến nhất</div>,
          children: <></>,
        },
        {
          key: '2',
          label: <div style={{fontSize:17}}>Thịnh Hành</div>,
          children: <></>,
        },
        {
          key: '3',
          label: <div style={{fontSize:17}}>Mới</div>,
          children: <></>,
        },
    ];
    const handleTitle=()=>{
        if(props.title==='IT'){
          setTitleCourses('CNTT & Phần mềm')
        }else if(props.title==='KT'){
          setTitleCourses('Marketing')
        }else{
          setTitleCourses('Sức khỏe và thể dục')
        }
    }
    const handleData=()=>{
      const dataFake: IProduct[] = _.orderBy(data, ['numberStudents'], ['desc']);
      setProducts(dataFake)
    }
    const onChange = (key: string) => {
         let dataPhake: IProduct[] = []
         if(key === '1'){
            dataPhake = _.orderBy(data, ['numberStudents'], ['desc']);
            setProducts(dataPhake)
         }else if (key === '2' || key === '3'){
            dataPhake = _.orderBy(data, ['evaluate'], ['desc']); 
            setProducts(dataPhake) 
         };
    }
    const handleChange = (value: string) => {
      if(value === 'Phổ biến nhất'){
         setMenu(1)
      }else if (value === 'Xếp hạng cao nhất' || value === 'Mới nhất'){
         setMenu(2) 
      };
    };
    useEffect(()=>{
      handleTitle()
      handleData()
      setCurrentCourse({...currentCourse,isCourse:true})
    },[])
    return(
        <div style={{padding:'90px',width:'86%',margin:'-60px auto'}}>
            <div style={{marginBottom:'50px',fontSize:33,fontWeight:'bold'}}>Khóa học {titleCourses}</div>
            <div style={{fontSize:25,fontWeight:'bold'}}>Các khóa học bạn có thể bắt đầu</div>
            <div style={{marginTop:30}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
            </div>
            <div style={{marginTop:10}}>
                <CoursesSlider data={products ? products : []}/>
            </div>
            <div style={{marginTop:20,fontSize:25,fontWeight:'bold'}}>
                Các khóa học nổi bật
            </div>
            <div style={{marginTop:20}}>
                <CoursesOut data={data ? data : []}/>
            </div>
            <div style={{marginTop:50,fontSize:25,fontWeight:'bold'}}>
                  Tất cả các khóa học {titleCourses}
            </div>
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
              </div>
              <div style={{fontSize:18,display:"flex",alignItems:'center'}}>
                {data.length} kết quả
              </div>
            </div>
            <div style={{marginTop:50,display:'flex',gap:20}}>
                <CoursesMenu data={data ? data : []}
                             menu={menu}
                             setMenu={setMenu}
                />
            </div>
        </div>
    )
}
export default CoursesDetail