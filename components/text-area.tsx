import { ReactNode } from "react";

type TextAreaProps = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  children: ReactNode;
  className: string;
  disabled: boolean;
  style: React.CSSProperties;
  defaultValue: string;
  value: string;
  required: boolean;
  placeholder: string;
  name: string;
};

export default function TextArea({
  className,
  placeholder,
  name,
  value,
  onChange,
  required,
  defaultValue,
  disabled,
}: Partial<TextAreaProps>) {
  return (
    <textarea
      className={`mb-8 mt-2 border p-2 border-gray-600 text-white bg-transparent outline-none rounded-md h-28 focus:border-white px-4 text-base   ${className}`}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
    ></textarea>
  );
}
