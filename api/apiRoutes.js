const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Visitor = require('../models/Visitor');
const Consultant = require('../models/Consultant');

// Get visitor
router.get('/visitor', async (req, res) => {
  try {
    const { query } = req;
    const visitors = await Visitor.find({ reference: query.reference }).populate('consultant', {
      visitors: 1,
      email: 1,
      isLoggedIn: 1,
    });
    res.json(visitors);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

// Create visitor
router.post('/visitor', async (req, res) => {
  try {
    const consultants = await Consultant.find();
    const activeInConsultants = consultants.filter((c) => c.isActive);
    const leastBusyConsultant = activeInConsultants.sort((a, b) => (a.visitors.length < b.visitors.length ? -1 : 1));
    const newVisitor = await Visitor.create({ ...req.body, consultant: leastBusyConsultant[0] });

    await Consultant.findOneAndUpdate(
      { email: leastBusyConsultant[0].email },
      {
        $addToSet: {
          visitors: newVisitor,
        },
      }
    );

    const result = await Visitor.findOne({ reference: req.body.reference }).populate('consultant', {
      visitors: 1,
      email: 1,
      isLoggedIn: 1,
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

// Update visitor
router.put('/visitor', async (req, res) => {
  try {
    const { active } = req.body; // TODO remove reference from body
    await Visitor.findOneAndUpdate(
      { reference: req.query.reference },
      {
        active,
      }
    );
    res.send({ success: true, msg: `Visitor ${req.query.reference} has been updated.` });
  } catch (err) {
    res.json(err);
  }
});

// Delete visitor
router.delete('/visitor', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ reference: req.query.reference });
    const consultant = await Consultant.findOneAndUpdate(
      { _id: visitor.consultant },
      {
        $pull: {
          visitors: { $in: visitor._id },
        },
      },
      { new: true }
    );
    console.log('consultant', consultant);

    await visitor.delete();
    res.send({ success: true, msg: `Visitor has been deleted.` });
  } catch (err) {
    res.json(err);
  }
});

// Get consultant
router.get('/consultant', async (req, res) => {
  try {
    const { query } = req;
    const consultant = await Consultant.findOne(
      { email: query.email },
      {
        visitors: 1,
        email: 1,
        isLoggedIn: 1,
      }
    ).populate('visitors');

    res.json(consultant);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

// Create consultant - currenlty only done manually
router.post('/consultant', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const newConsultant = new Consultant({ ...req.body, password });
  try {
    const result = await newConsultant.save();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

// Update consultant
router.put('/consultant', async (req, res) => {
  try {
    const { email, isActive } = req.body;
    const consultant = await Consultant.findOneAndUpdate(
      { email },
      {
        isActive,
      },
      { new: true }
    );
    res.json(consultant);
  } catch (err) {
    res.json(err);
  }
});

// Get active consultant count
router.get('/activeConsultantsCount', async (req, res) => {
  try {
    const consultant = await Consultant.find({});
    const anyActiveConsultants = consultant.filter((consultant) => consultant.isActive);
    res.json(anyActiveConsultants.length);
  } catch (err) {
    res.status(500).json('internal error', err);
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

// Login authorisation
router.post('/login', async (req, res) => {
  try {
    const { password, email, visitors, isActive } = await Consultant.findOne({ email: req.body.email });
    const validPassword = req.body.password ? await bcrypt.compare(req.body.password, password) : false;

    if (validPassword) {
      res.json({ email, visitors, isActive });
    } else {
      res.status(400).json({ error: 'Invalid Password' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
