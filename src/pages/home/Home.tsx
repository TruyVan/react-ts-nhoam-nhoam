import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import './home.css'
import { Button, Input, Space } from "antd";
import { homeState } from "./HomeState";
import { PlusOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import NoContent from "../../share/misc/NoContent";
import { Link } from "react-router-dom";
import Loading from "../../share/misc/Loading";
import { storageService } from "../../utilities/service/StorageService";
import { headerState } from "../../share/layout/header/HeaderState";

const Home = ()=>{
    useEffect(()=>{
        // homeState.handleLocationGetting();
        homeState.getDishByMealType();
        homeState.getDishListFromLocalStorage();
    },[])
    return(
        <div className="home">
            <main className="container mx-auto">
                <div className="banner-section overflow-hidden rounded-tl-3xl rounded-br-3xl">
                    <div className="banner-background"></div>
                    <div className="grid grid-cols-2 banner-content">
                        <div className="column banner-text flex flex-col items-center justify-center h-full">
                            <div className="text-2xl text-center z-10">
                                <span className="w-full">Thưởng thức món ngon ngay tại nhà trên</span>
                                <br />
                                <strong className="text-signature text-4xl font-extrabold pt-1"><em>Nhoằm nhoằm</em></strong>
                            </div>
                            <div className="container">
                            <Space.Compact className="container m-5" style={{ width: '100%' }}>
                                <Input className="p-2" placeholder="Nhập tên món ăn"/>
                                <Button className="p-5" type="primary" danger><SearchOutlined/></Button>
                            </Space.Compact>
                            </div>
                        </div>
                        <div className="column banner-img">
                            <img src="/assets/img/photos/food-spinner.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="menu-section">
                    <div className="menu-title text-center">
                        <h2 className="text-2xl font-bold pt-5">Thực đơn của <div className="text-signature text-4xl">Nhoằm nhoằm</div></h2>
                    </div>
                    <div className="menu-content grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-5">
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('breakfast'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu');}}>Bữa sáng</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.breakfastDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.breakfastDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-action flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}} type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('lunch'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}}>Bữa trưa</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.lunchDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.lunchDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal truncate">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-info flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}}  type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}}  type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('dinner'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}}>Bữa tối</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.dinnerDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.dinnerDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal truncate">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-info flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}} type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('dessert'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}}>Tráng miệng</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.dessertDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.dessertDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal truncate">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-info flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}} type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('wine'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}}>Đồ uống cồn</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.wineDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.wineDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal truncate">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-info flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}} type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                        <div className="card-section">
                            <div className="card-title text-center text-2xl font-semibold pt-2 pb-3"><Link to={'/menu'} onClick={()=>{storageService.setMealType('drink'); storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}}>Nước ngọt</Link></div>
                            <div className="card-content grid grid-cols-1 gap-4">
                                {homeState.isLoadingData === true? (<Loading/>):(<>
                                    {homeState.drinkDishList.length === 0 ? (<NoContent/>):(<>{
                                    homeState.drinkDishList.map((dish, index) => (
                                        <Link to={`/meal/${dish.id}`} onClick={()=>{storageService.setSelectedItemInMainMenu('menu'); headerState.handleSelectedItemMenu('menu')}} className="dish-card">
                                            <img src={dish.img} alt="" className="dish-img flex-shrink-0"/>
                                            <div className="dish-body">
                                                <div className="dish-info">
                                                    <div className="dish-name"><span>{dish.name}</span><span className="dish-price">{dish.price} đ</span></div>
                                                    <div className="dish-ingredient whitespace-normal truncate">{dish.ingredient}</div>
                                                </div>
                                                <div className="dish-info flex justify-end gap-2 pt-2 flex-wrap">
                                                    <Button onClick={(event:any)=>{homeState.addCartAction(event, dish)}} type="text" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                                    <Button onClick={(event:any)=>{homeState.buyNowAction(event, dish)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }</>)}</>)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default observer(Home)