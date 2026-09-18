import React from 'react'
import BannerImg from '../assets/Banner2.png'
import { Link } from 'react-router'

function Banner() {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${BannerImg})`,
                }}
            >
                <div className="hero-overla"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Watch movie <span className='text-amber-300'>Unlimited</span></h1>
                        <p className="mb-5">
                            Your ultimate cinematic escape. Discover, stream, and review thousands of movies, from Hollywood blockbusters to hidden indie gems, all in one place.
                        </p>
                        <Link to="/movieList" className="btn btn-primary">Start Browsing</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
