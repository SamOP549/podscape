import React from 'react'
import Link from 'next/link'

const ArtistCard = ({ image, name }) => {
    return (
        <div className="artist_card group">
            <img className='group-hover:opacity-70' src={image} alt='' />
            <div className='details flex flex-col'>
                <p className='text-md text-sky-500'>{name}</p>
                <p className='text-sm mt-2'>Podcaster</p>
            </div>
        </div>
    )
}

export default ArtistCard