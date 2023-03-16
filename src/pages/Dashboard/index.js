import React from 'react'
import {useSelector} from "react-redux"
import {Link, Navigate} from "react-router-dom"
import Blogs from './Blogs'
import Category from './Categories'
import Projects from './Projects'
import "./styles.css"

export default function Dasboard() {

    const token = useSelector(state => state.auth.token)

    if (!token) {
        return <Navigate to="/login" replace={true} />
    }

    console.log(token);

    return (
        <div className='dashboard'>
            <header>
                <h1>Dashboard</h1>
                <Link to="/">Home</Link>
            </header>
            <Blogs token={token} />
            <Projects token={token} />
            <Category token={token}/>

        </div>
    )
}
