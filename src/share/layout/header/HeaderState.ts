import { makeAutoObservable } from "mobx";
import getLocation from "../../../utilities/helpers/GetLocationHelper";
import { storageService } from "../../../utilities/service/StorageService";
class HeaderState{
    locationInfo: any = null;
    selectedMainMenuItem: string = '';
    constructor(){
        makeAutoObservable(this);
        window.addEventListener('storage', this.updateSelectedItemFromLocalStorage);
    }
    updateSelectedItemFromLocalStorage = () => {
        const newItem = storageService.getSelectedItemInMainMenu();
        this.selectedMainMenuItem = newItem!;
    }
    async handleLocationGetting(){
        this.locationInfo = await getLocation();
    }
    handleSelectedItemMenu(itemValue: string){
        storageService.setSelectedItemInMainMenu(itemValue)
        this.selectedMainMenuItem = itemValue;
    }
}
export const headerState = new HeaderState();