import { supabase,configured } from '../supabase';
export async function submitRpc(name,payload){
 if(!configured) throw new Error('The website is not connected to Supabase yet.');
 const {data,error}=await supabase.rpc(name,{p_payload:payload});
 if(error) throw error;
 return Array.isArray(data)?data[0]:data;
}
