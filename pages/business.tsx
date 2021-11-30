import type { NextPage } from "next";
import Layout from "../components/layout";
import WhateverYouSell from "../components/businessBanner2";
import CustomerRatings from "../components/customer-ratings";
import KYC from "../components/kyc";
import HIW from "../components/how-it-works";
import withoutAuth from "../route/without-auth";

const BusinessPage: NextPage = () => {
  return (
    <div>
      <Layout>
        <WhateverYouSell />
        <CustomerRatings />
        <HIW />
        <KYC />
      </Layout>
    </div>
  );
};

export default withoutAuth(BusinessPage);
