class Main {
  constructor(domId, maxL, maxW, maxH) {
    this.renderer = '';
    this.scene = '';
    this.camera = '';
    this.startAnimate = '';
    this.sceneRange = '';

    this.init(domId, maxL, maxW, maxH);
  }

  init(domId, maxL, maxW, maxH) {
    this.sceneRange = {
      l: maxL,
      w: maxW,
      h: maxH,
    };

    this.scene = new THREE.scene();
    let dom = document.getElementById(domId);
    let width = dom.offsetWidth;
    let height = dom.offsetHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000000);
    // let pt = this.geometry.getPosition({ x: maxL / 2, y: maxW, z: maxH }, maxL, maxW, maxH);

    this.camera.camera.position.set(maxL / 2, maxH * 2, maxW * 1);

    let light = new THREE.AmbientLight('#ccc');

    this.scene.add(light);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: dom,
      //增加下面两个属性，可以抗锯齿
      antialias: true,
      alpha: true,
    });
    this.renderer.setClearColor('#3d5c94');
    this.renderer.setSize(width, height);
  }
}

export const material = {
  /**
   * 纯色材质
   *  @param {*} color 颜色
   *  @param {*} opacity 透明度
   *  @param {*} reflect 是否金属质感反射
   */
  colorMaterial: function(color, opacity, reflect) {
    var material;
    if (reflect) {
      material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: opacity < 1,
        opacity: opacity,
      });
    } else {
      material = new THREE.MeshLambertMaterial({
        color: color,
        transparent: opacity < 1,
        opacity: opacity,
      });
    }

    return material;
  },
  /**
   * 单一贴图材质
   *  @param {*} bitmapPath 图片路径（默认512x512尺寸）
   *  @param {*} repeatX x重复量
   *  @param {*} repeatY y重复量
   */
  bitmapMaterial: function(bitmapPath, repeatX, repeatY) {
    var texture = THREE.ImageUtils.loadTexture(bitmapPath, {}, function() {
      texture.repeat.set(repeatX, repeatY);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      //加载完成后渲染
      //main.render();
    });

    return new THREE.MeshLambertMaterial({
      map: texture,
      visible: true,
    });
  },
  /**
   * 多面贴图材质
   * (默认的顺序 右左上下前后)
   *  @param {*} bitmaps 图片配置json集合
   */
  bitmapsMaterial: function(bitmaps) {
    var materials = [];
    for (var i = 0; i < bitmaps.length; i++) {
      var bitmap = bitmaps[i];
      if (bitmap.visible) {
        var texture = THREE.ImageUtils.loadTexture(bitmap.bitmapPath, {}, function() {
          texture.repeat.set(bitmap.repeatX, bitmap.repeatY);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;

          //加载完成后渲染
          //main.render();
        });

        var material = new THREE.MeshLambertMaterial({
          map: texture,
        });

        materials.push(material);
      } else {
        materials.push(
          new THREE.MeshLambertMaterial({
            color: bitmap.color,
          }),
        );
      }
    }

    return new THREE.MeshFaceMaterial(materials);
  },
};

