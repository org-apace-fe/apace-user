import type { NextPage } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import ApaceStoreTabs from "../components/store-tabs";

const StoresPage: NextPage = () => {
  return (
    <Layout>
      <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
        <Container>
          <div className="relative my-16">
            <p className="text-7xl font-black mb-8"> Stores </p>
            <ApaceStoreTabs />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default StoresPage;
