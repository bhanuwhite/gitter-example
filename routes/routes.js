const router = require('express').Router();
const myController = require("../controllers/controller");

function getData(req, res){
    //calling function from controller
    myController.getData()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

//assigning routes
router.get('/', getData);

module.exports = router;