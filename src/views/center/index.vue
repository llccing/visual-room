<template>
  <div>
    <strong>数据中心list</strong>
    <div>
      <router-link to="/center/assembly">机房俯视图装配</router-link>  |
      <router-link to="/center/threejs-whole">threejs实例一</router-link> | 
      <router-link to="/center/drag">拖拽实践</router-link>
    </div>

    <router-view/>
  </div>
</template>
