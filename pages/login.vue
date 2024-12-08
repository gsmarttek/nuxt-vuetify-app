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
        <v-col md="4">
          <v-card class="pa-4 mt-10">
            <v-card-title
              class="text-center"
              :class="themeTitle"
              style="font-size: 24px"
              >Please Login</v-card-title
            >
            <v-card-item>
              <v-form @submit.prevent="submit">
                <v-text-field
                  v-model="username.value.value"
                  :error-messages="username.errorMessage.value"
                  prepend-inner-icon="mdi-account"
                  label="Username"
                ></v-text-field>

                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  hint="Password should be at least 8 characters with lowercase uppercase numbers and ~?!@#$%^&*"
                  type="password"
                  prepend-inner-icon="mdi-key"
                  label="Password"
                ></v-text-field>

                <v-btn
                  color="#286090"
                  variant="elevated"
                  type="submit"
                  block
                  class="mt-2"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="show_success" timeout="4000" color="success">
        <p class="text-h6">User logged in successfully!</p>
      </v-snackbar>

      <v-snackbar v-model="show_error" timeout="5000" color="red">
        <p class="text-h6">{{ error_message }}</p>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useField, useForm } from "vee-validate";

const theme = useTheme();
const themeTitle = computed(() =>
  theme.global.name.value === "dark" ? "title-dark-color" : "title-light-color"
);

const show_success = ref(false);
const show_error = ref(false);
const error_message = ref("");

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(value) {
      if (value?.length >= 3) return true;

      return "Username needs to be at least 3 characters.";
    },
    password(value) {
      if (!/^(?=.{8,})/.test(value)) {
        return "Password needs to be at least 8 characters.";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        return "Password should contain a combination of lowercase and uppercase characters";
      } else if (!/^(?=.*[0-9])/.test(value)) {
        return "Password should have one or more numbers";
      } else if (!/^(?=.*[\~?!@#\$%\^&\*])/.test(value)) {
        return "Password should contain one or more special characters ~?!@#$%^&*";
      }

      return true;
    },
  },
});
const username = useField("username");
const password = useField("password");

const user = ref(null);
const isLoading = ref(false);

const { signIn } = useAuth();

/**
 * @desc Login user
 * @param user The user to login
 */
async function loginUser(user) {
  isLoading.value = true;

  if (user)
    try {
      const res = await signIn("credentials", user);
    } catch (err) {
      error_message.value =
        err.data?.message || "Server Failure: user could not login!";
      show_error.value = true;
    }
}

const submit = handleSubmit(async (values) => {
  await loginUser(values);

  // Redirect to index page
  useRouter().push({
    name: "index",
  });

  isLoading.value = false;
});
</script>

<style>
.title-light-color {
  color: #68758f;
}
.title-dark-color {
  color: #dce0e7;
}
</style>
