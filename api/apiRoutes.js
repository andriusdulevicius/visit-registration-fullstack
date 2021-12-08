const express = require('express');
const router = express.Router();
const Costumer = require('../models/Costumer');

router.post('/addNewCostumer', async (req, res) => {
  const newCostumer = new Costumer(req.body);
  try {
    const result = await newCostumer.save();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get('/allCostumers', async (req, res) => {
  try {
    const costumers = await Costumer.find();
    res.json(costumers);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  await Costumer.findOneAndDelete({ _id: req.params.id });
  res.send({ success: true, msg: `Costumer has been deleted.` });
});

router.put('/edit/:id', async (req, res) => {
  const { reference, active } = req.body;
  await Costumer.findOneAndUpdate(
    { _id: req.params.id },
    {
      active,
    }
  );
  res.send({ success: true, msg: `Costumer ${reference} has been updated.` });
});

module.exports = router;
