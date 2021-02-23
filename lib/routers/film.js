const router = require('express').Router();
const filmController = require('../controllers/film');

router.get('/',async (req, res) => {   
    try{
        const data = await filmController.getPage(req.params.page);
        res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/',async (req, res) => {
    try{
        const id = await filmController.add(req.body);
        const status = 'success';
        res.json({status,id});
    } catch( error ){
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id',async (req,res) => {
    try{
        const old = await filmController.update(req.params.id,req.body);
        const now = await filmController.get(req.params.id);
        const status = 'success';
        res.json({status,old,now});
    } catch( error ){
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete('/:id',async (req, res) => {
   try{
        await filmController.delete(req.params.id);
        res.json({status,id});
   } catch( error ) {
        return res.status(500).json({
            message: error.message
        });   
   }
});

module.exports = router;