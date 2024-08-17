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
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="d-flex fill-height justify-center align-center">
                    <h2 class="text-white top">{{ item.title }}</h2>
                    <br />
                  </div>
                  <div class="d-flex fill-height justify-center align-center">
                    <p class="text text-white">{{ item.text }}</p>
                  </div>
                  <div class="d-flex fill-height justify-center align-center">
                    <v-btn style="margin-top: -120px">Buy Now</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-card-text>
        <h1>Home Page</h1>
        <p>This is the index or landing page of the application</p>
      </v-card-text>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "img/carousel/7.jpg",
          title: "Surface Studio",
          text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
        },
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
      ],
    };
  },
};
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
</style>
