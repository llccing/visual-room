<template>
  <div class="drag-demo">
    <div id="columns" class="clearfix">
      <div class="column" draggable="true">
        <header>A</header>
      </div>
      <div class="column" draggable="true">
        <header>B</header>
      </div>
      <div class="column" draggable="true">
        <header>C</header>
      </div>
    </div>

    <div id="columns2">
      <div class="box" draggable="true">
        我是一个空盒子
      </div>
      <div class="box" draggable="true">
        我是一个空盒子
      </div>
      <div class="box" draggable="true">
        我是一个空盒子
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'drag',
  mounted(){
    let cols = document.querySelectorAll('#columns .column');
    let boxes = document.querySelectorAll('#columns2 .box');
    let all  = [...cols, ...boxes]
    
    all.forEach(item => {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    })
    
    let dragSrcEl = null;

    function handleDragStart(e){
      this.style.opacity = '0.4';

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move',
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e){
      if(e.preventDefault){
        e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';

      return false;
    }

    function handleDragEnter(e){

      // 拖拽只能从机柜到机房、或者机房到机房，不能机房到机柜。
      if(this.classList.contains('box')){
        this.classList.add('over')
      }
    }

    function handleDragLeave(e){
      this.classList.remove('over');
      this.style.opacity = '1'
    }

    function handleDrop(e){
      if(e.stopPropagation){
        e.stopPropagation();
      }

      if(dragSrcEl != this){

        // 控制只有box能够互相覆盖
        if( dragSrcEl.classList.contains('box')){
          dragSrcEl.innerHTML = this.innerHTML;
        }
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.classList.remove('over')
      }

      return false;
    }

    function handleDragEnd(e){
      cols.forEach(item => {
        item.classList.remove('over');
      })
    }

  },
}
</script>

<style lang="less" scoped>
.drag-demo{
  text-align: center;

  #columns{
    float: left;
    border: 1px solid #f78;
    padding: 20px;

    width: 250px;

    .column{
      float: left;
      width: 150px;
      border: 1px solid #87f;
      margin: 30px;
      padding: 10px 0;

      cursor: move;
    }

    .column.over{
      border: 2px dashed #000;
    }
  }

  #columns2{
    float: left;
    margin-left: 10px;
    width: 300px;
    border: 1px solid #f78;

    .box{
      float: left;
      width: 200px;
      margin: 10px;
      padding: 20px 0;
      border: 1px solid #34f;
    }
    .box.over{
      border: 2px dashed #000;
    }
  }
}
</style>

