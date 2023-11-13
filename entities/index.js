import Matter from 'matter-js';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import { getPipeSizePosPair, randomColor } from '../utils/random';

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  world.gravity.y = 0.5;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },

    Bird: Bird(world, 'yellow', { x: 50, y: 300 }, { height: 40, width: 40 }),

    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      randomColor(['#FF8C00', '#A52A2A', '#FF7F50', '#8B0000']),
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),

    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      randomColor(['#5F9EA0', '#6495ED', '#00008B', '#008B8B']),
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      randomColor(['#FF8C00', '#A52A2A', '#FF7F50', '#8B0000']),
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),

    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      randomColor(['#5F9EA0', '#6495ED', '#00008B', '#008B8B']),
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),

    Floor: Floor(
      world,
      'green',
      { x: windowWidth / 2, y: windowHeight },
      { height: 40, width: windowWidth },
    ),
  };
};
