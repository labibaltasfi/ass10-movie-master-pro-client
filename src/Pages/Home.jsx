import React from 'react';
import Banner from '../components/Banner';
import TopRatedMovies from '../components/TopRatedMovies';
import RecentlyAdded from '../components/RecentlyAdded';
import GenreSection from '../components/GenreSection';
import Footer from '../components/footer';


const Home = () => {
    return (
        <div>
           <Banner></Banner>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <GenreSection></GenreSection>
        </div>
    );
};

export default Home;