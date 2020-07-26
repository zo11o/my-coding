<template>
<div ref="fragment" class="fragment" :style="{ transform: `translate3d(0, ${translateY}px, 0)` }">
  <template v-for="item in currentViewList">
    <div :key="item.key">
      <!-- item content -->
    </div>
  </template>
</div>
</template>
