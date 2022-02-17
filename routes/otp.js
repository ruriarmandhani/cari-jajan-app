import express from "express";
import verifyToken from "../utils/verify_token.js";
import twilio from "twilio";

const router = express.Router();

router.post("/", (req, res) => {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_SERVICE_SID;
  const client = twilio(accountSid, authToken);
  const { phone } = req.body;
  client.verify
    .services(serviceSid)
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification) => res.send(verification))
    .catch((err) => res.send(err));
});

router.post("/verification", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_SERVICE_SID;
  const client = twilio(accountSid, authToken);
  const { phone, otp } = req.body;
  client.verify
    .services(serviceSid)
    .verificationChecks.create({ to: phone, code: otp })
    .then((verification_check) => res.send(verification_check))
    .catch((err) => res.send(err));
});

export default router;
