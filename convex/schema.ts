import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  trafficflow: defineTable({
    state: v.string(),
    activeState: v.string(),
    machine: v.string(),
    id: v.string()
  }).index('by_light_id', ['id'])
});