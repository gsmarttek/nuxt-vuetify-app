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
              style="font-size: 24px"
            >
              Manage Users
            </v-card-title>
            <div class="mb-4 mt-6 ml-5">
              <v-btn to="/user/register">
                <v-icon icon="mdi-plus-box" size="20" start></v-icon>
                Create New User
              </v-btn>
            </div>
            <v-card-item>
              <v-data-table
                v-model:items-per-page="itemsPerPage"
                :search="search"
                :headers="headers"
                :items="users"
                :loading="loading"
                :sort-by="[{ key: 'created_at', order: 'desc' }]"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title v-if="$vuetify.display.mdAndUp"
                      >Users</v-toolbar-title
                    >
                    <v-divider
                      class="mx-4"
                      v-if="$vuetify.display.mdAndUp"
                      inset
                      vertical
                    ></v-divider>
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
                      class="mr-3"
                    ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                  v-model="editedItem.firstname"
                                  label="First Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                  v-model="editedItem.lastname"
                                  label="Last Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                  v-model="editedItem.phone"
                                  label="Phone"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                  v-model="editedItem.email"
                                  label="Email"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                  v-model="editedItem.sex"
                                  label="Sex"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="close"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="save"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="deleteItemConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon class="me-2" size="small" @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                  <v-icon size="small" @click="deleteItem(item)">
                    mdi-eye
                  </v-icon>
                </template>
                <template #item.created_at="{ item }">
                  {{ formatDate(item.created_at) }}
                </template>
                <template v-slot:no-data>
                  <v-btn
                    color="primary"
                    @click="initialize"
                    append-icon="mdi-refresh"
                  >
                    Reload
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="show_error" timeout="5000" color="red">
      <p class="text-h6">{{ error_message }}</p>
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";
import { ref, onMounted, nextTick } from "vue";
import dayjs from "dayjs";

const theme = useTheme();
const themeTitle = computed(() =>
  theme.global.name.value === "dark" ? "title-dark-color" : "title-light-color"
);

const show_error = ref(false);
const error_message = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);
const itemsPerPage = ref(10);
const search = ref("");
const loading = ref(true);
const headers = ref([
  { title: "Register Date", key: "created_at", align: "start" },
  { title: "E-mail", key: "email", align: "start" },
  { title: "Phone", key: "phone", align: "start" },
  { title: "Sex", key: "sex", sortable: false, align: "start" },
  {
    title: "First Name",
    align: "start",
    key: "firstname",
  },
  { title: "Last Name", key: "lastname", align: "start" },
  { title: "Actions", key: "actions", sortable: false },
]);
const users = ref([]);
const editedIndex = ref(1);
const editedItem = ref({
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  sex: "",
});
const defaultItem = ref({
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  sex: "",
});

const formTitle = computed(() => "Edit Item");

// watch: {
//   dialog(val) {
//     val || this.close();
//   },
//   dialogDelete(val) {
//     val || this.closeDelete();
//   },
// }

onMounted(async () => {
  try {
    const response = await $fetch("/api/auth/users");
    if (response.success) {
      users.value = response.data;
    } else if (response.error) {
      error_message.value = response.error;
      show_error.value = true;
    }
  } finally {
    loading.value = false;
  }
});

async function initialize() {
  loading.value = true;

  try {
    const response = await $fetch("/api/auth/users");
    if (response.success) {
      users.value = response.data;
    } else if (response.error) {
      error_message.value = response.error;
      show_error.value = true;
    }
  } finally {
    loading.value = false;
  }
}

function editItem(item) {
  editedIndex.value = users.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = users.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  users.value.splice(editedIndex.value, 1);
  closeDelete();
}

async function close() {
  dialog.value = false;
  await nextTick();
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
}

async function closeDelete() {
  dialogDelete.value = false;
  await nextTick();
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(users.value[editedIndex.value], editedItem.value);
  } else {
    users.value.push(editedItem.value);
  }
  close();
}

function formatDate(date) {
  return dayjs(date).format("MMM D YYYY"); // Example: Dec 4, 2024
}
</script>

<style>
.v-data-table thead tr th span {
  font-size: 1.1em;
  text-transform: uppercase;
}
.title-light-color {
  color: #68758f;
}
.title-dark-color {
  color: #dce0e7;
}
</style>
