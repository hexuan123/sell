<!-- 商品评价组件 -->
<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<!-- 字体图标 -->
			<span class="el-icon-success"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="es6">
        const POSITIVE = 0;
		const NEGATIVE = 1;
		const ALL = 2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
                type:Number,
                default:ALL
			},
			onlyContent:{
				type:Boolean,
				default :false
			},
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		computed:{
			//监听过滤数据类型
			positive(){
			return this.ratings.filter((rating)=>{
                  return rating.rateType === POSITIVE;
			});	
			},
			negative(){
				return this.ratings.filter((rating)=>{
                  return rating.rateType === NEGATIVE;
			});	
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.selectType = type;
				this.$dispatch('ratingtype.select',type);
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$dispatch('content.toggle',this.onlyContent);
			}
		}
	}
</script>
<style lang="scss">
	.ratingselect{
		.rating-type{
			padding:18px 0;
			margin:0 18px;
			border-bottom:1px solid rgba(7,17,27,0.1);
			font-size:0px;
			.block{
				display:inline-block;
				padding:8px 12px;
				border-radius:1px;
				margin-right:8px;
                color:#fff;
                color:rgb(77,85,93);
                font-size:12px;
                &.active{
                	color:#fff;
                	}
                .count{
                	font-size:8px;
                	margin-left:2px;
                	line-height:16px;
                }
                &.positive{
                	background:rgba(0,160,220,0.2);
                	&.active{
                		background:rgb(0,160,220);
                	}
                }
                &.negative{
                    background:rgba(77,85,93,0.2);
                    &.active{
                		background:rgb(77,85,93);
                	}
                }               
			}
		}
		.switch{
			padding:12px 18px;
			line-height:24px;
			border-bottom:1px solid rgba(7,17,27,0.2);
			color:rgb(147,153,159);
			font-size:0px;
			&.on{
				.el-icon-success{
					color:#00c850;
				}
			}
			.el-icon-success{
				display:inline-block;
				margin-right:4px;
				font-size:24px;
				vertical-align:top;
			}
			.text{
				font-size:12px;
				vertical-align:top;
				display:inline-block;
			}
		}
	}  
</style>