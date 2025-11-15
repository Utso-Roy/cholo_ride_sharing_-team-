import React from "react";
import SwiperPage from "./SwiperPage";
import OurServices from "./OurServices";
import FeaturedDrivers from "./FeaturedDrivers";
import FareEstimator from "./FareEstimator";
import CallToAction from "./CallToAction";
import Statistics from "./Statistics";
import WhyChooseUs from "./WhyChooseUs";
import LatestNews from "./LatestNews";
import HowItWorks from "./HowItWorks";
import Partners from "./Partners";
import Newsletter from "./Newsletter";
import LandingPage from "../Landing/LandingPage";
import AboutCholoVideo from "./AboutCholoVideo";
import CenteredTestimonialSlider from "./CenteredTestimonialSlider";

const Home = () => {
  return (
    <div>
      <>
        <section>
          <LandingPage></LandingPage>
        </section>

        <section>
          <AboutCholoVideo></AboutCholoVideo>
        </section>
        <section>
          <OurServices></OurServices>
        </section>
        <section>
          <WhyChooseUs></WhyChooseUs>
        </section>
        <section>
          <LatestNews></LatestNews>
        </section>
        <section>
          <FeaturedDrivers></FeaturedDrivers>
        </section>
        <FareEstimator></FareEstimator>
        <section>
          <CenteredTestimonialSlider></CenteredTestimonialSlider>
        </section>
        <section>
          <CallToAction></CallToAction>
        </section>

        <section>
          <Statistics></Statistics>
        </section>

        <section>
          <HowItWorks></HowItWorks>
        </section>

        <section>
          <Partners></Partners>
        </section>
        <section>
          <Newsletter></Newsletter>
        </section>
      </>
    </div>
  );
};

export default Home;
