// import the little Scene Graph library
import * as sg from './SG.js';

// find the div's we want to use as our 3D Scene containers
var scene = new sg.Scene(<HTMLDivElement>document.getElementById("my-scene"));
var scene2 = new sg.Scene(<HTMLDivElement>document.getElementById("my-character"));

///////////////////////////////////
// Scene 

///////////////////////////////////
// Two panels, set up so they are at 90 degrees to each other along an edge.
// We also tilt the camera, to test that.
var cam = new sg.Camera(25);
cam.position = new sg.Vector(0,200,1000); 
var camYRotation = 0;
cam.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-10,camYRotation,0));

scene.world.add(cam);

var cam2 = new sg.Camera(25);
cam2.position = new sg.Vector(0,200,1000); 
var cam2YRotation = 0;
cam2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-10, cam2YRotation, 0));


scene2.world.add(cam2);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////My Code//////

// var ghostBuddy = (sca: sg.Vector, sce: sg.Scene) => {
	var charPanel = document.createElement("div");
	charPanel.className = "panel image";
	charPanel.style.backgroundImage = "url('./img/1x/ghostie-body.png')";
	var ghostie = new sg.HTMLDivThing(charPanel);
	ghostie.scale = new sg.Vector(2, 2, 2)
	scene2.world.add(ghostie);

	var charPanelBow = document.createElement("div");
	charPanelBow.className = "panel image";
	charPanelBow.style.backgroundImage = "url('./img/1x/bowtie.png')";
	var bowtie = new sg.HTMLDivThing(charPanelBow);
	ghostie.add(bowtie);


	var charPanel4 = document.createElement("div");
	charPanel4.className = "panel image";
	charPanel4.style.backgroundImage = "url('./img/1x/eye.png')";
	var reye = new sg.HTMLDivThing(charPanel4);
	ghostie.add(reye);
	
	var charPanelEye = document.createElement("div");
	charPanelEye.className = "panel image";
	charPanelEye.style.backgroundImage = "url('./img/1x/eye.png')";
	var leye = new sg.HTMLDivThing(charPanelEye);
	leye.position = new sg.Vector(-50, 0, 0)
	ghostie.add(leye);


	var charPanelEyeBrow = document.createElement("div");
	charPanelEyeBrow.className = "panel image";
	charPanelEyeBrow.style.backgroundImage = "url('./img/1x/eyebrow.png')";
	var leyeb = new sg.HTMLDivThing(charPanelEyeBrow);
	ghostie.add(leyeb);

	var charPanelBrow = document.createElement("div");
	charPanelBrow.className = "panel image";
	charPanelBrow.style.backgroundImage = "url('./img/1x/eyebrow.png')";
	var reyeb = new sg.HTMLDivThing(charPanelBrow);
	reyeb.position = new sg.Vector(30, 0, 0);
	reyeb.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 0, 90));
	reyeb.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 180, 0));
	ghostie.add(reyeb);


	var charPanel3 = document.createElement("div");
	charPanel3.className = "panel image";
	charPanel3.style.backgroundImage = "url('./img/1x/armie.png')";
	var armie = new sg.HTMLDivThing(charPanel3);
	armie.position = new sg.Vector(15, 0, 0)
	ghostie.add(armie);
	
	var charPanelArm = document.createElement("div");
	charPanelArm.className = "panel image";
	charPanelArm.style.backgroundImage = "url('./img/1x/left_armie.png')";
	var leftarmie = new sg.HTMLDivThing(charPanelArm);
	ghostie.add(leftarmie);

	var charPanelHat = document.createElement("div");
	charPanelHat.className = "panel image";
	charPanelHat.style.backgroundImage = "url('./img/1x/tophat.png')";
	var hat = new sg.HTMLDivThing(charPanelHat);
	hat.position = new sg.Vector(-5, 20, 0);
	leftarmie.add(hat);
	
	var charPanel2 = document.createElement("div");
	charPanel2.className = "panel image";
	charPanel2.style.backgroundImage = "url('./img/1x/flower.png')";
	var flower = new sg.HTMLDivThing(charPanel2);
	armie.add(flower);
	


//Scene 2 Ghost	
	

	var cp = document.createElement("div");
	cp.className = "panel image";
	cp.style.backgroundImage = "url('./img/1x/ghostie-body.png')";
	var ghost2 = new sg.HTMLDivThing(cp);
	ghost2.position = new sg.Vector(0, 0, -71)
//

	var cpeye = document.createElement("div");
	cpeye.className = "panel image";
	cpeye.style.backgroundImage = "url('./img/1x/eye.png')";
	var leye2 = new sg.HTMLDivThing(cpeye);
	leye2.position = new sg.Vector(-50, 0, 1)
	ghost2.add(leye2);
