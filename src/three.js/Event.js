export default class Event {
  constructor(sceneInstance, objects) {
    this.sceneInstance = sceneInstance

    this.bindEvent(objects);
  }

  bindEvent(objects) {
    // 缓存之前点击过的server
    let self = this;
    const sceneInstance = this.sceneInstance;
    var camera = sceneInstance.camera;
    let lastIntersects = [];
    function ray(event) {
      var Sx = event.clientX; //鼠标单击位置横坐标
      var Sy = event.clientY; //鼠标单击位置纵坐标

      // https://stackoverflow.com/questions/36880033/clicking-objects-in-three-js-when-the-canvas-is-not-full-screen-r74
      let canvasBounds = sceneInstance.renderer.context.canvas.getBoundingClientRect();

      //屏幕坐标转标准设备坐标
      var x = ((Sx - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1; //标准设备横坐标
      var y = -((Sy - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1; //标准设备纵坐标
      var standardVector = new THREE.Vector3(x, y, 0.5); //标准设备坐标

      //标准设备坐标转世界坐标
      var worldVector = standardVector.unproject(camera);
      //射线投射方向单位向量(worldVector坐标减相机位置坐标)
      var ray = worldVector.sub(camera.position).normalize();
      //创建射线投射器对象
      var raycaster = new THREE.Raycaster(camera.position, ray);
      //返回射线选中的对象
      var intersects = raycaster.intersectObjects(objects);
      if (intersects.length > 0) {
        if (lastIntersects.length > 0) {
          let has = false;
          for (let i = 0; i < lastIntersects.length; i++) {
            if (lastIntersects[i].object.uuid === intersects[0].object.uuid) {
              has = true;
              // self.hideCabinetInfo();
              lastIntersects[i].object.material.forEach((item) => {
                item.color.set(0x323232);
              });
              lastIntersects.splice(i, 1);
            }
          }
          // 如果不在缓存中，那么仍然展示选中效果
          if (!has) {
            // self.showCabinetInfo(Math.random());
            // self.hideCabinetWrapper();
            lastIntersects.push(intersects[0]);
            intersects[0].object.material.forEach((item) => {
              item.color.set(0xff0000);
            });
          }
        } else {
          // self.showCabinetInfo(Math.random());
          lastIntersects.push(intersects[0]);
          intersects[0].object.material.forEach((item) => {
            item.color.set(0xff0000);
          });
        }
      } else {
        objects.forEach((server) => {
          server.material.forEach((item) => {
            // item.color.set(0x323232);
          });
        });
      }
    }
    addEventListener('click', ray); // 监听窗口鼠标单击事件
  }
}
