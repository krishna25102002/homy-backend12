const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    listedIn: { type: String },
    price: { type: Number, required: true },
    size: { type: String },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    kitchens: { type: Number },
    yearBuilt: { type: String },
    floors: { type: Number },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    city: { type: String, required: true },
    locationListing: { type: String },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    video: { type: String },
    ownerContactNumber: { type: String },
    builtupArea: { type: String },
    carpetArea: { type: String },
    maintenanceAmount: { type: Number },
    totalFloors: { type: Number },
    carParking: {
      cars: { type: Number },
      bikes: { type: Number },
      cycles: { type: Number },
    },
    facing: { type: String },
    projectName: { type: String },
    homeName: { type: String },
    landType: { type: String },
    shopType: { type: String },
    officeType: { type: String },
    apartmentType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);
