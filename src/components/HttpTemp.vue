<template>
  <div class="hello">
      <router-link to="/">返回首页</router-link>
      <p>这个组件是调用接口的</p>

      <button @click="alertFun">点我弹框</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted(){
      this.fastSearch();
    },
    methods:{
      alertFun:function(){
        alert(3);
      },
      fastSearch:async function(){
        let params = {
          "action":'yqt.app.fastSearch',
          "version":'V1.0',
          "req_time":new Date().getTime(),
          "data":JSON.stringify({
            "address":"123456789"
          })
        };
        const res = await this.http.post(params);
        alert(res.success);
        console.log(res);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
