
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

  const workflowData = await client.query(api.gameflow.get, { room: data.room });

  const newState = trafficLightMachine.transition(trafficLightMachine.resolveState(JSON.parse(workflowData.state)), {type: data.type});
  const newStateValue = newState.value;
  client.mutation(api.gameflow.post, { room: data.room, state: JSON.stringify(newState) });
  
  return new Response(JSON.stringify(newStateValue), { status: 200 });
}

export async function PUT(request: Request) {
  const data = await request.json();

  if (!data.room) throw new Error('no room');
  client.mutation(api.gameflow.update, { room: data.room, state: JSON.stringify(trafficLightMachine.initialState), machine: JSON.stringify(trafficLightMachine) });
  return new Response('ok', { status: 200 });
}