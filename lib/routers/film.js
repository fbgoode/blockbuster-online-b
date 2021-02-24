const router = require('express').Router();
const filmController = require('../controllers/film');
const auth5 = require('../middlewares/auth5');

router.get('/',async (req, res) => {
    try{
        const data = await filmController.search(req.query);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id',async (req, res) => {   
    try{
        const data = await filmController.getById(req.params.id);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/',auth5,async (req, res) => {
    try{
        const film = await filmController.add(req.body,req.query);
        const status = 'success';
        res.json({status,new:film});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id',auth5,async (req,res) => {
    try{
        const old = await filmController.update(req.params.id,req.body);
        const now = await filmController.getById(req.params.id);
        const status = 'success';
        res.json({status,old,now});
    } catch( error ){
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete('/:id',auth5,async (req, res) => {
   try{
        const deleted = await filmController.delete(req.params.id);
        const status = 'success';
        res.json({status,deleted});
   } catch (error) {
        return res.status(500).json({
            message: error.message
        });   
   }
});

module.exports = router;