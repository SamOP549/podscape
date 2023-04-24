// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Podcast from "../../models/Podcast"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Podcast({
            title: req.body.form.title,
            category: req.body.form.category,
            slug: req.body.form.slug,
            description: req.body.form.desc,
            creator: req.body.form.creator,
            episodes: req.body.episodes
        })
        await p.save()
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }
    let podcasts = await Podcast.find()
    res.status(200).json({ podcasts })
}

export default connectDb(handler);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}
