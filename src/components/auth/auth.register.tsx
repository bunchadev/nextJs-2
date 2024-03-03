'use client'
import UserOutlined  from '@ant-design/icons/UserOutlined';
import LockOutlined  from '@ant-design/icons/LockOutlined';
import PhoneOutlined  from '@ant-design/icons/PhoneOutlined';
import MailOutlined  from '@ant-design/icons/MailOutlined';
import '../../styles/login.scss'
import Divider from 'antd/es/divider';
import Button from 'antd/es/button/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/utils/actions/action';
interface FieldType {
    userName?: string;
    password?: string;
    phoneNumber: string;
    email: string;
}
const RegisterForm = () => {
    const router = useRouter()
    const [isSubmit,setIsSubmit] = useState<boolean>(false)
    const onFinish = async (value: FieldType) => {
        setIsSubmit(true)
        if(value?.password?.length! < 5){
            message.error('Mật khẩu phải lớn hơn 5 kí tự')
            setIsSubmit(false)
        }else{
            const res = await registerUser(value)
            if(res.statusCode==='200'){
                message.success("Đăng ký thành công!!!")
                setIsSubmit(false)
                router.push('/auth/signin')
            }else{
                setIsSubmit(false)
                message.error("Tài khoản đã bị trùng!!!")
            }
        }
    };
    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng ký</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                name="userName"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{ height: '50px' }} />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    style={{ height: '50px' }}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please input your PhoneNumber!' }]}
                            >
                                <Input
                                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    placeholder="NumberPhone"
                                    style={{ height: '50px' }}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                    style={{ height: '50px' }}
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: "100%",
                                        height: '40px',
                                        marginTop: '10px'
                                    }}
                                loading={isSubmit}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider/>
                        <div style={{marginLeft:100,cursor:'pointer'}}>
                            <Link href={'/auth/signin'} style={{color:'blue',textDecoration:'none'}}>Bạn đã có tài khoản ? login</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
export default RegisterForm