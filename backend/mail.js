const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.GmailId}`,      
    pass: `${process.env.AppPassword}`      
  }
});

const sendEnquiryEmail = async () => {
  const mailOptions = {
    from: `${process.env.SenderGmailId}`,
    to: `${process.env.GmailId}`,             
    subject: 'New Enquiry Received',
    text: 'A user just clicked on Enquire!'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Email sending failed:', err);
  }
};

module.exports = sendEnquiryEmail