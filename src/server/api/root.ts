import { postRouter } from "~/server/api/routers/post";
import { websiteRouter } from "~/server/api/routers/website";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { checkoutRouter } from "~/server/api/routers/checkout";
import { creditsRouter } from "~/server/api/routers/credits";
import { faviconRouter } from "./routers/favicon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  website: websiteRouter,
  checkout: checkoutRouter,
  credits: creditsRouter,
  favicon: faviconRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
