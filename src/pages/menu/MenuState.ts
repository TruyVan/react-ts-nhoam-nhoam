import { makeAutoObservable } from "mobx";
import { menuService } from "./MenuService";
import { toastMsg } from "../../utilities/helpers/ToastHelper";
import { storageService } from "../../utilities/service/StorageService";

class MenuState{
    constructor(){
        makeAutoObservable(this)
    }
    dishListCart: any[] = [];
    dishList: any[]= [];
    isLoadingData: boolean = false;
    selectedNavbarItem: string = 'all';
    menuItemList = [
        {value: 'all', text: "Tất cả các món"},
        {value: 'breakfast', text: "Bữa sáng"},
        {value: 'lunch', text: "Bữa trưa"},
        {value: 'dinner', text: "Bữa tối"},
        {value: 'dessert', text: "Tráng miệng"},
        {value: 'wine', text: "Đồ uống cồn"},
        {value: 'drink', text: "Nước ngọt"},
    ]
    async getDishAll(){
        this.isLoadingData = true;
        const response = await menuService.getDishAll();
        this.isLoadingData = false;
        if(response.error){
            toastMsg.error(response.error.message, '');
        }
        else{
            this.dishList = response.data;
            console.log(this.dishList)
        }
    }
    async getDishByType(meal_type: string){
        this.isLoadingData = true;
        const response = await menuService.getDishByMealType(meal_type);
        this.isLoadingData = false;
        if(response.error){
            toastMsg.error(response.error.message, '');
        }
        else{
            this.dishList = response.data;
        }
    }
    async menuButtonAction(meal_type: string){
        if(meal_type === 'all'){
            this.selectedNavbarItem = 'all';
            storageService.setMealType(`all`)
            await this.getDishAll();
        }
        else if(meal_type === this.selectedNavbarItem){
            this.selectedNavbarItem = 'all';
            storageService.setMealType(`all`)
            await this.getDishAll();
        }
        else{
            this.selectedNavbarItem = `${meal_type}`;
            storageService.setMealType(`${meal_type}`)
            await this.getDishByType(meal_type);
        }
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
}
export const menuState = new MenuState();