const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectId;

const org = process.env.ORG

// importing data model schemas
const { orgs } = require('../models/models')

// GET org
router.get('/', (req, res, next) => {
  orgs.findById({_id: ObjectId(org)}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
