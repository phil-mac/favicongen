import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const websiteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      const userId = ctx.currentUser.userId;

      return ctx.db.website.create({
        data: {
          url: input.url,
          userId
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const website = await ctx.db.website.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return website ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.website.findMany();
  }),
});
