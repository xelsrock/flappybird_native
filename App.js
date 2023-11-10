import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <Text style={styles.points}>{currentPoints}</Text>
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
              setCurrentPoints(prev => prev + 1);
              break;
          }
        }}
        running={running}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameEngine}>
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

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
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  points: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 30,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
