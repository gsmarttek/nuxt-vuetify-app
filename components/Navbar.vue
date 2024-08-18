<template>
  <v-app-bar color="primary" prominent>
    <template v-if="!$vuetify.display.mdAndUp">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>

    <template v-if="$vuetify.display.mdAndUp">
      <NuxtLink to="/">
        <v-avatar rounded="0" size="small" class="ml-4">
          <v-img alt="John" src="/public/img/favicon-3.png"></v-img>
        </v-avatar>
      </NuxtLink>

      <v-spacer></v-spacer>

      <v-toolbar-title style="text-align: center; font-size: 28px"
        >OLA Hospital</v-toolbar-title
      >
    </template>

    <v-spacer></v-spacer>

    <v-btn @click="toggleTheme" icon>
      <v-icon>{{ themeIcon }}</v-icon>
    </v-btn>

    <v-btn
      variant="outlined"
      to="/login"
      size="small"
      text="Login"
      class="ml-3 mr-2"
    >
    </v-btn>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
  </v-app-bar>

  <template v-if="$vuetify.display.mdAndUp">
    <v-app-bar height="50" flat color="#FFFFFF">
      <v-spacer></v-spacer>
      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :class="
              theme.global.name.value === 'dark'
                ? 'menu-dark-active'
                : 'menu-light-active'
            "
            class="font-weght-medium"
            v-bind="props"
            to="/"
            >Home</v-btn
          >
        </template>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Admin +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Admin Page 1
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Admin Page 2
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Admin Page 3
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Patients +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Patients Page One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Patients Page Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Insurance +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Insurance One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Insurance Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Pharmacy &amp; Store +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Pharmacy Page One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Pharmacy Page Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >OPD +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                OPD Page One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                OPD Page Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Registers +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Registers Page One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Registers Page Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            :color="menuColor"
            class="font-weght-medium"
            v-bind="props"
            >Reports +</v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Reports Page One
              </NuxtLink>
            </v-list-item-title>

            <v-list-item-title class="mb-1">
              <NuxtLink to="/" class="no-underline" :class="subMenuColor">
                Reports Page Two
              </NuxtLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>
  </template>

  <v-navigation-drawer v-model="drawer" temporary>
    <h3 class="mt-4 ml-5" style="color: #6a87a3">
      <NuxtLink to="/">
        <v-avatar rounded="0" size="small" class="mb-4 mr-2">
          <v-img alt="John" src="/public/img/favicon-3.png"></v-img>
        </v-avatar>
      </NuxtLink>
      OLA Hospital
    </h3>
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
          :title="title"
          :value="title"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
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

const menuColor = computed(() =>
  theme.global.name.value === "dark" ? "" : "#3d5b99"
);

const subMenuColor = computed(() =>
  theme.global.name.value === "dark" ? "menu-dark" : "menu-light"
);

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark";
};
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}

.menu-light {
  color: #3d5b99;
}

.menu-dark {
  color: #ffffff;
}

.menu-light-active {
  color: #fe0000;
}

.menu-dark-active {
  color: grey;
}
</style>
