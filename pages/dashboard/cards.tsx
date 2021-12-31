import type { NextPage } from "next";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import withAuth from "../../route/with-auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LoadingStart,
  LoadingStop,
} from "../../store/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../store/actions/toast/toastActions";
import isEmpty from "is-empty";
import moment from "moment";
import Button from "../../components/button";
import { background } from "../../utils/background";
import { fetchUserProfile } from "../../store/actions/user.action";

const Cards: NextPage = () => {
  const dispatch = useDispatch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const [cards, setCards] = useState<any[]>();

  const fetchCards = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/all`,
        { headers: headersRequest }
      );
      setCards(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

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
        window.open(cardData?.payment_link, "_self");
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

  const params = new URLSearchParams(window.location.search);
  const txRef = params.get("tx_ref");

  const addCardComplete = async (reference: any) => {
    try {
      dispatch(LoadingStart());
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/add/${reference}/complete`,
        {},
        { headers: headersRequest }
      );
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      fetchCards();
      dispatch(fetchUserProfile());
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

  const disableCard = async (cardId: any) => {
    try {
      dispatch(LoadingStart());
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/${cardId}/disable`,
        {},
        { headers: headersRequest }
      );
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      fetchCards();
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

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (txRef) {
      addCardComplete(txRef);
    }
  }, [txRef]);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <>
              {isEmpty(cards) ? (
                <div
                  className="flex flex-col justify-center h-56 rounded-lg items-center "
                  style={{ background: background.apacegray3 }}
                >
                  <p>You currently have no cards </p>
                  <Button
                    onClick={addCard}
                    className=" bg-apace-orange-dark border-apace-orange-dark text-black"
                  >
                    Add Card +{" "}
                  </Button>
                </div>
              ) : (
                <div className="flex">
                  <div>
                    {cards?.map((card) => {
                      return (
                        <div
                          key={card?.id}
                          className="mb-4 p-4 rounded-lg  "
                          style={{ background: background.apacegray3 }}
                        >
                          <p> Card Token : {card?.card_token} </p>
                          <p> Masked Pan : {card?.masked_pan} </p>
                          <p>
                            Date created{" "}
                            {moment(card?.date_created).format("ll")}
                          </p>
                          <Button onClick={() => disableCard(card?.id)}>
                            Disable
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="ml-4">
                    <Button
                      onClick={addCard}
                      className=" bg-apace-orange-dark border-apace-orange-dark text-black"
                    >
                      Add Card +
                    </Button>
                  </div>
                </div>
              )}
            </>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Cards;
