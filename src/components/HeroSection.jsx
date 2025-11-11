import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const HeroSection = () => {
    return (
          <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{clickable: true}}
      scrollbar={{draggable: true}}
      autoplay={{ delay: 3000 }}
    >
         <SwiperSlide>
            <div className="hero relative   mx-auto bg-[url('https://i.ibb.co.com/V03tRD5r/71lq-Dylcv-GL-AC-SY879.jpg')]  bg-center ">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="hero-content sm:flex-row flex-col">
                    <img
                        src="https://i.ibb.co.com/V03tRD5r/71lq-Dylcv-GL-AC-SY879.jpg"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 sm:h-full h-[500px]"
                    />
                    <div className='flex-col  text-white sm:text-left text-center'>
                        <h1 className="text-white lg:text-5xl sm:text-3xl text-4xl font-bold ">Oppenheimer</h1>
                        <div className='py-6'>
                        <p className='pb-3'>2023, Biography</p>
                        <p className=" pr-5">
                           The story of J. Robert Oppenheimer and the creation of the atomic bomb.
                        </p>
                        </div>
                        <button className="btn-primary mb-5">See more</button>
                    </div>
                </div>
            </div>
       </SwiperSlide>
        <SwiperSlide>
            <div className="hero relative   mx-auto bg-[url('https://i.ibb.co.com/Sw4qFzh8/7103d-g1qu-L-AC-SY879.jpg')]  bg-center ">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="hero-content sm:flex-row flex-col">
                    <img
                        src="https://i.ibb.co.com/Sw4qFzh8/7103d-g1qu-L-AC-SY879.jpg"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 sm:h-full h-[500px]"
                    />
                    <div className='flex-col  text-white sm:text-left text-center'>
                        <h1 className="text-white lg:text-5xl sm:text-3xl text-4xl font-bold ">Avengers: Endgame</h1>
                        <div className='py-6'>
                        <p className='pb-3'>2019, Action</p>
                        <p className=" pr-5">
                           The Avengers assemble once more to reverse Thanos's snap.
                        </p>
                        </div>
                        <button className="btn-primary mb-5">See more</button>
                    </div>
                </div>
            </div>
       </SwiperSlide>
         <SwiperSlide>
            <div className="hero relative   mx-auto bg-[url('https://i.ibb.co.com/JWv6cLXF/Screenshot-2025-11-11-021731.png')]  bg-center ">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="hero-content sm:flex-row flex-col mb">
                    <img
                        src="https://i.ibb.co.com/JWv6cLXF/Screenshot-2025-11-11-021731.png"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 sm:h-full h-[500px]"
                    />
                    <div className='flex-col  text-white sm:text-left text-center'>
                        <h1 className="text-white lg:text-5xl sm:text-3xl text-4xl font-bold ">The Lion King</h1>
                        <div className='py-6'>
                        <p className='pb-3'>1994, Animation</p>
                        <p className=" pr-5">
                           A lion cub must embrace his role as king after his father’s death.
                        </p>
                        </div>
                        <button className="btn-primary mb-5">See more</button>
                    </div>
                </div>
            </div>
       </SwiperSlide>
       
         </Swiper>
    );
};

export default HeroSection;