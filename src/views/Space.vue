<template>
  <div class="space-tab">
    <h2 class="title">Space highlights</h2>
    <div class="card-layout">
      <!-- If creating for production I would either paginate the highlights OR
      lazy load more highlights as the user scrolled down the page. This would prevent the page
      from requesting and rendering potentially 100+ highlights in one go, providing better UX by both speeding
      up the page load time and not overwhelming the user with information. -->
      <MuseumHighlight
        v-for="(highlight, index) in allHightlights"
        :key="index"
        :highlight="highlight"
        highlightType="space"
      >
        <img
          v-if="highlight.partnerHighlight"
          src="../assets/green-star.png"
          slot="badge"
          style="width: 40px; height: 40px;"
        />
        <img
          v-else
          src="../assets/orange-star.png"
          slot="badge"
          style="width: 40px; height: 40px;"
        />
      </MuseumHighlight>
    </div>
  </div>
</template>

<script>
import MuseumHighlight from "../components/MuseumHighlight";
import _orderBy from "lodash/orderBy";

export default {
  name: "SpacePage",
  components: {
    MuseumHighlight
  },
  data() {
    return {
      spaceHighlights: [
        {
          date: "2020-04-20 12:20:00",
          description:
            "Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.",
          id: 1,
          image: "",
          name: "Asteroids"
        },
        {
          date: "2020-05-20 15:50:00",
          description:
            "A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.",
          id: 9,
          image: "",
          name: "Comets"
        },
        {
          date: "2020-05-01 9:22:00",
          description:
            "The term planet is ancient, with ties to history, astrology, science, mythology, and religion.",
          id: 7,
          image: "",
          name: "Planets",
          news: {
            date: "2020-08-18 18:00:00",
            title: "Attend our talk about Jupiter with Dr. Hogarth"
          },
          quiz: "https://planetquiz.space"
        },
        {
          date: "2020-07-05 4:10:00",
          description:
            "A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.",
          id: 12,
          image: "",
          name: "Meteor showers",
          news: {
            title: "The Lyrids will peak at on April 21-22 2021, at night"
          }
        }
      ],
      spacePartners: {
        observatory: {
          createdAt: "2020-06-01 11:45:00",
          info:
            "The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.",
          image: "",
          name: "Mauna Kea Observatories"
        }
      },
      allHightlights: []
    };
  },
  methods: {
    formatPartnerHighlights(partnerHighlights) {
      return Object.entries(partnerHighlights).map(([partner, highlight]) => {
        return {
          description: highlight.info,
          date: highlight.createdAt,
          partnerHighlight: true,
          image: highlight.image,
          name: highlight.name
        };
      });
    },
    mergeAndSortData() {
      const formattedPartnerHighlights = this.formatPartnerHighlights(
        this.spacePartners
      );
      const mergedHighlights = [
        ...this.spaceHighlights,
        ...formattedPartnerHighlights
      ];
      this.allHightlights = _orderBy(
        mergedHighlights,
        (highlight) => new Date(highlight.date),
        "desc"
      );
    }
  },
  created() {
    //If I had to fetch the data for the museum and partner highlights I would put these requests
    //into a vuex store and handle the formatting, merging, and ordering of the data in the store as well
    //OR better still I would create a laravel route that returned “allHighlights”
    //and have the backend handle the request to get the partner highlights and the formatting, merging, and ordering.
    //Doing this computation on the backend would be a lot faster than doing it on the client side.
    //This would speed up the load time of the page providing better UX.
    //Using Vuex would also help to keep the code organised, which is especially useful as the app scales.
    this.mergeAndSortData();
  }
};
</script>

<style lang="scss" scoped>
.space-tab {
  padding: 0 40px;
  .title {
    color: #2c3791;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .card-layout {
    display: flex;
    flex-wrap: wrap;
    .museum-highlight {
      margin: 20px 20px 0 0;
    }
  }
}
</style>
