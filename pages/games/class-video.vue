<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card>
          <v-responsive aspect-ratio="16/9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </v-responsive>
          <v-card-title> Video Title </v-card-title>
          <v-card-text> Description of the video goes here. </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ClassVideo",
  data() {
    return {};
  },
};
</script>
