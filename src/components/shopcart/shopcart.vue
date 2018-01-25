<template>
	<div class="shopcart">
		<div class="content" @click="togalllist">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="el-icon-sold-out" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount">
					{{totalCount}}
					</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payclass">
					{{payDesc}}
				</div>
			</div>
		</div>
		
		<div v-show="listshow1" class="shopcart-wrapper">
		<div class="shopcart-list" v-show="listshow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent" @click="aaaa">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                         </div>
					</li>
				</ul>
			</div>
		</div>
		</div>
		
	</div>
</template>
<script type="es6">
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
	export default{
		props:{
			selectFoods:{
             type:Array,
             default:function(){
             	return [
             	   
             	];
             }
		},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				listshow1:false
			}
		},
		methods:{
			togalllist(){
				this.listshow1=!this.listshow1
			},
			aaaa(){
				alert(1);
			}
		},
		components:{
			cartcontrol
		},
		mounted(){
		},
		computed:{
		//计算商品的总价格 
		totalPrice(){
			let total = 0;
			this.selectFoods.forEach((food) => {
				total += food.price * food.count;
			});
			return total;
		},
		//选择商品的数量
		totalCount(){
			let count =0;
			this.selectFoods.forEach((food)=>{
				count += food.count
			});
			return count;
		},
		//商品送货描述
		payDesc(){
			if(this.totalPrice === 0){
				return `￥${this.minPrice}元起送`;
			}else if(this.totalPrice<this.minPrice){
				let diff = this.minPrice-this.totalPrice
				return `还差￥${diff}元起送`;
			}else{
				return '去结算';
			}
		},
		//计算结算按钮在不同状态的样式
		payclass(){
			if(this.totalPrice<this.minPrice){
				return 'not-enough';
			}else{
				return 'enough';
			}
		},
		//购物车展开
		listshow(){
			if(this.totalCount){
				let listshow = true;
				return listshow;
				if(listshow){
					this.$nextTick(()=>{
						this.scroll = new BScroll(this.$refs.listContent,{
							click:true
						});
					});
				}
			}else {
				let listshow = false;
				return listshow;
			}		
		}
	}
	
	}
</script>
<style lang="scss">
	.shopcart{
		position:fixed;
		left:0xp;
		bottom:0px;
		z-index:50;
		width:100%;
		height:48px;
		.content{
			display:flex;
			background:#141d27;
			font-size:0px;
			.content-left{
				flex:1;
				.logo-wrapper{
					display:inline-block;
					position:relative;
					top:-10px;
					margin:0 12px;
					padding:6px;
					width:56px;
					height:56px;
					box-sizing:border-box;
					vertical-align:top;
					border-radius:50%;
					background:#141d27;
					.logo{
						width:100%;
						height:100%;
						vertical-align:top;
					    border-radius:50%;
					    background:#2b343c;
					    text-align:center;
					    &.highlight{
					    	background:rgb(0,160,220);
					    }
					    i{
					    	font-size:24px;
					    	color:#80858a;
					    	line-height:44px;
					    	&.highlight{
					    	color:#fff;
					    }
					    }
					}
					.num{
						position:absolute;
						top:0px;
						right:0px;
						width:24px;
						height:16px;
						line-height:16px;
						text-align:center;
						border-radius:16px;
						font-size:9px;
						font-weight:400;
						color:#fff;
						background:rgb(240,20,20);
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
					}
				}
				.price{
                    display:inline-block;
                    vertical-align:top;
                    line-height:24px;
                    margin-top:12px;
                    box-sizing:border-box;
                    padding-right:12px;
                    border-right:1px solid rgba(255,255,255,0.1);
                    font-size:16px;
                    font-weight:700;
                    color:rgba(255,255,255,0.4);
                    &.highlight{
					    color: #fff;
					    }
				}
				.desc{
                   display:inline-block;
                   vertical-align:top;
                    line-height:24px;
                    margin:12px 0 0 12px;
                    font-size:10px;
                    color:rgba(255,255,255,0.4);
				}
			}
			.content-right{
				flex:0 0 105px;
				width:105px;
				.pay{
					height:48px;
					line-height:48px;
					text-align:center;
					font-size:12px;
					color:rgba(255,255,255,0.4);
					font-weight:700;
					background:#2b333b;
					&.not-enough{
						background:#2b333b;
					}
					&.enough{
						background:#00b43c;
						color:#fff;
					}
				}
			}}
		.shopcart-wrapper{
			position:absolute;
			width:100%;
			bottom:100%;
         .shopcart-list{
			position:relative;
			top:0px;
			left:0px;
			z-index:-1;
			width:100%;
			.list-header{
				height:40px;
				line-height:40px;
				padding:0 18px;	
				background:#f3f5f7;			
				border-bottom:1px solid rgba(7,17,27,0.1);
				.title{
					float:left;
					font-size:14px;
					color:rgb(7,17,27);
				}
				.empty{
					float:right;
					font-size:12px;
					color:rgb(0,160,220);
				}

			}
			.list-content{
				paddin:0 18px;
				max-height:217px;
				background:#fff;
				overflow:hidden;
				.food{
					position:relative;
					padding:12px;
					box-sizing:border-box;
					border-bottom:1px solid rgba(7,17,27,0.1);
					.name{
						line-height:24px;
						font-size:14px;
						color:rgb(7,17,27);
					}
					.price{
						position:absolute;
						right:90px;
						bottom:12px;
						line-height:24px;
						font-size:14px;
						font-weight:700;
						color:rgb(240,20,20);
					}
					.cartcontrol-wrapper{
						position:absolute;
						right:0;
						bottom:6px;
					}
				}
			}
		}
		}
	}
</style>