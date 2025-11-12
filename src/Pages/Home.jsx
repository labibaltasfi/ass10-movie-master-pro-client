import React from 'react';
import HeroSection from '../components/HeroSection';
import TopRatedMovies from '../components/TopRatedMovies';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <TopRatedMovies></TopRatedMovies>
        </div>
    );
};

export default Home;