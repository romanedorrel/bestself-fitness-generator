import Image from "next/image";
import React from "react";

export default function Background() {
    return (
        <div className="auth-background" aria-hidden="true">
            {/* background image for outer forms such as login sig up and reset password */}
            <Image
                className="auth-background-image"
                src="/balance.jpg"
                alt="Balance"
                fill
                priority
                sizes="100vw"
        />
        </div>
        
    )
}
