import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div className='sm:w-9/12 mx-auto'>
            <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showStatus={false}
            swipeable
        >
            {/* Slide 1 */}
            <div className="hero relative mx-auto bg-[url('https://i.ibb.co.com/V03tRD5r/71lq-Dylcv-GL-AC-SY879.jpg')] bg-center">
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="hero-content sm:flex-row flex-col relative z-10">
                    <img
                        src="https://i.ibb.co.com/V03tRD5r/71lq-Dylcv-GL-AC-SY879.jpg"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 h-[500px]"
                    />

                    <div className="text-white sm:text-left text-center">
                        <h1 className="lg:text-5xl sm:text-3xl text-4xl font-bold">
                            Oppenheimer
                        </h1>

                        <div className="py-6">
                            <p className="pb-3">2023, Biography</p>
                            <p>
                                The story of J. Robert Oppenheimer and the creation of the atomic bomb.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 2 */}
            <div className="hero relative mx-auto bg-[url('https://i.ibb.co.com/Sw4qFzh8/7103d-g1qu-L-AC-SY879.jpg')] bg-center">
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="hero-content sm:flex-row flex-col relative z-10">
                    <img
                        src="https://i.ibb.co.com/Sw4qFzh8/7103d-g1qu-L-AC-SY879.jpg"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 h-[500px]"
                    />

                    <div className="text-white sm:text-left text-center">
                        <h1 className="lg:text-5xl sm:text-3xl text-4xl font-bold">
                            Avengers: Endgame
                        </h1>

                        <div className="py-6">
                            <p className="pb-3">2019, Action</p>
                            <p>The Avengers assemble once more to reverse Thanos's snap.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 3 */}
            <div className="hero relative mx-auto bg-[url('https://i.ibb.co.com/JWv6cLXF/Screenshot-2025-11-11-021731.png')] bg-center">
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="hero-content sm:flex-row flex-col relative z-10">
                    <img
                        src="https://i.ibb.co.com/JWv6cLXF/Screenshot-2025-11-11-021731.png"
                        className="max-w-sm rounded-lg shadow-2xl sm:py-9 h-[500px]"
                    />

                    <div className="text-white sm:text-left text-center">
                        <h1 className="lg:text-5xl sm:text-3xl text-4xl font-bold">
                            The Lion King
                        </h1>

                        <div className="py-6">
                            <p className="pb-3">1994, Animation</p>
                            <p>
                                A lion cub must embrace his role as king after his father’s death.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
        </div>
    );
};

export default Banner;