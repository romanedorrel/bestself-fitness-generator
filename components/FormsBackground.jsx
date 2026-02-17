import Image from "next/image";
import React from "react";

export default function FormsBackground() {
    return (
        <div> 
            {/* background image for outer forms such as login sig up and reset password */}
            <Image
                className="bg-img"
                src="/balance.jpg"
                alt="Balance"
                fill={true}
        />
        </div>
        
    )
}