const API_URL=import.meta.env.VITE_API_URL;
export async function predictBanana(blob){if(!API_URL)throw Error("API_URL_MISSING");const form=new FormData();form.append("file",blob,"platano.jpg");const response=await fetch(`${API_URL}/predict`,{method:"POST",body:form});if(!response.ok)throw Error("API_REQUEST_FAILED");try{return await response.json()}catch{throw Error("INVALID_RESPONSE")}}
