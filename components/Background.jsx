import Image from "next/image";
import React from "react";

export default function Background() {
    return (
        <div>
            {/* Background for all in app pages */}
            <Image
                className="bg-img"
                src="/Space.jpg"
                alt="Lion"
                fill={true}
        />
        </div>
        
    )
}