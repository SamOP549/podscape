import React from 'react'
import Screens from '@/components/Screens'
import Card from '@/components/Card'
import Podcast from '../models/Podcast'
import mongoose from "mongoose"
import Link from 'next/link'

const Podcasts = ({ podcasts }) => {
    return (
        <div className='bg-[#0A0B0D] text-white'>
            <Screens screen={2} title="Podcasts" bg="/podcasts.jpg" />
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Entertainment<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                    {
                        podcasts.map((podcast, index) => {
                            if (podcast.category == 'entertainment') {
                                return <Link key={index} href={`/podcast/${podcast.slug}`}>
                                    <Card image='./podcast.jpg' title={podcast.title} />
                                </Link>
                            }
                        })
                    }
                </div>
            </div>
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Videogaming<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                    {
                        podcasts.map((podcast, index) => {
                            if (podcast.category == 'videogaming') {
                                return <Link key={index} href={`/podcast/${podcast.slug}`}>
                                    <Card image='./podcast.jpg' title={podcast.title} />
                                </Link>
                            }
                        })
                    }
                </div>
            </div>
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Lifestyle<span className="text-sky-500">.</span></h1>
                    <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                    {
                        podcasts.map((podcast, index) => {
                            if (podcast.category == 'lifestyle') {
                                return <Link key={index} href={`/podcast/${podcast.slug}`}>
                                    <Card image='./podcast.jpg' title={podcast.title} />
                                </Link>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Podcasts

export async function getServerSideProps() {
    // Fetch data from external API
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let podcasts = await Podcast.find()
    // Pass data to the page via props
    return { props: { podcasts: JSON.parse(JSON.stringify(podcasts)) } }
}
