<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<i class="el-icon-sold-out"></i>
					</div>
				</div>
				<div class="price">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay">
					￥{{minPrice}}起送
				</div>
			</div>
		</div>
	</div>
</template>
<script type="es6">
	export default{
		selectFoods:{
             type:Array,
             default(){
             	return [
             	{price:10,count:1}
             	];
             }
		},
		props:{
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{ 
		totalPrice(){
			let total = 0;
			this.selectFoods.forEach((food) => {
				total += food.price * food.count;
			});
			return total;
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
					    i{
					    	font-size:24px;
					    	color:#80858a;
					    	line-height:44px;

					    }
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
					background:#2b333b
				}
			}
		}
	}
</style>