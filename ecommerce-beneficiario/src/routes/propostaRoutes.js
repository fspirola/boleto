var express = require('express');

var propostaRouter = express.Router();

var router = function() {
    var propostaController = require('../controller/propostaController')();
    
    propostaRouter.route('/adicionar')
        .post(propostaController.adicionar);

    return propostaRouter;
};

module.exports = router;