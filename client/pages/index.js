// import { useEffect, useState } from "react";
// import { API_ADDR } from "../config/constans";
import Header from "../components/Header";
import Slider from "../components/Slider";
import HeroBoxes from "../components/HeroBoxes";
import Features from "../components/Features";
import Price from "../components/Price";
import Footer from "../components/Footer";
export default function Home() {
  // error, isLoaded, items

  return (
    <>
      <Header />
      <Slider />
      <HeroBoxes />
      <Features />
      <Price />
      <Footer />
    </>
  );
}
