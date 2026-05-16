import React from "react";

export default function FormsBackground({ children }) {
  return (
    <div className="background-wrapper">
      <div className="background-content">{children}</div>
    </div>
  );
}
