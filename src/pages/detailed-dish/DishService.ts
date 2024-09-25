import { supabase } from "../../utilities/service/SupabaseConnector";

class DishService{
    public async detailedDishGettingFetching(idDish:number){
        const response = supabase.from('foods').select('*').eq('id', idDish);
        return response;
    }
    public async variantForDishGettingFetching(idDish:number){
        const response = supabase.from('variant_foods').select('*').eq('mainDish_id', idDish);
        return response;
    }
}
export const dishService = new DishService();