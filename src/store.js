/**
 * Created by Administrator on 2018/4/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  queryNet:{}

}

const mutations = {
  setQuerynet(state,data){
    state.queryNet=data;
    console.log(state.time)
  }
}
export default new Vuex.Store({
  state,
  mutations
})
