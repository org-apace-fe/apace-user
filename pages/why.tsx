import type { NextPage } from "next";
import Layout from "../components/layout";
import WhyBanner from "../components/whyBanner";
import Solution from "../components/solution";
import Ongoing from "../components/ongoing";
import SeeHow from "../components/see-how";
import CallToAction from "../components/call-to-action";

const WhyPage: NextPage = () => {
  return (
    <div>
      <Layout>
        <WhyBanner />
        <Solution />
        <Ongoing pictureUrl = "/icons/ongoing.png"  background =  "#F7D57B" />
        <CallToAction/>
        <SeeHow />
      </Layout>
    </div>
  );
};

export default WhyPage;
