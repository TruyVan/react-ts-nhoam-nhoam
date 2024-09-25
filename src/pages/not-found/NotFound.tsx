import { Button } from 'antd';
import './not-found.css'
import { Link } from 'react-router-dom';
import { storageService } from '../../utilities/service/StorageService';
import { headerState } from '../../share/layout/header/HeaderState';
const NotFound = ()=>{
    return (
    <div className="not-found">
        <img src="/assets/img/photos/login-background.jpg" alt="" />
        <div className="content flex flex-col justify-center items-center">
            <div className="img relative">
                <div className='z-10 w-80 h-80 absolute opacity-40 flex flex-col justify-center'><div className='text-9xl font-bold h-fit text-center'>404</div></div>
                <img className='w-80 h-80' src="/assets/img/photos/404.gif" alt="" />
            </div>
            <div className="text-center pt-10">
                <h1 className="text-5xl font-bold">Trang bạn tìm kiếm không tồn tại</h1>
                <div className='pt-2'><span className='text-signature text-3xl font-bold'>Nhoằm nhoằm</span> xin lỗi bạn vì sự bất tiện này</div>
            </div>
            <div className="action pt-2">
                <Link to={'/'} onClick={()=>{storageService.setMealType('all'); headerState.selectedMainMenuItem = 'home'; storageService.setSelectedItemInMainMenu('home')}}><Button type='primary' danger>Bấm để trở về trang chủ</Button></Link>
            </div>
        </div>
    </div>)
}

export default NotFound;