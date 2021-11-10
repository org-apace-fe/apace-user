import { ReactNode } from "react";

type InputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  children: ReactNode;
  className: string;
  type: "email" | "text" | "password" | "date" | "file";
  disabled: boolean;
  style: React.CSSProperties;
  pattern: string;
  defaultValue: string;
  value: string;
  required: boolean;
  placeholder: string;
  name: string;
};

export default function Input({
  className,
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
  defaultValue,
  disabled,
  pattern,
}: Partial<InputProps>) {
  return (
    <input
      className={`border border-gray-600 text-white bg-transparent outline-none rounded-md h-10 px-4 text-base  ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      pattern={pattern}
    />
  );
}
