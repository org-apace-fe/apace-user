import { NextPage } from "next";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import MyModal from "../../../components/dashboard/modal";
import withAuth from "../../../route/with-auth";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";

const Settings: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <div onClick={() => dispatch(closeModal())}>fff</div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Settings);
