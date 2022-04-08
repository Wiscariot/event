/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
        
            
            try {
            const event = await Event.findById(id).populate('location').populate('rsvp').exec()
            
            if (!event) {
                return res.status(400).json({ success: false, error })
            }

            res.status(200).json({ success: true, data: event })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
        break;

        case 'PUT':

            try {
                const event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                
                if (!event) {
                    return res.status(400).json({ success: false})
                }
    
                res.status(200).json({ success: true, data: event })
            } catch (error) {
                res.status(400).json({ success: false})
            }
            break;

        case 'DELETE':

        try {
            const deletedEvent = await Event.deleteOne({ _id: id })
            
            if (!deletedEvent) {
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