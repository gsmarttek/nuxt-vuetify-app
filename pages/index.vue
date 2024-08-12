<template>
  <v-main>
    <v-card-text>
      <h1>Home Page</h1>
      <p>This is the index or landing page of the application</p>
    </v-card-text>

    <v-btn @click="toggleDarkMode"> Toggle Dark Mode </v-btn>
    <v-btn @click="toggleLightMode"> Toggle Light Mode </v-btn>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleDarkMode = () => {
  theme.global.name.value = "dark";
};

const toggleLightMode = () => {
  theme.global.name.value = "light";
};
</script>
