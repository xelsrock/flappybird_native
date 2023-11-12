import Matter from 'matter-js';

import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from './utils/random';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((touch) => touch.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -7,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i <= 2; i++) {
    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${i}`].point) {
      entities[`ObstacleTop${i}`].point = true;
      dispatch({ type: 'new_point' });
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      entities[`ObstacleTop${i}`].point = false;

      Matter.Body.setPosition(entities[`ObstacleTop${i}`].body, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, pipeSizePos.pipeBottom.pos);
    }


    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 });
  }

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({ type: 'game_over' });
  });

  return entities;
};

export default Physics;
