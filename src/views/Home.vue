<template>
  <div class="home">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '@/components/public/Header'
import MyFooter from '@/components/public/Footer'
export default {
  name: 'home',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
