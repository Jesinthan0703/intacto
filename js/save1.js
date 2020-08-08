/* AJAX */
  //AJAX
  $(function () {
    $(".save-button").on("click", function (e) {
      e.preventDefault();
      var answer = document.getElementById("answer").value;
      var answer2 = document.getElementById("answer2").value;
      $.ajax({
        type: "POST",
        url: "https://intacto.thedanielmark.com/save1.php",
        datatype: "html",
        data: {
          answer: answer,
          answer2 : answer2,
          email: localStorage.email,
        auth_token: localStorage.auth_token
        },
        success: function (response) {
          console.log(response);
          var parsedResponse = JSON.parse(response);
          if(parsedResponse == "correct") {
            window.location.replace("save2.html");
          }
          else if(parsedResponse == "failed") {
            document.writeln("Oops, something went wrong. Please reload the page the page and try again.");
          }
          else if(parsedResponse == "invalid") {
            localStorage.clear();
            window.location.replace("index.html");
          }
          else {
            window.alert("Please check your answers!");
          }
        },
        error: function (e){}
      });
    });
  });
/* ANIMATION */
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const rand = (min, max) => min + Math.random() * (max - min);
const vw = window.innerWidth,
vh = window.innerHeight;

const P_COUNT = 500;
let particleSystem, pGeo, pMat;
let targ = null,t = 0;

function init() {
  // Setup scene & cam
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, vw / vh, 0.05, 10000);
  loader = new THREE.TextureLoader();
  gltf = new THREE.GLTFLoader();

  camera.position.z = 5;
  scene.fog = new THREE.FogExp2(0x000000, 0.1);

  // Setup Particle Mesh
  pGeo = new THREE.Geometry();
  pMat = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.2,
    alphaTest: 0.5,
    map: loader.load('https://res.cloudinary.com/jsonyeung/image/upload/v1588067771/Codepen/particle.png') });


  for (let p = 0; p < P_COUNT; p++) {
    const particle = new THREE.Vector3(
    rand(0.4, 0.6) * Math.cos(p),
    rand(0.4, 0.6) * Math.sin(p),
    rand(-35, 0));

    pGeo.vertices.push(particle);
  }

  // Load Astronaut
  gltf.load('https://res.cloudinary.com/jsonyeung/raw/upload/v1588062369/Codepen/astronaut.glb', data => {
    targ = data.scene;
    targ.material = new THREE.MeshLambertMaterial();
    targ.scale.set(0.0005, 0.0005, 0.0005);
    targ.position.z = 3;
    scene.add(targ);
  });

  // Setup particles
  particleSystem = new THREE.Points(pGeo, pMat);
  scene.add(particleSystem);

  // Setup lighting
  let light = new THREE.PointLight(0xFFFFFF, 0.5);
  light.position.x = -1;
  light.position.y = -1;
  light.position.z = 3;
  scene.add(light);

  light = new THREE.PointLight(0xFFFFFF, 0.5);
  light.position.x = 1;
  light.position.y = 1;
  light.position.z = 3;
  scene.add(light);

  light = new THREE.PointLight(0xFFFFFF, 0.3);
  light.position.x = 0.5;
  light.position.y = 1;
  light.position.z = 4;
  scene.add(light);

  light = new THREE.AmbientLight(0xFFFFFF, 0.02);
  scene.add(light);
}

function updateParticles() {
  particleSystem.position.x = 0.2 * Math.cos(t);
  particleSystem.position.y = 0.2 * Math.cos(t);
  particleSystem.rotation.z += 0.015;
  camera.lookAt(particleSystem.position);

  for (const p of pGeo.vertices) {
    const dist = p.z - camera.position.z;
    if (dist >= 0) p.z = rand(-30, -20);
    p.z += 0.05;
  }

  particleSystem.geometry.verticesNeedUpdate = true;
}

function updateMeshes() {
  if (targ) {
    targ.position.z = 0.1 * Math.sin(t) + (camera.position.z - 0.2);
    targ.rotation.x += 0.015;
    targ.rotation.y += 0.015;
    targ.rotation.z += 0.01;
  }
}

function updateRendererDim() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

function render() {
  updateParticles();
  updateMeshes();
  updateRendererDim();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  t += 0.01;
}

// Interaction Event
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = -1 * ((cx - e.clientX) / cx);
  const dy = -1 * ((cy - e.clientY) / cy);

  camera.position.x = dx * 0.25;
  camera.position.y = dy * 0.25;
  targ.position.x = dx * 0.25;
  targ.position.y = dy * 0.25;
});

init();
render();