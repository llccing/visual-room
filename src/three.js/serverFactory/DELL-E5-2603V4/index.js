import config from './config';
export default class Server {
  constructor() {
    let cube;
    let cubeGeometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
    var texture = new THREE.TextureLoader().load(require('./image/server-front-end.png'));
    // texture.rotation = Math.PI
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(50, 50);
    let materials = [
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
      new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
    ];

    cube = new THREE.Mesh(cubeGeometry, materials);

    cube.castShadow = true;
    cube.rotateX(Math.PI / 2);

    return cube;
  }
}
