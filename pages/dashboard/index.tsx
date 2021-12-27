import type { NextPage } from "next";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import ApaceStoreTabs from "../../components/store-tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/actions/user.action";
import { useEffect, useState } from "react";
import withAuth from "../../route/with-auth";
import { openModalAndSetContent } from "../../store/actions/modal/modalActions";
import AskRefund from "../../components/dashboard/modal/ask-a-refund";
import UpdateProfileModal from "../../components/dashboard/modal/update-profile";
import {
  LoadingStart,
  LoadingStop,
} from "../../store/actions/loader/loaderActions";
import axios from "axios";
import isEmpty from "is-empty";
import { background } from "../../utils/background";
import Button from "../../components/button";
import { openToastAndSetContent } from "../../store/actions/toast/toastActions";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const profile = useSelector((state: any) => state.auth);
  const personalInfo = profile?.user?.data?.peronal_info;
  const [cards, setCards] = useState<any[]>();

  const fetchCards = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/all`,
        { headers: headersRequest }
      );
      setCards(res?.data?.data);
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    dispatch(fetchUserProfile());

    const timer = setTimeout(() => {
      if (personalInfo?.date_of_birth === null) {
        dispatch(
          openModalAndSetContent({
            modalStyles: {
              padding: 0,
            },
            modalContent: (
              <>
                <UpdateProfileModal />
              </>
            ),
          })
        );
      }
    }, 5000);
  }, []);

  useEffect(() => {
    fetchCards();
    if (cards) {
      setTimeout(() => {
        console.log("fff", isEmpty(cards));

        if (isEmpty(cards)) {
          dispatch(
            openModalAndSetContent({
              modalStyles: {
                padding: 0,
              },
              modalContent: (
                <>
                  <div>
                    <div
                      className="flex flex-col justify-center h-56 rounded-lg items-center px-4 "
                      style={{ background: background.apacegray3 }}
                    >
                      <p>
                        You currently have no cards, Kindly add your card before
                        advancing{" "}
                      </p>
                      <Button
                        onClick={addCard}
                        className=" bg-apace-orange-dark border-apace-orange-dark text-black"
                      >
                        Add Card +{" "}
                      </Button>
                    </div>
                  </div>
                </>
              ),
            })
          );
        } else {
          return null;
        }
      }, 5000);
    }
  }, []);

  const addCard = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/add`,
        {},
        { headers: headersRequest }
      );
      const cardData = res?.data?.data;

      if (cardData) {
        window.open(cardData?.payment_link, "_blank");
      }
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );

      dispatch(LoadingStop());
    } catch (error: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message,
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
      dispatch(LoadingStop());
    }
  };

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <ApaceStoreTabs personalInfo={personalInfo} />
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
