import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRanodm = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addPosX = 0) => {
  let yPosTop = -getRanodm(300, windowHeight - 100);

  const pipeTop = {
    pos: { x: windowWidth + addPosX, y: yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };

  const pipeBottom = {
    pos: { x: windowWidth + addPosX, y: windowHeight * 2 + 200 + yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };

  return {pipeTop, pipeBottom}
};

export const randomColor = (colors) => {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}


