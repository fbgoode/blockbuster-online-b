const router = require('express').Router();
const filmController = require('../controllers/film');

router.get('/',async (req, res) => {   
    try{
        const data = await filmController.getPage(req.params.page);
        res.json(data)
    } catch (error) {
        return res.sendStatus(500).json({
            message: 'Server Error'
        });
    }
});

router.post('/',async (req, res) => {
    try{
        const id = await filmController.add(req.body);
        const status = 'success';
        res.json({status,id});
    } catch( error ){
        return res.sendStatus(500).json({
            message: 'Server Error'
        });
    }
});

router.put('/:id',async (req,res) => {
    try{
        const old = await filmController.update(id,req.body);
        const now = await filmController.get(id);
        const status = 'success';
        res.json({status,old,now});
    } catch( error ){
        return res.sendStatus(500).json({
            message: 'Server Error'
        });
    }
});

router.delete('/:id',async (req, res) => {
   try{
        await filmController.delete(id);
        res.json({status,id});
   } catch( error ) {
        return res.sendStatus(500).json({
            message: 'Server Error'
        });   
   }
});

module.exports = router;