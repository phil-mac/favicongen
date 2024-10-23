import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const creditsRouter = createTRPCRouter({
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.userId;

    const creditBalance = await ctx.db.creditBalance.findUnique({
      where: { userId },
    });

    return creditBalance?.amount ?? 0;
  }),
});
