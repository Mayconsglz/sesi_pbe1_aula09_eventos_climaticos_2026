const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')

const rotaInicial = (req, res) => {
    res.json("Back-end eventos climaticos respondendo")
}

router.get('/', rotaInicial)
router.get('/usuarios', Usuario.listar)
router.post('/usuarios', Usuario.cadastrar)

module.exports = router