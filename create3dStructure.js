// import * as THREE from "./three.js";
import * as THREE from 'three'

let camera, scene, renderer;
let plane;
let pointer, raycaster, isShiftDown = false;

let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
const width = 500, height = 500;

const objects = [];

const planeSize = 500;
const cubeSize = 100;

init();
render();

function init() {

    camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // grid

    const gridHelper = new THREE.GridHelper(planeSize, planeSize / cubeSize);
    scene.add(gridHelper);

    const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
    geometry.rotateX(- Math.PI / 2);

    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    scene.add(plane);

    objects.push(plane);

    // lights

    const ambientLight = new THREE.AmbientLight(0x606060, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    document.querySelector(".layout").appendChild(renderer.domElement);

    // document.addEventListener('pointermove', onPointerMove);
    // document.addEventListener('pointerdown', onPointerDown);
    // document.addEventListener('keydown', onDocumentKeyDown);
    // document.addEventListener('keyup', onDocumentKeyUp);

    // //

    // window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    render();

}

function onPointerMove(event) {

    pointer.set((event.clientX / width) * 2 - 1, - (event.clientY / height) * 2 + 1);
    // console.log((event.clientX / width) * 2 - 1, - (event.clientY / height) * 2 + 1);
    // console.log((event.clientX) ,(event.clientY))
    // pointer.set((event.clientX) ,(event.clientY));

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {

        const intersect = intersects[0];

        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.divideScalar(cubeSize).floor().multiplyScalar(cubeSize).addScalar(25);

        render();

    }

}

function onPointerDown(event) {

    pointer.set((event.clientX / width) * 2 - 1, - (event.clientY / height) * 2 + 1);

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {

        const intersect = intersects[0];

        // delete cube

        if (isShiftDown) {

            if (intersect.object !== plane) {

                scene.remove(intersect.object);

                objects.splice(objects.indexOf(intersect.object), 1);

            }

            // create cube

        } else {

            const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position.divideScalar(cubeSize).floor().multiplyScalar(cubeSize).addScalar(25);
            scene.add(voxel);

            objects.push(voxel);

        }

        render();

    }

}

function onDocumentKeyDown(event) {

    switch (event.keyCode) {

        case 16: isShiftDown = true; break;

    }

}

function onDocumentKeyUp(event) {

    switch (event.keyCode) {

        case 16: isShiftDown = false; break;

    }

}

function render() {

    renderer.render(scene, camera);

}