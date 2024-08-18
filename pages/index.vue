<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-carousel show-arrows="hover" cycle hide-delimiter-background>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              cover
            >
              <!-- <v-row>
                <v-col cols="12" sm="6">
                  <div class="d-flex fill-height justify-center align-center">
                    <h2 class="text-black top">{{ item.title }}</h2>
                    <br />
                  </div>
                  <div class="d-flex fill-height justify-center align-center">
                    <p class="text text-black">{{ item.text }}</p>
                  </div>
                  <div class="d-flex fill-height justify-center align-center">
                    <v-btn style="margin-top: -120px" to="/login">Login</v-btn>
                  </div>
                </v-col>
              </v-row> -->
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-card-text class="mt-10 mb-15 text-center">
        <h1 :class="themeH1" style="font-size: 2em">
          Welcome To OLA Hospital App
        </h1>
        <div class="d-flex justify-center">
          <p style="width: 70%; color: #777">
            This is the home page of the OLA Hospital Application, Please select
            an item from the main menu above or click on the Patient
            Information, Laboratory Results, and Pharmacy &amp; Drugs links
            bellow for more access.
          </p>
        </div>
      </v-card-text>
    </v-container>
  </v-main>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const themeH1 = computed(() =>
  theme.global.name.value === "dark" ? "h1-dark-color" : "h1-light-color"
);

const items = ref([
  {
    src: "img/carousel/1.jpg",
    title: "Surface Studio",
    text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  },
  {
    src: "img/carousel/2.jpg",
    title: "Surface Studio",
    text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  },
  {
    src: "img/carousel/3.jpg",
    title: "Surface Studio",
    text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  },
  {
    src: "img/carousel/4.jpg",
    title: "Surface Studio",
    text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  },
  {
    src: "img/carousel/5.jpg",
    title: "Surface Studio",
    text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  },
]);

const populars = ref([
  {
    image: "img/populars/9.jpg",
    title: " Enjoy The Beauty Place in Greece City",
    subtitle1: "Greece",
    subtitle2: "4 Day's 3 Night",
    money: "$1200",
  },
  {
    image: "img/populars/10.jpg",
    title: " Enjoy The Beauty Place in Maldivs Beach",
    subtitle1: "Maldivs",
    subtitle2: "5 Day's 4 Night",
    money: "$1300",
  },
  {
    image: "img/populars/11.jpg",
    title: " Enjoy The Beauty Place in Bhutan City",
    subtitle1: "Bhutan",
    subtitle2: "3 Day's 2 Night",
    money: "$900",
  },
  {
    image: "img/populars/12.jpg",
    title: " Enjoy The Beauty Place in Paris City",
    subtitle1: "Paris",
    subtitle2: "4 Day's 3 Night",
    money: "$1700",
  },
]);
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
  color: #566fa0;
}
.h1-dark-color {
  color: #dce0e7;
}
</style>
