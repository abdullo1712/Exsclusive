import React from 'react'
import './NavMadal.css'
import { AiOutlineUser } from 'react-icons/ai'
import { BiArchive, BiLogOut } from 'react-icons/bi'
import { FaRegStar } from 'react-icons/fa6'
import { CgCloseO } from 'react-icons/cg'

function NavMadal() {
  return (
    <div className='navmadal container'>
        <div className="navmadal_box">
            <span><AiOutlineUser /></span><p>Manage My Account</p>
            <span><BiArchive /></span><p>My Order</p>
            <span><CgCloseO /></span><p>My Cancellations</p>
            <span><FaRegStar /></span><p>My Reviews</p>
            <span><BiLogOut /></span><p>Logout</p>
        </div>
        

    </div>
  )
}

export default NavMadal