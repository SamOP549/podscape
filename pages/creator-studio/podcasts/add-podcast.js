import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import slugify from 'react-slugify';
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import { useRouter } from 'next/router';

const Add = () => {
    const router = useRouter()
    const [form, setForm] = useState({})
    const [episodes, setEpisodes] = useState([])
    const [no, setNo] = useState(0)
    const handleChange = (e) => {
        e.preventDefault()

        setForm({ ...form, [e.target.name]: e.target.value, slug: slugify(form.title) })
    }

    const addEpisode = (e) => {
        e.preventDefault()
        setNo(no + 1)
        setEpisodes([...episodes, { no: no, title: "", type: "", src: "" }])
    }

    const handleEpisodeChange = (e, i) => {
        e.preventDefault()
        episodes[i][e.target.name] = e.target.value
        setEpisodes([...episodes])
    }

    const removeEpisode = (e) => {
        e.preventDefault()
        setNo(no - 1)
        episodes.pop()
        setEpisodes([...episodes])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        form.slug = slugify(form.title)
        const creator = JSON.parse(localStorage.getItem('mycreator'))
        form.creator = creator.email
        const sendData = { form, episodes };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addpodcast`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        console.log(data)
        router.push('/creator-studio/podcasts')
    }
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            .navbar{
                display: none;
            }
            `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add a Podcast">
                            <Stack spacing={3}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={form.title ? form.title : ""}
                                />
                                <p>Slug-</p>
                                <TextField onChange={handleChange} value={form.slug} name="slug" variant="outlined" />
                                <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                                <RadioGroup
                                    aria-labelledby="category-label"
                                    value={form.category ? form.category : ""}
                                    onChange={handleChange}
                                    name="category"
                                >
                                    <FormControlLabel value="entertainment" control={<Radio />} label="Entertainment" />
                                    <FormControlLabel value="lifestyle" control={<Radio />} label="Lifestyle" />
                                    <FormControlLabel value="videogaming" control={<Radio />} label="Videogaming" />
                                    <FormControlLabel value="astronomy" control={<Radio />} label="Astronomy" />
                                </RadioGroup>
                                <Button onClick={addEpisode} variant='outlined' className='w-fit'>Add Episode</Button>
                                {
                                    episodes.map((episode, index) => {
                                        return (
                                            <div className='flex flex-col space-y-4' key={index}>
                                                <div className='flex items-center space-x-8'>
                                                    <p>Episode {index + 1}</p>
                                                    <Button onClick={removeEpisode} variant='outlined'>Remove Episode</Button>
                                                </div>
                                                <TextField onChange={(e) => handleEpisodeChange(e, index)} value={episode?.title} name="title" label="Title" variant="outlined" />
                                                <TextField onChange={(e) => handleEpisodeChange(e, index)} value={episode?.src} name="src" label="Src" variant="outlined" />
                                                <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="type-label"
                                                    value={episode?.type ? episode?.type : ""}
                                                    name="type"
                                                    onChange={(e) => handleEpisodeChange(e, index)}
                                                >
                                                    <FormControlLabel value="audio" control={<Radio />} label="Audio" />
                                                    <FormControlLabel value="video" control={<Radio />} label="Video" />
                                                </RadioGroup>
                                            </div>
                                        )
                                    }
                                    )
                                }
                                <TextField
                                    name="desc"
                                    label="Description"
                                    value={form.desc ? form.desc : ""}
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                />
                            </Stack>
                            <br />
                            <Button variant="outlined" mt={2} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Add