const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        get: v => v ? `Description: ${v}` : v
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Schema virtuals are properties that are not stored in MongoDB, 
// but are computed dynamically when you access them.
// They are useful for deriving values from existing data, 
// formatting output, or adding helper fields.
productSchema.virtual('inRupees').get(function () {
    return `₹ ${this.price}`;
});

// Instance Methods:
// we can attach instance methods to a schema 
// by defining them in the schema's methods object. 
// These methods will be available on individual document instances.
productSchema.methods.log = function() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Product Fetched via API: - ID: ${this._id} - Name: ${this.name}`);
};

// Stacit Methods:
// We can attach static methods to a schema to define class-level functions — 
// these are called on the model itself (not on instances/documents).
productSchema.statics.findByName = function (name) {
    return this.find({name: name});
};

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
