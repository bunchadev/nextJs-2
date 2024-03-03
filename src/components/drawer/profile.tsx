'use client'
import Divider from "antd/es/divider"
import Drawer from "antd/es/drawer"
import { useSession } from "next-auth/react"
interface Iprops{
    open:boolean,
    setOpen:(v: boolean) => void,
    myMoney:number
}
const Profile=(props: Iprops)=>{
    const {data:session} = useSession()
    const {open,setOpen, myMoney} = props
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    return(
        <Drawer onClose={onClose} open={open} width={500} closable={false}>
            <div style={{marginTop:20}}>
                <div style={{fontSize:20,marginTop:20}}>User profile</div>
                <div style={{fontSize:17,marginTop:30}}>Personal</div>
                <div style={{display:'flex',flexWrap:"wrap",marginTop:20}}>
                    <div style={{width:150}}>User Name: {session?.user.userName}</div>
                    <div style={{marginLeft:100}}>Account: {session?.user.email}</div>
                    <div style={{marginTop:15,width:150}}>City: Nam Định</div>
                    <div style={{margin:"15px 0 0 100px"}}>Country: Việt Nam yyy</div>
                    <div style={{margin:"15px 0 0 0",width:200}}>Birthday: January 23,2003</div>
                    <div style={{margin:"15px 0 0 50px"}}>Website: XXX</div>
                    <div style={{marginTop:25,fontSize:18}}>Số dư tài khoản TrungAcademy: {myMoney.toLocaleString('vi-VN')} VNĐ</div>
                </div>
                <Divider/>
                <div>
                  <div style={{fontSize:17}}>Company</div>
                  <div style={{display:'flex',flexWrap:"wrap",marginTop:20}}>
                    <div>Position: DevOps</div>
                    <div style={{marginLeft:140}}>Responsibilities: Coding</div>
                    <div style={{marginTop:15}}>Department: XXXTech</div>
                    <div style={{margin:"15px 0 0 110px"}}>Supervisor: Xiao</div>
                    <div style={{marginTop:15}}>Skills: C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc. (ko phai toi)</div>
                  </div>
                </div>
                <Divider/>
                <div>
                  <div style={{fontSize:17}}>Contracts</div>
                  <div style={{display:'flex',flexWrap:"wrap",marginTop:20}}>
                    <div>Email: {session?.user.email}</div>
                    <div style={{marginLeft:100}}>Phone Number: {session?.user.phoneNumber}</div>
                    <div style={{marginTop:15}}>GitHub: trungdev@github.com</div>
                  </div>
                </div>
            </div>
        </Drawer>
    )
}
export default Profile