/**
 *
 * Bomb game by Bartosz Tyrakowski
 *
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Alert, Text, View, Button, Image } from 'react-native';

export default class BombApp extends Component {

//render components	

 render() {
    return (
      <View style={styles.container}>
	  
		<Text style={styles.instructions}>
			Defuse the bomb before the timer goes off
        </Text>
		
		<Image
			style={styles.bombImage}
			source={require('./img/bomb.png')}
		/>
		
		<Button
			id="startButton"
			style={styles.buttons}
			onPress={startButtonPress} 
			title="Start" 
		/>
		
		<Button
			id="defuseButton"
			style={styles.buttons}
			onPress={defuseButtonPress} 
			title="Defuse" 
		/>
		
		<Button
			id="scoreButton"
			style={styles.buttons}
			onPress={scoreButtonPress} 
			title="Total score" 
		/>
    
      </View>
    );
  }
}

//set app variables
var secondsUntilExplosion = 0;
var currentScore = 0;
var totalScore = 0;
var hasStarted = false;

//generate random number of seconds (between 2 and 10 inclusively) in milliseconds
function generateRandomNumber() {
	
	var randomNumber = (Math.floor(Math.random() * (10 - 2 + 1)) + 2) * 1000;
	return randomNumber;
}

//start the game 
function startButtonPress()	{ 
	
	if (!hasStarted) {
		
		hasStarted = true;
	
		milliseconds = generateRandomNumber();
		secondsUntilExplosion = milliseconds / 1000;
		explosionTimeout = setTimeout(function(){ alert("BOOM"); }, milliseconds);
	
		var startTime = new Date().getTime();
		explosionInterval = setInterval(function() { 
			currentScore++;
			if (new Date().getTime() - startTime > milliseconds) 
			{
				secondsUntilExplosion = 0;
				currentScore = 0;
				clearInterval(explosionInterval); 
			}
		}, 1000);
	}	
};

//defuse the bomb and display the score
function defuseButtonPress() {
	
	if (hasStarted) {
	clearTimeout(explosionTimeout);
	clearInterval(explosionInterval);
	
	currentScore = currentScore * 10;
	totalScore = totalScore + currentScore;
	
	Alert.alert('Bomb defused! \nYou scored ' + currentScore + ' points'); 
	
	secondsUntilExplosion = 0;
	currentScore = 0;
	
	}
	
	hasStarted = false;
};

//display current total score
function scoreButtonPress() {
	
	Alert.alert('Your current total score is ' + totalScore); 
};

//styles
const styles = StyleSheet.create({
  
  buttons: {
	width: 100,
	marginBottom: 15,
	color: "#3232ff", 
	justifyContent: 'center',
    alignItems: 'center',
  },
  bombImage: {
	width: 150,
    height: 150,
	marginBottom: 5,
	justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  instructions: {
	marginBottom: 5,
    textAlign: 'center',
    color: '#333333'
  },
});

AppRegistry.registerComponent('BombApp', () => BombApp);