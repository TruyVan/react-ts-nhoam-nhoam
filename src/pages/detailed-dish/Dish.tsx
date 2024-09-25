import { observer } from "mobx-react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { dishState } from "./DishState";
import { useEffect } from "react";
import { storageService } from "../../utilities/service/StorageService";
import { PlusOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";
import { toastMsg } from "../../utilities/helpers/ToastHelper";

const Dish = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    var id_NumberType = Number(id);
    if(isNaN(id_NumberType) || !id){
        navigate('/not-found')
    }
    else{
        storageService.setDishID(id);
    }
    useEffect(()=>{
            dishState.getDishInfo(id_NumberType, navigate);
    },[])
    return(<>
        {!dishState.isGettingDishInfoStatus ? (<>
        <div className="dish container mx-auto flex gap-3">
            <div className="dish-image-container w-96 h-72">
                <img className="w-full h-full object-cover object-center rounded-md" src={dishState.dishInfo.img} alt="" />
            </div>
            <div className="dish-info-container flex flex-col gap-1">
                <div className="dish-name text-2xl font-bold">{dishState.dishInfo.name}</div>
                <div className="dish-ingredient text-slate-600 italic">{dishState.dishInfo.ingredient}</div>
                <div className="dish-price text-red-500">{dishState.dishVariantList.length === 0 ? (<>{dishState.dishInfo.price}</>):(<>{dishState.variantChosenID === -1 ? (<>{dishState.variantDishMinPrice} đ - {dishState.variantDishMaxPrice}</>):(<>{dishState.variantChosenPrice}</>)}</>)} đ</div>
                <div className="dish-variant flex gap-2">
                    {dishState.dishVariantList.length === 0 ? (<></>):(<>{dishState.dishVariantList.map((item:any, index:number)=>(
                        <Button type={dishState.variantChosenID === item.id ? 'primary' : 'default'} className="border-dashed border-red-500 rounded-3xl bg-red-100" danger onClick={()=>{dishState.handleVariantBtnAction(item.id)}}>{item.name}</Button>
                    ))}</>)}
                </div>
                <div className="dish-note">
                    <Button className="p-0 underline" type="link" onClick={()=>{dishState.handleLeaveNoteAction()}} danger>Để lại lưu ý cho nhân viên:</Button>
                    <Input className={dishState.isOpeningNote === !true ? "" : 'hidden'}></Input>
                </div>
                <div className="dish-action flex justify-end gap-2 pt-2 flex-wrap">
                    <Button onClick={(event:any)=>{dishState.addCartAction(event, dishState.dishInfo)}} type="default" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                    <Button onClick={(event:any)=>{dishState.buyNowAction(event, dishState.dishInfo)}} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                </div>
            </div>
        </div>
        </>):(<></>)}
    </>)
}
export default observer(Dish)