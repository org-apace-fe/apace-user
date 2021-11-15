import type { NextPage } from "next";
import Layout from "../components/layout";
import Ongoing from "../components/ongoing";
import CallToAction from "../components/call-to-action";
import HowBanner from "../components/howBanner";
import WhyApace from "../components/why-apace";
import Demo from "../components/demo";

const HowPage: NextPage = () => {
  return (
    <div>
      <Layout>
        <HowBanner />
        <Demo />
        <Ongoing pictureUrl="/icons/how-easy.png" background="#BA97F6" />
        <CallToAction />
        <WhyApace />
      </Layout>
    </div>
  );
};

export default HowPage;
