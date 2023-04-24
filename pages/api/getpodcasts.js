import Podcast from '../../models/Podcast';
import connectDb from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req, res) => {
    const token = req.body.token
    var data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    let podcasts = await Podcast.find({ creator: data.email })
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