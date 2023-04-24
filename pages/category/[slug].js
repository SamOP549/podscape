import React from 'react'
import { useRouter } from 'next/router'
import Screens from '@/components/Screens'
import Card from '@/components/Card'
import Link from 'next/link'
import mongoose from 'mongoose'
import Podcast from '@/models/Podcast'

const Category = ({ podcasts }) => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div className="bg-[#0A0B0D] text-white">
            <Screens screen={2} title={slug} bg="/categorycover.jpg" />
            <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
                <div className="flex justify-between items-center">
                    <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Latest from <span className='capitalize'>{slug}</span><span className="text-sky-500">.</span></h1>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                    {
                        podcasts.map((podcast, index) => {
                            return <Link key={index} href={`/podcast/${podcast.slug}`}>
                                <Card image='/podcast.jpg' title={podcast.title} />
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Category

export async function getServerSideProps(context) {
    // Fetch data from external API
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let podcasts = await Podcast.find({ category: context.query.slug })
    // Pass data to the page via props
    return { props: { podcasts: JSON.parse(JSON.stringify(podcasts)) } }
}
