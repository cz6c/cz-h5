<template>
  <div class="intro-header">
    <div>{{ $t("introduction") }}</div>
  </div>
  <nut-cell-group :title="$t('home.cssMultiLanguage')" class="supportList">
    <nut-cell>
      <div :class="['btn-confirm', locale]"></div>
    </nut-cell>
  </nut-cell-group>
  <div class="btn-wrap">
    <nut-button shape="square" size="small" type="default" @click="changeLang('zh-cn')">
      {{ $t("language.zh") }}
    </nut-button>
    <nut-button shape="square" size="small" type="default" @click="changeLang('en-us')">
      {{ $t("language.en") }}
    </nut-button>
  </div>
  {{ getUserInfo }}
</template>

<script lang="ts" setup name="HomePage">
import { computed } from "vue";
import { useUserStore } from "/@/store/modules/user";
import { setLang } from "/@/i18n";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const userStore = useUserStore();
const getUserInfo = computed(() => {
  const { name = "" } = userStore.getUserInfo || {};
  return name;
});

const changeLang = type => {
  setLang(type);
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 40px;
  img {
    width: 90px;
    height: 90px;
  }
}

.intro-header {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.supportList {
  margin: 0 16px;

  .nut-cell-group__title {
    margin-top: 30px;
  }
}

.btn-wrap {
  margin: 20px;
}
.btn-confirm {
  @include main-lang-bg(302px, 82px, "/@/assets/button", "confirm.png");
}
</style>
