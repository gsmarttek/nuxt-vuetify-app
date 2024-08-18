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

      <v-card-text class="mt-10 mb-12 text-center">
        <h1 :class="themeH1" style="font-size: 2em">Welcome To OLA Hospital</h1>
        <div class="d-flex justify-center">
          <p style="width: 70%; color: #888">
            This is the home page of the OLA Hospital Application, Please select
            an item from the main menu above or explore the Patient Information,
            Laboratory Results, Pharmacy, and Consultation bellow for more
            access.
          </p>
        </div>
      </v-card-text>

      <v-row class="mb-15">
        <v-col cols="12" sm="12">
          <v-row justify="center">
            <v-col cols="12" sm="10">
              <v-row>
                <v-col
                  cols="12"
                  sm="3"
                  v-for="(service, i) in services"
                  :key="i"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card
                      class="mx-auto"
                      color="grey-lighten-4"
                      max-width="600"
                      v-bind="props"
                    >
                      <v-img :aspect-ratio="16 / 9" cover :src="service.image">
                        <v-expand-transition>
                          <div
                            v-if="isHovering"
                            class="d-flex transition-fast-in-fast-out bg-red-darken-3 v-card--reveal"
                            style="height: 100%"
                          >
                            <v-row>
                              <v-col cols="12" sm="12">
                                <h1 class="ml-4">{{ service.subtitle1 }}</h1>
                              </v-col>
                            </v-row>
                          </div>
                        </v-expand-transition>
                      </v-img>
                      <v-card-text class="pt-6">
                        <div
                          class="font-weight-medium text-grey-darken-1 text-h6 mb-2"
                        >
                          {{ service.title }}
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          variant="flat"
                          rounded="0"
                          elevation="6"
                          class="mb-3"
                        >
                          Explore
                          <v-icon class="ml-1" size="large">
                            mdi-arrow-right-bold-circle
                          </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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

const services = ref([
  {
    image: "img/services/w-1.jpg",
    title: " Find Patient Information",
    subtitle1: "Patients",
  },
  {
    image: "img/services/w-2.jpg",
    title: " Get laboratory Results",
    subtitle1: "Laboratory",
  },
  {
    image: "img/services/w-3.jpg",
    title: " Buy Drugs from Pharmacy",
    subtitle1: "Pharmacy",
  },
  {
    image: "img/services/w-4.jpg",
    title: " Get the Best Consultation",
    subtitle1: "Consultancy",
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
.v-card--reveal {
  align-items: end;
  bottom: 0;
  justify-content: start;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
