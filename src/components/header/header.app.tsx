'use client'
import Layout from 'antd/es/layout';
import Input from "antd/es/input/Input";
import SearchOutlined  from '@ant-design/icons/SearchOutlined';
import HeartOutlined  from '@ant-design/icons/HeartOutlined';
import ShoppingCartOutlined   from '@ant-design/icons/ShoppingCartOutlined';
import BellOutlined  from '@ant-design/icons/BellOutlined';
import Avatar from 'antd/es/avatar/avatar';
import { useCourseContext } from '@/lib/course.wrapper';
import './app.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sendRequest } from '@/utils/api';
import { useSession,signOut, } from 'next-auth/react';
import notification from 'antd/es/notification';
import Popover from 'antd/es/popover';
import Profile from '../drawer/profile';
import { refreshMyToken } from '@/utils/actions/action';
const { Header } = Layout;
const HeaderApp=()=>{
    const { currentCourse} = useCourseContext() as ICourseContext
    const {data:session,update} = useSession()
    const [search,setSearch] = useState<string>("")
    const [open, setOpen] = useState(false);
    const [myPrice,setMyPrice] = useState<number>(1000)
    const router = useRouter()
    const handleProfile= async ()=>{
        const updated = await refreshMyToken();
        if(updated.data){
            setOpen(true)
            setMyPrice(updated.data.user.money)
        }
    }
    const handleSearch= async () =>{
        if(search !== ''){
              router.push(`/search?q=${search}`)
              await sendRequest<IBackendRes<any>>({
                url: '/api/revalidate',
                method:'POST',
                queryParams:{
                    tag:'course-by-id',
                    secret:'trungvippro23'
                }
              })
              router.refresh()
        }else{
            notification.info({
                message:"Không thể tìm thấy!!!",
                description:"Bạn phải nhập 1 kí hiệu nào đó!"
            })
        }
    }
    const handleClick=()=>{
        notification.info({
            message:"Thể loại đang được cập nhật !!!",
            description:"Các thể loại này đang trong quá trình cập nhật vui lòng chọn thể loại khác!"
        })
    }
    const handleClickIcon=()=>{
        notification.info({
            message:"Chức năng đang được cập nhật !!!",
            description:"Các chức năng này đang trong quá trình cập nhật vui lòng chọn chức năng khác!"
        })
    }
    const handleLogOut=()=>{
        signOut()
    }
    return(
        <>
            <Header style={{
                width: '100%',
                height: currentCourse.isCourse === false ? '115px' : '71px',
                background: '#FFFFFF',
                borderBottom: currentCourse.isCourse === false ? '1px solid #F0F0F0' : '',
                position:'sticky',
                zIndex:5
            }}>
                <div style={{display:'flex',marginLeft:'-34px',alignItems:'center',marginRight:"-30px",borderBottom:'1px solid #F0F0F0'}} >
                    <Link href={"/"} style={{fontSize:22,color:'black',fontWeight:'bold'}}>
                        XiaoChun
                    </Link>
                    <div style={{marginLeft:'20px'}} onClick={handleClickIcon}>
                        Thể loại
                    </div>
                    <div style={{width:620,marginLeft:'23px'}}>
                        <Input style={{borderRadius:'24px',border:'1px solid black',width:'100%',height:48,top:-8,background:'#F8F8F8'}} placeholder="Tìm kiếm nội dung bất kì" prefix={<SearchOutlined style={{fontSize:18,color:'#A0A0A0'}} onClick={handleSearch}/>} onChange={(e)=>setSearch(e.target.value)}    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                           handleSearch()
                        }}}/>
                    </div>
                    <div style={{marginLeft:'20px'}} onClick={handleClickIcon}>
                        XiaoChun Business
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <Link href={'/uploadfile'} style={{color:'black'}}>Giảng dạy trên XiaoChun</Link>
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <Link href={'/mycourse'} style={{color:'black'}}>Quá trình họ tập của tôi</Link>
                    </div>
                    {
                        session ? 
                        <>
                            <div style={{marginLeft:'20px',marginTop:'6px'}} onClick={handleClickIcon}>
                              <HeartOutlined style={{fontSize:22}}/>
                            </div>
                            <div style={{marginLeft:'20px',marginTop:'6px',cursor:'pointer'}} onClick={()=>router.push('/carts')}>
                              <ShoppingCartOutlined style={{fontSize:22}}/>
                            </div>
                            <div style={{marginLeft:'20px',marginTop:'6px'}} onClick={handleClickIcon}>
                              <BellOutlined style={{fontSize:22}}/>
                            </div>
                            <div style={{marginLeft:'20px',marginBottom:'3px'}}>
                                <Popover placement='bottom' trigger={'hover'} content={
                                        <div style={{cursor:"pointer"}}>
                                             <div onClick={handleLogOut}>Logout</div>
                                             <div style={{marginTop:10}} onClick={handleProfile}>Profile</div>                                   
                                        </div>
                                }>
                                    <Avatar style={{background:'black',verticalAlign:'middle',cursor:"pointer"}} size={35}>{session?.user?.userName ? session?.user?.userName?.slice(0,2) : ''}</Avatar>
                                </Popover>
                            </div>
                        </>
                        :
                        <Link href={'/auth/signin'} style={{marginLeft:80,fontSize:20,color:'black',fontWeight:'bold'}}>Login</Link>  
                    }
                   
                </div>
                {
                    currentCourse.isCourse === false 
                    ?
                    <div style={{display:'flex',gap:'33px',justifyContent:'center',alignItems:'center',height:44,marginLeft:'30px'}}>
                       <div>
                         <Link href={'/courses/IT'} style={{color:'red'}}>CNTT & Phần mềm</Link> 
                       </div>
                       <div>
                         <Link href={'/courses/KT'} style={{color:'red'}}>Marketing</Link>
                       </div>
                       <div>
                         <Link href={'/courses/SK'} style={{color:'red'}}>Sức khỏe & Thể dục</Link>
                       </div>
                       <div style={{display:'flex',gap:33}} onClick={handleClick}>
                       <div>Phát triển</div>
                       <div>Kinh doanh</div>
                       <div>Tài chính & Kế toán</div>
                       <div>Năng suất làm việc với Office</div>
                       <div>Phát triển cá nhân</div>
                       <div>Thiết kế</div>
                       <div>Âm nhạc</div>
                       </div>
                    </div>
                    :
                    <></>
                }
           </Header> 
           <Profile open={open} setOpen={setOpen}
                    myMoney={myPrice}
           />
        </>
    )
}
export default HeaderApp