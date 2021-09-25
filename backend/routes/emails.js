const express = require('express')
const router = express.Router()
const Email = require('../models/email')

router.get('/', async (req, res) => {
  try {
    const emails = await Email.find()
    res.json(emails)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const email = new Email({
    email: req.body.email,
  })

  try {
    const newEmail = await email.save()
    res.status(201).json(newEmail)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router