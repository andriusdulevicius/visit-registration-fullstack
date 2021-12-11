const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

router.post('/addNewVisit', async (req, res) => {
  const newVisit = new Visit(req.body);
  try {
    const result = await newVisit.save();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get('/allVisits', async (req, res) => {
  try {
    const visits = await Visit.find();
    res.json(visits);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  await Visit.findOneAndDelete({ _id: req.params.id });
  res.send({ success: true, msg: `Visit has been deleted.` });
});

router.put('/edit/:id', async (req, res) => {
  const { reference, active } = req.body;
  await Visit.findOneAndUpdate(
    { _id: req.params.id },
    {
      active,
    }
  );
  res.send({ success: true, msg: `Visit ${reference} has been updated.` });
});

module.exports = router;
