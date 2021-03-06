import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'

dbConnect()

const events = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            try {
                const events = await Event.find({}).populate('location')

                res.status(200).json({ success: true, data: events })
            } catch(error) {
                res.status(400).json({ success: false, error })
            }
            break;
        case 'POST':
            try {
                const event = await Event.create(req.body)

                res.status(201).json({ success: true, data: event })
            } catch(error) {
                res.status(400).json({ success: false, error })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;    
    }
}

export default events 
