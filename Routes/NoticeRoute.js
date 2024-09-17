const express=require('express')
const router=express.Router()
const {upload}=require('../Middleware/Multer')
const {addNotice, getNotice, addNews, getNews, addEvents, getEvents, delNotice, delNews, delEvent,delExpiredNews, delExpiredEvents, delExpiredNotices}=require('../Controller/NoticeCtrl')


router.post('/addNotice', upload.single('noticeImage'),addNotice)
router.get('/getNotice', getNotice)
router.delete('/deleteNotice/:id', delNotice)
router.delete('/delExpiredNotices', delExpiredNotices)

router.post('/addNews', upload.single('newsImage'),addNews)
router.get('/getNews', getNews)
router.delete('/deleteNews/:id', delNews)
router.delete('/delExpiredNews', delExpiredNews)

router.post('/addEvents', upload.single('eventImage'),addEvents)
router.get('/getEvents', getEvents)
router.delete('/deleteEvents/:id', delEvent)
router.delete('/delExpiredEvents', delExpiredEvents)

module.exports= router;