<template>
  <div>
    <div class="text-center">
      <h1>Profile</h1>
    </div>
    <v-card class="text-center mx-auto" max-width="344">
      <v-container>
        <v-form>
          <v-text-field
            v-model="nomePerfil"
            color="primary"
            label="Digite seu nome de perfil"
            variamt="underlined"
          ></v-text-field>
          <v-btn @click="salvar">Salvar</v-btn>
        </v-form>
      </v-container>
    </v-card>
    <div class="text-center">
      <v-img :src="profileImage"> </v-img>
      <input type="file" @change="onFileSelected" />
      <h2>About</h2>
      <v-textarea v-model="descricao" label="Descrição"></v-textarea>
      <p>Descrição: {{ descricao }}</p>
      <v-btn @click="salvar">Salvar</v-btn>
    </div>
    <div class="container" :style="{ textAlign: 'justify' }">
      <div
        v-for="(title, index) in titles"
        :key="index"
        :style="{
          display: 'inline-block',
          width: '30%',
          marginRight: '2%',
          textAlign: 'center',
        }"
      >
        <h3>{{ title.name }}</h3>
        <div
          :style="{
            backgroundColor: '#ddd',
            height: '20px',
            borderRadius: '10px',
            overflow: 'hidden',
            textAlign: 'center',
          }"
        >
          <div
            :style="{
              backgroundColor: title.color,
              height: '20px',
              width: title.width,
              borderRadius: '10px',
              textAlign: 'center',
            }"
            v-text="title.percent"
          ></div>
        </div>
      </div>
    </div>
    <div>
      <v-card class="mx-auto" max-width="344" title="User Registration">
        <v-container>
          <v-text-field
            v-model="first"
            color="primary"
            label="First name"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="age"
            color="primary"
            label="age"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="email"
            color="primary"
            label="Email"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            variant="underlined"
          ></v-text-field>

          <v-checkbox
            v-model="terms"
            color="secondary"
            label="I agree to site terms and conditions"
          ></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success">
            Complete Registration

            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserProfile",
  data() {
    return {
      titles: [
        { name: "Mira", color: "blue", width: "80%", percent: "80%" },
        { name: "Movimentação", color: "blue", width: "60%", percent: "60%" },
        { name: "Granada", color: "blue", width: "40%", percent: "40%" },
      ],
      nomePerfil: "",
    };
  },
  methods: {
    salvar() {
      localStorage.setItem("nomeDePerfil", this.nomeDePerfil);
    },
  },
};
</script>
