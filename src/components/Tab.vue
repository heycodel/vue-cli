<template>
  <div class="hello">
    <router-link to="/HttpTemp">弹框和接口</router-link><br>
    <router-link to="/ScrollList">分页列表</router-link><br>
    <router-link to="/Tab">选项卡</router-link><br>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
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
