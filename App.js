import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  const onPressStart = () => {
    setCurrentPoints(0);
    setRunning(true);
    gameEngine.swap(entities());
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              setCurrentPoints(0);
              break;
            case 'new_point':
              setCurrentPoints((prev) => prev + 1);
              break;
          }
        }}
        running={running}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameEngine}>
        {/* <ImageBackground
          source={require('./assets/img/bg.jpg')}
          resizeMode="cover"
          style={styles.image} /> */}
          <Image source={require('./assets/img/moon.png')} style={styles.moon}/>
          <Image source={require('./assets/img/cloud.png')} style={styles.cloud}/>
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <Text style={styles.points}>{currentPoints}</Text>

      {!running ? (
        <View style={styles.view}>
          <TouchableOpacity style={styles.startBtn} onPress={onPressStart}>
            <Text style={styles.textBtn}>PLAY</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    zIndex: -1,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
    zIndex: 1,
  },
  points: {
    color: '#333',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 30,
    zIndex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  startBtn: {
    backgroundColor: '#8B008B',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  moon: {
    position: 'absolute',
    top: 30,
    left: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: -1,
  },
  cloud: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: -1,
  }
});
