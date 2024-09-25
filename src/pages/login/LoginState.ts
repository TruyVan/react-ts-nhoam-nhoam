import { makeAutoObservable } from "mobx";
import { toastMsg } from "../../utilities/helpers/ToastHelper";
import { loginService } from "./LoginService";
import { storageService } from "../../utilities/service/StorageService";

class LoginState{
    isLogginIn: boolean = true;
    email: string = '';
    password: string = '';
    confirmed_password: string = '';
    apiHandlingStatus: boolean = false;
    constructor(){
        makeAutoObservable(this)
    }
    async loginAction(navigate:any){
        this.apiHandlingStatus = true;
        const userData = {email: this.email, password: this.password}
        const response = await loginService.login(userData);
        this.apiHandlingStatus = false;
        if(response.error){
            if(response.error.code === "email_not_confirmed"){
                toastMsg.info('Vui lòng kiểm tra email và xác nhận tài khoản để hoàn tất quá trình đăng ký!', '');
            }
            if(response.error.code === "invalid_credentials"){
                toastMsg.error('Vui lòng kiểm tra lại thông tin đăng nhập!', '');
            }
            return -1;
        }
        else{
            console.log(response.data)
            const accessToken = response.data.session.access_token;
            const refreshToken = response.data.session.refresh_token;
            storageService.setAccessToken(accessToken);
            storageService.setRefreshToken(refreshToken);
            toastMsg.success('Đăng nhập thành công!', '');
            navigate('/')
        }
    }
    async signupAction(){
        this.apiHandlingStatus = true;
        if(this.password !== this.confirmed_password){
            toastMsg.error('Mật khẩu và Xác nhận mật khẩu không khớp nhau!', '')
            this.apiHandlingStatus = false;
            return -1;
        }
        else{
            //api call
            const userData = {email: this.email, password: this.password}
            const response = await loginService.signUp(userData);
            this.apiHandlingStatus = false;
            if(response.error){
                if(response.error.code === "weak_password"){
                    toastMsg.error('Mật khẩu yếu, vui lòng chọn mật khẩu mạnh hơn!', '');
                }
                else if(response.error.code === "User already registered"){
                    toastMsg.error('Email đã tồn tại!', '');
                }
                else{
                    toastMsg.error(`${response.error.message}`, '');
                }
                return -1;
            }
            else{
                toastMsg.success('Đăng ký thành công!', '');
                this.isLogginIn = true;
            }
        }
    }
}
export const loginState = new LoginState()