'use strict'

const axios = require('axios');
const Survey = require('./SurveyModel');

async function cloneJotFormSurvey(request, response) {
    try {
        const templateFormID = 213535497610053; // template form - clarify w/ brook if needs update?
        const url = `https://api.jotform.com/form/${templateFormID}/clone?apiKey=${process.env.JOTFORM_API}`;
        const name = request.params.name;

        const result = await axios.post(url);

        const newSurveyData = {
            surveyName: name,
            surveyID: result.data.content.id,
            createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
            submissionCount: 0,
            results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            active: true
        }

        const addedSurvey = await Survey.create(newSurveyData);
        response.status(200).send(addedSurvey);

    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports = cloneJotFormSurvey;