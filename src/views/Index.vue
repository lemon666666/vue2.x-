<template>
  <div class="index">
    <!--1126px容器-->
    <div class="container">
      <!--轮播图+菜单-->
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-warp">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(sub,id) in item" :key="id">
                    <a :href="sub?'/product/'+sub.id:''">
                      <img :src="sub ? sub.img : require('./../assets/imgs/item-box-1.png')" alt="">
                      {{sub ? sub.name: '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/product/'+item.id"><img :src="item.img"></a>
          </swiper-slide>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
        </swiper>
      </div>
      <!--广告位-->
      <div class="ads-box">
        <a v-for="(item,index) in adsList" :key="index" href="" >
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <!--品牌位-->
      <div class="banner">
        <a href="" >
          <img src="./../assets/imgs/banner-1.png" alt="">
        </a>
      </div>
    </div>
    <!--产品位-->
      <div class="products-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/product/35"><img src="./../assets/imgs/mix-alpha.jpg" alt=""></a>
            </div>
            <div class="list-box">
              <div class="list" v-for="(arr,id1) in phoneList" :key="id1">
                <div class="item" v-for="(arr1,j) in arr" :key="j">
                  <span :class="{'new-pro': j%2==0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="arr1.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{arr1.name}}</h3>
                    <p>{{arr1.subtitle}}</p>
                    <p class="price" @click="addCart(arr1.id)">{{arr1.price}}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <service-bar></service-bar>
    <modal title="提示"
    sureText="查看购物车"
    btnType="1"
    modalType="middle"
    :showModal="showModal"
    @submit="goCarts"
    @cancel="cancel">
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from '../components/ServiceBar.vue'
import Modal from '../components/Modal.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data(){
    return{
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: true,
        loop: true,
        effect : 'cube',
        cube: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        }
      },
      slideList: [
        {
          id: '42',
          img: require('./../assets/imgs/slider/slide-1.jpg')
        },
        {
          id: '45',
          img: require('./../assets/imgs/slider/slide-2.jpg')
        },
        {
          id: '46',
          img: require('./../assets/imgs/slider/slide-3.jpg')
        },
        {
          id: '47',
          img: require('./../assets/imgs/slider/slide-4.jpg')
        },
        {
          id: '48',
          img: require('./../assets/imgs/slider/slide-5.jpg')
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: require('./../assets/imgs/item-box-1.png'),
            name: '小米CC9'
          },
          {
            id: 31,
            img: require('./../assets/imgs/item-box-2.png'),
            name: '小米8青春版'
          },
          {
            id: 32,
            img: require('./../assets/imgs/item-box-3.jpg'),
            name: 'Redmi K20 Pro'
          },
          {
            id: 33,
            img: require('./../assets/imgs/item-box-4.jpg'),
            name: '移动4G专区'
          },
        ],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
      ],
      adsList: [
        {
          id: 33,
          img: require('./../assets/imgs/ads/ads-1.png')
        },
        {
          id: 48,
          img: require('./../assets/imgs/ads/ads-2.jpg')
        },
        {
          id: 45,
          img: require('./../assets/imgs/ads/ads-3.png')
        },
        {
          id: 47,
          img: require('./../assets/imgs/ads/ads-4.jpg')
        }
      ],
      phoneList: [],
      showModal: false
    }
  },
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.axios.get('/api/products',{
        params: {
          categroyId: 10012,
          pageSize: 16
        }
      }).then(res => {
        this.phoneList = [res.list.slice(8,12), res.list.slice(12,16)]
        console.log(this.phoneList)
      })
    },
    addCart(id){
    this.axios.post('/api/carts',{
      productId: id,
      selected: true
    }).then(res => {
      this.showModal = true;
      this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
    }).catch(()=>{

    })
  },
  goCarts(){
    this.$router.push('/cart')
  },
  cancel(){
    this.showModal = false
  }
  },
  filters: {
    currency(val) {
      if(!val) return '0.00';
      return '￥' + val.toFixed(2) + '元';
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/scss/config.scss';
@import '~@/assets/scss/mixin.scss';
.index{
  .swiper-box{
    .nav-menu{
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-warp{
        .menu-item{
          height: 50px;
          line-height: 50px;
          a{
            display: block;
            position: relative;
            font-size: $fontI;
            color: #ffffff;
            padding-left: 30px;
            &:after{
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: '';
              @include bgImg(10px,15px,'~@/assets/imgs/icon-arrow.png')
            }
          }
          &:hover{
            background-color: $colorA;
            .children{
              display: block;
            }
          }
          .children{
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul{
              display: flex;
              justify-content: space-between;
              height: 75px;
              li{
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
                img{
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
                a{
                  color:$colorB;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container{
      height: 451px;
      img{
        width: 100%;
        height: 100%;
      }
      .swiper-button-prev{
        left: 274px;
      }
    }
  }
  .ads-box{
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a{
        width:296px;
        height: 167px;
      }
    }
    .banner{
      margin-bottom: 50px;
    }
    .products-box{
      background-color: $colorJ;
      padding: 30px 0 50px;
      h2{
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }
      .wrapper{
        display: flex;
        .banner-left{
          margin-right: 16px;
          img{
            width: 224px;
            height: 619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width: 986px;
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0;
            }
            .item{
              width: 236px;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                &.new-pro{
                  background-color: #7ecf68;
                }
                &.kill-pro{
                  background-color: #e82626;
                }
              }
              .item-img{
                img{
                  width: 100%;
                  height: 195px;
                }
              }
              .item-info{
                h3{
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p{
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price{
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  &:after{
                    @include bgImg(22px,22px,'~@/assets/imgs/icon-cart-hover.png');
                    content: '';
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
}
</style>
