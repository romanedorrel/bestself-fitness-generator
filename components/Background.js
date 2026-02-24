import Image from "next/image";
import React from "react";

export default function Background({ children }) {
    return (
          <div className="background-wrapper">
      <Image
        src="/Space.jpg"
        alt="Space"
        fill
        priority
        className="background-image"
      />

      <div className="background-overlay" />

      <div className="background-content">
        {children}
      </div>
    </div>
    )
}