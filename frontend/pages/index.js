import React from "react";
import fetch from "../lib/fetch";
import Applicants from "../components/pages/home/Applicants";
import Testimonial from "../components/pages/home/Testimonial";

const Home = ({ applicants, testimonials }) => (
  <>
    <Applicants data={applicants} />
    <Testimonial data={testimonials} />
  </>
);

Home.getInitialProps = async () => {
  const applicants = await fetch(
    "get",
    "applicants?_limit=4&_sort=createdAt:desc"
  );
  const testimonials = await fetch(
    "get",
    "testimonials?_limit=3&_sort=createdAt:desc"
  );

  return { applicants, testimonials };
};

export default Home;
