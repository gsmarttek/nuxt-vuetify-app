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
          <v-card class="pa-4 mt-5">
            <v-card-title
              class="text-center"
              :class="themeTitle"
              style="font-size: 24px"
            >
              Create New User - Register
            </v-card-title>
            <div class="text-center mb-5 mt-6">
              <v-btn to="/user/users">
                <v-icon icon="mdi-account-multiple" size="22" start></v-icon>
                View Users
              </v-btn>
            </div>
            <v-card-item>
              <form @submit.prevent="submit">
                <v-text-field
                  v-model="firstname.value.value"
                  :counter="10"
                  :error-messages="firstname.errorMessage.value"
                  label="Firstname"
                ></v-text-field>

                <v-text-field
                  v-model="lastname.value.value"
                  :counter="10"
                  :error-messages="lastname.errorMessage.value"
                  label="Lastname"
                ></v-text-field>

                <v-text-field
                  v-model="phone.value.value"
                  :counter="11"
                  :error-messages="phone.errorMessage.value"
                  label="Phone Number"
                ></v-text-field>

                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  label="E-mail"
                ></v-text-field>

                <v-select
                  v-model="sex.value.value"
                  :error-messages="sex.errorMessage.value"
                  :items="items"
                  label="Sex"
                ></v-select>

                <v-text-field
                  v-model="username.value.value"
                  :error-messages="username.errorMessage.value"
                  label="Username"
                ></v-text-field>

                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  hint="Password should be at least 8 characters with lowercase uppercase numbers and ~?!@#$%^&*"
                  label="Password"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  counter
                  @click:append="show_password = !show_password"
                ></v-text-field>

                <v-text-field
                  v-model="password_confirm.value.value"
                  :error-messages="password_confirm.errorMessage.value"
                  label="Confirm Password"
                  :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_confirm ? 'text' : 'password'"
                  counter
                  @click:append="show_confirm = !show_confirm"
                ></v-text-field>

                <v-checkbox
                  v-model="checkbox.value.value"
                  :error-messages="checkbox.errorMessage.value"
                  label="Option"
                  type="checkbox"
                  value="1"
                ></v-checkbox>

                <v-btn class="me-4" type="submit"> submit </v-btn>

                <v-btn @click="handleReset"> clear </v-btn>
              </form>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="show_success" timeout="4000" color="success">
        <p class="text-h6">User created successfully!</p>
      </v-snackbar>

      <v-snackbar v-model="show_error" timeout="5000" color="red">
        <p class="text-h6">{{ error_message }}</p>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useTheme } from "vuetify";

const theme = useTheme();
const themeTitle = computed(() =>
  theme.global.name.value === "dark" ? "title-dark-color" : "title-light-color"
);

const show_success = ref(false);
const show_error = ref(false);
const error_message = ref("");

const confirm = ref("");
const password_2 = ref("");

const show_password = ref(false);
const show_confirm = ref(false);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    firstname(value) {
      if (value?.length >= 3) return true;

      return "Firstname needs to be at least 3 characters.";
    },
    lastname(value) {
      if (value?.length >= 3) return true;

      return "Lastname needs to be at least 3 characters.";
    },
    phone(value) {
      if (/^[0-9-]{11,}$/.test(value)) return true;

      return "Phone number needs to be 11 digits long.";
    },
    email(value) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    sex(value) {
      if (value) return true;

      return "Select an item.";
    },
    username(value) {
      if (value?.length >= 3) return true;

      return "Username needs to be at least 3 characters.";
    },
    password(value) {
      password_2.value = value;

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
    password_confirm(value) {
      confirm.value = value;

      if (password_2.value !== confirm.value) {
        return "Password and Confirm Password does not match.";
      }

      return true;
    },
    checkbox(value) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});
const firstname = useField("firstname");
const lastname = useField("lastname");
const phone = useField("phone");
const email = useField("email");
const sex = useField("sex");
const username = useField("username");
const password = useField("password");
const password_confirm = useField("password_confirm");
const checkbox = useField("checkbox");

const items = ref(["male", "female"]);

const user = ref(null);
const isLoading = ref(false);

/**
 * @desc Add users
 * @param user The user to add
 */
async function addUser(user) {
  isLoading.value = true;

  if (user)
    try {
      const { data, error: fetchError } = await useFetch("/api/auth/register", {
        method: "POST",
        body: user,
      });

      if (fetchError.value) throw fetchError.value;

      return data.value;
    } catch (err) {
      error_message.value =
        err.data?.message || "Server Failure: could not create user!";
      show_error.value = true;
    }
}

const submit = handleSubmit(async (values) => {
  const response = await addUser(values);

  if (response?.success) {
    user.value = response.data;
    show_success.value = true;
    handleReset();
  } else if (response?.error) {
    error_message.value = response.error;
    show_error.value = true;
  }

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
