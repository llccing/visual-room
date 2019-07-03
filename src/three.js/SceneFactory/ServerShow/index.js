import {Interaction} from 'three.interaction'

export default class Scene {
  constructor(containerId, width, height){
    this.sceneWidth = width;
    this.sceneHeight = height;

    this.scene;
    this.camera;
    this.helper;
    this.renderer;
    this.axes;
    this.light;
    this.controls;
    this.stats;
    this.animateId;

   this.init(containerId)
  }

  init(containerId){
    console.log(containerId)
    let container = document.getElementById(containerId);

    // 可以通过图片增加背景，但是效果不好
    // let texture = new THREE.TextureLoader().load(require('./image/sky2.jpg'));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xb0b0b0);
    // this.scene.background = texture
    
    // 调整镜头
    this.camera = new THREE.PerspectiveCamera(75, this.sceneWidth/this.sceneHeight, 0.2, this.sceneWidth*20)
    this.camera.position.set(this.sceneWidth, this.sceneWidth*1, this.sceneWidth*0.5)
    this.camera.lookAt(this.scene.position)

    // 增加网格参照
    // this.helper = new THREE.GridHelper(this.sceneWidth*2, 20);
    // this.scene.add(this.helper)

    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)
    this.renderer.setClearColor(new THREE.Color(0xeee), 1);
    this.renderer.shadowMap.enabled = true;

    // 增加坐标轴参照
    this.axes = new THREE.AxesHelper(this.sceneWidth);
    this.scene.add(this.axes)

    // 增加光
    this.light = new THREE.AmbientLight(0xffffff);
    
    this.scene.add(this.light)

    // 增加鼠标控制
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.screenSpacePanning = true;

    // 增加状态统计
    this.stats = new Stats();
    container.appendChild(this.renderer.domElement)
    container.appendChild(this.stats.dom)

    new Interaction(this.renderer, this.scene, this.camera)
    this.scene.on('touchstart', ev => {
      console.log(ev);
    })
    this.animate(null, this)

    return this
  }


  onWindowResize(event, self){
    console.log(this)
    // console.log(self)
    // this.camera.aspect = this.sceneWidth/this.sceneHeight;
    this.camera.aspect = window.innerWidth/window.innerHeight;
    this.camera.updateProjectionMatrix();

    // this.renderer.setSize(this.sceneWidth, this.sceneHeight)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  animate(time, self){
    TWEEN.update(time)
    this.animateId = requestAnimationFrame((time)=>{
      this.animate(time, self)
    })

    this.render()
    this.stats.update()
  }

  render(){
    this.renderer.render(this.scene, this.camera)
  }
  
}