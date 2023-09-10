import { v } from "convex/values"
import { query, mutation } from "./_generated/server";

export const update = mutation({
  args: { state: v.string(), machine: v.string() },
  handler: async ( ctx, { state, machine }) => {
    const existing = await ctx.db
      .query("trafficflow")
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { state, machine });
    } else {
      await ctx.db.insert("trafficflow", {
        machine,
        state,
        id: '1',
        activeState: 'red'
      });

    }
  }
});

export const getState = query({
  args: {},
  handler: async ( ctx ) => {
    const workflowData = await ctx.db.query("trafficflow").first();
    console.log('this is really a test')
    // if (!workflowData) throw new Error('no trafficflow machine available');
    return workflowData;
  }
})

export const post = mutation({
  args: { state: v.string(), activeState: v.string() },
  handler: async ( ctx, { state, activeState }) => {
    console.log('testing')
    const workflowData = await ctx.db.query('trafficflow').first();
    if (!workflowData) throw new Error('no trafficflow machine available');
    await ctx.db.patch(workflowData._id, { state, activeState });
  }
})