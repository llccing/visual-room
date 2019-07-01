<template>
  <div>
    <h3>我是一个机柜</h3>
    <div class="cabinet-container" id="cabinetContainer"></div>
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
      cabinetModalShow: false,
    };
  },
  methods: {
    showCabinetInfo(data) {
      this.cabinetModalShow = true;
    },

    hideCabinetInfo() {
      this.cabinetModalShow = false;
    },
  },
  mounted() {
    this.sceneInstance = new Scene('cabinetContainer', 2000, 1200);
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
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
      // new Scene.Server.DELL_E52603V4(),
    ]);

    console.log(T36042.group);

    this.sceneInstance.scene.add(T36042.group);
  },

  beforeDestroy() {
    cancelAnimationFrame(this.sceneInstance.animateid);
  },
};
</script>

<style lang="less" scoped>
.cabinet-container {
  position: relative;
  width: 1000px;
  height: 600px;
  margin: 100px auto;

  /deep/ & > div {
    position: absolute !important;
    right: 0;
    left: inherit !important;
  }
}
</style>
