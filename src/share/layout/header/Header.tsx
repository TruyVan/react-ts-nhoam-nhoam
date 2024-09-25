import { Button, Dropdown, Menu} from 'antd';
import {
    BookOutlined,
    FireOutlined,
    TeamOutlined,
    HomeOutlined,
    MenuOutlined,
  } from '@ant-design/icons';
import './header.css'
import { Link } from 'react-router-dom';
import { headerState } from './HeaderState';
import { observer } from 'mobx-react';
import type { MenuProps } from 'antd';
import { storageService } from '../../../utilities/service/StorageService';
import { useState } from 'react';
const Header = ()=>{
    const itemValue = storageService.getSelectedItemInMainMenu();
    headerState.selectedMainMenuItem = itemValue? itemValue : 'home';
    const mobileMenuItems: MenuProps['items'] = 
    [   
        {key: '1',
        label: (<Link to={'/'}>Trang chủ</Link>),
        icon: <HomeOutlined/>},
        {key: '2',
        label: (<Link to={'/menu'}>Thực đơn</Link>),
        icon: <BookOutlined/>},
        {key: '3',
        label: (<Link to={'/about'}>Giới thiệu</Link>),
        icon: <TeamOutlined/>},
        {key: '4',
        label: (<Link to={'/discount'}>Khuyến mại</Link>),
        icon: <FireOutlined/>},
        {key: '5',
        label: (<Button type='primary' danger><Link to={'/login'}>Đăng nhập</Link></Button>)}
    ]
    return(
    <header className="header container mx-auto py-3">
        <Link to={'/'} className="header-logo" onClick={()=>{storageService.setMealType('all'); headerState.selectedMainMenuItem = 'home'; storageService.setSelectedItemInMainMenu('home')}}>
            <h1 className='text-4xl font-extrabold text-signature'>Nhoằm nhoằm</h1>
        </Link>
        <div className="header-menu flex-1 max-lg:hidden">
            <Menu className="header-menu-content max-lg:hidden" mode='horizontal' selectedKeys={[headerState.selectedMainMenuItem!]} onClick={(event)=>{headerState.handleSelectedItemMenu(event.key); storageService.deleteMealType()}}>
                <Menu.Item icon={<HomeOutlined/>} key={'home'} className="header-menu-item text-base">
                    <Link to={'/'}>Trang chủ</Link>
                </Menu.Item>
                <Menu.Item icon={<BookOutlined/>} key={'menu'} className="header-menu-item text-base">
                    <Link to={'/menu'}>Thực đơn</Link>
                </Menu.Item>
                <Menu.Item icon={<TeamOutlined/>} key={'about'} className="header-menu-item text-base">
                    <Link to={'/about'}>Giới thiệu</Link>
                </Menu.Item>
                <Menu.Item icon={<FireOutlined/>} key={'discount'} className="header-menu-item text-base">
                    <Link to={'/discount'}>Khuyến mại</Link>
                </Menu.Item>
            </Menu>
        </div>
        <div className="header-action max-lg:hidden">
            <Button type='primary' danger><Link to={'/login'}>Đăng nhập</Link></Button>
        </div>
        <Dropdown menu={{items: mobileMenuItems}} placement='bottomRight' overlayClassName='header-menu--mobile'>
            <Button className='lg:hidden' icon={<MenuOutlined/>} danger ghost></Button>
        </Dropdown>
    </header>)
}
export default observer(Header)