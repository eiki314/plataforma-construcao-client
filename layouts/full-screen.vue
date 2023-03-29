<template>
  <v-app>
    <v-btn icon size="x-large" @click.stop="$router.go(-1)">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-container fill-height>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "FullScreenLayout",
};
</script>
