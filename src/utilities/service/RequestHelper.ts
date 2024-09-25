import axios, {HttpStatusCode} from "axios";
import { supabaseKey } from "../constant/SupabaseKey";

const apiBaseURL = supabaseKey.REACT_APP_SUPABASE_URL
const apiHeaders = {
    'apiKey': supabaseKey.REACT_APP_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${supabaseKey.REACT_APP_SUPABASE_ANON_KEY}`,
    "Content-Type": 'application/json'
}

export async function getRequest(path: string){
    return await axios.get(apiBaseURL + path, {headers: apiHeaders}).then(
        (response)=>{
            const apiResponse = {
                status: response.status,
                body: response.data
            }
        },
        (error)=>{}
    )
}