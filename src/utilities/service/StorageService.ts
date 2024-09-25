class StorageService{
    async setSelectedItemInMainMenu(itemValue:string){
        // Get the main menu element
        localStorage.setItem('SelectedItemInMainMenu', itemValue);
    }
    getSelectedItemInMainMenu(){
        // Get the main menu element
        return localStorage.getItem('SelectedItemInMainMenu')
    }
    async deleteSelectedItemInMainMenu(){
        localStorage.removeItem('SelectedItemInMainMenu');
    }
    async setMealType(itemValue:string){
        // Get the main menu element
        localStorage.setItem('MealType', itemValue);
    }
    getMealType(){
        // Get the main menu element
        return localStorage.getItem('MealType')
    }
    async deleteMealType(){
        // Get the main menu element
        localStorage.removeItem('MealType');
    }
    async setAccessToken(accessToken:string){
        sessionStorage.setItem('AccessToken', accessToken)
    }
    getAccessToken(){
        return sessionStorage.getItem('AccessToken')
    }
    async deleteAccessToken(){
        sessionStorage.removeItem('AccessToken')
    }
    async setRefreshToken(accessToken:string){
        localStorage.setItem('RefreshToken', accessToken)
    }
    getRefreshToken(){
        return localStorage.getItem('RefreshToken')
    }
    async deleteRefreshToken(){
        localStorage.removeItem('RefreshToken')
    }
    async setDishID(dishID: any){
        localStorage.setItem('DishID', dishID.toString())
    }
    getDishID(){
        return Number(localStorage.getItem('DishID'))
    }
    async deleteDishID(){
        localStorage.removeItem('DishID')
    }
}

export const storageService = new StorageService;