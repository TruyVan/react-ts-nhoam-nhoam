import { observer } from "mobx-react"
import { menuState } from "./MenuState"
import Loading from "../../share/misc/Loading"
import NoContent from "../../share/misc/NoContent"
import { useEffect } from "react"
import './menu.css'
import { Button} from "antd";
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { toastMsg } from "../../utilities/helpers/ToastHelper";
import { storageService } from "../../utilities/service/StorageService"

const Menu = ()=>{
    const selectedItemValue = storageService.getMealType()
    menuState.selectedNavbarItem = selectedItemValue ? selectedItemValue : 'all';
    useEffect(()=>{
        // get data based on meal_type which is selected from other page/tab/session
        const mealTypeValue = storageService.getMealType();
        if(mealTypeValue){
            menuState.getDishByType(mealTypeValue)
        }
        else{
            menuState.getDishAll();
        }
    },[])
    return (
    <div className="menu-page">
        <div className="menu-title text-center">
            <h2 className="text-2xl font-bold pt-5">Thực đơn của <span className="text-signature text-4xl">Nhoằm nhoằm</span></h2>
        </div>
        <div className="menu-navbar container mx-auto flex justify-center pt-10 pb-5 flex-wrap gap-3">
            {menuState.menuItemList.map((item, index)=>(
                <Button className="rounded-full border-dashed" type={menuState.selectedNavbarItem === `${item.value}`? 'primary' : 'default'} onClick={()=>{menuState.menuButtonAction(`${item.value}`)}} danger>{item.text}</Button>
            ))}
        </div>
        <div className="menu-content flex justify-center align-middle">
            {menuState.isLoadingData === true? (<><Loading/></>):(<>
            {menuState.dishList.length === 0 ? (<><NoContent/></>):(<>
            <div className="grid grid-cols-3 gap-5 container">
                {menuState.dishList.map((dish, index)=>(
                    <div className="border rounded-lg border-dashed border-red-600 bg-red-300 overflow-hidden">
                        <div className="dish-image flex justify-center align-middle w-full bg-white rounded-bl-3xl p-5">
                            <img src={dish.img} className="w-28 h-28 object-cover rounded-full" alt="" />
                        </div>
                        <div className="dish-info p-2">
                            <div className="upper pb-2">
                                <div className="dish-name font-semibold text-xl" title={dish.name}>{dish.name}</div>
                                <div className="dish-ingredient text-sm whitespace-normal">{dish.ingredient}</div>
                            </div>
                            <div className="lower">
                                <div className="dish-price"></div>
                                <div className="dish-action flex flex-row flex-wrap justify-end gap-2">
                                    <Button onClick={(e)=>{e?.stopPropagation(); e?.preventDefault(); toastMsg.success(`Thêm món ${dish.name} thành công!`, `${dish.id}`); menuState.addDishNotLoginAction(dish); }} type="default" danger icon={<PlusOutlined/>}>Thêm vào giỏ hàng</Button>
                                    <Button onClick={(e)=>{e?.stopPropagation(); e?.preventDefault(); toastMsg.success(`Thêm món ${dish.name} thành công!`, `${dish.id}`); menuState.addDishNotLoginAction(dish); }} type="primary" danger icon={<ShoppingCartOutlined/>}>Mua ngay</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </>)}
            </>)}
        </div>
    </div>)
}
export default observer(Menu)