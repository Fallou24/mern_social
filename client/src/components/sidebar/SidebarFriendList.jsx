import React from 'react';
import { Users } from '../../dummyData';

const SidebarFriendList = () => {
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            {Users.map(user => {
                return <li key={user.id} className="sidebarFreindItem">
                    <img src={PK+user.profilePicture} alt="" className='sidebarFreindImg' />
                    <span className="sidebaruserName">{user.username}</span>
                </li>
            })}
        </>
    )
}

export default SidebarFriendList;