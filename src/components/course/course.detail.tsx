'use client'
import './app.css'
import RightOutlined  from '@ant-design/icons/RightOutlined';
import SyncOutlined  from '@ant-design/icons/SyncOutlined';
import GlobalOutlined  from '@ant-design/icons/GlobalOutlined';
import ProfileOutlined  from '@ant-design/icons/ProfileOutlined';
import CaretRightOutlined  from '@ant-design/icons/CaretRightOutlined';
import HeartOutlined  from '@ant-design/icons/HeartOutlined';
import DesktopOutlined  from '@ant-design/icons/DesktopOutlined';
import FileOutlined  from '@ant-design/icons/FileOutlined';
import DownloadOutlined  from '@ant-design/icons/DownloadOutlined';
import MobileOutlined  from '@ant-design/icons/MobileOutlined';
import RetweetOutlined  from '@ant-design/icons/RetweetOutlined';
import TrophyOutlined  from '@ant-design/icons/TrophyOutlined';
import AppleOutlined  from '@ant-design/icons/AppleOutlined';
import WindowsOutlined  from '@ant-design/icons/WindowsOutlined';
import GithubOutlined  from '@ant-design/icons/GithubOutlined';
import AliwangwangOutlined  from '@ant-design/icons/AliwangwangOutlined';
import CheckOutlined  from '@ant-design/icons/CheckOutlined';
import StarOutlined  from '@ant-design/icons/StarOutlined';
import ThunderboltOutlined  from '@ant-design/icons/ThunderboltOutlined';
import PlayCircleOutlined  from '@ant-design/icons/PlayCircleOutlined'
import TeamOutlined  from '@ant-design/icons/TeamOutlined';
import EditOutlined  from '@ant-design/icons/EditOutlined';
import ConfigProvider from 'antd/es/config-provider';
import Rate from "antd/es/rate";
import { useEffect, useState} from 'react';
import { useCourseContext } from '@/lib/course.wrapper';
import  Button  from 'antd/es/button';
import HeaderDetail from '../header/header.detail';
import CourseLesson from './course.lesson';
import CollapseDetail from './collapse.detail';
import { useRouter } from 'next/navigation';
import notification from 'antd/es/notification';
import { createUserCart } from '@/utils/actions/action';
import Avatar from 'antd/es/avatar/avatar';
import { Divider } from 'antd';
import ModalComment from './modal.comment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
interface IProps {
    product : IProduct | null,
    videos : IVideo[] | null,
    lesson : ILessonContent | null,
    checked:boolean,
    checkType:boolean,
    comments:IComment[]
}
const CourseDetail=(props : IProps)=>{
      const {product,videos,lesson,checked,checkType,comments} = props
      const [totalDurationInHours,setTotalDurationInHours] = useState<number>(0)
      const [countParts,setCountParts] = useState<number>(0)
      const [countLectures,setCountLectures] = useState<number>(0)
      const [countMinutes,setCountMinutes] = useState<number>(0)
      const [activeKey,setAcctiveKey] = useState<string[]>([])
      const [countActivityKey,setCountActivityKey] = useState<string[]>([])
      const [check,setCheck] = useState<boolean>(false)
      const [isCheck,setIsCheck] = useState<boolean>(true)
      const [heightDiv,setHeightDiv] = useState<number>(720)
      const {currentCourse,setCurrentCourse} = useCourseContext() as ICourseContext
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
      const router = useRouter()
      dayjs.extend(relativeTime);
      const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
      }
      const convertTimeToHours = (time: string): number => {
            const [minutes, seconds] = time.split(':');
            const totalMinutes = parseInt(minutes, 10) + parseInt(seconds, 10) / 60;
            const totalHours = totalMinutes / 60;
            return totalHours;
      }
      const convertTimeToMinutes = (time: string): number => {
         const [minutes, seconds] = time.split(':');
         const totalMinutes = parseInt(minutes, 10);
         return totalMinutes;
     }
      const handleHour = () => {
              let totalHours = 0;
              let totalMinutes = 0
              let countP = 0 
              let countL = 0
              for (const video of videos!) {
                  countActivityKey.push(countP.toString())
                  countP = countP + 1
                  for (const description of video.descriptionVideoDtos) {
                      countL = countL + 1
                      totalHours += convertTimeToHours(description.timeVideo);
                      totalMinutes += convertTimeToMinutes(description.timeVideo)
                  }
             }
             setCountMinutes(totalMinutes)
             setCountParts(countP)
             setCountLectures(countL)
             setTotalDurationInHours(totalHours)     
      }
      const handleScroll = () => {
         const scrollY = window.scrollY;
         if (scrollY > 450) {
            setIsCheck(false)
            if(checkType===false){
               setHeightDiv(520)
            }else{
               setHeightDiv(300)
            }
         } else {
            setIsCheck(true)
            if(checkType===false){
               setHeightDiv(720)
            }else{
               setHeightDiv(500)
            }
         }
      };
      const handleActivityKey=()=>{
            if(check===false){
               setCheck(true)
               setAcctiveKey(countActivityKey)
            }else{
               setCheck(false)
               setAcctiveKey([])
            }
      }
      const handleCart= async ()=>{
         const result = await createUserCart(product?.id)
         if(result.statusCode === "200"){
            notification.success({
               message:"Đã thêm thành công vào giỏ hàng!!!",
               description:"Hãy đi đến giỏ hành để xem sản phẩm!!!"
           })
         router.refresh()
         }
      }
      useEffect(()=>{
        handleHour()
        setCurrentCourse({...currentCourse,isCourse:true})
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
      },[])
      return(
         <div style={{position:'relative',top:0}}>
            <HeaderDetail product={product?product:null} />
            <div style={{width:'auto',height:310,background:'#303030',position:'relative'}}>
               <div style={{width:'auto',display:'flex',height:'auto',margin:'0 215px 0 215px',justifyContent:'space-between'}}>
                     <div style={{width:'62%',margin:'30px 0 30px 0'}}>
                         <div style={{color:'#B0E0E6',fontSize:17}}>
                            Phát triển <RightOutlined style={{fontSize:9,padding:'0 5px 0 5px',color:'white'}}/> Phát triển web <RightOutlined style={{fontSize:9,padding:'0 5px 0 5px',color:'white'}}/> {product?.nameTitle}
                         </div>
                         <div style={{color:'white',fontSize:30,marginTop:'15px',fontFamily:'Arial Black'}}> 
                            {product?.productName}
                          </div>
                          <div style={{color:'white',marginTop:'15px',fontSize:23,fontFamily:'Tahoma'}}>
                            {product?.description}
                          </div>
                          <div style={{display:'flex',gap:'10px',marginTop:'25px'}}>
                             <div style={{color:'#D2691E'}}>{product?.evaluate}</div>
                             <div>
                               <ConfigProvider
                                  theme={{
                                     token:{
                                     marginXS:3
                                     }
                                  }}     
                               >
                                  <Rate disabled defaultValue={product?.evaluate} style={{fontSize:14,color:'#D2691E'}}/>
                               </ConfigProvider>
                             </div>
                             <div style={{color:'#B0E0E6',textDecoration:'underline'}}>(100 xếp hạng)</div>
                             <div style={{color:'white'}}>{convertToDecimalString(product?.numberStudents)} học viên</div>
                          </div>
                          <div style={{display:'flex',gap:'8px',marginTop:'10px',}}>
                             <div style={{color:'white'}}>
                                Được tạo bởi 
                             </div>
                             <div style={{color:'#B0E0E6',textDecoration:'underline'}}>
                                {product?.author}  
                            </div>  
                          </div>
                          <div style={{display:'flex',gap:'10px',marginTop:'8px',color:'white',}}>
                             <SyncOutlined />
                             <div>Lần cập nhật gần nhất 1/1/2023</div>
                             <GlobalOutlined />
                             <div>Tiếng việt</div>
                          </div>
                          <div style={{display:'flex',gap:'10px',color:'white',marginTop:'10px',}}>
                             <ProfileOutlined />
                             <div>Tiếng anh, Tiếng trung, Tiếng việt [Tự Động]</div>
                          </div>    
                     </div>
                     <div style={{background:'white',width:345,height: heightDiv,border:'1px solid #DCDCDC',borderRadius:'4px',position:isCheck ===true ? 'relative' : 'fixed',zIndex:isCheck===true ? 3 : 6,marginTop: isCheck===true ? '35px' : '-50px',left:isCheck===true ? 0 : 960}}>
                        { isCheck === true 
                         ?
                         <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${product?.fileName}`} width={345} height={190}/>
                         :
                         <></>
                        }
                        { isCheck === true
                         ?
                         <div style={{width:'100%',display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px',alignItems:'center',position:'absolute',zIndex:1,top:70}}>
                            <div>
                              <Button shape="circle" style={{background:'white',width:60,height:60}}><CaretRightOutlined style={{fontSize:45,marginLeft:4}}/></Button>
                            </div>
                            {
                               checkType === false ? 
                               <div style={{color:'white',fontSize:23}}>
                                 Xem trước khóa học này
                               </div>
                               :
                               <></>
                            }
                         </div>
                         :
                         <></>
                        }
                         <div style={{margin:'20px 20px 0 20px'}}>   
                              {checkType === false ?
                              <div>
                              <div style={{fontSize:30,fontWeight:'bold'}}>{convertToDecimalString(product?.price)} VNĐ</div>
                              <div style={{display:'flex',justifyContent:'space-between',height:48,marginTop:'18px'}}>
                                 <div style={{background:'#8A2BE2',width:'80%',display:'flex',justifyContent:'center',alignItems:'center',fontSize:19,color:'white',borderRadius:'4px'}}>
                                    {checked===true ? <div onClick={()=>router.push('/carts')} style={{cursor:'pointer'}}>Chuyển đến giỏ hàng</div> : <div onClick={handleCart} style={{cursor:'pointer'}}>Thêm vào giỏ hàng</div>}
                                 </div>
                                 <div style={{border:'1px solid black',width:'17%',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'4px'}}>
                                    <HeartOutlined style={{fontSize:21}}/>
                                 </div>
                              </div>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid black',height:48,marginTop:'10px',borderRadius:'4px',cursor:"pointer"}} onClick={()=>router.push(`/payment/one/${product?.id}`)}>
                                 Mua ngay
                              </div>
                              <div style={{textAlign:'center',marginTop:'16px',fontSize:14}}>
                                 Đảm bảo hoàn tiền trong 30 ngày
                              </div>
                              </div>
                              :
                              <></>
                               }
                              <div style={{marginTop:'18px',fontWeight:'bold',fontSize:18}}>
                                 Khóa học này bao gồm:
                              </div>
                              <div style={{marginTop:'13px'}}>
                                  <div style={{display:'flex',gap:'13px'}}>
                                    <DesktopOutlined/>
                                    <div style={{fontSize:16}}>
                                      {!isNaN(totalDurationInHours) ? totalDurationInHours.toFixed(2) : 40} giờ video theo yêu cầu
                                    </div>
                                  </div>
                                  <div style={{display:'flex',gap:'13px',marginTop:'10px'}}>
                                    <FileOutlined/>
                                    <div style={{fontSize:16}}>
                                       10 bài viết
                                    </div>
                                  </div>
                                  <div style={{display:'flex',gap:'13px',marginTop:'10px'}}>
                                    <DownloadOutlined />
                                    <div style={{fontSize:16}}>
                                       40 tài nguyên có thể tải xuống
                                    </div>
                                  </div>
                                  <div style={{display:'flex',gap:'13px',marginTop:'10px'}}>
                                    <MobileOutlined />
                                    <div style={{fontSize:16}}>
                                       Truy cập thiết bị di động và tivi
                                    </div>
                                  </div>
                                  <div style={{display:'flex',gap:'13px',marginTop:'10px'}}>
                                    <RetweetOutlined />
                                    <div style={{fontSize:16}}>
                                       Quyền truy cập đầy đủ suốt đời
                                    </div>
                                  </div>
                                  <div style={{display:'flex',gap:'13px',marginTop:'10px'}}>
                                    <TrophyOutlined />
                                    <div style={{fontSize:16}}>
                                       Giấy chứng nhận hoàn thành
                                    </div>
                                  </div>
                              </div>
                              <div style={{marginTop:'16px',display:'flex',fontSize:17,justifyContent:'center',gap:'60px',fontWeight:'bold',textDecoration:'underline',textUnderlineOffset:'0.3em'}}>
                                  <div>
                                       Chia sẻ
                                  </div>
                                  <div>
                                       Tặng khóa học này
                                  </div>
                              </div>
                              <div style={{marginTop:'13px',textAlign:'center',fontSize:17,textDecoration:'underline',fontWeight:'bold',textUnderlineOffset:'0.3em'}}>
                                   Áp dụng coupon
                              </div>
                         </div>
                     </div>
               </div>
            </div>
            <div style={{width:'auto',height:'auto',margin:'35px 215px 0 215px'}}>
                <div style={{width:'64%',height:'auto',border:'1px solid #B8B8B8',borderRadius:'4px'}}>
                   <div style={{margin:'30px 20px 30px 20px',fontSize:27,fontWeight:'bold'}}>Nội dung bài học {lesson?.title.length! <= 0 ? "(Khóa này đang cập nhật)" : ""}</div>
                   <CourseLesson lesson={lesson ? lesson : null}/>
                </div>
                <div style={{width:'64%',height:'auto',border:'1px solid #B8B8B8',borderRadius:'4px',marginTop:'35px'}}>
                  <div style={{margin:'20px 20px 20px 20px'}}>
                    <div style={{fontSize:19,fontWeight:'bold'}}>
                       Các công ty hàng đầu cung cấp khóa học này cho nhân viên
                    </div>
                    <div style={{opacity:0.8,marginTop:6}}>
                       Chúng tôi lựa chọn khóa học này cho tuyển tập khóa học đầu bảng được các doanh nghiệp toàn cầu tin dùng. Tìm hiểu thêm
                    </div>
                    <div style={{display:'flex',marginTop:'20px',fontSize:50,justifyContent:'space-around'}}>
                       <AppleOutlined />
                       <WindowsOutlined />
                       <GithubOutlined />
                       <AliwangwangOutlined />
                    </div>
                  </div>
                </div>
                <div style={{width:'64%',height:'auto',marginTop:'35px'}}>
                       <div style={{fontSize:27,fontWeight:600}}>Nội dung khóa học  {videos?.length! <= 0 ? "(Khóa này đang cập nhật)" : ""}</div>
                       <div style={{display:'flex',marginTop:'35px',fontSize:17,justifyContent:"space-between"}}>
                            <div>{countParts} phần _ {countLectures} bài giảng _ {parseInt((countMinutes/60).toString())} giờ {countMinutes-Math.floor(countMinutes/60)*60} phút tổng thời lượng</div>
                            <div style={{color:'#1E90FF',fontSize:18}} onClick={handleActivityKey}>{check===false ?  `Mở rộng tất cả các phần` : `Thu gọn tất cả các phần`}</div>
                       </div>
                </div>
                <div style={{width:'64%',height:'auto',border:'1px solid #B8B8B8',borderRadius:'3px',marginTop:'10px'}}>
                       <CollapseDetail videos={videos ? videos : videos} activeKey={activeKey} setAcctiveKey={setAcctiveKey}/>
                </div>
                <div style={{width:'64%',height:'auto',marginTop:'35px'}}>
                     <div style={{fontSize:25,fontWeight:'bolder'}}>Yêu cầu</div>
                     <div style={{display:'flex',gap:'20px',marginTop:'20px',fontSize:17}}>
                        <CheckOutlined />
                        <div>Đã biết lập trình</div>
                     </div>
                     <div style={{display:'flex',gap:'20px',marginTop:'10px',fontSize:17}}>
                        <CheckOutlined />
                        <div>Hiểu về biết về các ngôn ngữ lập trình</div>
                     </div>
                     <div style={{display:'flex',gap:'20px',marginTop:'10px',fontSize:17}}>
                        <CheckOutlined />
                        <div>Hiểu biết về web</div>
                     </div>
                     <div style={{fontSize:25,fontWeight:'bolder',marginTop:'30px'}}>Mô tả</div>
                     <div style={{fontSize:12,marginTop:'10px'}}>*****</div>
                     <div style={{fontSize:18,marginTop:'10px',fontWeight:'bold'}}>Sử dụng công nghệ mới nhất  bla bla bla</div>
                     <div style={{marginTop:5}}>Sử dụng đan xen giữa 2 công nghệ là bla bla bla bla?</div>
                     <div style={{fontSize:12,marginTop:'10px'}}>*****</div>
                     <div>
                        Lập trình web là quá trình tạo ra các trang web hoặc ứng dụng web thông qua việc sử dụng các ngôn ngữ lập trình như HTML, CSS và JavaScript cùng với các công nghệ và framework phổ biến như React, Angular, hoặc Vue.js. Lập trình web không chỉ đơn thuần là việc viết mã nguồn mà còn là quá trình thiết kế, phát triển, và triển khai các ứng dụng trên nền tảng internet.
                     </div>
                     <div style={{marginTop:5}}>
                        HTML (HyperText Markup Language) là ngôn ngữ cơ bản được sử dụng để định nghĩa cấu trúc của một trang web. Nó định nghĩa các thành phần như tiêu đề, đoạn văn bản, hình ảnh, và các liên kết.
                     </div>
                     <div style={{marginTop:5}}>
                        CSS (Cascading Style Sheets) được sử dụng để định dạng và trang trí các phần tử HTML. CSS cho phép lập trình viên tạo ra giao diện đồ họa, điều chỉnh màu sắc, kích thước và bố cục của các phần tử trên trang web.
                     </div>
                     <div style={{marginTop:25,fontSize:25,fontWeight:'bolder'}}>Giảng viên</div>
                     <div style={{marginTop:17,fontSize:20,color:'blue',textDecoration:'underline'}}>{product?.author}</div>
                     <div style={{marginTop:10,fontSize:17}}>Professional Software Developer</div>
                     <div style={{display:'flex',gap:30,marginTop:20}}>
                         <div style={{fontSize:100}}><GithubOutlined /></div>
                         <div style={{display:'flex',flexDirection:'column',gap:10}}>
                         <div style={{display:'flex',gap:15}}>
                            <StarOutlined />
                            <div>4.6 xếp hạng đánh giá</div>
                         </div>
                         <div style={{display:'flex',gap:15}}>
                            <ThunderboltOutlined />
                            <div>5111 đánh giá</div>
                         </div>
                         <div style={{display:'flex',gap:15}}>
                            <TeamOutlined />
                            <div>3000 học viên</div>
                         </div>
                         <div style={{display:'flex',gap:15}}>
                            <PlayCircleOutlined />
                            <div>6 khóa học</div>
                         </div>
                         </div>
                     </div>
                </div>
                <div style={{marginTop:35,width:'64%',display:'flex',gap:10}}>
                    <div>
                    <ConfigProvider
                        theme={{
                           token:{
                           marginXS:3
                        }}}     
                     >
                        <Rate disabled defaultValue={product?.evaluate} style={{fontSize:20,color:'#D2691E'}}/>
                    </ConfigProvider>
                    </div>
                    <div style={{fontSize:20,marginTop:-1}}>{product?.evaluate} xếp hạng khóa học</div>
                    <div style={{fontSize:25,marginTop:-5}}>. 700 xếp hạng khóa học</div>
                </div>
                <div style={{marginTop:35,width:'60%',display:'flex',flexWrap:"wrap",justifyContent:'space-between'}}>
                    {comments.map((item,index)=>{
                     return(
                        <div key={index} style={{flexBasis:'45%'}}>
                           <Divider style={{marginRight:index % 2 === 0 ? 20 : 0}}/>
                           <div style={{display:'flex',gap:15}}> 
                              <Avatar style={{background:'black',fontSize:17}}size={40}>{item.userName.slice(0,2)}</Avatar>
                              <div style={{display:'flex',flexDirection:'column',gap:4,width:130}}>
                                 <div style={{fontWeight:'bolder',fontSize:17}}>{item.userName}</div>
                                 <div>
                                    <ConfigProvider
                                       theme={{
                                          token:{
                                          marginXS:3
                                       }}}     
                                    >
                                       <Rate disabled defaultValue={item?.evaluate} style={{fontSize:14,color:'#D2691E'}}/>
                                    </ConfigProvider>
                                 </div>
                              </div>
                              <div style={{fontSize:14}}>
                                  {dayjs(item?.createdAt).fromNow()}
                              </div>
                           </div>
                           <div style={{marginTop:20,fontSize:17,fontFamily:'sans-serif'}}>{item.title}</div>
                        </div>   
                     )
                    })}
                </div>
                {
                  checkType === true ? 
                  <div style={{marginTop:35,width:'64%',display:'flex',gap:20}}>
                    <EditOutlined style={{fontSize:25}}/>
                    <Button onClick={()=>setIsModalOpen(true)} style={{height:45}}>Thêm bình luận của bạn!</Button>
                  </div>
                  :
                  <></>
                }
            </div>
            <ModalComment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} productId={product?.id ? product.id : ''}/>
         </div>
      )
}
export default CourseDetail
