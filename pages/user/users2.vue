<template>
  <v-main>
    <v-container fluid>
      <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="white"
        ></v-progress-circular>
      </v-overlay>
      <v-row justify="center">
        <v-col>
          <v-card class="pa-4 mt-5">
            <v-card-title
              class="text-center"
              :class="themeTitle"
              style="font-size: 22px"
            >
              Users
            </v-card-title>
            <div class="text-center d-flex mb-5 mt-6">
              <v-spacer></v-spacer>
              <v-btn to="/user/register">Create New User</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
              ></v-text-field>
              <v-spacer></v-spacer>
            </div>
            <v-card-item>
              <v-data-table
                v-model:items-per-page="itemsPerPage"
                :search="search"
                :items="users"
                :loading="loading"
                :headers="headers"
                class="elevation-1"
              >
                <template #loading>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </template>
              </v-data-table>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";
import { ref, onMounted } from "vue";

const theme = useTheme();
const themeTitle = computed(() =>
  theme.global.name.value === "dark" ? "title-dark-color" : "title-light-color"
);

const users = ref([]);
const loading = ref(true);
const itemsPerPage = ref(10);
const search = ref("");
const headers = ref([
  {
    title: "First Name",
    align: "start",
    key: "firstname",
  },
  { title: "Last Name", key: "lastname", align: "start" },
  { title: "Phone", key: "phone", align: "start" },
  { title: "E-mail", key: "email", align: "start" },
  { title: "Sex", key: "sex", sortable: false, align: "start" },
  { title: "Register Date", key: "created_at", align: "start" },
]);

onMounted(async () => {
  try {
    const response = await $fetch("/api/auth/users");
    users.value = response;
  } finally {
    loading.value = false;
  }
});
</script>
