const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    try {
        const sql = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', evento: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe os campos obrigatórios' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM evento;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        } else {
            res.json(results)
        }
    })
}

const atualizar = (req, res) => {
    const { id } = req.params
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    const sql = 'UPDATE evento SET usuarioId = ?, cidade = ?, tipoEvento = ?, temperaturaMaxima = ?, data = ?, nivelImpacto = ? WHERE id = ?;'
    con.query(sql, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao atualizar evento' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Evento não encontrado' })
        } else {
            res.json({ message: 'Evento atualizado com sucesso', id })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM evento WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir evento' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Evento não encontrado' })
        } else {
            res.json({ message: 'Evento excluído com sucesso', id })
        }
    })
}

const resumo = (req, res) => {
    const sqlEventos = 'SELECT * FROM evento;'
    const sqlMedia = 'SELECT AVG(temperaturaMaxima) AS mediaTemperatura FROM evento;'

    con.query(sqlEventos, (err, eventos) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar eventos para o resumo' })
        }
        con.query(sqlMedia, (err, mediaRes) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Erro ao calcular média de temperatura' })
            }
            res.json({
                totalEventos: eventos.length,
                temperaturaMedia: mediaRes[0].mediaTemperatura || 0,
                eventos: eventos
            })
        })
    })
}

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir,
    resumo
}