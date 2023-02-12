import React, { Component } from "react";
import { RxDot } from "react-icons/rx";
import Slider from "react-slick";
export default class Testimonial extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      customPaging: (i) => (
        <div className="text-4xl text-secondary">
          <RxDot />
        </div>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div>
        <h1 className="text-4xl text-center my-20 font-bold">Testimonials</h1>
        <Slider {...settings} className="p-10 ">
          <div className="card ">
            <div className="text-center">
              <h2>Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>

          <div className="card ">
            <div className="text-center">
              <h2>Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>

          <div className="card ">
            <div className="text-center">
              <h2>Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>


          <div className="card ">
            <div className="text-center">
              <h2>Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>

         
        </Slider>
      </div>
    );
  }
}
