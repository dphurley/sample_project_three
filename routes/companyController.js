const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const CompanyModel = Schema.CompanyModel;

// INDEX route
router.get('/', (request, response) => {

    // FIND all of the companies in the database
    CompanyModel.find({})
        .then((companies) => {

            // THEN once they come back from the database
            // send them as JSON
            response.send(companies)
        })
        .catch((error) => {
            console.log(error)
        })
})

// CREATE route
router.post('/', (request, response) => {

    // GRAB the new company info as a JS object from the request body
    const newCompany = request.body

    // CREATE and SAVE a new Company using the CompanyModel
    CompanyModel.create(newCompany)
        .then(() => {
            // THEN once the model has saved, redirect to the Companies INDEX
            response.redirect('/companies')
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:companyId', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // GRAB the updated Company info from the request body
    const updatedCompany = request.body

    // Use Mongoose to find the company by ID and update it with the 
    // new company info. Be sure to include the {new: true} option as your
    // third parameter
    CompanyModel.findByIdAndUpdate(companyId, updatedCompany, { new: true })
        .then(() => {
            // THEN once the new company info has been saved,
            // redirect to that company's SHOW page
            response.redirect(`/companies/${companyId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW route
router.get('/:companyId', (request, response) => {

    // GRAB the company ID from the parameters
    const companyId = request.params.companyId

    // Use the CompanyModel to find the company by ID in the database
    CompanyModel.findById(companyId)
        .then((company) => {
            // THEN once the company comes back from the database,
            // send the single company's info as JSON
            response.json(company)
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:companyId/delete', (request, response) => {

    // GRAB the company ID that you want to delete from the parameters
    const companyId = request.params.companyId

    // Use the CompanyModel to find and delete the company in the database
    CompanyModel.findByIdAndRemove(companyId)
        .then(() => {

            // THEN once the company has been deleted from the database
            // redirect back to the companies INDEX
            response.redirect('/companies')
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router