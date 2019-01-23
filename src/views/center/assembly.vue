<template>
  <div class="con clearfix">
    <div class="left">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">待填充机柜</h3>
        </div>
        <div class="panel-body">
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
        </div>
      </div>

      <button @click.prevent="fillCabinet" class="btn btn-primary">填充机柜</button>
    </div>
    <div class="right">
      <div class="row">
        <div class="col-sm-8 room">
          <div class="cabinet-row clearfix" v-for="(rowItem, rowIdx) in cabinetObj.data">
            <div
              :class="item.classes"
              :style="cabinetColStyle"
              @click="cabinetBoxClick(rowIdx,colIdx)"
              class="cabinet-col"
              v-for="(item, colIdx) in cabinetObj.data[rowIdx]"
            >
              <div>{{item.info.name}}</div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="room-config">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">机房方案</h3>
              </div>
              <div class="panel-body">
                <div>
                  <div
                    :key="idx"
                    @click="storeClick(item)"
                    class="media"
                    :class="{active: item.id === cabinetObj.id}"
                    style="cursor: pointer;"
                    v-for="(item, idx) in storeCenterData"
                  >
                    <div class="media-left media-middle">
                      <img
                        alt="..."
                        class="media-object"
                        src="../../assets/logo.png"
                        style="width: 32px; height: 32px; "
                      >
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">No.{{idx+1}} 机房{{`${item.row}*${item.col}`}}</h4>
                      {{`我是一个${item.row}行${item.col}列的机房`}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">机房的机柜信息</h3>
            </div>
            <div class="panel-body">
              <form class="form">
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
                <button @click.prevent="store2Local" class="btn btn-info ml-5">存储方案</button>
              </form>
            </div>
          </div>
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
      cabinetObj: {},
      storeCenterData: [],

      // 机柜box样式
      cabinetColStyle: {},
      cabinetClasses: {}
    };
  },
  computed: {},
  mounted() {
    this.getAllCabinet();
    this.getCenterData();
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
    },

    // 获取已经配置好的机房配置信息
    getCenterData() {
      let centerData = JSON.parse(localStorage.getItem("centerData") || []);
      if (centerData.length > 0) {
        this.storeCenterData = centerData;
        this.cabinetObj = centerData[0];
        this.calcStyle(centerData[0].col)
      }
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

      this.cabinetObj.data = row;

      this.calcStyle(row[0].length);
    },

    // 计算样式
    calcStyle(roomCount) {
      let style = {};
      /**
       * 用90%的宽度去给每个机柜分配宽度
       * 用剩下的10%的宽度给你每个机柜设置左右边距，这样就能够居中显示。
       */
      style.width = `${(0.9 / roomCount) * 100}%`;
      style.height = `${style.width * 2}px`;
      style.margin = `0 ${(0.1 / 2 / roomCount) * 100}% 5px`;
      this.cabinetColStyle = style;
    },

    // 机柜box点击事件
    cabinetBoxClick(rowIdx, colIdx) {
      let item = this.cabinetObj.data[rowIdx][colIdx];
      if (item.filled) {
        return;
      }
      item.choose = !item.choose;
      item.classes = {
        choose: item.choose
      };
    },

    // 填充机柜
    fillCabinet() {
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

      this.cabinetObj.data.forEach(rowItem => {
        rowItem.forEach(item => {
          if (item.classes.choose) {
            item.info = chooseItem;
            item.filled = true;
            item.classes.choose = false;
          }
        });
      });
    },

    store2Local() {
      let data = JSON.parse(JSON.stringify(this.cabinetObj.data));
      if (data.length === 0) {
        this.$Notice.warning({
          title: "不能添加空数据！"
        });
        return;
      }

      let obj = {
        id: new Date().getTime(),
        row: this.cabinetObj.data.length,
        col: this.cabinetObj.data[0].length,
        data: data
      };

      let centerData = JSON.parse(localStorage.getItem("centerData")) || [];
      if (centerData.length === 0) {
        localStorage.setItem("centerData", JSON.stringify([obj]));
      } else {
        centerData = centerData.concat([obj]);
        localStorage.setItem("centerData", JSON.stringify(centerData));
      }

      this.getCenterData();
    },

    cabinetTypeClick(idx) {
      this.cabinetType.forEach((item, index) => {
        if (idx !== index) {
          item.choose = false;
        }
      });

      let item = this.cabinetType[idx];
      item.choose = !item.choose;
    },

    storeClick(item) {
      this.cabinetObj = item;
      this.calcStyle(item.col);
    }
  }
};
</script>

<style lang="less" scoped>
.ml-5 {
  margin-left: 5px;
}

.con {
  padding: 10px;

  .left {
    float: left;
    width: 200px;
    padding-right: 15px;

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

    .room-config{
      .media{
        margin: -5px -15px;
        padding: 5px 15px;
      }
      
      .active{
        background: #53b79e38;
      }
    }

    .operation {
      float: right;
      width: 200px;
    }
  }
}
</style>
