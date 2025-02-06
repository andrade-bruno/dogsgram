import React from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonType) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};

export default Button;
