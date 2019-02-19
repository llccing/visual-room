import Cabinet from './Cabinet';
import Main from './Main';
import { geometry,material,light } from './Main';

var objects = [];
var INTERSECTED;
var offset = 100;
var cameraY = 100;
var t = 0;
var openDoor, closeDoor;

var cabinetX, cabinetY, cabinetZ;

class Start {
  constructor(domId) {
    this.domId = domId;

    this.orbitControls = null;
    this.clock = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.container = null;
    this.intersects = null;
    this.startAnimate = false;
    
    // 场景
    this.MainIns = new Main(domId, 900, 650, 100);
    this.init();
  }

  init(){
    let container = document.getElementById(this.domId);

    // 控制器
    this.orbitControls = new THREE.OrbitControls(this.MainIns.camera, this.MainIns.renderer.domElement);
    // 控制焦点
    this.orbitControls.target = new THREE.Vetor3(10, 0, 10);

    this.floor();
  }

  floor(){
    let geo = cabinetIns.geometry.box(950, 850, 4);
    let materain
  }
}

export default Start;