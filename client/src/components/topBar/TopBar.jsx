import { Chat, Notifications, Person, Search } from '@mui/icons-material';
import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { authContext } from '../../context/AuthContext';
import "./topBar.css"

const TopBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let { user } = useContext(authContext)
    const { profilePicture, username } = user;
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/">
                    <span className='topbarLogo'>facebook</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <span className="searchIcon">
                    <Search />
                </span>
                <input type="text" placeholder='Search for freind, post or video' className='searchInput' />
            </div>
            <div className="topbarRight">
                <p className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </p>
                <div className="topbarIcon">
                    <p className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </p>
                    <p className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </p>
                    <p className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </p>
                </div>
                <p className="profilPicture">
                    <Link to={"/profile/" + username}>
                        <img src={profilePicture ? PF + profilePicture : PF + "person/noAvatar.png"} alt="" className='profilPictureImg' />
                    </Link>
                </p>
            </div>
        </div >
    );
};

export default TopBar;