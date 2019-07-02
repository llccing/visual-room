import iView from 'iview';
import config from './config';

export default class Server {
  constructor() {
    let cube;
    let cubeGeometry = new THREE.BoxGeometry(config.height, config.width, config.depth);
    this.texture = new THREE.TextureLoader().load(require('./image/server-front-end.png'));
    this.materials = [
      new THREE.MeshBasicMaterial({ map: this.texture }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0xb1b1b1 }),
      new THREE.MeshLambertMaterial({ color: 0xb1b1b1 }),
    ];

    cube = new THREE.Mesh(cubeGeometry, this.materials);

    cube.castShadow = true;
    cube.rotateX(Math.PI / 2);

    cube.v_data = config;

    // cube.edgesHelper =  new THREE.EdgesHelper( cube );;
    // cube.edgesHelper.material.color.set( 0xff0000 );

    this.bindEvent(cube);

    return cube;
  }

  bindEvent(cube) {
    cube.on('click', (ev) => {
      // iView.Modal.success({ title: '详细信息', content: 666, scrollable: true});
    });

    cube.on('mouseover', (ev) => {
      cube.edges.material.color.set(0xff0000);
      cube.material[0].color.set(0x00ffff);
    });

    cube.on('mouseout', (ev) => {
      cube.edges.material.color.set(0x000000);
      cube.material[0] = new THREE.MeshBasicMaterial({ map: this.texture })
    });
  }
}
