const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()


const org = process.env.ORG

// importing data model schemas
const { user } = require('../models/models')

// GET single user by password
router.get('/:username/:password', (req, res, next) => {
  const salt = "$2a$10$boAxO3xUYcJ34WvJokLeEO";
  const hashedpass = bcrypt.hashSync(req.params.password, salt);
  user.findOne({ org: org, username: req.params.username, password: hashedpass }, (error, data) => {
    if (error) {
      return next(error)
    }
    else if(data) {
      res.json(data.role);
    }
    else {
      res.json(null);
    }
  })
})

module.exports = router