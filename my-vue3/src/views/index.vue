<template>
  <section class="mainWrap" @scroll="onScroll($event)">
    <div class="wrap" v-for="(item, index) in datas" :key="index">
      <img src="../assets/logo.png" alt="">
      <div class="wrapContent">
        <p>{{item.name}}</p>
        <p>{{item.content}}</p>
      </div>
    </div>
  </section>
</template>

<script>
// import data from '../assets/index.json';
import { onMounted, reactive, toRefs } from 'vue';
import axios from 'axios';

export default {
  name: 'Home',
  setup(){
    const state = reactive({
      datas: [],
      isReachBottom: false,
      isLoadingComplete: false,
      reachBottomDistance: 100,

      currentIndex: 1
    })

    onMounted(() => {
      getDataList()
    })

    const getDataList = () => {
      // if(state.datas.length < data.length){
      //   state.datas = data.slice(0, state.currentIndex*10)
      //   console.log(state.datas.length, data.length)
      //   state.currentIndex++;
      // }
      if(!state.isLoadingComplete){
        axios.get(`/api/getList?page=${state.currentIndex}`).then(res =>{
          state.datas = res.data.list;
          if(state.currentIndex >= res.data.totalPage){
            state.isLoadingComplete = true;
          }
          state.currentIndex++
        }).catch(err =>{
          alert(err)
        })
      }
    }

    const onScroll = (e) => {
      let scrollTop = e.target.scrollTop
      let scrollHeight = e.target.scrollHeight
      let offsetHeight = Math.ceil(e.target.getBoundingClientRect().height)
      let currentHeight = scrollTop + offsetHeight + state.reachBottomDistance

      if(currentHeight < scrollHeight && state.isReachBottom){
        state.isReachBottom = false
      }
      if(state.isReachBottom){
        return
      }
      if (currentHeight >= scrollHeight) {
        state.isReachBottom = true
        getDataList()
      }
    }

    return{
      onScroll,
      ...toRefs(state)
    }
  }
}

</script>

<style lang="less" scoped>
.mainWrap{
  height: 100% !important;
  overflow-y: auto;

  .wrap{
    margin-bottom: 20px;

    img{
      width: 80px;
      height: 80px;
    }
    .wrapContent{
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
</style>
