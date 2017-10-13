const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const SnowboardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    snowboards: [SnowboardSchema]
});

// Create models for each schema
const CompanyModel = mongoose.model('Company', CompanySchema)
const SnowboardModel = mongoose.model('Snowboard', SnowboardSchema)

// Export each model so they can be required elsewhere
module.exports = {
    CompanyModel: CompanyModel,
    SnowboardModel: SnowboardModel
}
