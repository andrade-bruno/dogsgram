import React from "react";

const SuccessMessage = ({ children }: { children: React.ReactNode }) => {
  return <p style={{ color: "#4C1" }}>{children}</p>;
};

export default SuccessMessage;
