const express = require('express');
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  try {
    const { imageId } = req.params;
    const userId = req.user.id;

const spotImage = await SpotImage.findByPk(imageId);
    
    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }
const spot = await Spot.findByPk(spotImage.spotId);
    
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
await spotImage.destroy();
    
return res.json({ message: "Successfully deleted" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;