const express = require('express')
const router = express.Router()

const USER = require('../models/user.model')
const jwt = require("jsonwebtoken");
const bCrypt = require('bcrypt')

const helpers = require('./helpers')
const { secret } = require('./../config.json').jwt
const Token = require('../models/token.model');

router

    .post('/login', async (req, res) => {

        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const user = await USER.findOne({
            userEmail
        })

        if (!user) {
            return res.sendStatus(404)
        }

        if (await bCrypt.compare(userPassword, user.userPassword) === false) {
            return res.sendStatus(401)
        } else {

            const {userEmail, _id} = user

            helpers.updateTokens(_id)
                .then(tokens => res.json({tokens, userEmail, _id}))

        }
    })
    .post('/refresh', async (req, res) => {
        const { refreshToken } = req.body;

        let payload;

        try {
            payload = jwt.verify(refreshToken, secret)
            if (payload.type !== 'refresh') {
                return res.status(400).json({ message: 'Invalid token' })
            }
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: "Token expired" })
            } else if (e instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: "Invalid token" })
            }
        }

        Token.findOne({ tokenId: payload.id })
            .exec()
            .then((token) => {
                if (token === null) {
                    throw new Error('Invalid token')
                }
                return helpers.updateTokens(token.userId)
            })
            .then((tokens) => res.json(tokens))
            .catch(err => res.status(400).json({ message: err.message }))
    })
    .post('/check', helpers.authenticateToken, async (req, res) => {
        res.json({ message: "ok" })
    })

module.exports = router