//
	var cpeyebrow = document.createElement("div");
	cpeyebrow.className = "panel image";
	cpeyebrow.style.backgroundImage = "url('./img/1x/eyebrow.png')";
	var leyeb2 = new sg.HTMLDivThing(cpeyebrow);
	// leyeb2.position = new sg.Vector(0, 0, 1)
	ghost2.add(leyeb2);
//
	var cpb = document.createElement("div");
	cpb.className = "panel image";
	cpb.style.backgroundImage = "url('./img/1x/bowtie.png')";
	var bt2 = new sg.HTMLDivThing(cpb);
	ghost2.add(bt2);
//
	var cp4 = document.createElement("div");
	cp4.className = "panel image";
	cp4.style.backgroundImage = "url('./img/1x/eye.png')";
	var reye2 = new sg.HTMLDivThing(cp4);
	ghost2.add(reye2);

//
	var cpBrow = document.createElement("div");
	cpBrow.className = "panel image";
	cpBrow.style.backgroundImage = "url('./img/1x/leyebrow.png')";
	var reyeb2 = new sg.HTMLDivThing(cpBrow);
	// reyeb2.position = new sg.Vector(0, -10, ghost2.position.z + 10);
	// reyeb2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 0, 90));
	// reyeb2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 180, 0));
	ghost2.add(reyeb2);
//
	var cp3 = document.createElement("div");
	cp3.className = "panel image";
	cp3.style.backgroundImage = "url('./img/1x/armie.png')";
	var armie2 = new sg.HTMLDivThing(cp3);
	armie2.position = new sg.Vector(15, 0, 0)
	ghost2.add(armie2);
//
	var cpArm = document.createElement("div");
	cpArm.className = "panel image";
	cpArm.style.backgroundImage = "url('./img/1x/left_armie.png')";
	var leftarmie2 = new sg.HTMLDivThing(cpArm);
	ghost2.add(leftarmie2);
//
	var cpTopHat = document.createElement("div");
	cpTopHat.className = "panel image";
	cpTopHat.style.backgroundImage = "url('./img/1x/tophat.png')";
	var hat2 = new sg.HTMLDivThing(cpTopHat);
	hat2.position = new sg.Vector(0, 20, 2);
	leftarmie2.add(hat2);
//	
	var cp2 = document.createElement("div");
	cp2.className = "panel image";
	cp2.style.backgroundImage = "url('./img/1x/flower.png')";
	var flower2 = new sg.HTMLDivThing(cp2);
	armie2.add(flower2);
//


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






//HOUSE//

// we move by -70.7 because after rotation by 45 degrees that's about what we have to move
// to get the edge into the center (hint: cos(45 degrees) = ~0.707)
var leftPanel = document.createElement("div");
leftPanel.className = "panel image";
leftPanel.style.backgroundImage = "url('./img/black_wall.jpg')"; 
var house = new sg.HTMLDivThing(leftPanel);
house.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,45,0)); 
house.position = new sg.Vector(-70.7,0,0);
scene.world.add(house);

var leftPanel2 = document.createElement("div");
leftPanel2.className = "panel image";
leftPanel2.style.backgroundImage = "url('./img/black_wall.jpg')"; 
var lwall = new sg.HTMLDivThing(leftPanel2);
lwall.position = new sg.Vector(-199,0,0);
house.add(lwall);

var rightPanel = document.createElement("div");
rightPanel.className = "panel image";
rightPanel.style.backgroundImage = "url('./img/black_wall.jpg')"; 
var rWall = new sg.HTMLDivThing(rightPanel);
rWall.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,90,0)); 
rWall.position = new sg.Vector(100,0,100);
rWall.scale = new sg.Vector(1, 1.5, 1);
house.add(rWall);

var rightWallPanel2 = document.createElement("div");
rightWallPanel2.className = "panel image";
rightWallPanel2.style.backgroundImage = "url('./img/black_wall.jpg')"; 
var rWall2 = new sg.HTMLDivThing(rightWallPanel2);
rWall2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,90,0)); 
rWall2.position = new sg.Vector(100,25,300);
rWall2.scale = new sg.Vector(1, 1.25, 1);
house.add(rWall2);


var floorPanel = document.createElement("div");
floorPanel.className = "panel image";
floorPanel.style.backgroundImage = "url('./img/softer_orange.png')"; 
var floor = new sg.HTMLDivThing(floorPanel);
floor.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-90,0,0)); 
floor.position = new sg.Vector(-100, -100, 200);
floor.scale = new sg.Vector(2,2,2);
house.add(floor); 


var rightPanel = document.createElement("div");
rightPanel.className = "panel image";
rightPanel.style.backgroundImage = "url('./img/roof.jpg')"; 
var roof = new sg.HTMLDivThing(rightPanel);
roof.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(75,0,0)); 
roof.position = new sg.Vector(0,125,90);
house.add(roof);

var rightPanel2 = document.createElement("div");
rightPanel2.className = "panel image";
rightPanel2.style.backgroundImage = "url('./img/roof.jpg')"; 
var roof2 = new sg.HTMLDivThing(rightPanel2);
roof2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(75,0,0)); 
roof2.position = new sg.Vector(-200,125,90);
house.add(roof2);

