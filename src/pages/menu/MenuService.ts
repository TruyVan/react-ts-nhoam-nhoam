import { supabase } from "../../utilities/service/SupabaseConnector";

class MenuService{
    async getDishByMealType(meal_type:string){
        const response = await supabase.from('foods').select('*').contains('meal_type', [meal_type])
        return response;
    }
    async getDishAll(){
        const response = await supabase.from('foods').select('*');
        return response;
    }
}
export const menuService = new MenuService();