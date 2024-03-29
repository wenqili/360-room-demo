var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
// camera
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 500;
var camera, scene, renderer;
var cameraControls;
var sphereGroup, smallSphere;
init();
animate();

function init() {
	var container = document.getElementById('container');
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIDTH, HEIGHT);
	container.appendChild(renderer.domElement);
	// scene
	scene = new THREE.Scene();
	// camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0, 75, 200);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0, 40, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 10;
	cameraControls.update();
	//
	var planeGeo = new THREE.PlaneBufferGeometry(100.1, 100.1);
	// MIRROR planes
	var groundMirror = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x777777
	});
	groundMirror.rotateX(-Math.PI / 2);
	// scene.add(groundMirror);



	var CeilingMirror = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x777777
	});
	CeilingMirror.rotateX(Math.PI / 2);
	CeilingMirror.position.y = 99
	// scene.add(CeilingMirror);



	var verticalMirror = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	verticalMirror.position.y = 50;
	verticalMirror.position.z = -49;
	scene.add(verticalMirror);

	var verticalMirror2 = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	verticalMirror2.position.y = 50;
	verticalMirror2.position.z = -48;
	// scene.add(verticalMirror2);
	//
	// var verticalMirror = new THREE.Mirror(100, 100, {
	// 	clipBias: 0.003,
	// 	textureWidth: WIDTH * window.devicePixelRatio,
	// 	textureHeight: HEIGHT * window.devicePixelRatio,
	// 	color: 0x889999
	// });
	// verticalMirror.position.y = 50;
	// verticalMirror.position.z = -47;
	// scene.add(verticalMirror);

	var frontMirror = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	frontMirror.position.y = 50;
	frontMirror.position.z = -49;
	frontMirror.position.z = 49;
	frontMirror.rotateY(Math.PI)
	scene.add(frontMirror);

	var frontMirror2 = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	frontMirror2.position.y = 50;
	frontMirror2.position.z = -49;
	frontMirror2.position.z = 49;
	frontMirror2.rotateY(Math.PI)
	// scene.add(frontMirror2);

	var sideMirror1 = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	sideMirror1.position.x = -49
	sideMirror1.position.y = 50;
	// sideMirror1.position.z = -49;
	// sideMirror1.position.z = -49;
	sideMirror1.rotateY(Math.PI / 2)
	scene.add(sideMirror1);

	var sideMirror2 = new THREE.Mirror(100, 100, {
		clipBias: 0.003,
		textureWidth: WIDTH * window.devicePixelRatio,
		textureHeight: HEIGHT * window.devicePixelRatio,
		color: 0x889999
	});
	sideMirror2.position.x = 49
	sideMirror2.position.y = 50;
	// sideMirror1.position.z = -49;
	// sideMirror1.position.z = -49;
	sideMirror2.rotateY(-Math.PI / 2)
	scene.add(sideMirror2);









	sphereGroup = new THREE.Object3D();
	scene.add(sphereGroup);
	var geometry = new THREE.CylinderGeometry(0.1, 15 * Math.cos(Math.PI / 180 * 30), 0.1, 24, 1);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		emissive: 0x444444
	});
	var sphereCap = new THREE.Mesh(geometry, material);
	sphereCap.position.y = -15 * Math.sin(Math.PI / 180 * 30) - 0.05;
	sphereCap.rotateX(-Math.PI);
	var geometry = new THREE.SphereGeometry(15, 24, 24, Math.PI / 2, Math.PI * 2, 0, Math.PI / 180 * 120);
	var halfSphere = new THREE.Mesh(geometry, material);
	halfSphere.add(sphereCap);
	halfSphere.rotateX(-Math.PI / 180 * 135);
	halfSphere.rotateZ(-Math.PI / 180 * 20);
	halfSphere.position.y = 7.5 + 15 * Math.sin(Math.PI / 180 * 30);
	sphereGroup.add(halfSphere);
	var geometry = new THREE.IcosahedronGeometry(5, 0);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		emissive: 0x333333,
		shading: THREE.FlatShading
	});
	smallSphere = new THREE.Mesh(geometry, material);
	scene.add(smallSphere);
	// walls
	var planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0xffffff
	}));
	planeTop.position.y = 100;
	planeTop.rotateX(Math.PI / 2);
	scene.add(planeTop);

	var planeGround = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0xffffff
	}));
	// planeGround.position.y = -100;
	planeGround.rotateX(-Math.PI / 2);
	scene.add(planeGround);

	var planeBack = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0xffffff
	}));
	planeBack.position.z = -50;
	planeBack.position.y = 50;
	scene.add(planeBack);
	var planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0x7f7fff
	}));
	planeFront.position.z = 50;
	planeFront.position.y = 50;
	planeFront.rotateY(Math.PI);
	scene.add(planeFront);
	var planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0x00ff00
	}));
	planeRight.position.x = 50;
	planeRight.position.y = 50;
	planeRight.rotateY(-Math.PI / 2);
	scene.add(planeRight);
	var planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
		color: 0xff0000
	}));
	planeLeft.position.x = -50;
	planeLeft.position.y = 50;
	planeLeft.rotateY(Math.PI / 2);
	scene.add(planeLeft);
	// lights
	var mainLight = new THREE.PointLight(0xcccccc, 1.5, 250);
	mainLight.position.y = 60;
	scene.add(mainLight);
	var greenLight = new THREE.PointLight(0x00ff00, 0.25, 1000);
	greenLight.position.set(550, 50, 0);
	scene.add(greenLight);
	var redLight = new THREE.PointLight(0xff0000, 0.25, 1000);
	redLight.position.set(-550, 50, 0);
	scene.add(redLight);
	var blueLight = new THREE.PointLight(0x7f7fff, 0.25, 1000);
	blueLight.position.set(0, 50, 550);
	scene.add(blueLight);
}

function animate() {
	requestAnimationFrame(animate);
	var timer = Date.now() * 0.01;
	sphereGroup.rotation.y -= 0.002;
	smallSphere.position.set(
		Math.cos(timer * 0.1) * 30,
		Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
		Math.sin(timer * 0.1) * 30
	);
	smallSphere.rotation.y = (Math.PI / 2) - timer * 0.1;
	smallSphere.rotation.z = timer * 0.8;
	cameraControls.update();
	renderer.render(scene, camera);
}
