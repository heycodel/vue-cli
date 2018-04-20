<template>
    <div class="head">
        <div class="head-left" @click="back" >
            <b class="back-img"></b>
            <a href="javascript:;">{{message.back}}</a>
        </div>
        <div class="head-right" @click="tip" :class="message.right=='明细'?'orange':''">{{message.right}}</div>
        <div class="head-text">{{message.title}}</div>

    </div>
</template>
<script>
export default {
  props:['message'],
  data(){
      return{
          leftStyle:'leftStyle'
      }
  },
  mounted(){

  },
  methods:{
    back:function(){
      console.log('back');
      if(this.message.backFun&&typeof(this.message.backFun)=='function'){
        console.log(this.message.backFun)
        this.message.backFun();
      }
    },
    tip:function(){
      if(this.message.tipFun&&typeof(this.message.tipFun)=='function'){
        var _this = this;
        console.log(this.message.tipFun)
        _this.message.tipFun(_this);
      }
    }
  }
};
</script>
<style scoped>
.head {
  width: 100%;
  background-color: #393380;
  padding: 0.7rem 0.7rem 0.7rem 0.8rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  color: #fff;
  top: 0;
}
.head-left {
  width: 6rem;
  float: left;
  position: absolute;
  z-index: 10;
}
.head-right{
  width: 2rem;
  float: right;
  font-size:0.9rem;
  position: absolute;
  right: .5rem;
  z-index: 10;
}
.head-left a {
  line-height: 1.3rem;
  margin-left: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
}
.head-text {
  width: 100%;
  text-align: center;
  position: relative;
  font-size: 1rem;
  line-height: 1.3rem;
   z-index: 5;
}
.orange{
  color: orange;
}
.back-img {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  background-size: cover;
  float: left;
  background: url("../../../static/img/back.png") no-repeat 0 0;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .back-img {
    background: url("../../../static/img/back@2x.png") no-repeat 0 0;
    background-size: contain;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .back-img {
    background: url("../../../static/img/back@3x.png") no-repeat 0 0;
    background-size: contain;
  }
}
</style>
