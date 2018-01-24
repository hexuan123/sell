<template>
<div class="header" v-if="seller">
	<div class="content-wrapper" >
		<div class="avatar" >
			<img :src="seller.avatar">
		</div>
		<div class="content">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
			<div v-if="seller.supports" class="supports">
				<span class="icon" :class="iconClass[seller.supports[0].type]"></span>
				<span class="text">{{seller.supports[0].description}}</span>
			</div>
		</div>
		<div v-if="seller.supports" class="support-count">
			<span class="count">{{seller.supports.length}}个</span>
			<i class="el-icon-arrow-right" @click="opendetail"></i>
		</div>
	</div>
	<div class="bulletin-wrapper">
		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="el-icon-arrow-right"></i>
	</div>
	<div class="background">
		<img :src="seller.avatar">
	</div>
	<transition name="fade">
	<div class="detail" v-show="detailShow">
		<div class="detail-wrapper clearfix">
			<div class="detail-main">
				<h1 class="name">{{seller.name}}</h1>
				<div class="star-wrapper"><star :size="48" :score="seller.score"></star></div>
				<div class="title">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="supports-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="iconClass[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
				<div class="title">
					<div class="line"></div>
					<div class="text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletion">
					<p class="content">
						{{seller.bulletin}}
					</p>
				</div>	
			</div>
		</div>
		<div class="detail-close">
			<i class="el-icon-close" @click="closedetail"></i>
		</div>
	</div>
	</transition>
</div>
</template>
<script type="es6">
	import star from '@/components/star/star.vue'
export default{
	props: ['seller'],
	data(){
		return{
			 iconClass:["decrease","discount","special","invoice","guarantee"],
			 detailShow:false
		}
	},
	components:{
		star
	},
	methods:{
      opendetail:function(){
      	this.detailShow=true;
      },
      closedetail(){
      	this.detailShow=false;
      }
	}
}
</script>
<style lang="scss">
 @import "../../assets/common.scss";
  @import "../../assets/main_icon.scss";
.header{
	color:#fff;
	overflow: hidden;
	position: relative;
	background: rgba(7,17,27,0.2);
	.content-wrapper{
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0px;  
		.avatar{
			display: inline-block;
			vertical-align: top;
			img{
				width: 64px;
				height: 64px;
				border-radius: 2px;
			}
		}
		.content{
			display:inline-block;
			font-size: 14px;
			margin-left: 16px;
			.title{
				margin: 2px 0 8px 0;
				.brand{
					display:inline-block;
					vertical-align: top;
					width:30px;
					height:18px;
					background-image: url(images/brand@2x.png);
					background-size:30px 18px;
				}
				.name{
					margin-left:6px;
					font-size: 12px;
					line-height: 18px;
					font-weight: bold;
				}
			}
			.description{
				margin-bottom:10px;
				line-height:12px;
				font-size: 12px;
			}
			.supports{
				.icon{
					vertical-align:top;
					display:inline-block;
					margin-right: 4px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					height:12px;
					width:12px;
					&.decrease{
						@include bg-img("decrease_1"); 
					}
					&.discount{
						@include bg-img("discount_1");
					}
					&.special{
						@include bg-img("special_1");
					}
					&.invoice{
						@include bg-img("invoice_1");
					}
					&.guarantee{
						@include bg-img("guarantee_1");
					} 
				}
				.text{
					line-height:12px;
					font-size:10px;
					vertical-align:top;
				}
				
			}
		}
		.support-count{
			height: 20px;
			position: absolute;
			right: 12px;
			bottom: 18px;
			padding: 0 8px;
			height: 24px;
			line-height: 24px;
			border-radius: 14px;
			background: rgba(255,255,255,0.2);
			text-align: center;
			.count{
				font-size: 10px;
			}
			.el-icon-arrow-right{
				font-size: 10px;
			}
		}
	}
	.bulletin-wrapper{
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		background: rgba(7,17,27,0.2);
		.bulletin-title{
			display: inline-block;
			vertical-align: top;
			margin-top: 8px;
			width:22px;
			height:12px;
			@include bg-img("bulletin");
			background-size: cover;
			background-repeat: no-repeat;
		}
		.bulletin-text{
			vertical-align: top;
			margin: 0 4px;
            font-size: 10px;
			}
			.el-icon-arrow-right{
				position: absolute;
				font-size: 10px;
				right: 12px;
				top:8px;
			}
	}
	.background{
		position: absolute;
		left: 0px;
		top: 0px;
		height: 100%;
		width: 100%;
		z-index: -1;
		filter: blur(10px);
		img{
			height: 100%;
			width: 100%;
		}
	}
	.detail{
		position: fixed;
		z-index: 100;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: rgba(7,17,27,0.8);
		&.fade-enter {
		  opacity:0;
		}
		&.fade-leave{
		  opacity:1;
		}
		&.fade-enter-active{
		  transition:opacity .5s;
		}
		&.fade-leave-active{
		  opacity:0;
		  transition:opacity .5s;
		}
		.detail-wrapper{
			width:100%;
			min-height:100%;
			.detail-main{
			margin-top:64px;
			padding-bottom:64px;
			.name{
				line-height:16px;
				text-align:center;
				font-size:16px;
				font-weight:700;
			}
			.star-wrapper{
				margin-top:18px;
				padding:2px 0;
				text-align:center;
			}
			.title{
				display:flex;
				width:80%;
				margin:28px auto 24px auto;
				.line{
					flex:1;
					position:relative;
					top:-6px;
					border-bottom:1px solid rgba(255,255,255,0.2);
				}
				.text{
					padding:0 12px;
					font-size:14px;
					font-weight:700;
				}
			}
			.supports{
                width:80%;
                margin:0 auto;
                .supports-item{
                	padding:0 12px;
                	margin-bottom:12px;
                	font-size:0px;
                	&:list-child{
                		margin-bottom:0px;
                	}
                	.icon{
                		display:inline-block;
                		width:16px;
                		height:16px;
                		vertical-align:top;
                		margin-right:6px;
                		background-size:cover;
                		background-repeat:no-repeat;
                		&.decrease{ @include bg-img("decrease_2"); }
                		&.discount{ @include bg-img("discount_2"); } 
                		&.special{ @include bg-img("special_2"); }
                		&.invoice{ @include bg-img("invoice_2"); } 
                		&.guarantee{ @include bg-img("guarantee_2"); }
                	}
                	.text{
                		line-height:16px;
                		font-size:12px;
                	}
                }
			}
			.bulletion{
				width:80%;
				margin:0 auto;
				.content{
					padding:0 12px;
					line-height:24px;
					font-size:12px;
				}
			}
			}
		}
		.detail-close{
			position:relative;
			width:32px;
			height:32px;
			margin:-64px auto 0 auto;
			clear:both;
			font-size:32px;
		}	
	}
}	
</style>
