const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/:id',async (req, res) => {   
    try{
        const data = await userController.getById(req.params.id);
        res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/',async (req, res) => {   
    try{
        let data;
        if (req.query.email != undefined) data = await userController.getByEmail(req.query.email);
        else data = await userController.getPage(req.query);
        res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.post('/',async (req, res) => {
    try{
        const user = await userController.add(req.body);
        const status = 'success';
        res.json({status,new:user});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id',async (req,res) => {
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

router.delete('/:id',async (req, res) => {
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