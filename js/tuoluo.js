var scene, camera, renderer, cube;

var vConsole = new VConsole();
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    40,
    document.body.clientWidth / document.body.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // var controls = new THREE.OrbitControls(camera, renderer.domElement);

  // loadAllTexture(loadCarModel);

  const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const material = new THREE.MeshStandardMaterial({ color: 0x6698cb });
  material.metalness = 0.44;
  material.roughness = 0.4;
  cube = new THREE.Mesh(geometry, material);
  cube.rotation.set(0.4, 0.7, 0);
  scene.add(cube);

  addLight();

  loop();

  function capture_orientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    console.log(
      "Orientation - Alpha: " + alpha + ", Beta: " + beta + ", Gamma: " + gamma
    );

    cube.rotation.y = gamma / 100;
    cube.rotation.x = beta / 100;
  }

  window.addEventListener("deviceorientation", function (e) {
    console.log(e.alpha, e.beta, e.gamma);
    capture_orientation(e);
  });
}

function addBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function addLight() {
  var ambientLight = new THREE.AmbientLight(0xd5d5d5);
  ambientLight.intensity = 1.1;
  scene.add(ambientLight);

  var bottomRightDirLight = new THREE.DirectionalLight();
  bottomRightDirLight.position.x = 5;
  bottomRightDirLight.position.y = 3;
  bottomRightDirLight.position.z = -5;
  bottomRightDirLight.intensity = 1.3;

  // var helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
  // scene.add( helper );
  scene.add(bottomRightDirLight);

  var frontDirLight = new THREE.DirectionalLight(0xffffff);

  frontDirLight.position.x = -5;
  frontDirLight.position.y = 5;
  frontDirLight.position.z = 5;
  frontDirLight.intensity = 1.3;
  //directionalLight.castShadow=true;

  // var helper=new THREE.DirectionalLightHelper(frontDirLight,1);
  // scene.add( helper );
  scene.add(frontDirLight);
  // 车子正前上方斜45度的灯结束
}

function loop() {
  requestAnimationFrame(loop);

  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

window.onload = init;
