const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET all services
router.get('/', (req, res, next) => {
  services.find({ org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

// GET single service by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  services.findOne({ _id: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

// GET service based on search query
// Ex: '...?title=Tutoring&searchBy=title' where 'Tutoring' is the name of the service
router.get('/search/', (req, res, next) => {
  const dbQuery = { org: org }
  switch (req.query.searchBy) {
    case 'title':
      // match service name
      dbQuery.title = { $regex: `${req.query.title}`, $options: 'i' }
      break
    case 'status':
      // match service status
      dbQuery.status = { $regex: `${req.query.status}`}
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  services.find(dbQuery, (error, data) => {
  console.log(dbQuery)
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// POST new service
router.post('/', (req, res, next) => {
  const newService = req.body
  newService.org = org
  services.create(newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update service
router.put('/update/:id', (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// DELETE service (switch service status to 'inactive')
router.delete('/:id', (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, { status: 'Inactive' }, { new: true }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.send('Service deleted')
    }
  })
})

module.exports = router