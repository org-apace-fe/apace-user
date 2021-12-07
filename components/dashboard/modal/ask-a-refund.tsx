import Button from "../../button";
import { background } from "../../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";
import Input from "../../input";
import TextArea from "../../text-area";

const AskRefund = () => {
  const dispatch = useDispatch();
  return (
    <div className="text-white">
      <div
        className="py-3 pl-4 text-lg text-left "
        style={{ background: background.apacegray2 }}
      >
        <h1> Ask for a refund </h1>
      </div>
      <div
        className="text-sm py-4 px-4 text-left border-b border-gray-600 "
        style={{ background: background.apacegray3 }}
      >
        <p className="text-base">Shoot us an email</p>
        <p className="mt-3">
          Send us an email explaining your reason for a refund request and our
          support team will get back to you
        </p>
      </div>
      <div style={{ background: background.apacegray3 }} className="px-4 py-4">
        <TextArea placeholder="Message *" className=" w-full" />
        <Input className="w-full mb-8" placeholder="Ref ID *" />
        <Input className="w-full" placeholder="Email address *" />
      </div>
      <div
        className="flex justify-center"
        style={{ background: background.apacegray2 }}
      >
        <Button className="mx-2 w-full" onClick={() => dispatch(closeModal())}>
          Cancel{" "}
        </Button>
        <Button className="mx-2  w-full bg-apace-orange-dark border-apace-orange-dark text-black">
          Send{" "}
        </Button>
      </div>
    </div>
  );
};

export default AskRefund;
