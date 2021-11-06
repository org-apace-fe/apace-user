import type { NextPage } from "next";
import Layout from "../components/layout";
import Banner from "../components/banner";
import FavouriteStores from "../components/favourite-stores";
import Invite from "../components/invite";
import ApaceApp from "../components/apace-app";
import WhateverYouSell from "../components/businessBanner2";
import CustomerRatings from "../components/customer-ratings";
import KYC from "../components/kyc";
import HIW from "../components/how-it-works";

const BusinessPage: NextPage = () => {
  return (
    <div>
      <Layout>
        <WhateverYouSell />
        <CustomerRatings />
        <HIW/>
        <KYC/>
      </Layout>
    </div>
  );
};

export default BusinessPage;
