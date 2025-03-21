<template>
  <div class="app-logo" :class="size">
    <div class="logo-text">
      <div class="text-logo-line">Кицюня</div>
      <div class="text-logo-line">з</div>
      <div class="text-logo-line">зайчиком</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'normal', // 'normal', 'nav', 'header', 'login'
  }
});
</script>

<style scoped>
.app-logo {
  display: inline-block;
  text-align: center;
}

.logo-text {
  display: inline-block;
  line-height: 1;
  text-align: center;
}

.text-logo-line {
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 300;
  color: #2563eb; /* primary-600 колір */
}

/* Для головної навігації (компактний варіант, але не занадто маленький) */
.app-logo.nav .text-logo-line {
  font-size: 0.9rem;
  line-height: 1.1;
}

/* Для центрального заголовка */
.app-logo.header .text-logo-line {
  font-size: 2.5rem;
}

/* Для сторінки входу */
.app-logo.login .text-logo-line {
  font-size: 3rem;
}

/* Адаптивність для мобільних пристроїв */
@media (max-width: 640px) {
  .app-logo.nav .text-logo-line {
    font-size: 0.8rem;
  }
  
  .app-logo.header .text-logo-line {
    font-size: 2rem;
  }
  
  .app-logo.login .text-logo-line {
    font-size: 2.25rem;
  }
}
</style> 