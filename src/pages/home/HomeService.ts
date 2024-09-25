import { supabase } from "../../utilities/service/SupabaseConnector";

class HomeService{
    async getFood(){
        const response = await supabase.from('foods').select('*');
        return response;
    }
    async searchFood(keyword: string){
        const response = await supabase.from('foods').select('*').ilike('name', `%${keyword}%`)
        return response;
    }
    async getFoodByMealType(data:any){
        const response = await supabase.from('foods').select('*').contains('meal_type', data.meal_type).limit(data.limit)
        return response;
    }
}
export const homeService = new HomeService();