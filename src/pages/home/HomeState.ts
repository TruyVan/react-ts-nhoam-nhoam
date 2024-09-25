import { makeAutoObservable } from "mobx";
import getLocation from "../../utilities/helpers/GetLocationHelper";
import { homeService } from "./HomeService";
import { HttpStatusCode } from "axios";
import { toastMsg } from "../../utilities/helpers/ToastHelper";

class HomeState{
    locationInfo: any = null;
    foodList: any[] = []
    dishListCart: any[] = []
    breakfastDishList: any[] = [];
    lunchDishList: any[] = [];
    dinnerDishList: any[] = [];
    drinkDishList: any[] = [];
    dessertDishList: any[] = [];
    wineDishList: any[] = [];
    isLoadingData: boolean = false;
    constructor(){
        makeAutoObservable(this);
    }
    async handleLocationGetting(){
        this.locationInfo = await getLocation();
        console.log(this.locationInfo)
    }
    async getDishByMealType(){
        this.isLoadingData = true;
        const breakfastDishData = {meal_type: ["breakfast"], limit: 4}
        const lunchDishData = {meal_type: ["lunch"], limit: 4}
        const dinnerDishData = {meal_type: ["dinner"], limit: 4}
        const dessertDishData = {meal_type: ["dessert"], limit: 4}
        const drinkDishData = {meal_type: ["drink"], limit: 4}
        const wineDishData = {meal_type: ["wine"], limit: 4}
        const responseBreakfast = await homeService.getFoodByMealType(breakfastDishData)
        this.isLoadingData = false;
        if(responseBreakfast.error){
            toastMsg.error(`${responseBreakfast.error.message}`, '1')
        }
        else{
            this.breakfastDishList = responseBreakfast.data;
        }
        const responseLunch = await homeService.getFoodByMealType(lunchDishData)
        if(responseLunch.error){
            toastMsg.error(`${responseLunch.error.message}`, '2')
        }
        else{
            this.lunchDishList = responseLunch.data;
        }
        const responseDinner = await homeService.getFoodByMealType(dinnerDishData)
        if(responseDinner.error){
            toastMsg.error(`${responseDinner.error.message}`, '3')
        }
        else{
            this.dinnerDishList = responseDinner.data;
        }
        const responseDrink = await homeService.getFoodByMealType(drinkDishData)
        if(responseDrink.error){
            toastMsg.error(`${responseDrink.error.message}`, '3')
        }
        else{
            this.drinkDishList = responseDrink.data;
        }
        const responseDessert = await homeService.getFoodByMealType(dessertDishData)
        if(responseDessert.error){
            toastMsg.error(`${responseDessert.error.message}`, '3')
        }
        else{
            this.dessertDishList = responseDessert.data;
        }
        const responseWine = await homeService.getFoodByMealType(wineDishData)
        if(responseWine.error){
            toastMsg.error(`${responseWine.error.message}`, '3')
        }
        else{
            this.wineDishList = responseWine.data;
        }
    }
    async getDishListAll(){
        const response = await homeService.getFood();
        if(response.status === HttpStatusCode.Ok){
            if(response.data){
                this.foodList = response.data;
            }
        }
        else{
            toastMsg.error('Đã xảy ra lỗi khi lấy dữ liệu', '')
        }
    }
    async searchAction(){
    }
    async getDishListFromLocalStorage(){
        const dishListFromLocal = localStorage.getItem("dish"); //get data from local if it exists
        this.dishListCart = dishListFromLocal ? JSON.parse(dishListFromLocal) : []; // if local data exists, get it. Otherwise, inititialize another one.
    }
    async addDishNotLoginAction(dishData:any){
        const dishListFromLocal = localStorage.getItem("dish"); //get data from local if it exists
        this.dishListCart = dishListFromLocal ? JSON.parse(dishListFromLocal) : []; // if local data exists, get it. Otherwise, inititialize another one.
        const existDishInList = this.dishListCart.find((item:any)=>String(item.id) === String(dishData.id)); //if the dish is already in the cart, rise the amount.
        if(existDishInList){
            existDishInList.quantity += 1;
        }
        else{
            this.dishListCart.push({...dishData, quantity: 1})
        }
        localStorage.setItem("dish", JSON.stringify(this.dishListCart))
    }
    async addCartAction(event:any, dishData: any){
        event?.stopPropagation(); //stop clicking from the wrapper tag
        event?.preventDefault(); //stop directing from the wrapper tag;
        toastMsg.success(`Thêm món ${dishData.name} thành công!`, `${dishData.id}`);
        await this.addDishNotLoginAction(dishData); 
    }
    async buyNowAction(event:any, dishData: any){
        event?.stopPropagation(); //stop clicking from the wrapper tag
        event?.preventDefault(); //stop directing from the wrapper tag;
        toastMsg.success(`Thêm món ${dishData.name} thành công!`, `${dishData.id}`);
        await this.addDishNotLoginAction(dishData); 
    }
}
export const homeState = new HomeState();