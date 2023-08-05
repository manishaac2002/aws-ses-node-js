const AWS = require ('aws-sdk');
const dotenv = require ('dotenv').config()
require('aws-sdk/lib/maintenance_mode_message').suppress=true

//ses configs
const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
}

//passing ses configs through new object
const AWS_SES = new AWS.SES(SES_CONFIG)

//sending email to the client
const sendEmail = async (recipientEmail, name) => {
    let params = {
        //ses email sender
        Source: process.env.AWS_SES_SENDER,
        Destination: {
            ToAddress: [recipientEmail],
        },
        // reply statement is empty
        ReplyToAddress: [],
        Message: {
            //body of the email
            Body: {
                Html: { Charset: "UTF-8", Data: "<h1>This is email!..</h1>" },
                Text: { Charset: "UTF-8", Data: "This is email!.." },
            },
            //this is a subject
            Subject: { Charset: "UTF-8", Data: `Hello, ${name}` }
        }
    }
    try {
        const response =await AWS_SES.sendEmail(params).promise()
        console.log("Email has been sent...!",response);
    } catch (error) {
        console.log(error);
    }
}

sendEmail('manishaac2002@gmail.com', "Manisha")