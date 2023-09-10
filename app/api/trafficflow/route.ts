
const { ConvexHttpClient } = require('convex/browser');
const { api } = require("@/convex/_generated/api");
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
import trafficLightMachine from "@/lib/trafficLightMachine";

export async function GET(request: Request) {
  return new Response('ok', { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.room) throw new Error('no room');

  const workflowData = await client.query(api.trafficflow.get);
  if (!workflowData) throw new Error('no trafficflow machine available');

  const newState = trafficLightMachine.transition(trafficLightMachine.resolveState(JSON.parse(workflowData.state)), {type: data.type});

  client.mutation(api.trafficflow.post, { state: JSON.stringify(newState), activeState: newState.value });
  
  return new Response(JSON.stringify(newState.value), { status: 200 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  if (!data.room) throw new Error('no room');
  client.mutation(api.trafficflow.update, { room: data.room, state: JSON.stringify(trafficLightMachine.initialState), machine: JSON.stringify(trafficLightMachine) });
  return new Response('ok', { status: 200 });
}