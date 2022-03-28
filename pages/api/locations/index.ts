import dbConnect from '../../../utils/dbConnect'
import Location from '../../../models/Location'

dbConnect()

const locations = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            try {
                const locations = await Location.find({})

                res.status(200).json({ success: true, data: locations })
            } catch(error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const location = await Location.create(req.body)

                res.status(201).json({ success: true, data: location })
            } catch(error) {
                res.status(400).json({ success: false, error })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;    
    }
}

export default locations 
