<template>
  <v-row class="mb-15">
    <v-col cols="12" sm="12">
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-row>
            <v-col cols="12" sm="3" v-for="(service, i) in services" :key="i">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  class="mx-auto"
                  color="grey-lighten-5"
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
                            <template v-if="!$vuetify.display.smAndUp">
                              <h1 class="ml-5 mb-10">
                                {{ service.subtitle1 }}
                              </h1>
                            </template>

                            <template v-if="$vuetify.display.smAndUp">
                              <h2 class="ml-5 mb-8">
                                {{ service.subtitle1 }}
                              </h2>
                            </template>
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
</template>

<script setup>
const services = ref([
  {
    image: "img/services/w-1.jpg",
    title: " Create and Find Patient Records",
    subtitle1: "Patients",
  },
  {
    image: "img/services/w-2.jpg",
    title: " Get Accurate laboratory Results",
    subtitle1: "Laboratory",
  },
  {
    image: "img/services/w-3.jpg",
    title: " Buy and Sell Drugs from Pharmacy",
    subtitle1: "Pharmacy",
  },
  {
    image: "img/services/w-4.jpg",
    title: " Get the Best Consultations",
    subtitle1: "Consultancy",
  },
]);
</script>

<style scoped>
.v-card--reveal {
  align-items: end;
  bottom: 0;
  justify-content: start;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
