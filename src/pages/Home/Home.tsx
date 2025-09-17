import React from 'react';
import SwiperPage from './SwiperPage';
import OurServices from './OurServices';

const Home = () => {
  return (
    <div className='space-y-10'>
      <section>
        <SwiperPage></SwiperPage>
      </section>
      <section>
        <OurServices></OurServices>
      </section>


    </div>
  );
};

export default Home;