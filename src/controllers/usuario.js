const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(sql, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usuario;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}

const atualizar = (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body
    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?;'
    con.query(sql, [nome, email, senha, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao atualizar usuário' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' })
        } else {
            res.json({ message: 'Usuário atualizado com sucesso', id, nome, email })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM usuario WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir usuário' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' })
        } else {
            res.json({ message: 'Usuário excluído com sucesso', id })
        }
    })
}

const login = (req, res) => {
    const { email, senha } = req.body
    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);'
    con.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro no servidor ao realizar login' })
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Credenciais inválidas ou usuário não encontrado' })
        } else {
            res.json({ message: 'Login realizado com sucesso', usuario: results[0] })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir,
    login
}