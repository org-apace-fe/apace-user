import { ReactNode } from "react";
import { HidePassword, ShowPassword } from "./icons/logo";

type ViewPasswordProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  status: boolean;
};

export default function ViewPassword({
  status,
  onClick,
}: Partial<ViewPasswordProps>) {
  return (
    <div onClick={onClick}>{status ? <ShowPassword /> : <HidePassword />}</div>
  );
}
