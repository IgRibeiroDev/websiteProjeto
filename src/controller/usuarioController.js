const db = require('../db/db');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {json} = require('stream/consumers');
const { NOMEM } = require('dns');

const usuarioSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().required(),
    dtNascimento: Joi.date().required(),
    preferencia: Joi.string().allow(''),
    senha: Joi.string().min(6).required()
});

exports.listarUsuarios = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM usuario');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar usuarios', err);
        res.status(500).json({error: 'Erro interno do servidor'});        
    }
};

exports.listarUsuarioNome = async (req, res) => {
    const {nome} = req.params;
    try {
        const [result] = await db.query('SELECT * FROM usuario WHERE nome LIKE ?', [`${nome}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado'})
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar usuario', err);
        res.status(500).json({ error: 'Erro interno do servidor'});        
    }
};