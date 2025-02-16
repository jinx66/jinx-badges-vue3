<!-- 在线调试 -->
<template>
  <WebComponent
    :link="link"
    :logo="logo"
    :leftText="leftText"
    :rightText="rightText"
    :leftColor="leftColor"
    :rightColor="rightColor"
    :logoColor="logoColor"
    :leftSize="leftSize"
    :rightSize="rightSize"
    :borderRadius="borderRadius"
    :logoWidth="logoWidth"
    :logoHeight="logoHeight"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import WebComponent from "./webComponent.vue";

const route = useRoute(); // 获取路由对象

// 使用 computed 来计算所有需要的值
const leftSize = computed(() => route.query.leftSize || "14px");
const rightSize = computed(() => route.query.rightSize || "14px");
const borderRadius = computed(() => route.query.borderRadius || "6px");
const logoWidth = computed(() => route.query.logoWidth || "20px");
const logoHeight = computed(() => route.query.logoHeight || "20px");
const link = computed(() => route.query.link || "");
const logo = computed(() => route.query.logo || "vuedotjs");
const leftText = computed(() => route.query.leftText || "creator");
const rightText = computed(() => route.query.rightText || "Jinx");
const leftColor = computed(() => route.query.leftColor || "#555");
const rightColor = computed(() => route.query.rightColor || "#4c1");
const logoColor = computed(() => route.query.logoColor || "#4c1");
</script>
