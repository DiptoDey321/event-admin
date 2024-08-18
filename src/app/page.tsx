"use client";
import { useEffect,  } from "react";
import { isUserLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const userLoggedIn = isUserLoggedIn();

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/user");
    }else{
       router.push("/login");
    }
   
  }, [router, userLoggedIn]);


  return (
    <span>Loading</span>
  );
};

export default Login;
