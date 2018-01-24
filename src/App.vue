<template>
  <div id="app">
    <div class="header"><v-header :seller="seller"></v-header></div>
    <div class="tab">
    <div class="tab-item"><router-link to="/goods">商品</router-link></div>
    <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
    <div class="tab-item"><router-link to="/seller">商家123</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="es6">
import header from '@/components/header/header.vue'
import axios from 'axios'
const ERR_OK = 0
export default {
  name: 'App',
  data(){
    return{
      seller:{}
    }
  },
  components:{
    'v-header':header
  },
  mounted(){
    axios.get("/api/seller").then((reData)=>{
           this.seller = reData.data.data
    })
  }
}
</script>

<style>
#app .tab{
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
#app .tab .tab-item{
	flex: 1;
	text-align: center;
}
#app .tab .tab-item a{
  text-decoration: none;
  font-size: 14px;
  color:rgb(77,85,93);
}
#app .tab .tab-item a.router-link-active{
  color: rgb(240,20,20);
}
</style>

