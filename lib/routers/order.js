const router = require('express').Router();
const orderController = require('../controllers/order');

router.get('/',async (req, res) => {   
    try{
        const data = await orderController.getPage(req.params.page);
        res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

router.post('/',async (req, res) => {
    try{
        const id = await orderController.add(req.body);
        const status = 'success';
        res.json({status,id});
    } catch( error ){
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

router.put('/:id',async (req,res) => {
    try{
        const old = await orderController.update(req.params.id,req.body);
        const now = await orderController.get(req.params.id);
        const status = 'success';
        res.json({status,old,now});
    } catch( error ){
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

router.delete('/:id',async (req, res) => {
   try{
        await orderController.delete(req.params.id);
        res.json({status,id});
   } catch( error ) {
        return res.status(500).json({
            message: 'Server Error'
        });   
   }
});

module.exports = router;