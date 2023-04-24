import React from "react"
import Screens from "@/components/Screens"
import Card from "@/components/Card"
import CategoryCard from "@/components/CategoryCard"
import ArtistCard from "@/components/ArtistCard"
import Link from "next/link"
import Podcast from '../models/Podcast'
import Creator from "@/models/Creator"
import mongoose from "mongoose"

export default function Home({ artists, podcasts }) {
  return (
    <main className="bg-[#0A0B0D] text-white">
      <Screens screen={0} />
      <div className="md:py-20 lg:px-20 py-12 md:px-12 px-6 h-fit">
        <Screens screen={1} podcasts={podcasts} />
      </div>
      <div className="md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
        <div className="flex justify-between items-center">
          <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Entertainment<span className="text-sky-500">.</span></h1>
          <Link href='/category/entertaiment'>
            <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
          </Link>
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
          <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Lifestyle<span className="text-sky-500">.</span></h1>
          <Link href='/category/lifestyle'>
            <button className="text-xs px-4 py-1 rounded-3xl view-all">VIEW ALL</button>
          </Link>
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
      <div className="bg-[#121413] md:py-20 lg:px-20 py-12 md:px-12 px-8 h-fit">
        <div className="flex justify-between items-center">
          <h1 className='text-left font-bold lg:text-3xl md:text-2xl text-xl'>Browse by category  <span className="text-sky-500">.</span></h1>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 mt-8">
          <CategoryCard image="./entertainment.jpg" title="Entertainment" />
          <CategoryCard image="./astronomy.jpg" title="Astronomy" />
          <CategoryCard image="./lifestyle.jpg" title="Lifestyle" />
          <CategoryCard image="./videogaming.jpg" title="Videogaming" />
        </div>
      </div>
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
    </main>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let artists = await Creator.find()
  let podcasts = await Podcast.find()
  // Pass data to the page via props
  return { props: { artists: JSON.parse(JSON.stringify(artists)), podcasts: JSON.parse(JSON.stringify(podcasts)) } }
}
