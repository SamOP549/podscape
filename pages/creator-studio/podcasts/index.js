import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, Button } from "@mui/material";
import Link from 'next/link';
import AllPodcasts from "../../../src/components/dashboard/AllPodcasts"
import mongoose from 'mongoose';
import Podcast from '../../../models/Podcast';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Allproducts = () => {
    const router = useRouter()
    const [podcasts, setPodcasts] = useState([])
    useEffect(() => {
        const getPodcasts = async () => {
            const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getpodcasts`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('mycreator')).token }),
            })
            const res = await t.json()
            setPodcasts(res.podcasts)
        }
        if (!localStorage.getItem('mycreator')) {
            router.push('/')
        }
        else {
            getPodcasts()
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <div className='flex justify-end px-8 space-x-4'>
                            <Link href='/creator-studio/podcasts/add-podcast'>
                                <Button variant='outlined'
                                    className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                    Add Combo
                                </Button>
                            </Link>
                        </div>
                        <AllPodcasts podcasts={podcasts} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allproducts