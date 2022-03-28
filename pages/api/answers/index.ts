import dbConnect from '../../../utils/dbConnect'
import Answer from '../../../models/Answer'

dbConnect()

const answers = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            try {
                const answers = await Answer.find({})

                res.status(200).json({ success: true, data: answers })
            } catch(error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const answer = await Answer.create(req.body)

                res.status(201).json({ success: true, data: answer })
            } catch(error) {
                res.status(400).json({ success: false, error })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;    
    }
}

export default answers 