export const geometry = {
  /**
   * 创建立方体
   */
  box: function(l, w, h) {
    var box = new THREE.CubeGeometry(l, h, w);
    return box;
  },
  /**
   * 创建面
   */
  polygon: function(points) {
    var shape = new THREE.Shape();
    var point = points[0];
    shape.moveTo(point.x, point.y);
    for (var i = 1; i < points.length; i++) {
      point = points[i];
      shape.lineTo(point.x, point.y);
    }

    return shape;
  },
  /**
   * 创建圆
   */
  circle: function(point, r) {
    var circleShape = new THREE.Shape();
    circleShape.moveTo(0, circleRadius);
    circleShape.quadraticCurveTo(r, r, r, 0);
    circleShape.quadraticCurveTo(r, -r, 0, -r);
    circleShape.quadraticCurveTo(-r, -r, -r, 0);
    circleShape.quadraticCurveTo(-r, r, 0, r);

    return circleShape;
  },
  /**
   * 线
   */
  line: function(points) {
    var splineShape = new THREE.Shape();
    var splinepts = [];

    var point = points[0];
    splineShape.moveTo(point.x, point.y);
    for (var i = 1; i < points.length; i++) {
      splinepts.push(new THREE.Vector2(point.x, point.y));
    }

    splineShape.splineThru(splinepts);

    return splineShape;
  },
  /**
   * 拉伸图形
   */
  extrudeShape: function(shape, h) {
    return new THREE.ExtrudeGeometry(shape, {
      amount: h,
      bevelThinkness: 2,
      bevelSize: 1,
      bevelSegments: 3,
      bevelEnabled: true,
      curveSegments: 12,
      steps: 1,
    });
  },
  /**
   * 创建圆柱
   */
  cylinder: function(r, l, angleX, angleY, angleZ) {
    var cylinderMesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, l, 60, 60));
    cylinderMesh.rotateX(angleX);
    cylinderMesh.rotateY(angleY);
    cylinderMesh.rotateZ(angleZ);

    return cylinderMesh;
  },
  /**
   * 加载模型
   */
  model: function(l, w, h, mtlPath, modelPath, angleX, angleY, angleZ, position, callBack) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(mtlPath, function(materials) {
      materials.preload();

      var loader = new THREE.OBJLoader();
      loader.setMaterials(materials);
      loader.load(modelPath, function(obj) {
        //计算模型尺寸
        var box = new THREE.Box3();
        box.expandByObject(obj);

        var length = box.max.x - box.min.x;
        var width = box.max.z - box.min.z;
        var height = box.max.y - box.min.y;

        obj.scale.set(l / length, h / height, w / width);

        var x = ((box.max.x + box.min.x) / 2) * obj.scale.x;
        var y = ((box.max.y + box.min.y) / 2) * obj.scale.y;
        var z = ((box.max.z + box.min.z) / 2) * obj.scale.z;

        var pt = main.geometry.getPosition(position, l, w, h);
        obj.position.set(0 - x, 0 - y, 0 - z);

        obj.castShadow = true;
        obj.receiveShadow = true;

        let wrapper = new THREE.Object3D();
        wrapper.position.set(pt.x, pt.y, pt.z);
        wrapper.add(obj);
        //obj.position.set(-x,-y,-z);

        wrapper.rotation.set(angleX, angleY, angleZ);

        callBack(wrapper);
      });
    });
  },

  mesh: function(geometry, position, material) {
    var mesh = new THREE.Mesh(geometry, material);

    var box = new THREE.Box3();
    box.expandByObject(mesh);

    var l = box.max.x - box.min.x;
    var w = box.max.z - box.min.z;
    var h = box.max.y - box.min.y;

    var position = main.geometry.getPosition(position, l, w, h);
    mesh.position.set(position.x, position.y, position.z);
    mesh.updateMatrix();
    return mesh;
  },

  /**
   * 计算模型在场景中的位置
   * @param {*} position 模型绝对位置
   * @param {*} l 模型长
   * @param {*} w 模型宽
   * @param {*} h 模型高
   */
  getPosition: function(position, l, w, h) {
    var x = position.x + (l - main.sceneRange.l) / 2;
    var y = position.z + (h - main.sceneRange.h) / 2;
    var z = position.y + (w - main.sceneRange.w) / 2;

    return { x: x, y: y, z: z };
  },
  /**
   * 裁剪图形
   * @param {*} box 原始模型
   * @param {*} clipBox 裁掉的部分
   */
  clipBox: function(box, clipBox) {
    var bsp = new ThreeBSP(box);
    var subtract = bsp.subtract(new ThreeBSP(clipBox));
    var result = subtract.toMesh(box.material);
    result.geometry.computeVertexNormals();

    return result;
  },

  /**
   * 合并图形
   */
  mergeBox: function(meshs) {
    var geometry = new THREE.Geometry();
    for (var i = 0; i < meshs.length; i++) {
      var mesh = meshs[i];
      geometry.merge(mesh.geometry, mesh.matrix);
    }

    return geometry;
  },
};

export const light = {
  /**
   * 点光源
   */
  pointLight: function(position, color, strength, distance) {
    var light = new THREE.PointLight(color, strength, distance);

    var pt = main.geometry.getPosition(position, 2, 2, 2);
    light.position.set(pt.x, pt.y, pt.z);

    return light;
  },
};

export const render = function() {
  main.renderer.render(main.scene, main.camera);
  requestAnimationFrame(main.render);
};

export default Main;
