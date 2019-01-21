<template>
  <div class="con clearfix">
    <div class="left">
      <div
        :class="{'choose': item.choose}"
        @click="cabinetTypeClick(idx)"
        class="cabinet"
        v-for="(item, idx) in cabinetType"
      >
        <div>名字:{{item.name}}</div>
        <div>宽度:{{item.width}}</div>
        <div>高度:{{item.height}}</div>
        <div>类型:{{item.type}}</div>
      </div>

      <button @click.prevent="fillCabinet" class="btn btn-primary">填充机柜</button>
    </div>
    <div class="right">
      <div class="row">
        <div class="col-sm-8 room">
          <div class="cabinet-row clearfix" v-for="(rowItem, rowIdx) in cabinetArr">
            <div
              :class="item.classes"
              :style="cabinetColStyle"
              @click="cabinetBoxClick(rowIdx,colIdx)"
              class="cabinet-col"
              v-for="(item, colIdx) in cabinetArr[rowIdx]"
            >
              <div>{{item.info.name}}</div>
            </div>
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
            <button @click.prevent="initCabinet" class="btn btn-success">生成机柜位置</button>
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
      cabinetType: [],
      room: {
        cabinetNumber: 2,
        count: 8,
        padding: 0
      },

      // 机柜排数
      cabinetArr: [],

      // 机柜box样式
      cabinetColStyle: {},
      cabinetClasses: {}
    };
  },
  computed: {},
  mounted() {
    this.getAllCabinet();
  },
  methods: {
    // 获取所有类型机柜
    getAllCabinet() {
      let data = [
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
      ];

      data.forEach(item => {
        item.choose = false;
      });

      this.cabinetType = data;
      console.log(data);
    },
    // 生成待填充机柜
    initCabinet() {
      let row = [];
      for (let i = 0; i < this.room.cabinetNumber; i++) {
        row.push([]);
        for (let j = 0; j < this.room.count; j++) {
          let obj = {
            filled: false,
            classes: {
              choose: false
            },
            info: {
              name: "待填充"
            }
          };
          row[i].push(obj);
        }
      }

      this.cabinetArr = row;

      this.calcStyle();
    },

    // 计算样式
    calcStyle() {
      let style = {};
      /**
       * 用90%的宽度去给每个机柜分配宽度
       * 用剩下的10%的宽度给你每个机柜设置左右边距，这样就能够居中显示。
       */
      style.width = `${(0.9 / this.room.count) * 100}%`;
      style.height = `${style.width * 2}px`;
      style.margin = `0 ${(0.1 / 2 / this.room.count) * 100}% 5px`;
      this.cabinetColStyle = style;
    },

    // 机柜box点击事件
    cabinetBoxClick(rowIdx, colIdx) {
      let item = this.cabinetArr[rowIdx][colIdx];
      if(item.filled){
        return;
      }
      item.choose = !item.choose;
      item.classes = {
        choose: item.choose
      };
    },

    // 填充机柜
    fillCabinet() {
      console.log(11);
      // 被选中的设备
      let chooseItem;
      let flag = false;
      this.cabinetType.forEach(item => {
        if (item.choose) {
          flag = true;
          chooseItem = item;
        }
      });
      if (!flag) {
        this.$Notice.warning({
          title: "提示",
          desc: "请选择一个机柜放到右侧机房俯视图中。"
        });

        return;
      }

      console.log(chooseItem);

      this.cabinetArr.forEach(rowItem => {
        rowItem.forEach(item => {
          if (item.choose) {
            item.info = chooseItem;
            item.filled = true;
            item.classes.choose = false;

            console.log(item);
          }
        });
        
      });
    },

    cabinetTypeClick(idx) {
      this.cabinetType.forEach((item, index) => {
        if (idx !== index) {
          item.choose = false;
        }
      });

      let item = this.cabinetType[idx];
      item.choose = !item.choose;
    }
  }
};
</script>

<style lang="less" scoped>
.con {
  padding: 10px;

  .left {
    float: left;
    width: 200px;

    .cabinet {
      width: 100px;
      height: 150px;
      border: 1px solid #ddd;
      padding: 10px;
      cursor: pointer;

      margin: 0 auto 10px;
    }

    .choose {
      border-color: #f00;
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
          cursor: pointer;
          text-align: center;
        }

        .choose {
          border-color: #f00;
        }

        .style-a {
          background: #f55;
        }

        .style-b {
          background: #f5a;
        }

        .style-c {
          background: #f5f;
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
