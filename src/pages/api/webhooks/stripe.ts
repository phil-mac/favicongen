import Stripe from "stripe";
import { env } from "~/env";
import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
import { buffer } from "micro";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await fulfillCheckout(event.data.object);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function fulfillCheckout(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id;
  if (userId) {
    await db.creditBalance.upsert({
      where: { userId },
      update: { amount: { increment: 5 } },
      create: { userId, amount: 5 },
    });

    await db.creditTransaction.create({
      data: {
        userId,
        amount: 5,
        transactionType: "PURCHASE",
        description: "Credits purchase",
      },
    });
  } else {
    console.error("No client_reference_id found in the session");
  }
}
