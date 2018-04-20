<template>
  <div>
    <router-link to="/">首页</router-link><br>
    <div id="mescroll" class="mescroll">
      <ul id="dataList" class="data-list">
        <li class="list-item" @click="gotodetail(pd)" v-for="pd in pdlist">
          {{pd}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import common from '../utils/common.js'
  export default {
    data () {
      return {
        mescroll: null,
        pdlist: [],
        icon: "",
      }
    },
    mounted:function(){
      var self = this;
      //拿到对应页面的请求参数
      //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
      //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;

      self.mescroll = new MeScroll("mescroll", {
        up: {
          callback: self.upCallback, //上拉回调
          //以下参数可删除,不配置
          page: {
            size: 4
          }, //可配置每页8条数据,默认10
          toTop: { //配置回到顶部按钮
            src: this.src, //默认滚动到1000px显示,可配置offset修改
            //offset : 1000
          },
          empty: { //配置列表无任何数据的提示
            warpId: "dataList",
            icon: this.icon,
            tip: "",
          }
        }
      });
    },
    methods: {
      again :function(pd){
        if ('android'==common.getSystemType()){
          javascript:myjavascript.Next_single(pd.delv_id);
        }else {
          Next_single(pd.delv_id);
        }
      },
      gotodetail: function(pd) {
        this.$router.push({path: '/orderdetail',query:{seq_id:pd.seq_id,odr_stat:pd.odr_stat,com_nm:pd.com_nm,usr_id:this.$route.query.usr_id}});
      },
      upCallback: function(page) {
        //联网加载数据
        var self = this;
        this.getListDataFromNet(page.num, page.size, function(data) {
          //data=[]; //打开本行注释,可演示列表无任何数据empty的配置
          //如果是第一页需手动制空列表
          if(page.num == 1) self.pdlist = [];
          var arr = self.pdlist;
          arr.push.apply(arr, data);
          console.log(self.pdlist);
          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          //传参:数据的总数; mescroll会自动判断列表是否有无下一页数据,如果数据不满一页则提示无更多数据;
          self.mescroll.endSuccess(data.length);
        }, function() {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          self.mescroll.endErr();
        });
      },
      getListDataFromNet: async function(pageNum, pageSize, successCallback, errorCallback) {
        var _this = this;
        let params = {
          "action": 'ydyp.app.orderList',
          "version": 'V1.0',
          "data": JSON.stringify({
            "usr_id":"18316666666",
            "page_no":pageNum,
            "page_size":pageSize,
            "odr_stat": "待确认"
          })
        };
        const res = await this.http.post(params)
        if(res.success) {

          var a = 0;
          var listData = []; //模拟分页数据
          for(var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
            if(i == res.body.result.total) break;
            listData.push(res.body.result.data[a]);
            a++;

          }
          successCallback && successCallback(listData); //成功回调
        } else {
          errorCallback && errorCallback() //失败回调
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
  .top{
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .mescroll {
    margin-top: 10px;
  }
  .list-item{
    position: relative;
    background: #FFFFFF;
    display: flex;
    border-bottom: 8px solid rgb(242,242,242);
  }
  .left{
    text-align: left;
    flex: 2;
    margin-left: 20px;
  }
  .item-info{
    font-size: 12px;
  }
  .trans_status{
    float: right;
    margin-right: 10px;
    font-size: 14px;
    color: red;
  }
  .mescroll {
    position: fixed;
    top: 93px;
    bottom: 0;
    height: auto;
    box-sizing: border-box;
    background:rgb(242,242,242);
  }
  .list-item img{
    vertical-align: text-top;
    width: 12px;
  }
  .list-item span{
    margin-left: 3px;
  }
  .again{
    width: 25%;
    height: 25px;
    line-height: 25px;
    position: absolute;
    right: 20px;
    bottom: 10px;
    font-size: 14px;
    background: -webkit-linear-gradient(left,  #f18501 , #fec844); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f18501, #fec844); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right,  #f18501, #fec844); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right,#f18501, #fec844);
    color: #fff;
    border-radius: 40px;
  }
</style>
