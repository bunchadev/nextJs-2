'use client'
import Slider from "react-slick"
import { Settings } from "react-slick";
import RightOutlined  from '@ant-design/icons/RightOutlined';
import LeftOutlined  from '@ant-design/icons/LeftOutlined';
import Button from "antd/es/button/button";
const ContentTitle=()=>{
    const ListItem = [
        {
            title:'Được tiếp sức bởi cộng đồng',
            description:'Hãy tin tưởng vào xếp hạng và đánh giá để đưa ra lựa chọn thông minh hơn. Bắt đầu với các khóa học xếp hạng đầu bảng của chúng tôi.',
            color:'#cc8383',
            image:'hi3.jpeg'
        },
        {
            title:'Viết code cho tương lai của bạn',
            description:'Làm chủ sự nghiệp của bạn. Học các kỹ năng mới nhất về phát triển web.',
            color:'#c6d0d6',
            image:'hi6.webp'
        }
    ]
    const NextArrow=(props: any)=>{
        return(
          <Button
             onClick={props.onClick}
             shape="circle"
             style={{
                position:'absolute',
                right:'17px',
                top: "45%",
                zIndex: 2,
                width: 41,
                height:40,
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
            onClick={props.onClick}
            shape="circle"
            style={{
              position:'absolute',
              left:'16px',
              top: "45%",
              zIndex: 2,
              width: 41,
              height:40,
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
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow:<NextArrow/>,
        prevArrow:<PrevArrow/>,
        useCSS:true
    };
    return(
        <div style={{
            margin:'0 80px 0 80px',
            height:400,
        }}>
           <Slider {...settings}>
           {ListItem.map((item,index)=>{
                return(
                    <div key={index}>
                        <div style={{display:'flex',height:400,background:`${item.color}`,borderRadius:'6px'}}>
                           <div style={{background:'white',width:450,height:180,margin:'70px 0 0 72px',borderRadius:'6px'}}>
                             <h1 style={{margin:'20px 20px 0 20px'}}>{item.title}</h1>
                             <p style={{margin:'20px 20px 0 20px',fontSize:18,color: '#333'}}>{item.description}</p>
                           </div>
                           <div style={{width:'30%',margin:'40px 0 0 350px'}}>
                             <img alt="example" src={`/images/${item.image}`} style={{width:320,height:300,border:'none'}}/>
                           </div>
                        </div>
                    </div>
                )})
           }
           </Slider>
        </div>
    )
}
export default ContentTitle