import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

export const storeUserInfo = ({ access_token }: { access_token :string}) => {
    setLocalStorage("access_token", access_token as string);
};

export const isUserLoggedIn = () =>{
    const authtoken = getLocalStorage("access_token");
    return !!authtoken;
}

export const removeUserInfo = () =>{
    localStorage.removeItem("access_token");
}