const express = require('express');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const spots = await Spot.findAll();
        return res.status(200).json({ Spots: spots });
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
