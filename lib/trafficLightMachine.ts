import { useQuery } from 'convex/react';
import { createMachine } from 'xstate';

const trafficLightMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOilTDADsBiAOQFEANAFUVAAcB7WHMhy9aXEAA9EAWgBMc8gA4ADAHZlAZgUylAVnUA2AJw6ANCACe0gIz7yOm0qUAWGU7VKZKpwF9vZtFi4hMRk5OZgADYRvADuTGycSCB8AkIiYpII+lbkhgoKOqoK7uqGxk5mlgiyMnZWCtkqXoZOVk4uOr7+GNj4RKQU1BDxHGIpgsKiSZlG5LotnmouVkoFlYhWVuq5Ngotzu3q7fpdIAG9wQPk3ACuqNwRYCOJPPwT6dPS6jI5hjI6ZQUVh0rScCnU6wQKlseh09gUrXqOhk+hkvj8IFovAgcDE5yC-VCVBoU1eqUmGS+BjscMMun+hWyVkhNTqDSsTScLTapROGPxfRCFHCUViYzeaVJEmkhhUuX0QPUzh0QNaRhZ8nhjWaoI6pwFl1CQ3F5I+oEyHLlIIVcic2ThQJkGtqWstXNBBgU+p6BKF1zuDzAJveUsyUj+uU8bi0TiU+iU6mBkJWcsMbRkyhBGbkQO9gUFA2Dksp1QMShpAPpcLjmxZLTscbTmk0+iOTnU6O8QA */
  createMachine({
    predictableActionArguments: true,
    schema: { events: {} as { type: 'eventType' } },
    id: 'trafficLight',
    initial: 'green',
    states: {
      green: {
        on: {
          NEXT: {
            target: 'yellow',
          },
        },
      },
      yellow: {
        on: {
          NEXT: {
            target: 'red',
          },
        },
      },
      red: {
        on: {
          NEXT: {
            target: 'green',
          },
        },
      },
    },
  });

  export default trafficLightMachine;