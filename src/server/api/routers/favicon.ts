import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { openai } from "~/server/openai";

export const faviconRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser.userId;

      // Check if user has enough credits
      const creditBalance = await ctx.db.creditBalance.findUnique({
        where: { userId },
      });

      if (!creditBalance || creditBalance.amount < 1) {
        throw new Error("Insufficient credits");
      }

      // Enhance the prompt for favicon generation
      const enhancedPrompt = `Create a simple, iconic favicon design for: ${input.prompt}. The image should be minimal, memorable, and work well at small sizes. Use bold shapes and limited colors.`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("Failed to generate image");
      }

      // Deduct 1 credit
      await ctx.db.creditBalance.update({
        where: { userId },
        data: { amount: creditBalance.amount - 1 },
      });

      return { imageUrl };
    }),
}); 