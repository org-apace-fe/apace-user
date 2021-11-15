import { ReactNode } from "react";

type MyFormProps = {
  children: ReactNode;
  className: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  style: React.CSSProperties;
};

export default function Form({
  children,
  className,
  onSubmit,
  style,
}: Partial<MyFormProps>) {
  return (
    <form
      className={`flex flex-col mx-auto mt-8 w-full p-4   ${className}`}
      onSubmit={onSubmit}
      style={style}
    >
      {children}
    </form>
  );
}
