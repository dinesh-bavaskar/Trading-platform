import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProgressLoader from "../components/ProgressLoader";

export default function Home() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const MIN_TIME = 2100; // premium delay

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, MIN_TIME);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {/* {loading && <ProgressLoader />} */}
      { <Hero />}
    </>
  );
}
