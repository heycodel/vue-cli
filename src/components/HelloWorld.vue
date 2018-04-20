<template>
  <div class="hello">
      <v_head :message='title' />
      <router-link to="/HttpTemp">弹框和接口</router-link><br>
      <router-link to="/ScrollList">分页列表</router-link><br>
      <router-link to="/Tab">选项卡</router-link><br>
  </div>
</template>

<script>
  import v_head from './header/head'
export default {
  name: 'HelloWorld',
  components:{
    v_head
  },
  data () {
    return {
      'title':{
        'title':'签收扫描表',
        'back':'返回',
        'right':'日期选择',
        'backFun':function(){
          alert(2);
        }

      },
    }
  },
  mounted(){

  },
  methods:{

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
