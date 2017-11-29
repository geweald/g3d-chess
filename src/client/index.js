import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
)
const renderer = new THREE.WebGLRenderer()
const loader = new THREE.ObjectLoader()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

loader.load(
  "../assets/loper.json",
  obj => scene.add(obj),
  xhr => console.log(xhr.loaded / xhr.total * 100 + "% loaded"),
  xhr => console.error("An error happened"),
)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
