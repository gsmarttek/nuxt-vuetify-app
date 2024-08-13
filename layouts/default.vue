<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <NuxtLink to="/">
        <v-avatar rounded="0" size="small" class="ml-4">
          <v-img alt="John" src="/img/favicon-3.png"></v-img>
        </v-avatar>
      </NuxtLink>

      <v-spacer></v-spacer>

      <template v-if="$vuetify.display.mdAndUp">
        <v-toolbar-title style="text-align: center; font-size: 28px"
          >OLA Hospital</v-toolbar-title
        >
      </template>

      <v-spacer></v-spacer>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
      </template>

      <v-btn @click="toggleTheme" icon>
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>

      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-shield-account"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-text-box-edit"
              title="Actions"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <slot />
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";

const drawer = ref(false);

const admins = ref([
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
]);

const cruds = ref([
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
]);

const theme = useTheme();

const themeIcon = computed(() =>
  theme.global.name.value === "dark" ? "mdi-weather-sunny" : "mdi-weather-night"
);

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark";
};
</script>
