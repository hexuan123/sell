<template>
  <div class="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<h1 class="title">{{seller.name}}</h1>
  			<div class="desc">
  				<star :size="36" :score="seller.score"></star>
  				<span class="ext">({{seller.ratingCount}})</span>
  				<span class="text">{{seller.sellCount}}</span>
  			</div>
  			<ul class="remark">
  				<li class="block">
  					<h2>起送价</h2>
  					<div class="content">
  						<span class="stress">{{seller.minPrice}}<span>元</span></span>
  					</div>
  				</li>
  				<li class="block">
  					<h2>商家配送</h2>
  					<div class="content">
  						<span class="stress">{{seller.deliveryPrice}}<span>元</span></span>
  					</div>
  				</li>
  				<li class="block">
  					<h2>平均配送时间</h2>
  					<div class="content">
  						<span class="stress">{{seller.deliveryTime}}<span>分钟</span></span>
  					</div>
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script type="es6">
import star from '../components/star/star.vue'
import BScroll from 'better-scroll'
export default {
  name: 'Seller',
  props:['seller'],
  components:{
  	star
  }
}
</script>


<style lang="scss">

</style>