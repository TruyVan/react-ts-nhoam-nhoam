import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './login.css'
import { loginState } from "./LoginState";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [loginForm] = Form.useForm()
    const [signupForm] = Form.useForm()
    const navigate = useNavigate()
    useEffect(()=>{
        AOS.init();
        loginForm.setFieldsValue({email: loginState.email, password: loginState.password});
        signupForm.setFieldsValue({email: loginState.email, password: loginState.password, confirmed_password: loginState.confirmed_password})
    }, [loginState.isLogginIn, loginState.email, loginState.password, loginState.confirmed_password])
    return(
        <div className="login-page pt-10">
            <div className="background -z-10"></div>
            <div className="login-content container mx-auto bg-red-500 rounded-tl-full rounded-br-full px-24 py-5">
                <div className="login-form-content text-2xl text-center pb-7 z-10">
                    {loginState.isLogginIn === true ?
                    (<strong className="text-2xl font-bold pt-1 ps-2 text-white">Đăng nhập</strong>):
                    (<strong className="text-2xl font-bold pt-1 ps-2 text-white">Đăng ký</strong>) }
                </div>
                <Form onFinish={()=>{loginState.loginAction(navigate)}} form={loginForm} data-aos="fade-up" data-aos-once="true" className={loginState.isLogginIn === true? "login-form": "login-form hidden"}>
                    <Form.Item name="email" label="" rules={[{required: true, message: 'Vui lòng điền email'}]}>
                        <Input onChange={(value)=>{loginState.email = value.target.value}} placeholder="Email" prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true, message: 'Vui lòng điền mật khẩu'}]}>
                        <Input.Password onChange={(value)=>{loginState.password = value.target.value}}  placeholder="Mật khẩu" prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Button htmlType="submit" loading={loginState.apiHandlingStatus}>Đăng nhập</Button>
                </Form>
                <Form onFinish={()=>{loginState.signupAction()}} form={signupForm} data-aos="fade-up" data-aos-once="true" className={loginState.isLogginIn === true? "login-form hidden": "login-form"}>
                    <Form.Item name="email" rules={[{required: true, message: 'Vui lòng điền email'}]}>
                        <Input onChange={(value)=>{loginState.email = value.target.value}} placeholder="Email" prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true, message: 'Vui lòng điền mật khẩu'}]}>
                        <Input.Password onChange={(value)=>{loginState.password = value.target.value}} placeholder="Mật khẩu" prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Form.Item name="confirmed_password" rules={[{required: true, message: 'Vui lòng điền xác nhận mật khẩu'}]}>
                        <Input.Password onChange={(value)=>{loginState.confirmed_password = value.target.value}} placeholder="Xác nhận mật khẩu" prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Button htmlType="submit" loading={loginState.apiHandlingStatus}>Đăng ký</Button>
                </Form>
                {loginState.isLogginIn === true ?
                    (<div className="text-white pt-2">Bạn chưa có tài khoản? <a href="#" className="underline cursor-pointer" onClick={()=>{loginState.isLogginIn = !loginState.isLogginIn; loginState.password = '';loginState.confirmed_password = ''}}>Đăng ký ngay</a></div>):
                    (<div className="text-white pt-2">Bạn đã có tài khoản? <a href="#" className="underline cursor-pointer" onClick={()=>{loginState.isLogginIn = !loginState.isLogginIn; loginState.password = '';loginState.confirmed_password = ''}}>Đăng nhập ngay</a></div>) }
                
            </div>
            <div className="text-center pt-7 z-10">
                <span className="w-full">Thưởng thức món ngon từ hàng ngàn quán ăn ngay tại nhà trên</span>
                <strong className="text-signature text-2xl font-extrabold pt-1 ps-2"><em>Nhoằm nhoằm</em></strong>
            </div>
        </div>
    )
}
export default observer(Login);