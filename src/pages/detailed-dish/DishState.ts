import { makeAutoObservable } from "mobx";
import { supabase } from "../../utilities/service/SupabaseConnector";
import { dishService } from "./DishService";
import { toastMsg } from "../../utilities/helpers/ToastHelper";

class DishState{
    constructor(){
        makeAutoObservable(this);
    }
    isGettingDishInfoStatus: boolean = true;
    dishListCart: any[] = []
    dishVariantList: any[] = [];
    variantDishMaxPrice: number = 0;
    variantDishMinPrice: number = 1;
    variantChosenID: number = -1;
    variantChosenPrice: number = 0;
    isOpeningNote: boolean = false;
    dishInfo: {id:number, name:string, price:number, img:string, status: boolean, mealType: any[], ingredient: string} = {
        id: 0,
        ingredient: "(Thành phần)",
        name: "(Tên sản phẩm)",
        price: 0,
        img: "",
        status: false,
        mealType: []
    }
    async getDishInfo(id: number, navigate: any){
        this.isGettingDishInfoStatus = true;
        if(isNaN(id)){
            this.isGettingDishInfoStatus = false;
            return -1;
        }
        const mainResponse = await dishService.detailedDishGettingFetching(id);
        const variantResponse = await dishService.variantForDishGettingFetching(id);
        this.isGettingDishInfoStatus = false;
        if(mainResponse.error){
            toastMsg.error(`${mainResponse.error.message}`, '');
        }
        else if(mainResponse.data.length === 0){
            navigate('/not-found')
        }
        else{
            this.dishInfo = mainResponse.data[0];
            this.dishVariantList = variantResponse.data!
            if(this.dishVariantList.length >0){
                this.variantDishMinPrice = this.dishVariantList[0].price
                this.variantDishMaxPrice = this.dishVariantList[0].price
                for(var i in this.dishVariantList){
                    if(this.dishVariantList[i].price > this.variantDishMaxPrice){
                        this.variantDishMaxPrice = this.dishVariantList[i].price;
                    }
                    if(this.dishVariantList[i].price < this.variantDishMinPrice){
                        this.variantDishMinPrice = this.dishVariantList[i].price;
                    }
                }
            }
        }
    }
    async addCartAction(event:any, dishData: any){
        event?.stopPropagation(); //stop clicking from the wrapper tag
        event?.preventDefault(); //stop directing from the wrapper tag;
        toastMsg.success(`Thêm món ${dishData.name} thành công!`, `${dishData.id}`);
        await this.addDishNotLoginAction(dishData); 
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
    async buyNowAction(event:any, dishData: any){
        event?.stopPropagation(); //stop clicking from the wrapper tag
        event?.preventDefault(); //stop directing from the wrapper tag;
        toastMsg.success(`Thêm món ${dishData.name} thành công!`, `${dishData.id}`);
        await this.addDishNotLoginAction(dishData); 
    }
    async handleVariantBtnAction(id: number){
        if(id !== this.variantChosenID){
            this.variantChosenID = id;
            this.variantChosenPrice = this.dishVariantList.find(dish => dish.id === id).price;
        }
        else{
            this.variantChosenID = -1;
        }
    }
    handleLeaveNoteAction(){
        this.isOpeningNote = !this.isOpeningNote;
    }
}
export const dishState = new DishState();