import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from '@mui/icons-material';
import React from 'react';
import "./sidebar.css";
import SidebarFriendList from './SidebarFriendList';
import SideBarListItem from './SideBarListItem';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarContainer">
                <ul className="sidebarList">
                    <SideBarListItem sideBarIcon={<RssFeed />} sidebarText="Feed" />
                    <SideBarListItem sideBarIcon={<Chat />} sidebarText="Chat" />
                    <SideBarListItem sideBarIcon={<PlayCircleFilledOutlined />} sidebarText="Videos" />
                    <SideBarListItem sideBarIcon={<Group />} sidebarText="Groups" />
                    <SideBarListItem sideBarIcon={<Bookmark />} sidebarText="Bookmarks" />
                    <SideBarListItem sideBarIcon={<HelpOutline />} sidebarText="Questions" />
                    <SideBarListItem sideBarIcon={<WorkOutline />} sidebarText="Jobs" />
                    <SideBarListItem sideBarIcon={<Event />} sidebarText="Events" />
                    <SideBarListItem sideBarIcon={<School />} sidebarText="Courses" />
                </ul>
                <button className='showmoreBtn'>Show more</button>
                <hr />
                <ul className="sidebarFriendList">
                    <SidebarFriendList /> 
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;