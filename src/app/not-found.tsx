"use client"

import Image from "next/image";
import React from "react";
import imagePath from './../../public/404.webp'
import { Button } from "antd";



const notFoundPage = () => {
  return (
    <div>
      <div className="fof-page">
        <div className="img-btn-container">
          <Image
            src={imagePath}
            width={500}
            height={500}
            alt="Image description"
          />
          <a href="/" className="bt-home">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default notFoundPage;
