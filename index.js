"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());


restService.get("/", function (req, res) {
    return res.send('Hello from Echo sample!');
});

restService.post("/echo", function(req, res) {

    console.log('Incoming request', req);

    var speech =
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.echoText
            ? req.body.result.parameters.echoText
            : "Seems like some problem. Speak again.";

    console.log('speech:', speech);

    return res.json({
        fulfillmentText: speech,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                        {
                            simpleResponse: {
                                textToSpeech: speech
                            }
                        }
                    ]
                }
            }
        },
        source: "https://echo-webhook-dialogflow.herokuapp.com"
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});