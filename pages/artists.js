import React from 'react'
import Screens from '@/components/Screens'
import ArtistCard from '@/components/ArtistCard'
import Creator from '../models/Creator'
import mongoose from "mongoose";
import Link from 'next/link';

const Artists = ({ artists }) => {
    return (
        <div className='bg-[#0A0B0D] text-white'>
            <Screens screen={2} title="Artists" bg="/artists.jpg" />
            <div className="bg-[#121413] md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <h1 className='text-center font-bold lg:text-4xl md:text-3xl text-2xl'>Popular Artists<span className="text-sky-500">.</span></h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-12">
                    {
                        artists.map((artist, index) => {
                            return <Link key={index} href={`/artist/${artist._id}`}>
                                <ArtistCard image="./artist.jpg" name={`${artist.fname} ${artist.lname}`} />
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Artists

export async function getServerSideProps() {
    // Fetch data from external API
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let artists = await Creator.find()

    // Pass data to the page via props
    return { props: { artists: JSON.parse(JSON.stringify(artists)) } }
}

