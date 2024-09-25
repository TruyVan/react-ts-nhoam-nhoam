import { supabase } from "../../utilities/service/SupabaseConnector";

class LoginService{
    public async login(data:any){
        const response = await supabase.auth.signInWithPassword({email: data.email, password: data.password})
        return response;
    }
    public async signUp(data:any){
        const response = await supabase.auth.signUp({email: data.email, password: data.password});
        return response;
    }
}
export const loginService = new LoginService();
