import { FormSchema } from "~/schemas/form.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const userRouter = createTRPCRouter({
  add: publicProcedure.input(FormSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.victim.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) return await ctx.prisma.victim.create({ data: input });
  }),
});
