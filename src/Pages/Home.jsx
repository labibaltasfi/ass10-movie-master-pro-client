import React from 'react';
import Banner from '../components/Banner';
import TopRatedMovies from '../components/TopRatedMovies';
import RecentlyAdded from '../components/RecentlyAdded';
import GenreSection from '../components/GenreSection';
import Footer from '../components/footer';
import StatisticsSection from '../components/StatisticsSection';
import AboutSection from '../components/AboutSection';


const Home = () => {
    return (
        <div>
            <title>MovieMaster Pro</title>
           <Banner></Banner>
           <StatisticsSection></StatisticsSection>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <GenreSection></GenreSection>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;