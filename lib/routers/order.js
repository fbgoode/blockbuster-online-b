const router = require('express').Router();
const orderController = require('../controllers/order');
const auth5 = require('../middlewares/auth5');

router.use('/',auth5); // All direct manipulation of orders requires Admin authentication

router.get('/',async (req, res) => {
    try{
        const data = await orderController.search(req.query);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id',async (req, res) => {   
    try{
        const data = await orderController.getById(req.params.id);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/',async (req, res) => {
    try{
        const order = await orderController.add(req.body);
        const status = 'success';
        res.json({status,new:order});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id',async (req,res) => {
    try{
        const old = await orderController.update(req.params.id,req.body);
        const now = await orderController.getById(req.params.id);
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
        const deleted = await orderController.delete(req.params.id);
        const status = 'success';
        res.json({status,deleted});
   } catch (error) {
        return res.status(500).json({
            message: error.message
        });   
   }
});

module.exports = router;