var ceilingPanel = document.createElement("div");
ceilingPanel.className = "panel image";
ceilingPanel.style.backgroundImage = "url('./img/ceiling.png')"; 
var ceiling = new sg.HTMLDivThing(ceilingPanel);
ceiling.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(75,0,180)); 
ceiling.position = new sg.Vector(0,124,90);
house.add(ceiling);

var ceilingPanel = document.createElement("div");
ceilingPanel.className = "panel image";
ceilingPanel.style.backgroundImage = "url('./img/ceiling.png')"; 
var ceiling2 = new sg.HTMLDivThing(ceilingPanel);
ceiling2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(75,0,180)); 
ceiling2.position = new sg.Vector(-200,124,90);
house.add(ceiling2);

var textPanel = document.createElement("div");
textPanel.className = "panel image";
textPanel.style.backgroundImage = "url('./img/1x/scene-text.png')"; 
var text = new sg.HTMLDivThing(textPanel);
text.position = new sg.Vector(-100, -100, -100);
text.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, -80, 0))
house.add(text)

var camYInc = 0.2;
var camXInc = 0.2;
let startTime =  performance.now()
var yZoom = cam.position.y + 150
var xZoom = -30
var zZoom = 1600
var camXRotation = -13;
var zRot = 0;
var yBounce = 0.7;
var scaleSize = 1;
var sca = .01;
var ghostSpeed = 2.5;

var s5renderFunc = function(t: number) {
	// time is returned in millisecons.  Lets convert to seconds, so it's more intuitive.
	let dt = (t - startTime) / 1000.0

	//original scene zoom and setup
	if (dt < 3) {
		yZoom -= 1.75
		xZoom += 0.17
		zZoom -= 6
		if (zZoom < 1100) {
			zZoom = 1100;
		}
		if (yZoom < 150) {
			yZoom = 150;
		}
		if (xZoom > -13) {
			xZoom = -13;
		}
		cam.position = new sg.Vector(0,yZoom, zZoom);
		cam.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(xZoom, camYRotation, 0));
	}

	// horizontal camera sweep
	else if (dt < 8){
		// only want to do this the first time into this part
		cam.position = new sg.Vector(0, 150, 1100); 
		camYRotation += camYInc;
		if (camYRotation > 12 || camYRotation < -12) {
			camYInc *= -1;
		}
		cam.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-13,camYRotation,0));
	} 
	
	else if (dt < 11) {
		scene.world.add(ghost2);
		armie2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-1, 0, 0))
		ghost2.position = new sg.Vector(0, 0, ghost2.position.z + ghostSpeed)
	} 

	// ghostie bouncing forward
	else if (dt < 14) {
		if (ghost2.position.y > 8 || ghost2.position.y < -3) {
			yBounce *= -1;
		}
		ghost2.position.y += yBounce;
		ghost2.position.z += ghostSpeed

		text.position = new sg.Vector(-50, 0, 400);
		// text.position = new sg.Vector(200, -400, 12)
		

	} 
	// ghostie handing flower and tipping hat like a proper gentle-ghostie
	else if (dt < 16) {
		armie2.position = new sg.Vector (armie2.position.x, armie2.position.y, armie2.position.z + .5)
		if (zRot > 70) {
			zRot = 70
		}
		zRot += 1
		leftarmie2.position = new sg.Vector(leftarmie2.position.x - .1, leftarmie2.position.y - .1, leftarmie2.position.z + .1);
		leftarmie2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 0, zRot));
		
		// if (scaleSize > 2 || scaleSize < -2) {
		// 	sca *= 1;
		// }
		scaleSize += sca;
		text.scale = new sg.Vector(scaleSize, scaleSize, scaleSize);

	}
	//nodding
	else if (dt < 19) {		
		cam.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(camXRotation, camYRotation, 0));
		camXRotation -= camXInc;
		if (camXRotation > -8 || camXRotation < -20) {
			camXInc *= -1;
		}
	} 
	// returning arm to original position
	else if (dt < 21) {
		armie2.position = new sg.Vector(15, armie2.position.y, armie2.position.z - .25)
		if (zRot < -20) {
			zRot = -20
		}
		zRot -= 1
		flower.position = new sg.Vector(leftarmie2.position.x - .1, leftarmie2.position.y - .1, leftarmie2.position.z + .1);
		leftarmie2.position = new sg.Vector(leftarmie2.position.x + .1, leftarmie2.position.y + .1, leftarmie2.position.z - .01);
		leftarmie2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0, 0, zRot));
	}
	// let rotationTime = (dt % 2) / 2
	// let yRotation = 360 * rotationTime
	// ghost2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,yRotation,0)); 
	scene.render();
	scene2.render()
	requestAnimationFrame(s5renderFunc);
};
s5renderFunc(startTime);