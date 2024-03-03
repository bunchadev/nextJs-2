'use client'

import { createComment } from "@/utils/actions/action";
import { message } from "antd";
import ConfigProvider from "antd/es/config-provider";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal"
import Rate from "antd/es/rate";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface IProps{
    isModalOpen: boolean,
    setIsModalOpen:(v: boolean) => void,
    productId:string
}
const ModalComment=(props: IProps)=>{
    const {isModalOpen, setIsModalOpen,productId} = props
    const [title,setTitle] = useState<string>('')
    const [value, setValue] = useState(3);
    const desc = ['terrible', 'như cc', 'normal', 'good', 'wonderful'];
    const router = useRouter()
    const handleOk = async () => {
      if(title.length > 0){
        const result = await createComment(productId,title,value)
        if(result){
            setTitle('')
            setIsModalOpen(false);
            router.refresh()
        }
      }else{
        message.info('Làm ơn hãy nhập bình luận của bạn')
      }
    };
    const handleCancel = () => {
        setTitle('')
        setIsModalOpen(false);
    };
    return(
        <Modal title="Thêm bình luận của bạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <TextArea
            value={title}
              showCount
              maxLength={100}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Nhập tại đây!"
              style={{ height: 100, resize: 'none' }}
            />
             <ConfigProvider
                        theme={{
                           token:{
                           marginXS:3
                        }}}     
                     >
                <Rate tooltips={desc} onChange={setValue} value={value} style={{fontSize:23,color:'#D2691E',marginTop:20}}/>
            </ConfigProvider>
        </Modal>
    )
}
export default ModalComment