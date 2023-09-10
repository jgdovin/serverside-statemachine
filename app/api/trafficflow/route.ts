
const { ConvexHttpClient } = require('convex/browser');
const { api } = require("@/convex/_generated/api");
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
import trafficLightMachine from "@/lib/trafficLightMachine";

export async function GET(request: Request) {
  const workflowData = await client.query(api.trafficflow.get);
  console.log(workflowData)
  return new Response(workflowData.activeState, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();

  const workflowData = await client.query(api.trafficflow.get);
  if (!workflowData) throw new Error('no trafficflow machine available');

  const newState = trafficLightMachine.transition(trafficLightMachine.resolveState(JSON.parse(workflowData.state)), {type: data.type});

  client.mutation(api.trafficflow.post, { state: JSON.stringify(newState), activeState: newState.value });
  
  return new Response(JSON.stringify(newState.value), { status: 200 });
}

export async function PUT(request: Request) {
  client.mutation(api.trafficflow.update, { state: JSON.stringify(trafficLightMachine.initialState), machine: JSON.stringify(trafficLightMachine) });
  return new Response('ok', { status: 200 });
}