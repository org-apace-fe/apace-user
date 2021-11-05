import { HidePassword, ShowPassword } from "./icons/logo";

export default function ViewPassword({ status, onClick }: any) {
  return (
    <div onClick={onClick}>{status ? <ShowPassword /> : <HidePassword />}</div>
  );
}
