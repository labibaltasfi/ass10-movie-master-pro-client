import React from 'react';
import HeroSection from '../components/HeroSection';
import TopRatedMovies from '../components/TopRatedMovies';
import RecentlyAdded from '../components/RecentlyAdded';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
        </div>
    );
};

export default Home;