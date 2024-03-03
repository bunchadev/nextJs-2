'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import RightOutlined  from '@ant-design/icons/RightOutlined';
import LeftOutlined  from '@ant-design/icons/LeftOutlined';
import Button from "antd/es/button/button";
import ContentTitle from "./content.title";
import { useEffect, useState } from "react";
import Rate from "antd/es/rate";
import { ConfigProvider } from "antd";
import Link from "next/link";
import { useCourseContext } from "@/lib/course.wrapper";
interface IProps {
    productIT : IProduct[],
    productKT : IProduct[],
    productSK: IProduct[]
}
const ContentApp=(props : IProps)=>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const NextArrow=(props: any)=>{
      return(
        <Button
           onClick={()=>{props.onClick();nextSlide()}}
           shape="circle"
           style={{
              position:'absolute',
              right:'-9px',
              top: "20%",
              zIndex: 2,
              width: 49,
              height:48,
              background:"#303030",
              border:'1px solid #303030'
              }}
        >
          <RightOutlined style={{color:'white'}}/>
        </Button>
      )
    }
    const PrevArrow=(props: any)=>{
      return(
        <Button
          onClick={()=>{props.onClick();prevSlide()}}
          shape="circle"
          style={{
            position:'absolute',
            left:'-25px',
            top: "20%",
            zIndex: 2,
            width: 49,
            height:48,
            background:"#303030",
            border:'1px solid #303030'
          }}
        >
          <LeftOutlined style={{color:'white'}}/>
        </Button>
      )
    }
    const settings : Settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: currentIndex !== 0 ? <PrevArrow/> : <></>,
        responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                  dots: true
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true
              }
          }
      ]
    };
    const nextSlide = () => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const prevSlide = () => {
      setCurrentIndex(prevIndex => prevIndex - 1);
    };
    const convertToDecimalString =(number :any)=> {
      var decimalString = (number / 1000).toFixed(3);
      return decimalString.toString();
    }
    useEffect(()=>{
      setCurrentCourse(({...currentCourse,isCourse:false}))
    },[])
    return(
        <> 
            <ContentTitle/>
            <div style={{padding:'90px',width:'86%',margin:'-60px auto'}}>
              <h1>Lĩnh vực học tiếp theo</h1>
              <h2>Đề xuất dành cho bạn</h2>
              <Slider {...settings}>
              {props.productIT.map((item,index)=>{
                 return(
                  <div key={index}>
                     <Link href={`/course/${item.id}`}>
                     <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={240} height={140} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                     </Link>
                     <div style={{marginTop:'20px',fontSize:19,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                     <div style={{marginTop:'5px',fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                     <div style={{display:'flex',gap:'7px',marginTop:'5px'}}>
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
                     <div style={{marginTop:'5px',fontWeight:550}}>
                        {convertToDecimalString(item.price)} VNĐ
                     </div>
                  </div>
                 )
               })}
              </Slider>
            </div>
            <div style={{padding:'90px',width:'86%',margin:'-140px auto'}}>
              <h2>Các khóa học nâng cao kỹ năng marketing của bạn!</h2>
              <Slider {...settings}>
              {props.productKT.map((item,index)=>{
                 return(
                  <div key={index}>
                     <Link href={`/course/${item.id}`}>
                     <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={240} height={140} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                     </Link>
                     <div style={{marginTop:'20px',fontSize:19,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                     <div style={{marginTop:'5px',fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                     <div style={{display:'flex',gap:'7px',marginTop:'5px'}}>
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
                     <div style={{marginTop:'5px',fontWeight:550}}>
                        {convertToDecimalString(item.price)} VNĐ
                     </div>
                  </div>
                 )
               })}
              </Slider>
            </div>
            <div style={{padding:'90px',width:'86%',margin:'-60px auto'}}>
              <h2>Các khóa học nâng cao sức khỏe của bạn!</h2>
              <Slider {...settings}>
              {props.productSK.map((item,index)=>{
                 return(
                  <div key={index}>
                     <Link href={`/course/${item.id}`}>
                     <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={240} height={140} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                     </Link>
                     <div style={{marginTop:'20px',fontSize:19,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
                     <div style={{marginTop:'5px',fontSize:14,fontWeight:'lighter'}}>{item.author}</div>
                     <div style={{display:'flex',gap:'7px',marginTop:'5px'}}>
                        <div style={{fontSize:18,fontWeight:'inherit'}}>{item.evaluate}</div>
                        <div>
                          <ConfigProvider
                              theme={{
                                token:{
                                  marginXS:3
                                }
                              }}     
                          >
                            <Rate disabled defaultValue={item?.evaluate} style={{fontSize:14,color:'#D2691E'}}/>
                          </ConfigProvider>                       
                        </div>
                        <div>({convertToDecimalString(item.numberStudents)})</div>
                     </div>
                     <div style={{marginTop:'5px',fontWeight:550}}>
                        {convertToDecimalString(item.price)} VNĐ
                     </div>
                  </div>
                 )
               })}
              </Slider>
            </div>
          </>
    )
}
export default ContentApp