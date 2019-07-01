import config from './config';
import Event from '../../Event';

export default class Cabinet {
  constructor(sceneInstance, vueInstance) {
    this.sceneInstance = sceneInstance;
    this.vueInstance = vueInstance;

    this.servers = [];
    this.cabinetWrapper = [];
    this.group;

    this.innerBottomPos = -config.height / 2 + 10;
    this.innerTopPos = config.height / 2 - 10;

    new Event(sceneInstance, this.servers);
    this.init();
  }

  init() {
    this.group = new THREE.Group();

    var texture = new THREE.TextureLoader().load(require('./image/cabinet-front-end.png'));
    let materials = [
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0x323232 }),
      new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
      new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
    ];

    var cubeBig = new THREE.Mesh(new THREE.BoxGeometry(config.width, config.height, config.depth), new THREE.MeshLambertMaterial({ color: 0xffffff }));

    var cubeSmall = new THREE.Mesh(new THREE.BoxGeometry(config.width, config.height - 10, config.depth - 10), new THREE.MeshLambertMaterial({ color: 0x323232 }));
    var cubeBigBSP = new ThreeBSP(cubeBig);
    var cubeSmallBSP = new ThreeBSP(cubeSmall);
    var resultBSP = cubeBigBSP.subtract(cubeSmallBSP);
    var result = resultBSP.toMesh();

    //更新模型的面和顶点的数据
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    

    result.material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    // result.material = materials;
    this.group.add(result);
    this.cabinetWrapper.push(result);

    // var earthDiv = document.createElement('div');
    // earthDiv.textContent = 'Earth';
    // earthDiv.style.color = 'red'
    // var label = new THREE.CSS2DObject(earthDiv);
    // label.position.set(0, 500, 0);
    // group.add(label);
  }

  addServer(arrServer) {
    this.servers.push(...arrServer);
    // console.log(serverInstance.geometry.parameters);
    // const { width, height, depth } = serverInstance.geometry.parameters;
    // serverInstance.position.y = this.innerBottomPos + depth/2 ;

    this.servers.forEach((item, idx) => {
      const { width, height, depth } = item.geometry.parameters;
      item.position.y = this.innerBottomPos + depth / 2 +(depth +10) *idx;

      this.group.add(item);
    });
      const { width, height, depth } = arrServer[0].geometry.parameters;

    // console.log(this.servers)
    // this.servers[0].position.y = 0
    // this.servers[1].position.y = 100
    // this.servers[2].position.y = 200
    // this.group.add(this.servers[0]);
    // this.group.add(this.servers[1]);
    // this.group.add(this.servers[2]);

    console.log(this.group)
  }

  addServerByIdx(serverInstance, idx) {
    this.servers.push(serverInstance);
    serverInstance.position.y = this.innerBottomPos;
    this.servers.forEach((item) => {
      this.group.add(serverInstance);
    });
  }

  showCabinetInfo(data) {
    this.vueInstance.showCabinetInfo(data);
  }

  hideCabinetInfo() {
    this.vueInstance.hideCabinetInfo();
  }
}
