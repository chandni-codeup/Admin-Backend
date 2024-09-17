const NoticeModel = require('../Model/NoticeModel');
const NewsModel = require('../Model/NewsModel');
const EventModel = require('../Model/EventsModel');
const IMG_BASE_URL='http://localhost:8080/static/'

const addNotice=async(req,res)=>{
    const { title, description, expiry, createdBy } = req.body;
    if(!req.file){
        return res.json({error:'Image upload failed'});
    }
    try{
        const newNotice = await NoticeModel.create({title,description,expiry, createdBy,
            noticeImage: (IMG_BASE_URL + req.file.filename)
        })
        res.status(201).json(newNotice);
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
}

const getNotice = async(req,res)=>{
    try {
        const allNotices = await NoticeModel.find();
        res.json(allNotices);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delNotice =async(req,res)=>{
    try {
        const deleteNotice = await NoticeModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully', deleteNotice});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delExpiredNotices= async(req,res)=>{
    try {
        const now= new Date();
        await NoticeModel.deleteMany({expiry:{$lt: now}});
        res.status(200).json({message:'Expired notice(s) deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'Error while deleting exp notice(s).', error})
    }
}

const addNews=async(req,res)=>{
    const { title, description, expiry, createdBy } = req.body;
    if(!req.file){
        return res.json({error:'Image upload failed'});
    }
    try{
        const newNews = await NewsModel.create({title,description,expiry, createdBy,
            newsImage: (IMG_BASE_URL + req.file.filename)
        })
        res.status(201).json(newNews);
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
}

const getNews = async(req,res)=>{
    try {
        const allNews = await NewsModel.find();
        res.json(allNews);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delNews =async(req,res)=>{
    try {
        const deleteNews = await NewsModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully', deleteNews});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delExpiredNews= async(req,res)=>{
    try {
        const now= new Date();
        await NewsModel.deleteMany({expiry:{$lt: now}});
        res.status(200).json({message:'Expired news deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'Error while deleting exp news.', error})
    }
}

const addEvents=async(req,res)=>{
    const { title, description, expiry, createdBy } = req.body;
    if(!req.file){
        return res.json({error:'Image upload failed'});
    }
    try{
        const newEvents = await EventModel.create({title,description,expiry, createdBy,
            eventImage: (IMG_BASE_URL + req.file.filename)
        })
        res.status(201).json(newEvents);
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
}

const getEvents = async(req,res)=>{
    try {
        const allEvents = await EventModel.find();
        res.json(allEvents);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delEvent =async(req,res)=>{
    try {
        const deleteEvent = await EventModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully', deleteEvent});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const delExpiredEvents = async(req,res)=>{
    try {
        const now= new Date();
        await EventModel.deleteMany({expiry:{$lt: now}});
        res.status(200).json({message:'Expired event(s) deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'Error while deleting exp event(s).', error})
    }
}

module.exports={addNotice, getNotice, addNews, getNews, addEvents, getEvents, delNotice, delNews, delEvent, delExpiredNews, delExpiredEvents, delExpiredNotices}