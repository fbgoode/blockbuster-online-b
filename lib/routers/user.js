const router = require('express').Router();
const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const auth5 = require('../middlewares/auth5');
const auth = require('../middlewares/auth');
const auth0 = require('../middlewares/auth0');

router.get('/',auth5,async (req, res) => {   
    try{
        let data;
        if (req.query.email != undefined) data = await userController.getByEmail(req.query.email);
        else data = await userController.search(req.query);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id/order/:oid',auth,async (req, res) => {   
    try{
        const data = await userController.getOrder(req.params.id,req.params.oid);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id/order',auth,async (req, res) => {   
    try{
        const data = await userController.getOrders(req.params.id);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/:id/order',auth,async (req, res) => {   
    try{
        req.body.user = req.params.id;
        const order = await orderController.add(req.body);
        const status = 'success';
        res.json({status,new:order});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id',auth,async (req, res) => {   
    try{
        const data = await userController.getById(req.params.id);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/login',async (req, res) => {
    try{
        const jwt = await userController.login(req.body.email,req.body.password);
        const status = 'success';
        res.json({status,jwt});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/',auth0,async (req, res) => {
    try{
        // Non Admins or unauthorized users can only create users with Customer role.
        if (req.body.role !== undefined && req.body.role !== 'Customer' && req.jwt.role !== 'Admin') throw new Error('User role requires Admin authorization.');
        const user = await userController.add(req.body);
        const status = 'success';
        res.json({status,new:user});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id',auth,async (req,res) => {
    try{
        const old = await userController.update(req.params.id,req.body);
        const now = await userController.getById(req.params.id);
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
        const deleted = await userController.delete(req.params.id);
        const status = 'success';
        res.json({status,deleted});
   } catch (error) {
        return res.status(500).json({
            message: error.message
        });   
   }
});

module.exports = router;