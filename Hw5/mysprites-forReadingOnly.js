/**
 * @fileoverview This file provides a limeJS animation of Daffy Duck.
 * @author Christine Talbot
 */

//set main namespace
goog.provide('mysprites');


//get requirements
goog.require('lime');
goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('lime.SpriteSheet');
goog.require('lime.parser.JSON');
goog.require('lime.ASSETS.daffy.json');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Loop');

// global variables for window & location of daffy - just default them
mysprites.WIDTH = 600;
mysprites.HEIGHT = 400;
mysprites.POSITION_X = 30;
mysprites.POSITION_Y = 60;
mysprites.WALK_DIFF = 60;

/**
 * This is the starting point from the program and is called in the html page.
 */
mysprites.start = function() {

	// grab how big the current window is - don't really need to do this
	mysprites.WIDTH = document.body.clientWidth;
	mysprites.HEIGHT = document.body.clientHeight;
	
	// create new director for the game
	mysprites.director = new lime.Director(document.body, 
										   mysprites.WIDTH, 
										   mysprites.HEIGHT);
	mysprites.director.makeMobileWebAppCapable();
	// turn off the frames per second image
	mysprites.director.setDisplayFPS(false);

	// create new scene
	var gamescene = new lime.Scene;
	
	// create new layer
 	layer = new lime.Layer();
    // add layer to the scene
	gamescene.appendChild(layer);
	
	// check device so can show text
	var isIPad = navigator.userAgent.indexOf("iPad") != -1 ;
	var deviceName = 'iPad';
	if (isIPad) {
	 	deviceName = 'iPad';
	} else {
	 	deviceName = 'Web';
	}
	
	// create text for compatibility and which device is being used
	var text1 = new lime.Label().setText('Christine Talbot 2011')
								.setPosition(0+60, 110)
								.setFontSize(10);
	var text2 = new lime.Label().setText('[Web, iPad Capable] : Running on ' +
										 deviceName)
								.setPosition(0+102, 120)
								.setFontSize(10);
	
	// add text to screen
	layer.appendChild(text1);
	layer.appendChild(text2);
	
	// load the spritesheet
	mysprites.ss = new lime.SpriteSheet('assets/daffy.png',
										lime.ASSETS.daffy.json, 
										lime.parser.JSON);
	
	// create the initial daffy image and place him on screen
	var sprite = mysprites.makeDaffy().setPosition(mysprites.POSITION_X,
												   mysprites.POSITION_Y);
	layer.appendChild(sprite);
	
	
	// set active scene
	mysprites.director.replaceScene(gamescene);
	
	// start loop
	mysprites.startLooping(sprite);
	
};

/**
 * This creates the initial daffy duck sprite and adds it to a layer
 * @return {lime.Sprite} handle to the newly created sprite
 */
mysprites.makeDaffy = function(){
	var sprite = new lime.Sprite()
						 .setPosition(mysprites.POSITION_X,
						 			  mysprites.POSITION_Y)
						 .setFill(mysprites.ss.getFrame('stand-left-1.png'));
	layer.appendChild(sprite);
	
	return sprite;
};

/**
 * This sets up all the animations and begins the infinite animation loop
 * @param {lime.Sprite} sprite Sprite to be animated (daffy)
 */
mysprites.startLooping = function(sprite) {
	// create animation to move right
	var moveRight = new lime.animation.MoveBy(mysprites.WIDTH - 
										      mysprites.WALK_DIFF, 0)
									  .setEasing(lime.animation.Easing.LINEAR)
									  .setSpeed(3);
	// create animation loop for walking
	var moveRightAnime = new lime.animation.KeyframeAnimation();
	// add delay between animation frames
	moveRightAnime.delay= 1/15;
	// add frames to animate walking right
	for(var i=1;i<=17;i++){
		if (i != 13) { // bad frame - makes him look like he jumps
	    	moveRightAnime.addFrame(mysprites.ss.getFrame(
	    										'walk-right-'+i+'.png'));
	   	}
	}
	// add the sprite as the target for the walking animation
	//moveRightAnime.addTarget(sprite);
	
	// create animation to move left
	var moveLeft = new lime.animation.MoveBy(-1*(mysprites.WIDTH - 
												 mysprites.WALK_DIFF),0)
									 .setEasing(lime.animation.Easing.LINEAR)
									 .setSpeed(3);
	// create animation loop for walking
    var moveLeftAnime = new lime.animation.KeyframeAnimation();
    // add delay between animation frames
	moveLeftAnime.delay= 1/15;
	// add frames to animate walking left
	for(var i=1;i<=17;i++){
		if (i != 13) { // bad frame - makes him look like he jumps
		    moveLeftAnime.addFrame(mysprites.ss.getFrame(
		    									'walk-left-'+i+'.png'));
		}
	}
	
	// create sequence to walk right then left
    var mySequence = new lime.animation.Sequence(moveRight, moveLeft);
    // create loop to repeat walking right then left over and over
   	var myLoop = new lime.animation.Loop(mySequence); 
   	// ensure the walking animation starts when the move starts first time
    lime.scheduleManager.callAfter(sprite.runAction(moveRightAnime),null, 3);
	// run the loop for walking
    sprite.runAction(myLoop);
    
    // listen for when done walking right so can stop right animations,
    // make daffy stand, then start the left animations while he moves left
    goog.events.listen(moveRight,lime.animation.Event.STOP,function(){
	    moveRightAnime.stop(); // no duration so have to be stopped manually
		sprite.setFill(mysprites.ss.getFrame('stand-right-1.png'));
	    sprite.runAction(moveLeftAnime);
	});
	
	// listen for when done walking left so can stop left animations,
	// make daffy stand, then start the right animations while he moves left
	goog.events.listen(moveLeft,lime.animation.Event.STOP,function(){
	    moveLeftAnime.stop(); // no duration so have to be stopped manually
		sprite.setFill(mysprites.ss.getFrame('stand-left-1.png'));
	    sprite.runAction(moveRightAnime);
	});

};

//this is required for outside access after code is compiled in 
//ADVANCED_COMPILATIONS mode
goog.exportSymbol('mysprites.start', mysprites.start);
