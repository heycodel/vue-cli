<template>
    <div class="box">
        <ul class="objectPay">
            <li :class="active0" @click="active('active0')">全部<i></i></li>
            <li :class="active1" @click="active('active1')">支出<i></i></li>
            <li :class="active2" @click="active('active2')">收入<i></i></li>
        </ul>
    </div>
  
</template>
<script>
export default {
    data(){
        return{
           active0:'active',
           active1:'',
           active2:'',
        }
    },
    methods:{
        active:function(index){
            this.active0 = this.active1 =this.active2 = '';
            this[index] = 'active';
        }
    }
}
</script>
<style scoped>
    .objectPay{
        width: 100%;
        height:4.25rem;
        background-color: #f4f4f4;      
        padding:1.3rem 0;
        box-sizing: border-box;
    }
    .objectPay li{
        float: left;
        width:4rem;
        line-height: 1.5rem;
        text-align: center;
        background: #fff;
        margin-left: 0.7rem;
        font-size:.65rem; 
        border:1px solid #e5e5e5;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
    }
    .objectPay .active i{
        display: block;
        width: .7rem;
        height: 0.7rem;
        position: absolute;
        right: 0;
        bottom: -2px;
        background:url('../../../static/img/select.png') no-repeat 0 0;
        background-size: cover;
    }
    .objectPay .active{
        color:#403cab;
        border: 1px solid #403cab;
    }

     .box{
        width: 100%;
        position: absolute;
        top: 4.9rem;
        bottom: 0;
        background-color:rgba(0, 0, 0, 0.3) 
    }
</style>
