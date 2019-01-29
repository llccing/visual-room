<style lang="less" scoped>
</style>

<template>
  <div class="about">
    <div id="container"></div>
    <div id="info"></div>
  </div>
</template>
<script>
var animateid, renderer, stats, scene, camera;

export default {
  mounted() {
    var geometry, material, mesh;

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      camera.position.z = 1;

      scene = new THREE.Scene();

      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      material = new THREE.MeshNormalMaterial();

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      setInterval(function() {
        console.log(22);
      }, 1000);
    }

    function animate() {
      animateid = requestAnimationFrame(animate);
      console.log(11);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      renderer.render(scene, camera);
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(animateid);
  }
};
</script>

