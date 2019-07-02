import config from './config';
import Event from '../../Event';

export default class Cabinet {
  static degToRad = Math.PI / 180;
  constructor(sceneInstance, vueInstance) {
    this.sceneInstance = sceneInstance;
    this.vueInstance = vueInstance;

    // 机柜下的所有设备
    this.servers = [];
    this.cabinetWrapper = [];
    this.group;

    // 机柜底部坐标
    this.innerBottomPos = -config.height / 2 + 10;
    // 机柜顶部坐标
    this.innerTopPos = config.height / 2 - 10;

    // 机柜门
    this.door;
    this.doorOpen = false;

    this.tempMaterial = {};



    this.init();
  }

  init() {
    this.group = new THREE.Group();

    let texture = new THREE.TextureLoader().load(require('./image/cabinet-front-end.png'));

    let cubeBig = new THREE.Mesh(new THREE.BoxGeometry(config.depth, config.height, config.width), new THREE.MeshLambertMaterial({ color: 0xffffff }));

    // depth 表示机柜深度、width表示宽度 height 表示高度
    let cubeSmall = new THREE.Mesh(new THREE.BoxGeometry(config.depth, config.height - 10, config.width - 10), new THREE.MeshLambertMaterial({ color: 0x323232 }));
    let cubeBigBSP = new ThreeBSP(cubeBig);
    let cubeSmallBSP = new ThreeBSP(cubeSmall);
    let resultBSP = cubeBigBSP.subtract(cubeSmallBSP);
    let result = resultBSP.toMesh();

    // 更新模型的面和顶点的数据
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    result.material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    result.name="cabinet-left-right"
    this.group.add(result);
    this.cabinetWrapper.push(result);

    // 增加机柜门，前门能开，后门可以去掉后展示server后部分内容
    let doorGeo = new THREE.BoxGeometry(10, config.height, config.width);
    let doorMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: 0, side:THREE.DoubleSide });
    let doorMesh = new THREE.Mesh(doorGeo, doorMaterial);
    doorMesh.position.set(0, 0, config.width / 2);

    // 新建一个对象用于切换旋转轴
    // 参考 http://www.voidcn.com/article/p-kkfgaqfd-wa.html
    this.door = new THREE.Object3D();
    this.door.add(doorMesh);
    this.door.position.set(config.depth / 2, 0, -config.width / 2);
    this.door.name= "cabinet-front"

    this.group.add(this.door);
    this.cabinetWrapper.push(this.door);

    // 增加机柜后面
    let backMesh = this.door.clone();
    let backEndTexture = new THREE.TextureLoader().load(require('./image/cabinet-back-end.png'));
    // 因为 door 是 Object3D，其中还有 doorMesh, 我们增加 material 在 doorMesh 身上。
    backMesh.children[0].material = new THREE.MeshBasicMaterial({ map: backEndTexture });
    backMesh.position.x = -config.depth / 2;
    backMesh.name="cabinet-end"
    this.group.add(backMesh);
    this.cabinetWrapper.push(backMesh);

    this.door.on('click', (ev) => {
      if (this.doorOpen) {
        this.closeCabinetDoor(this.door);
      } else {
        this.openCabinetDoor(this.door);
      }
      this.doorOpen = !this.doorOpen;
    });

    // let earthDiv = document.createElement('div');
    // earthDiv.textContent = 'Earth';
    // earthDiv.style.color = 'red'
    // let label = new THREE.CSS2DObject(earthDiv);
    // label.position.set(0, 500, 0);
    // group.add(label);
  }

  // 开机柜门
  openCabinetDoor(door) {
    new TWEEN.Tween(door.rotation)
      .easing(TWEEN.Easing.Circular.Out)
      .to({ y: 120 * Cabinet.degToRad }, 2000)
      .start();
  }

  // 关机柜门
  closeCabinetDoor(door) {
    new TWEEN.Tween(door.rotation)
      .easing(TWEEN.Easing.Circular.Out)
      .to({ y: 0 * Cabinet.degToRad }, 2000)
      .start();
  }

  addServer(arrServer) {
    this.servers.push(...arrServer);

    this.servers.forEach((item, idx) => {
      const { width, height, depth } = item.geometry.parameters;
      item.position.y = this.innerBottomPos + depth / 2 + (depth + 20) * idx;

      var edges = new THREE.EdgesHelper(item, 0x000000);
      edges.material.linewidth = 50;
      edges.position.x = item.position.x;
      edges.position.y = item.position.y;
      edges.position.z = item.position.z;
      edges.rotateX(Math.PI / 2);
      // 此处是为了server的点击事件更加好处理
      this.servers[idx].edges = edges
    
      edges.matrixAutoUpdate = true; // this helped
      this.group.add(edges);

      this.group.add(item);
    });
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

  // 展示机柜表示的能量
  showPower(flag){
    if(flag){
      this.cabinetWrapper.forEach(item => {
        if(item.type === 'Object3D'){
          this.tempMaterial[item.name] =  item.children[0].material
         
          item.children[0].material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        }else{
          this.tempMaterial[item.name] = item.material 
          item.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        }
      })
    }else{
      this.cabinetWrapper.forEach(item => {
        if(item.type === 'Object3D'){
          item.children[0].material = this.tempMaterial[item.name]
        }else{
          item.material = this.tempMaterial[item.name]
        }
      })
    }
    
  }
}
