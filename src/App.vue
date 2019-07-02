<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/center">center 数据中心</router-link>|
      <router-link to="/cabinet">cabinet 机柜</router-link>|
      <router-link to="/device">device 设备</router-link>
    </div>-->
    <router-view class="home" />
  </div>
</template>

<style lang="less">
#nav {
  // padding: 30px;
  margin-bottom: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
