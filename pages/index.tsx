import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import HashTagUseApace from "../components/hashtagUseApace";
import Header from "../components/header";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <div>
  <Layout>
    <HashTagUseApace/>
  </Layout>
    </div>
  );
};

export default Home;
