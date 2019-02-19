class Cabinet {
  constructor({ code, lineNo, roomId, relativeX, relativeY, face, capacity }) {
    this.code = code;
    this.lineNo = lineNo;
    this.roomId = roomId;
    this.relativeX = relativeX;
    this.relativeY = relativeY;
    this.face = face;
    this.capacity = capacity;

    this.l = 40;
    this.w = 25;
    this.h = 80;
    this.obj = null;
  }

  init() {
    var lucencyMaterial = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0,
    });
    this.obj = new THREE.Mesh(new THREE.CubeGeometry(this.l, this.h, this.w), lucencyMaterial);
    this.obj.position.set(this.relativeX, -10, this.relativeY);
    this.obj.name = 'this';
    this.obj.userData = {
      code: this.code,
      lineNo: this.lineNo,
      roomId: this.roomId,
      capacity: this.capacity,
      x: this.x,
      y: this.y,
    };

    var cube;
    var geometry = new THREE.CubeGeometry(this.l, this.h, 1);
    var texture = new THREE.ImageUtils.loadTexture('../resource/image/textures/2.png');
    var material = new THREE.MeshLambertMaterial({ color: 0x696969, map: texture });
    var sideCube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
    sideCube.position.z = sideCube.position.z + this.w / 2;
    this.obj.add(sideCube);

    geometry = new THREE.CubeGeometry(this.l, this.h, 1);
    texture = new THREE.ImageUtils.loadTexture('../resource/image/textures/2.png');
    material = new THREE.MeshLambertMaterial({ color: 0x696969, map: texture });
    sideCube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
    sideCube.position.z = sideCube.position.z - this.w / 2;
    this.obj.add(sideCube);

    geometry = new THREE.CubeGeometry(this.l, 1, this.w);
    texture = new THREE.ImageUtils.loadTexture('../resource/image/textures/4.png');
    material = new THREE.MeshLambertMaterial({ color: 0x696969, map: texture });
    var topCube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
    topCube.position.y = topCube.position.y + this.l;
    this.obj.add(topCube);

    geometry = new THREE.CubeGeometry(this.l, 0.1, this.w);
    texture = new THREE.ImageUtils.loadTexture('../resource/image/textures/4.png');
    material = new THREE.MeshLambertMaterial({ color: 0x696969, map: texture });
    var bottomCube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
    bottomCube.position.y = bottomCube.position.y - this.l;
    this.obj.add(bottomCube);

    geometry = new THREE.CubeGeometry(1, 79.6, this.w);
    texture = new THREE.ImageUtils.loadTexture('../resource/image/textures/1.png');
    material = new THREE.MeshLambertMaterial({ color: 0x696969, map: texture });
    var otherMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    var doorCube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([material, otherMaterial, otherMaterial, otherMaterial, otherMaterial, otherMaterial]));
    var axisCube = new THREE.Mesh(new THREE.BoxGeometry(0.01, this.h, 0.01), new THREE.MeshLambertMaterial({ color: 0x696969 }));
    axisCube.position.x = this.l / 2 + axisCube.position.x;
    axisCube.position.z = axisCube.position.z - this.w / 2;
    doorCube.position.z = doorCube.position.z + this.w / 2;
    var doorObject = new THREE.Object3D();
    doorObject.add(doorCube);
    axisCube.add(doorObject);
    axisCube.name = code + 'Door';

    this.obj.add(axisCube);
  }
}

export default Cabinet;
