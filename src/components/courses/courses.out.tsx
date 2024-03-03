'use client'
import Button from "antd/es/button/button"
import ConfigProvider from "antd/es/config-provider"
import Rate from "antd/es/rate"
import Link from "next/link"
import { useState } from "react"
import Slider from "react-slick"
import RightOutlined  from '@ant-design/icons/RightOutlined';
import LeftOutlined  from '@ant-design/icons/LeftOutlined';
import { Settings } from "react-slick";
import { useCourseContext } from "@/lib/course.wrapper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface IProps {
    data : IProduct[]
  }
const CoursesOut=(props: IProps)=>{
    const { data } = props
    const [currentIndex, setCurrentIndex] = useState(0);
    const { setCurrentCourse } = useCourseContext() as ICourseContext
    const NextArrow=(props: any)=>{
      return(
        <Button
           onClick={()=>{props.onClick();nextSlide()}}
           shape="circle"
           style={{
              position:'absolute',
              right:'-9px',
              top: "42%",
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
            top: "42%",
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
        slidesToShow: 1,
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
    return(
        <>
             <Slider {...settings}>
              {data.map((item,index)=>{
                 return(
                  <div key={index}>
                    <div style={{display:'flex',border:'1px solid black'}}>
                      <Link href={`/course/${item.id}`} style={{margin:'20px 0 20px 20px'}}>
                        <img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${item.fileName}`} width={470} height={280} onClick={()=>setCurrentCourse(({...item,isCourse:true}))}/>
                      </Link>
                      <div style={{margin:'20px 0 20px 20px',display:'flex',flexDirection:"column",gap:8}}>
                        <div style={{fontSize:30,fontWeight:'bolder',color:'black'}}>{item.productName}</div>
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
                        <div style={{fontWeight:550,fontSize:25}}>
                           {convertToDecimalString(item.price)} VNĐ
                        </div>
                      </div>
                     </div>
                    </div>
                 )
               })}
            </Slider>
        </>
    )
}
export default CoursesOut