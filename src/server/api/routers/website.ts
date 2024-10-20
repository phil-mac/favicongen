import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const websiteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.website.create({
        data: {
          url: input.url,
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
