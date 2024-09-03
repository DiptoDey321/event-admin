"use client";
import { isUserLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../components/reuseable/Navbar";
import Contents from "../components/ui/user-route-components/Contents";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = isUserLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
    return <div>loading ...</div>;
  }


  return (
    <div className="width-control">
      <div className="user-main-layout">
        <Navbar></Navbar>
      </div>
      <div style={{ paddingTop: "50px" }}>
        <Contents>{children}</Contents>
      </div>
    </div>
  );
};

export default DashboardLayout;
