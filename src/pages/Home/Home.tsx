import React from "react";
import SwiperPage from "./SwiperPage";
import OurServices from "./OurServices";
import PopularDestinations from "./PopularDestinations";
import FeaturedDrivers from "./FeaturedDrivers";
import FareEstimator from "./FareEstimator";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Statistics from "./Statistics";

const Home = () => {
  return (
    <div className="space-y-10">
      <section>
        <SwiperPage></SwiperPage>
      </section>
      <section>
        <OurServices></OurServices>
      </section>
      <section>
        <PopularDestinations></PopularDestinations>
      </section>

      <section>
        <FeaturedDrivers></FeaturedDrivers>
      </section>
      <FareEstimator></FareEstimator>
      <section>
        <Testimonials></Testimonials>
      </section>

      <section>

        <CallToAction></CallToAction>
      </section>

      <section>

        <Statistics></Statistics>
      </section>
      
    </div>
  );
};

export default Home;
