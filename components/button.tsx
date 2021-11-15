import { ReactNode } from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className: string;
  type: "submit" | "reset" | "button";
  disabled: boolean;
  style: React.CSSProperties;
};

export default function Button({
  onClick,
  children,
  className,
  type,
  disabled,
  style,
}: Partial<ButtonProps>) {
  return (
    <button
      className={`border rounded-full text-sm text-centre py-2 px-4 my-4 font-medium  ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
