import React from 'react';
import RightBar from '../../components/rightBar/RightBar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topBar/TopBar';
import Feed from '../../components/feed/Feed';
import "./home.css";

const Home = () => {
    return (
        <div>
            <TopBar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <RightBar />
            </div>
        </div>
    );
};

export default Home;