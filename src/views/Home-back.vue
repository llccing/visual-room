<template>
  <div class="home">
    <h3>TODO</h3>
    <ol>
      <li>[ ] 机房俯视装配</li>
      <li>[ ] 机柜正视装配</li>
      <li>[ ] 各种设备（存储设备storage、网络设备network、服务器设备server）</li>
      <li>[ ] Three.js生成机柜</li>
      <li>[ ] 生成数据中心，根据位置信息</li>
    </ol>


    <h3>
      <a href="http://escj.cnic.cn/fileup/PDF/20130212.pdf" target="_blank">方法论</a>
    </h3>
    <ol>
      <li>
        <strong>机房俯视装配</strong>
        <p>
          机房俯视装配阶段，考虑到机房的容量、 供电量和散热等因素，每个机房内最多放置m排机柜，每排不能多于n个，每排的机柜须挨着摆放，且相邻两排的距离不能小于d(m，n，d 的取值由数据 中心的管理员指定)。
        </p>
      </li>
      <li>
        <strong>机柜正视装配</strong>
        <p>
          在机柜正视装配阶段，考虑到机柜的散热问 题，每个机柜内放置的设备个数不能多于 p 个 (p 的 取值由数据中心的管理员指定)。
          在机柜正视装配阶段，考虑到机柜的内部结 构设置，设备须在机柜内左右居中，且上下放在整数 U 的位置上。
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
  }
};
</script>
