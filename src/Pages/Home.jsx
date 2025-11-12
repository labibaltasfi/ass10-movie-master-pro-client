import React from 'react';
import HeroSection from '../components/HeroSection';
import TopRatedMovies from '../components/TopRatedMovies';
import RecentlyAdded from '../components/RecentlyAdded';
import GenreSection from '../components/GenreSection';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <GenreSection></GenreSection>
        </div>
    );
};

export default Home;