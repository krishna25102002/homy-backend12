const Property = require('../models/Property');

// @desc    Add a new property
// @route   POST /api/properties
// @access  Public
exports.addProperty = async (req, res) => {
  console.log('Incoming request body:', req.body);

  try {
    const {
      userId,
      title,
      description,
      category,
      listedIn,
      price,
      size,
      bedrooms,
      bathrooms,
      kitchens,
      yearBuilt,
      floors,
      address,
      location,
      city,
      locationListing,
      amenities,
      images,
      video,
      ownerContactNumber,
      builtupArea,
      carpetArea,
      maintenanceAmount,
      totalFloors,
      carParking,
      facing,
      projectName,
      homeName,
      landType,
      shopType,
      officeType,
      apartmentType,
    } = req.body;

    // Validate required fields
    if (!userId || !title || !price || !address || !city) {
      return res.status(400).json({
        success: false,
        message: 'User ID, title, price, address, and city are required',
      });
    }

    // Create the property in the database
    const property = await Property.create({
      userId,
      title,
      description,
      category,
      listedIn,
      price,
      size,
      bedrooms,
      bathrooms,
      kitchens,
      yearBuilt,
      floors,
      address,
      location,
      city,
      locationListing,
      amenities,
      images,
      video,
      ownerContactNumber,
      builtupArea,
      carpetArea,
      maintenanceAmount,
      totalFloors,
      carParking,
      facing,
      projectName,
      homeName,
      landType,
      shopType,
      officeType,
      apartmentType,
    });

    res.status(201).json({
      success: true,
      message: 'Property added successfully',
      property,
    });
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding property',
      error: error.message,
    });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({
            success: true,
            properties,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching properties',
            error: error.message,
        });
    }
};

// @desc    Get properties by user ID
// @route   GET /api/properties/user/:userId
// @access  Public
exports.getPropertiesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const properties = await Property.find({ userId });

        res.status(200).json({
            success: true,
            properties,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching properties',
            error: error.message,
        });
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Public
exports.updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Property ID is required',
        });
      }
  
      const property = await Property.findByIdAndUpdate(id, updates, { new: true });
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Property updated successfully',
        property,
      });
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating property',
        error: error.message,
      });
    }
  };

  // @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Public
exports.deleteProperty = async (req, res) => {
    console.log(req);
    
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Property ID is required',
        });
    
      }
  
      const property = await Property.findByIdAndDelete(id);
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Property deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting property',
        error: error.message,
      });
    }
  };