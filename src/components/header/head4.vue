<template>
    <div class="head">
        <div class="head-left" @click="back" >
            <a href="javascript:;">{{message.back}}</a>
        </div>
        <div class="head-right" @click="tip" >{{message.right}}</div>
        <div class="head-text">{{message.title}}</div>
        
    </div>
</template>
<script>
export default {
  props:['message'],
  data(){
      return{

      }
  },
  mounted(){
     
  },
  methods:{
    back:function(){
      if(typeof(this.message.backFun)=='function'){
        console.log(this.message.backFun)
        var _this = this;
        this.message.backFun(_this);
      }
    },
    tip:function(){
      if(typeof(this.message.tipFun)=='function'){
        console.log(this.message.tipFun)
        var _this = this;
        this.message.tipFun(_this);
        try {
           this.$emit('tip');
        } catch (error) {
          
        }
       
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
  position: absolute;
  color: #fff;
}
.head-left {
  width: 6rem;
  float: left;
  position: absolute;
  z-index: 10;
}
.head-right{
  width: 4rem;
  float: right;
  font-size:0.9rem; 
  position: absolute;
  right: .5rem;
  z-index: 10;
  color: orange;
}
.head-left a {
  line-height: 1.3rem;
  margin-left: 0.5rem;
  color: orange;
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

.back-img {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  background-size: cover;
  float: left;
  background: url("../../../static/img/back-1.png") no-repeat 0 0;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .back-img {
    background: url("../../../static/img/back-1@2x.png") no-repeat 0 0;
    background-size: contain;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .back-img {
    background: url("../../../static/img/back-1@3x.png") no-repeat 0 0;
    background-size: contain;
  }
}
</style>
