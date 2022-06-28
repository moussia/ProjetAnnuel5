import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const createPayment = async (req, res) => {
    try {
        console.log(" amount : ", req.body.amount * 100);
        console.log(" type : ", typeof req.body.amount);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price_data: {
                        currency: 'EUR',
                        product: 'prod_LwtltDmN3YbDcj',
                        unit_amount: req.body.amount * 100
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL_FRONT}/payment?success=true`,
            cancel_url: `${process.env.URL_FRONT}/payment?success=false`,
        });
        res.send(session.url);
    } catch (error) {
        res.sendStatus(400);
    }

}


export const getAmountStripe = async (req, res) => {
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: `${process.env.CONNECTED_STRIPE_ACCOUNT_ID}`
        });
        res.send(balance);
    } catch (error) {
        res.sendStatus(400);
    }

}


export const getListAllPayment = async (req, res) => {
    try {
        const paymentIntents = await stripe.paymentIntents.list({ expand: ['data.customer'] });
        res.send(paymentIntents);
    } catch (error) {
        res.sendStatus(400);
    }
}