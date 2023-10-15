require("dotenv").config()
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const port = 3000


app.use(express.json())
app.use(bodyParser.json())

const [basic, pro, business] = ['price_1NzMyUSEHmzO1akd0XDCon6e', 'price_1NzMyUSEHmzO1akd0XDCon6e', 'price_1NzN2gSEHmzO1akdMRqyZSPJ']
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://task-7-1p-a8532-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

app.use(
    cors()
)
app.get('/success', (req, res) => {
    res.sendFile(__dirname + "/success.html");
})
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
//Adding route handlers


//create subscription
const stripeSession = async (plan) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        console.log("Done");
        return session;
    } catch (e) {
        return e;
    }
}
app.post("/api", async (req, res) => {
    const { plan } = req.body;
    let planId = null;
    if (plan == 99) planId = basic;
    else if (plan == 499) planId = pro;
    else if (plan == 999) planId = business;

    try {
        const session = await stripeSession(planId)
        console.log(session)
        return res.json({ session })
    }
    catch (error) {
        res.send(error);
    }

})
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})