<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-content">
  		<div class="overview">
  			<div class="overview-left">
  				<h1 class="score">{{seller.score}}</h1>
  				<div class="title">综合评分</div>
  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
  			</div>
  			<div class="overview-right">
  				<div class="score-wrapper">
  					<span class="title">服务态度</span>
  					<star :size="36" :score="seller.serviceScore"></star>
  					<span class="score">{{seller.serviceScore}}</span></div>
  				<div class="score-wrapper">
  					<span class="title">商品评分</span>
  					<star :size="36" :score="seller.foodScore"></star>
  					<span class="score">{{seller.foodScore}}</span>
  				</div>
  				<div class="delivery-wrapper">
  					<span class="title">送达时间</span>
  					<span class="text">{{seller.deliveryTime}}分钟</span>
  				</div>
  			</div>
  		</div>
  		<split></split>
  		<ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
  		<div class="rating-wrapper">
  			<ul>
  				<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
  					<div class="avatar">
  						<img :src="rating.avatar" style="width:28px;height:28px">
  					</div>
  					<div class="content">
  						<h1 class="name">{{rating.username}}</h1>
  						<div class="star-wrapper">
  							<star :size="24" :score="rating.score"></star>
  						    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
  						    </div>
  						    <p class="text">{{rating.text}}</p>
  						    <div class="recommend" v-show="rating.recommend || rating.recommend.length">
  						    	<span class="glyphicon glyphicon-thumbs-up"></span>
  						    	<span v-for="item in rating.recommend" class="item">{{item}}</span>
  						    </div>
  						   <div class="time">{{rating.rateTime | formatDate}}</div>
  						</div>
  					
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script style="es6">
import star from '../components/star/star.vue';
import split from '../components/split/split.vue'
import ratingselect from '../components/ratingselect/ratingselect.vue'
import {formatDate} from '../assets/date.js'
import axios from 'axios'
import BScroll from 'better-scroll'
        const POSITIVE = 0;
		const NEGATIVE = 1;
		const ALL = 2;
export default {
  name: 'Ratings',
  data(){
  	return{
  		ratings:{},
       showFlag:false,
        selectType:ALL,
        onlyContent:true,
  	}
  },
  filters:{
        	formatDate(time){
        		let date = new Date(time);
        		return formatDate(date, 'yyyy-MM-dd hh:mm');
        	}
        },
  mounted(){
    axios.get("/api/ratings").then((reData)=>{
           this.ratings = reData.data.data;
           this.$nextTick(()=>{
           	this.scroll = new BScroll(this.$refs.ratings,{click:true});
           });  
    })
  },
  methods:{
  	needShow(type,text){
        		if(this.onlyContent && !text){
        			return false;
        		}
        		if(this.selectType === ALL){
                     return true;
        		}else{
                    return type === this.selectType;
        		}
        	},
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
  },
  props:{
  	seller:{
			type:Object
			}
  },
  components:{
  	star,
  	split,
  	ratingselect
  }
}
</script>


<style lang="scss">
.ratings{
	position:absolute;
	top:174px;
	bottom:0px;
	width:100%;
	left:0px;
	overflow:hidden;
	.ratings-content{
        .overview{
        	display:flex;
        	padding:18px 0;
        	.overview-left{
        		flex:0 0 137px;
        		width:137px;
        		border-right:1px solid rgba(7,17,27,0.1);
        		text-align:center;
        		padding:6px 0;
        		@media only screen and (max-width:320px){
        		flex:0 0 120px;
        		width:120px;
        		}
        		.score{
        			line-height:28px;
        			font-size:24px;
        			color:rgb(255,153,0);
        			margin-bottom:6px;
        		}
        		.title{
        			margin-bottom:8px;
        			font-size:12px;
        			color:rgb(7,17,27);
        			line-height:36px;
        		}
        		.rank{
        			line-height:10px;
        			font-size:10px;
        			color:rgb(147,153,159);
        		}
        	}
        	.overview-right{
        		flex:1;
        		padding-top:8px;
        		padding-left:24px;
        		@media only screen and (max-width:320px){
        		padding-left:6px;
        		}
        		.score-wrapper{
        			margin-bottom:18px;
        			font-size:0px;
        			.title{
        				line-height:18px;
        				font-size:12px;
        				color:rgb(7,17,27);
        				vertical-align:top;
        				 display:inline-block;
        			}
        			.star{
        			 display:inline-block;
        			 margin:0 12px;
        			 vertical-align:top;
        			}
        			.score{
                     display:inline-block;
        			 font-size:12px;
        			 color:rgb(255,153,0);
        			 vertical-align:top;
        			 line-height:18px;
        			}
        		}
        		.delivery-wrapper{
        			font-size:0px;
        			.title{
        				line-height:18px;
        				font-size:12px;
        				color:rgb(7,17,27);
        				vertical-align:top;
        			}
        			.text{
        				font-size:12px;
        				color:rgb(147,153,159);
        				margin-left:12px;
        			}
        		}
        	}
        }
        .rating-wrapper{
        	padding:0 12px;
        	.rating-item{
        		display:flex;
        		padding:18px;
        		border-bottom:1px solid rgba(7,17,27,0.1);
        		.avatar{
        			flex:0 0 28px;
        			width:28px;
        			margin-right:12px;
        			img{
        				border-radius:50%;
        			}
        		}
        		.content{
        			flex:1;
        			position:relative;
        			.name{
        				margin-bottom:4px;
        				line-height:12px;
        				font-size:10px;
        				color:rgb(7,17,27);
        			}
        			.star-wrapper{
        				margin-bottom:6px;
        				font-size:0px;
        				.star{
        					vertical-align:top;
        				    display:inline-block;
        				    margin-right:6px;
        				}
        				.delivery{
        					vertical-align:top;
        				    display:inline-block;
        				    font-size:12px;
        				}
        			}
        			.text{
        				line-height:18px;
        				font-size:12px;
        				margin-bottom:8px;
        				color:rgb(7,17,27);
        			}
        			.recommend{
        				line-height:12px;
        				font-size:0px;
        				.glyphicon{
        					color:rgb(0,160,220);
        				}
        				.glyphicon,.item{
        					display:inline-block;
        					margin:0 8px 4px 0;
        					font-size:10px;
        				}
        				.item{
        					padding:6px 0;
        					border:1px solid rgba(7,17,27,0.2);
        					border-radius:1px;
        					color:rgb(147,153,159);
        					background:#fff;
        				}
        			}
        			.time{
        				position:absolute;
        				right:0px;
        				top:0px;
        			}	
        		}
        	}
        } 
	}
}
</style>