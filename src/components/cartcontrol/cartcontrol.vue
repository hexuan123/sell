<template>
<div class="cartcontrol">
<transition name="move">
<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
<i class="el-icon-remove-outline in_move"></i>
</div>
</transition>
<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
<div class="cart-add el-icon-circle-plus-outline" @click="addCart"></div>
</div>
</template>
<script type="es6">
import Vue from 'vue'
export default{	
	props:['food'],
	mounted(){
	
	},
	methods:{
		//避免电脑点击时会触发两次事件
		addCart(event){
			if(!event._constructed){
               return
			}
			if(!this.food.count){
				Vue.set(this.food,'count',1);//vue的特性为不存在的变量赋值方法
                this.food.count = 1;
			}else{
				this.food.count++;
			}
		},
		    decreaseCart(){
             if(!event._constructed){
               return
			}
			if(this.food.count){
				this.food.count--;
			}

		}
	}
};
</script>
<style lang="scss">
  .cartcontrol{
  	font-size:0px;
  	.cart-decrease{
  		display:inline-block;
  		padding:6px;
  		transition:all 0.4s linear;
  		&.move-enter,&.move-leave{
		  opacity:0;
		  transform:translate3d(24px,0,0);
		}
		&.move-enter-active,&.move-leave-active{
		  transition:all 0.5s linear;
		}
  		i{
  		font-size:24px;
  		line-height:24px;
  		color:rgb(0,160,220);
  		transition:all 0.4s linear;
  		}
  	}
  	.cart-count{
  		display:inline-block;
  		vertical-align:top;
  		width:12px;
  		padding-top:6px;
  		line-height:24px;
  		text-align:center;
  		font-size:10px;
  		color:rgb(147,153,159);
  	}
  	.cart-add{
  		display:inline-block;
  		font-size:24px;
  		line-height:24px;
  		padding:6px;
  		color:rgb(0,160,220);

  	}
  }
</style>