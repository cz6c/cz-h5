<template>
  <nut-navbar
    v-if="$route.meta.title"
    :title="$t($route.meta.title as string)"
    :left-show="!!$route.meta.isBack"
    @on-click-back="goBack"
  />
  <div class="main-page">
    <RouterView v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
</template>

<script lang="ts" setup name="BasicLayoutPage">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss">
.nut-navbar {
  margin-bottom: 0;
  padding: 0;
}

.main-page {
  box-sizing: border-box;
  height: calc(100vh - 88px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
