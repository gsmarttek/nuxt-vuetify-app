<template>
  <v-main>
    <v-container>
      <Carousel />

      <v-card-text class="mt-10 mb-12 text-center">
        <h1 :class="themeH1" style="font-size: 2em">Welcome To OLA Hospital</h1>
        <div class="d-flex justify-center">
          <p style="width: 70%; color: #888">
            This is the home page of the OLA Hospital Application, Please select
            an item from the main menu above or explore the Patient Information,
            Laboratory Results, Pharmacy, and Consultation bellow for more
            access.
          </p>
        </div>
      </v-card-text>

      <Services />
    </v-container>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";

// definePageMeta({
//   middleware: "auth",
// });

const theme = useTheme();

const themeH1 = computed(() =>
  theme.global.name.value === "dark" ? "h1-dark-color" : "h1-light-color"
);
</script>

<style scoped>
.top {
  margin-top: 100px;
}
.text {
  margin-top: -40px;
  margin-left: 80px;
}
.top-day {
  margin-top: 120px;
}
.h1-light-color {
  color: #4e6593;
}
.h1-dark-color {
  color: #dce0e7;
}
</style>
