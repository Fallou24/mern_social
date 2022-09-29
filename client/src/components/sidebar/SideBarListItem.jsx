import React from 'react';

const SideBarListItem = ({ sideBarIcon, sidebarText }) => {
    return (
        <>
            <li className="sidebarItem">
                <span className="sidebarIcon">{sideBarIcon}</span>
                <span className="sidebarListIemText">{sidebarText}</span>
            </li>
        </>
    );
};

export default SideBarListItem;