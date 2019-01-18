<template>
  <div class="con clearfix">
    <div class="left">
      <div class="cabinet" v-for="(item, idx) in cabinetType">
        <div>名字:{{item.name}}</div>
        <div>宽度:{{item.width}}</div>
        <div>高度:{{item.height}}</div>
        <div>类型:{{item.type}}</div>
      </div>
    </div>
    <div class="right">
      <div class="row">
        <div class="col-sm-8 room">
          <div class="cabinet-row clearfix" v-for="(rowItem, rowIdx) in cabinetRowArr">
            <div class="cabinet-col" :style="cabinetColStyle" v-for="(item, idx) in cabinetColArr"></div>
          </div>
        </div>
        <div class="col-sm-4">
          <form class="form">
            <p>机房的机柜信息</p>
            <div class="form-group">
              <label>机柜排数 &nbsp;</label>
              <input class="form-control" type="number" v-model="room.cabinetNumber">
            </div>

            <div class="form-group">
              <label>每排个数 &nbsp;</label>
              <input class="form-control" type="number" v-model="room.count">
            </div>

            <div class="form-group">
              <label>间隔（单位：厘米）</label>
              <input class="form-control" type="number" v-model="room.padding">
            </div>
            <!-- <button class="btn btn-success" @click="initCabinet">生成机柜位置</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "assembly",
  data() {
    return {
      cabinetType: [
        {
          name: "机柜A",
          width: 10,
          height: 20,
          type: 1
        },
        {
          name: "机柜B",
          width: 14,
          height: 25,
          type: 2
        },
        {
          name: "机柜B",
          width: 14,
          height: 25,
          type: 3
        }
      ],
      room: {
        cabinetNumber: 0,
        count: 0,
        padding: 0
      }
    };
  },
  computed: {
    cabinetColArr(){
      let arr = [];

      for(let i=0;i<this.room.count;i++){
        arr.push(i)
      }

      return arr;
    },
    cabinetRowArr(){
      let arr = [];

      for(let i=0;i<this.room.cabinetNumber;i++){
        arr.push(i)
      }

      return arr;
    },
    cabinetColStyle(){
      let style = {};
      /**
       * 用90%的宽度去给每个机柜分配宽度
       * 用剩下的10%的宽度给你每个机柜设置左右边距，这样就能够居中显示。
       */
      style.width = `${0.9/this.room.count*100}%`;
      style.height = `${style.width*2}px`
      style.margin = `0 ${0.1/2/this.room.count*100}% 5px`
      return style 
    },
  },
  methods: {
    initCabinet() {}
  }
};
</script>

<style lang="less" scoped>
.con {
  padding: 10px;

  .left {
    float: left;
    width: 200px;
    // border-right: 2px solid #ccc;

    .cabinet {
      width: 100px;
      height: 150px;
      border: 1px solid #ddd;
      padding: 10px;

      margin: 0 auto 10px;
    }
  }

  .right {
    margin-left: 210px;
    // background: yellow;

    .room {
      border: 1px solid #f00;
      min-height: 800px;
      max-width: 800px;
      padding: 10px;

      .cabinet-row {
        
        .cabinet-col {
          height: 150px;

          float: left;
          border: 1px dashed #000;
          margin: 0 0.5%;
        }
      }
    }

    .operation {
      float: right;
      width: 200px;
    }
  }
}
</style>
