<template>
  <div class="loading-screen">
    <v-progress-circular indeterminate color="primary" size="64" />
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  color: #000;
  flex-direction: column;
}

p {
  margin-top: 20px;
  font-size: 18px;
}
</style>
