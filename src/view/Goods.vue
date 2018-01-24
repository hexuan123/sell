<template>
	<div class="goods">
<!-- 左边菜单栏开始 -->
  <div class="menu-wrapper">
  	<ul>
  		<li v-for="item in goods" class="menu-item">
  			<span class="text">
  				<span v-show="item.type>0" class="icon" :class="iconClass[item.type]"></span>{{item.name}}
  			</span>
  		</li>
  	</ul>
  </div>
  <!-- 左边菜单栏结束 -->


<!-- 右边食品开始 -->
  <div class="foods-wrapper">
  	<ul>
  		<li v-for="item in goods" class="food-list">
  			<h1 class="title">{{item.name}}</h1>
  			<ul>
  				<li v-for="food in item.foods" class="food-item">
  					<div class="icon">
  						<img :src="food.icon">
  					</div>
  					<div class="content">
  						<h2 class="name">{{food.name}}</h2>
  						<p class="desc">{{food.description}}</p>
  						<div class="extra">
  							<span class="count">月售{{food.sellCount}}份</span>
  							<span>好评率{{food.rating}}%</span>
  						</div>
  						<div class="price">
  							<span class="now">￥{{food.price}}</span>
  							<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  						</div>
  					</div>
  				</li>
  			</ul>
  		</li>
  	</ul>
  </div>
  <!-- 右边食品结束 -->
  </div>
</template>

<script type="es6">
import axios from 'axios'
export default {
  name: 'Goods',
  //把商家信息获取
  props:['seller'],
  data(){
  	return{
        goods:{},
        iconClass:["decrease","discount","special","invoice","guarantee"],
  	}
  },
  mounted(){
  	//通过axios获取商品信息
    axios.get("/api/goods").then((reData)=>{
           this.goods = reData.data.data
    })
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
			width:56px;
			line-height:14px;
			padding:0 12px;
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
				     &.count{
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
					}
				}
			}
		}
	}
}
</style>