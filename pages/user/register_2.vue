<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col md="4">
          <v-card class="pa-4 mt-5">
            <v-card-title
              class="text-center"
              :class="themeTitle"
              style="font-size: 24px"
            >
              Create New User - Register
            </v-card-title>
            <v-card-item>
              <div>
                <h1>Register</h1>
                <form @submit.prevent="register">
                  <div>
                    <label>Username</label>
                    <input v-model="form.username" type="text" />
                  </div>
                  <div>
                    <label>Email</label>
                    <input v-model="form.email" type="email" />
                  </div>
                  <div>
                    <label>Password</label>
                    <input v-model="form.password" type="password" />
                  </div>
                  <button type="submit">Register</button>
                </form>
                <p v-if="error">{{ error }}</p>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const form = ref({
  username: "",
  email: "",
  password: "",
});

const error = ref(null);

async function register() {
  error.value = null;
  try {
    const { data, error: fetchError } = await useFetch("/api/auth/register_2", {
      method: "POST",
      body: form.value,
    });

    if (fetchError.value) throw fetchError.value;

    console.log("Success:", data.value);
  } catch (err) {
    error.value = err.data?.message || "An error occurred";
  }
}
</script>
