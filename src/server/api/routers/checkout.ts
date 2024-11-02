import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import Stripe from "stripe";
import { env } from "~/env.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const DOMAIN = env.NODE_ENV === "development" ? "http://localhost:3000" : env.WEBSITE_URL;

const priceId = env.NODE_ENV === "development" ? "price_1QGnu4G2ZrkE2NlrwFZwH0zz" : "price_1QGnuaG2ZrkE2NlrNWKMAZbo";

export const checkoutRouter = createTRPCRouter({
  create: protectedProcedure
    .mutation(async ({ctx}) => {
      const userId = ctx.currentUser.userId;
      
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${DOMAIN}/checkout-success`,
        cancel_url: `${DOMAIN}/dashboard`,
        client_reference_id: userId, // Add this line to include the user ID
      });

      return { url: session.url };
    }),
});
