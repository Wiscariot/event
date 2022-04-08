import dbConnect from '../../../utils/dbConnect'
import Answer from '../../../models/Answer'

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
        
            
            try {
            const answers = await Answer.find({ event: id })
            
            if (!answers) {
                return res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true, data: answers })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
        break;

        case 'PUT':

            try {
                const answer = await Answer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                
                if (!answer) {
                    return res.status(400).json({ success: false})
                }
    
                res.status(200).json({ success: true, data: answer })
            } catch (error) {
                res.status(400).json({ success: false})
            }
            break;

        case 'DELETE':

        try {
            const deletedAnswer = await Answer.deleteOne({ _id: id })
            
            if (!deletedAnswer) {
                return res.status(400).json({ success: false})
            }

            res.status(200).json({ success: true, data: {} })
        } catch (error) {
            res.status(400).json({ success: false})
        }
        break;
        
        default:
            res.status(400).json({ success: false})
        break;
    }
}