const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');

// Add property route
router.post('/', PropertyController.addProperty);

// Get all properties route
router.get('/', PropertyController.getProperties);

// Get properties by user ID
router.get('/user/:userId', PropertyController.getPropertiesByUserId);

// Update property by ID
router.put('/:id', PropertyController.updateProperty);

// Delete property by ID
router.delete('/:id', PropertyController.deleteProperty);

module.exports = router;