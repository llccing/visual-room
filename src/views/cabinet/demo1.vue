<template>
  <div class="demo1">
    <div class="cabinet-container" id="cabinetContainer"></div>
    <div class="controls">
      <Icon type="md-home" />
      <Icon @click="showPower" type="ios-flame-outline" />

      <Icon type="md-information" />
    </div>
    <Modal title="服务器详情" v-model="cabinetModalShow">
      <h1>详情展示</h1>
    </Modal>
  </div>
</template>
<script>
import Scene from '../../three.js/index';

export default {
  data() {
    return {
      sceneInstance: null,
      cabinetInstance: null,
      cabinetModalShow: false,

      showPowerFlag: false,
    };
  },
  methods: {
    showCabinetInfo(data) {
      this.cabinetModalShow = true;
    },

    hideCabinetInfo() {
      this.cabinetModalShow = false;
    },

    showPower() {
      this.showPowerFlag = !this.showPowerFlag;
      this.cabinetInstance.showPower(this.showPowerFlag);
      console.log(this.sceneInstance);
    },
  },
  mounted() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    this.sceneInstance = new Scene(
      'cabinetContainer',
      window.innerWidth,
      window.innerHeight,
    );
    // this.sceneInstance = new Scene('cabinetContainer', 2000, 1200);
    let T36042 = new Scene.Cabinet.T36042(this.sceneInstance, this);
    let DELL_E52603V4 = new Scene.Server.DELL_E52603V4();
    let DELL_E52603V4V2 = new Scene.Server.DELL_E52603V4();
    let DELL_E52603V4V3 = new Scene.Server.DELL_E52603V4();

    T36042.addServer([
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
      new Scene.Server.DELL_E52603V4(),
    ]);
    this.cabinetInstance = T36042;
    // new Scene.Event(this.sceneInstance)
    this.sceneInstance.scene.add(T36042.group);

    window.addEventListener(
      'resize',
      this.sceneInstance.onWindowResize.bind(this.sceneInstance),
      false,
    );
  },

  beforeDestroy() {
    cancelAnimationFrame(this.sceneInstance.animateid);
  },
};
</script>

<style lang="less" scoped>
.demo1 {
  position: relative;
  height: 100vh;

  .cabinet-container {
    position: relative;
    /deep/ canvas {
      position: absolute;
    }

    /deep/ & > div {
      position: absolute !important;
      right: 0;
      left: inherit !important;
    }
  }

  .controls {
    position: absolute;
    left: 5px;
    top: 10%;
    z-index: 1;
    background-color: #fff;
    font-size: 30px;
    width: 50px;
    border-radius: 4px;
    padding: 0 10px;

    /deep/ .ivu-icon {
      border-radius: 50%;
      background-color: #fff;
      color: #57a3f3;
      border-bottom: 1px solid;
      cursor: pointer;

      &:hover {
        border: 1px dashed #57a3f3;
      }
    }
  }
}
</style>
