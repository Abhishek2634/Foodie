/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Avatar, Dialog, DialogContent, DialogTitle } from '@mui/material'
import './MyProfile.css'

const MyProfile = () => {
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [update, setUpdate] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleProfileClose = () => setOpenProfileModal(false);
    const handleOpenProfile = () => setOpenProfileModal(true);
    const handleSave = () => {
         // api call here...
        handleProfileClose()
    }
    return (
        <>
            <div className="my-profile">
                <Avatar variant='square' sx={{ width: 200, height: 200 }} />
                <div className="my-profile-detail">
                    <div className="my-profile-name">
                        <b>Name</b>
                        <p>Nikhil Yadav</p>
                    </div>
                    <div className="my-profile-email">
                        <b>Email</b>
                        <p>Nikhil@gmail.com</p>
                    </div>
                    <div className="my-profile-password">
                        <b>Password</b>
                        <p>abcde12345</p>
                    </div>
                    <button className='profile-btn' onClick={handleOpenProfile}>Update Profile</button>
                    <Dialog open={openProfileModal} onClose={handleProfileClose}>
                        <DialogTitle align="center">Update Profile</DialogTitle>
                        <DialogContent>
                            <div className="update-my-profile">
                                <input
                                    type="text"
                                    placeholder='Update Name'
                                    value={update.name}
                                    onChange={(e) => setUpdate({...update, name: e.target.value})}
                                    name='nmae'
                                />
                                <input
                                    type="email"
                                    placeholder='Update Email'
                                    value={update.email}
                                    onChange={(e) => setUpdate({...update, email:  e.target.value})}
                                    name='email'
                                />
                                <input
                                    type="password"
                                    placeholder='Update Password'
                                    value={update.password}
                                    onChange={(e) => setUpdate({...update, password:  e.target.value})}
                                    name='password'
                                />
                            </div>
                            <button className='update-btn' onClick={handleSave}>Save</button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default MyProfile