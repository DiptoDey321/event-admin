export const getBaseUrl = ():string =>{
    return process.env.PUBLIC_API_URL || "https://uat.api.eventabd.com";
}
