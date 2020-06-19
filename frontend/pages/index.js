import React from "react";
import fetch from "../lib/fetch";
import Testimonial from "../components/pages/home/Testimonial";

const Home = ({ testimonials }) => (
  <>
    <Testimonial data={testimonials} />
  </>
);

Home.getInitialProps = async () => {
  const testimonials = await fetch("get", "testimonials");
  return { testimonials };
};

export default Home;
