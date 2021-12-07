import Button from "../../button";
import { background } from "../../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";

const Liquidate = () => {
  const dispatch = useDispatch();
  return (
    <div className="text-white">
      <div
        className="py-3 pl-2 text-lg text-left "
        style={{ background: background.apacegray2 }}
      >
        <h1> Liquidate Loan </h1>
      </div>
      <div
        className="text-base py-4"
        style={{ background: background.apacegray3 }}
      >
        <p>
          {" "}
          Do you want to liquidate this loan before due date? This should free
          up more funds into your limit as well as help toward credit rating.{" "}
        </p>
        <p className="mt-3">
          If you proceed your card will be charged the entire amount due plus
          interest and this loan closed.
        </p>
      </div>
      <div
        className="flex justify-center"
        style={{ background: background.apacegray2 }}
      >
        <Button className="mx-2 w-full" onClick={() => dispatch(closeModal())}>
          Cancel{" "}
        </Button>
        <Button className="mx-2  w-full bg-apace-orange-dark border-apace-orange-dark text-black">
          Proceed{" "}
        </Button>
      </div>
    </div>
  );
};

export default Liquidate;
