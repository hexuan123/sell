<template>
	<div class="goods">
<!-- 左边菜单栏开始 -->
  <div class="menu-wrapper" ref="menuWrapper">
  	<ul>
  		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
  			<span class="text">
  				<span v-show="item.type>0" class="icon" :class="iconClass[item.type]"></span>{{item.name}}
  			</span>
  		</li>
  	</ul>
  </div>
<!-- 右边食品开始 -->
  <div class="foods-wrapper" ref="foodsWrapper">
  	<ul>
  		<li v-for="item in goods" class="food-list food-list-hook">
  			<h1 class="title">{{item.name}}</h1>
  			<ul>
  				<li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
  					<div class="icon">
  						<img :src="food.icon">
  					</div>
  					<div class="content">
  						<h2 class="name">{{food.name}}</h2>
  						<p class="desc">{{food.description}}</p>
  						<div class="extra">
  							<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
  						</div>
  						<div class="price">
  							<span class="now">￥{{food.price}}</span>
  							<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  						</div>
              <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
              </div>
  					</div>

  				</li>
  			</ul>
  		</li>
  	</ul>
  </div>
<!-- 购物车模板开始 -->
<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
<!-- 商品详情 -->
<food :food="selectedFood" ref="food"></food>
  </div>


</template>

<script type="es6">
import shopcart from '../components/shopcart/shopcart.vue'
import cartcontrol from '../components/cartcontrol/cartcontrol.vue'
import food from '../components/food/food.vue'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'Goods',
  //把商家信息获取
  props:['seller'],
  data(){
  	return{
        goods:[],
        iconClass:["decrease","discount","special","invoice","guarantee"],
        ListHeight:[],
        scrollY:0,
        selectedFood:{}
  	}
  },
  computed:{
     currentIndex(){
     	for(let i =0;i<this.ListHeight.length;i++){
     		let height1 = this.ListHeight[i];
     		let height2 = this.ListHeight[i + 1];
     		if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
     			return i;
     		}
     	}
     	return 0;
     },
     selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        });
      });
      return foods;
     }
  },
  mounted(){
  	//通过axios获取商品信息
    axios.get("/api/goods").then((reData)=>{
           this.goods = reData.data.data;
           this.$nextTick(() => {
           	 this.initScroll();//模拟手机滚动插件
           	 this.calculateHeight();//计算每个商品类的高度
           });         
    })
  },
  methods:{
  	selectMenu(index,event){
  		if(!event._constructed){
  			return;
  		}
  		else{
  			let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
  			let el = foodList[index];
  			this.foodsScroll.scrollToElement(el,300);
  		}
  		},
  	initScroll(){
  		//better scroll插件的使用 vue2.0获取节点是refs方法
  		this.menuScroll = new BScroll(this.$refs.menuWrapper,{
  			click:true//better scroll插件需要加上，点击事件才能触发
  		});
  		this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
  			click:true,probeType:3
  		});
  		this.foodsScroll.on('scroll',(pos)=>{
  			this.scrollY = Math.abs(Math.round(pos.y));
  		});
  	},
  	calculateHeight(){
  		//获取到每个li
  		let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
  		let height =0;
  		//在定义的各个高度数值ListHeight里面push各个LI的高度
  		this.ListHeight.push(height);
  		for(let i=0;i<foodList.length;i++){
  			let item = foodList[i];
  			height += item.offsetHeight;
  		    this.ListHeight.push(height);
  		}
  	},
    selectFood(food,event){
        if(!event._constructed){
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components:{
  	shopcart,
    cartcontrol,
    food
  }
  
}
</script>


<style lang="scss">
@import "../assets/common.scss";
@import "../assets/main_icon.scss";
.goods{
	display:flex;
	position:absolute;
	top:180px;
	width:100%;
	bottom:46px;
	overflow:hidden;
	.menu-wrapper{
		flex:0 0 80px;
		width:80px;
		background:#f3f5f7;
		.menu-item{
			display:table;
			height:54px;
			width:94px;
			line-height:14px;
			padding:0 12px;
			&.current{
				position:relative;
				margin-top:-1px;
				z-index:10;
				background:#fff;
				font-weight:700;
				.text{
					border-bottom:none;
				}
			}
			.icon{
				display:inline-block;
                width:12px;
                height:12px;
                vertical-align:top;
                margin-right:2px;
                background-size:cover;
                background-repeat:no-repeat;
				&.decrease{ @include bg-img2("decrease_3");}
                &.discount{ @include bg-img2("discount_3");} 
                &.special{ @include bg-img2("special_3");}
                &.invoice{ @include bg-img2("invoice_3");} 
                &.guarantee{ @include bg-img2("guarantee_3");}
			}
			.text{
				font-size:12px;
				display:table-cell;
				vertical-align:middle;
				width:56px;
				border-bottom:1px solid rgba(7,17,27,0.1);
			}
		}
	}
	.foods-wrapper{
		flex:1;
		.title{
			padding:0 14px;
			height:26px;
			line-height:26px;
			border-left:1px solid #d9dde1;
			font-size:12px;
			color:rgb(147,153,159);
			background:#f3f5f7;
		}
		.food-item{
      position:relative;
			display:flex;
			margin:18px;
			padding-bottom:18px;
			border-bottom:1px solid rgba(7,17,27,0.1);
			&:last-child{
				border-bottom:none;
				margin-bottom:0px;
			}
			.icon{
				flex:0 0 57px;
				margin-right:10px;
				img{
					width:57px;
					height:57px;
				}
			}
			.content{
				flex:1;
        
				.name{
					margin:2px 0 8px 0;
					height:14px;
					line-height:14px;
					font-size:14px;
					color:rgb(7,17,27);
				}
				.desc .extra{ 
                     line-height:10px;
                     height:10px;
                     color:rgb(147,153,159);
				}
				.desc{
					margin-bottom:8px;
				}
				.extra{
				     .count{
                        margin-right:12px;
				     }
				}
				.price{
					font-weight:700;
					line-height:24px;
					.now{
						margin-right:8px;
						font-size:14px;
						color:rgb(240,20,20);
					}
					.old{
						text-decoration:line-through;
						font-size:10px;
						color:rgb(147,153,159);
					}}
        .cartcontrol-wrapper{
          position:absolute;
          right:0px;
          bottom:12px;          
        }
			}
		}
	}
}
</style>