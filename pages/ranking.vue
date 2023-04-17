<template>
  <div>
    <div class="text-center">
      <h1 :style="{ color: titleColor }">Bronze Um</h1>
    </div>
    <div class="container" :style="{ textAlign: 'center' }">
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
    <div class="text-center">
      <p>
        O Ranking bronze, é para jogadores que buscam uma experiencias<br />
        mais casual, sem foco em jogar competitavemente em elos <br />
        maiores, em servidores comptetivos como fpl ou liga aberta <br />
        e até mesmo em grandes campeonatos online, lan ou campeonatos tier 1, 2
        ou 3.
      </p>
    </div>
    <div class="text-center">
      <h2 :style="{ color: titletwoColor }">
        Resultados Esperados Por Partidas
      </h2>
    </div>
    <div>
      <div class="text-center">
        <v-table height="300px">
          <thead>
            <tr>
              <th class="text-left">Skills</th>
              <th class="text-left">Resultados</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.Skills">
              <td>{{ item.Skills }}</td>
              <td>{{ item.Resultados }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingProfile",
  data() {
    return {
      titleColor: "yellow",
      titletwoColor: "gray",
      titles: [{ color: "gray", width: "60%", percent: "60%" }],
      desserts: [
        {
          Skills: "KDR",
          Resultados: 1.1,
        },
        {
          Skills: "ADR",
          Resultados: 109,
        },
        {
          Skills: "KAST%",
          Resultados: "80%",
        },
        {
          Skills: "HS",
          Resultados: 80,
        },
        {
          Skills: "Precision",
          Resultados: "70%",
        },
        {
          Skills: "Clucthes",
          Resultados: 50,
        },
      ],
    };
  },
};
</script>
