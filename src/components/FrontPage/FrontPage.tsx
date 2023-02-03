import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import { Product } from '../../types/common';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SpecialOffers from './SpecialOffers';

// Testing splitting up components into many small components
const FrontPage: React.FC = () => {
  const selectUser = useAppSelector((state) => state.userReducer);
  const [offers, setOffers] = useState<Product[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectUser.specialOffers) setOffers(selectUser.specialOffers);
  }, [selectUser]);

  return (
    <div className="frontpage">
      <div className="front-promotionImage">
        <Slider {...settings}>
          {offers.map((offer) => (
            <div className="front-imgwrapper" key={offer.id}>
              <img src={offer.images[0]} alt={offer.title} />
            </div>
          ))}
        </Slider>
      </div>
      <SpecialOffers offers={offers} />
    </div>
  );
};

export default FrontPage;
