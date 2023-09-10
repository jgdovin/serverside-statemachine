import { v } from "convex/values"
import { query, mutation } from "./_generated/server";
const id = '1';

export const update = mutation({
  args: { room: v.string(), state: v.string(), machine: v.string() },
  handler: async ( ctx, { room, state, machine }) => {
    const existing = await ctx.db
      .query("trafficflow")
      .withIndex("by_id", (q) => q.eq("id", id))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { state, machine });
    } else {
      await ctx.db.insert("trafficflow", {
        machine,
        state,
        id,
      });

    }
  }
});

export const get = query({
  args: { },
  handler: async ( ctx ) => {
    const workflowData = await ctx.db.query('trafficflow').withIndex('by_id', (q) => q.eq('id', id)).unique();
    if (!workflowData) throw new Error('no gameflow machine available');
    return workflowData;
  }
})

export const post = mutation({
  args: { state: v.string() },
  handler: async ( ctx, { state }) => {
    const workflowData = await ctx.db.query('trafficflow').withIndex('by_id', (q) => q.eq('id', id)).unique();
    if (!workflowData) throw new Error('no gameflow machine available');
    await ctx.db.patch(workflowData._id, { state });
  }
})