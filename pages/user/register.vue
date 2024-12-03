<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col md="4">
          <v-card class="pa-4 mt-5">
            <v-card-title
              class="text-center"
              :class="themeTitle"
              style="font-size: 22px"
            >
              Create New User - Register
            </v-card-title>
            <div class="text-center mb-5 mt-6">
              <v-btn to="/user/users">
                <v-icon icon="mdi-account-multiple" start></v-icon>
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
                  :counter="7"
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

      return "Phone number needs to be at least 11 digits.";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    sex(value) {
      if (value) return true;

      return "Select an item.";
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
const checkbox = useField("checkbox");

const items = ref(["Male", "Female"]);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
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
