//v3 js 

const {SESClient,SendEmailCommand}= require('@aws-sdk/client-ses');
require ('dotenv').config()

const SES_CONFIG = {
   credentials :{
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
   } ,
    region:process.env.AWS_REGION
}

console.log(SES_CONFIG);

const sesClient = new SESClient(SES_CONFIG)

const sendEmail = async (recipientEmail, name) => {
    let params = {
        //ses email sender
        Source: process.env.AWS_SES_SENDER,
        Destination: {
            ToAddress: [recipientEmail],
        },
        // reply statement is empty
        ReplyToAddresses: [],
        Message: {
            //body of the email
            Body: {
                Html: { Charset: 'UTF-8', Data: '<h1>This is email!..</h1>' },
                Text: { Charset: "UTF-8", Data: "This is email!.." },
            },
            //this is a subject
            Subject: { Charset: 'UTF-8', Data: `Hello, ${name}` }
        }
    }
    try {
        const sendEmailCommand =new SendEmailCommand(params)
        console.log(sendEmailCommand);
        const response =await sesClient.send(sendEmailCommand)
        console.log("Email has been sent...!",response);
    } catch (error) {
        console.log(error);
    }
}

sendEmail("manishaac2002@gmail.com", "Manisha")
