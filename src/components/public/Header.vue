<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" @click="login" v-if="!username">登录</a>
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="javascript:;" v-if="username" @click="goToOrder">我的订单</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                 <li class="product" v-for="(item, index) in productList" :key="index">
                  <a :href="'/product/'+ item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price}}元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>红米手机</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>小米电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data() {
    return {
      productList: []
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    cartCount() {
      return this.$store.state.cartCount
    }
  },
  mounted(){
    this.getProductList();
    if(this.$route.params && this.$route.params.from == 'login'){
      this.getCartCount();
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    goToOrder(){
      this.$router.push('/order/list')
    },
    getProductList() {
      this.axios.get('/api/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then(res => {
        if (res.list.length >= 6){
          this.productList = res.list.slice(0,6)
        }
      })
    },
    goToCart() {
      this.$router.push('/cart')
    },
     getCartCount(){
      this.axios.get('/api/carts/products/sum').then(res => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
    logout(){
      this.axios.post('/api/user/logout').then(res=>{
        this.$message.success('退出成功');
        this.$cookie.set('userId','',{expires: '-1'});
        this.$store.dispatch('saveUserName','');
        this.$store.dispatch('saveCartCount','0');
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/base.scss';
@import '~@/assets/scss/config.scss';
.header {
  .nav-topbar {
    line-height: 39px;
    height: 39px;
    background-color: $colorB;
    color: #b0b0b0;
    .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
      display: inline-block;
      color: #b0b0b0;
      margin-right: 17px;
    }
    .my-cart{
      width: 110px;
      background-color: $colorA;
      color: #fff;
      text-align: center;
      .icon-cart{
        display: inline-block;
        @include bgImg(16px,12px,'~@/assets/imgs/icon-cart-checked.png');
        margin-right: 10px;
      }
    }
  }
  }
  .nav-header{
    .container{
      position: relative;
       height: 112px;
      @include flex();
      .header-menu{
        width: 642px;
        display: inline-block;
        .item-menu {
          display: inline-block;
          color: $colorB;
          font-weight: bold;
          font-size: $fontI;
          line-height: 112px;
          margin-right: 20px;
          span{
            cursor: pointer;
            }
          &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
              }
          }
          .children{
              content: '';
              position: absolute;
              top: 112px;
              left: 0;
              width: 1126px;
              height: 0;
              opacity: 0;
              overflow: hidden;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0px 7px 6px 0px rgba($color: #000000, $alpha: 0.11);
              z-index: 10;
              background: #ffffff;
              transition: all .2s;
              .product{
                position: relative;
                float: left;
                height: 220px;
                width: 16.6%;
                line-height: 12px;
                text-align: center;
                font-size: $fontK;
                background: #fff;
                &:before{
                  content: '';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  border-left: 1px solid $colorF;
                  height: 100px;
                  width: 1px;
                  }
                &:last-child::before{
                  display: none;
                }
                a{
                  display: inline-block;
                  .pro-img{
                    height: 137px;
                  }
                  .pro-name{
                    font-weight: bold;
                    margin-top: 19px;
                    margin-bottom: 8px;
                    color: $colorB;
                  }
                  .pro-price{
                    color: $colorA;

                  }
                }
                img{
                  height:111px;
                  width: auto;
                  margin-top: 26px;
                }
              }
        }
    }
      }
      .header-search{
        width: 319px;
        .wapper{
          height: 50px;
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          input{
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            border: none;
            padding-left: 10px;
            box-sizing: border-box;
          }
          a{
            @include bgImg(18px,18px,'~@/assets/imgs/icon-search.png');
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
