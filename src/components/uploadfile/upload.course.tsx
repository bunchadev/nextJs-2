'use client'
import Dragger from "antd/es/upload/Dragger"
import InboxOutlined  from '@ant-design/icons/InboxOutlined';
import message from "antd/es/message";
import { UploadProps } from "antd/es/upload";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import Progress from "antd/es/progress/progress"
import Select from "antd/es/select";
import { useEffect, useState } from "react";
import { createProduct, uploadFile } from "@/utils/actions/action";
import notification from "antd/es/notification";
import { useCourseContext } from "@/lib/course.wrapper";
import { useRouter } from "next/navigation";
const UploadCourse=()=>{
    const [percent, setPercent] = useState<number>(0);
    const [checkInput,setCheckInput] = useState<boolean>(true)
    const [checkImage,setCheckImage] = useState<boolean>(false)
    const [nameImage,setNameImage] = useState<string>("")
    const [checkDagger,setDragger] = useState<boolean>(false)
    const [info, setInfo] = useState<any>(null); 
    const router = useRouter()
    const { currentCourse,setCurrentCourse } = useCourseContext() as ICourseContext
    const clearInfo = () => {
      setInfo(null); 
    };
    const props: UploadProps = {
        name: 'file',
        multiple:false,
        beforeUpload: file => {
          setPercent(0);
          return true;
        },
        async onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            const percent = Math.round((info.file.percent || 0) * 100) / 100;
            setPercent(percent);
          }
          if (status === 'done') {
            setDragger(true)
            setNameImage(info.file.name)
            if (info.file) {
                const formData = new FormData();
                formData.append('file', info.file.originFileObj as Blob);
                const result = await uploadFile(formData)
                if(result.statusCode==="200"){
                  setCheckImage(true)
                  setCheckInput(false)
                  message.success(`${info.file.name} file uploaded successfully.`);
                }else if(result.statusCode==="400"){
                  message.error("Ảnh đã tồn tại hãy chọn ảnh khác!!!")
                  setNameImage("")
                  setPercent(0);
                  setDragger(false)
                  clearInfo()
                }
            }
         
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop:file=> {
          setInfo(file)
        }
    };
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        if(values.option.length < 0){
          message.error('Hãy chọn thể loại cho khóa học của bạn!!!')
        }
        else if(values.price < 100000){
          notification.error({
            message: `Giá phải lớn hơn ${100.000} VNĐ`,
            description:"Làm ơn hãy nhập lại giá!!!"
        })
        } else {
          const result = await createProduct(values.name,values.description,values.price,values.option,nameImage)
          if(result.statusCode==="200"){
            message.success("Tạo mới thành công!!!")
            router.push('/mycourse')
          }else if(result.statusCode==="400"){
            message.error("Tạo mới không thành công!!!")
          }
        }
    };
    useEffect(()=>{
      setCurrentCourse(({...currentCourse,isCourse:true}))
    },[])
    return(
        <div style={{marginBottom:105}}>
        <div style={{margin:"50px 200px 0 200px",}}>
            <div style={{fontSize:30}}>Upload khóa học của bạn</div>
            <div style={{marginTop:40,fontSize:17}}>{nameImage}</div>
        <Progress percent={percent} />
        <div style={{marginTop:40,display:'flex',position:"relative"}}>
           <Dragger {...props} disabled={checkDagger} style={{width:380,height:250}} showUploadList={false}>
             <p className="ant-upload-drag-icon">
               <InboxOutlined />
             </p>
             <p className="ant-upload-text">Nhấp hoặc kéo tệp vào !!!</p>
             <p className="ant-upload-hint">
                Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ liệu công ty hoặc các thông tin khác
                tập tin bị cấm.
             </p>
           </Dragger>
           <div style={{width:'70%'}}>
                {
                    checkImage === true ?
                    <div style={{position:'absolute',left:0}}>
                      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/${nameImage}`} width={382} height={290}/>
                    </div>
                    :
                    <></>
                }
                <div style={{width:'60%',marginLeft:50}}>
                 <Form form={form} onFinish={onFinish} name="basic">
                  <Form.Item name="name"  rules={[{ required: true, message: 'Please input Productname!' }]}>
                     <Input placeholder="Tên sản phẩm" style={{height:'36px'}} disabled={checkInput}/>
                  </Form.Item>
                  <Form.Item name="description"  rules={[{ required: true, message: 'Please input Description!' }]} >
                     <Input placeholder="Mô tả sản phẩm" style={{height:'36px'}}  disabled={checkInput}/>
                  </Form.Item>
                  <Form.Item name="option" wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 8, offset: 0 } }} >
                     <Select placeholder="Thể loại" disabled={checkInput}>
                       <Select.Option value="IT">IT</Select.Option>
                       <Select.Option value="KT">KT</Select.Option>
                       <Select.Option value="SK">SK</Select.Option>
                     </Select>
                  </Form.Item>
                  <Form.Item name="price" rules={[{ type: 'number', min: 100000, max: 1000000 }]} >
                    <InputNumber placeholder="Giá" disabled={checkInput}/>
                  </Form.Item>
                  <Form.Item>        
                    <Button htmlType="submit" disabled={checkInput}>Save</Button>
                  </Form.Item>
                 </Form>
                </div>
            </div>
        </div>
            <Divider style={{marginTop:40}}/>
        </div>
        </div>
    )
}
export default UploadCourse