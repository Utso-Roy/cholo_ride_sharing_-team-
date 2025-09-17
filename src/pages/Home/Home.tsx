import React from 'react';
import SwiperPage from './SwiperPage';
import OurServices from './OurServices';
import PopularDestinations from './PopularDestinations';
import FeaturedDrivers from './FeaturedDrivers';

const Home = () => {
  return (
    <div className='space-y-10'>
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

      <section>
        
        
</section>
    </div>
  );
};

export default Home;