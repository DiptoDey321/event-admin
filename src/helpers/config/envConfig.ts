export const getBaseUrl = ():string =>{
    return process.env.PUBLIC_API_URL || "http://157.173.221.206:8081";
}