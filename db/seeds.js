require('dotenv').config();

// Database setup
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var CompanyModel = Schema.CompanyModel;
var SnowboardModel = Schema.SnowboardModel;

// Delete all Companies from the database
CompanyModel.remove({}, function (err) {
    console.log(err);
});

// Create some Companies and Snowboards
const burton = new CompanyModel({ name: 'Burton', country: 'US' })
const dc = new CompanyModel({ name: 'DC', country: 'US' })
const ktwo = new CompanyModel({ name: 'K2', country: 'Canada' })

const littleSnowboard = new SnowboardModel({ name: 'Little Snowboard', price: 123.45 })
const bigSnowboard = new SnowboardModel({ name: 'Big Snowboard', price: 123.45 })
const blueSnowboard = new SnowboardModel({ name: 'Blue Snowboard', price: 123.45 })

// Here we assign some snowboards to each company.
const companies = [burton, dc, ktwo]
const snowboards = [littleSnowboard, bigSnowboard, blueSnowboard]

companies.forEach((company) => {

    company.snowboards = snowboards

    company.save()
        .then((company) => {
            console.log(`${company.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();