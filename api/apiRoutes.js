const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Consultant = require('../models/Consultant');

router.post('/addNewVisit', async (req, res) => {
  try {
    const consultants = await Consultant.find();
    console.log({ consultants });
    const loggedInConsultants = consultants.filter((c) => c.isLoggedIn);
    console.log({ loggedInConsultants });
    const leastBusyConsultant = loggedInConsultants.sort((a, b) => (a.visits.length < b.visits.length ? 1 : -1))[0];
    console.log({ leastBusyConsultant });
    const newVisit = await new Visit({ ...req.body, consultant: leastBusyConsultant._id });
    console.log(newVisit);

    await Consultant.findOneAndUpdate(
      { email: leastBusyConsultant.email },
      {
        $addToSet: {
          visits: newVisit._id,
        },
      }
    );

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

router.post('/addNewConsultant', async (req, res) => {
  const newConsultant = new Consultant(req.body);
  try {
    const result = await newConsultant.save();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get('/allConsultants', async (req, res) => {
  try {
    const consultants = await Consultant.find();
    res.json(consultants);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

router.post('/consultant', async (req, res) => {
  try {
    const consultant = await Consultant.findOneAndUpdate(
      { email: req.body.email, password: req.body.password },
      { $set: { isLoggedIn: req.body.isLoggedIn } },
      { new: true }
    );

    res.json(consultant);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

module.exports = router;
