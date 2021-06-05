<template>
  <div class="museum-highlight">
    <div class="badge-container">
      <slot name="badge" />
    </div>
    <img
      v-if="highlight.image"
      class="image"
      :src="highlight.image"
      :alt="highlight.name"
    />
    <div class="info-container">
      <h3 class="name">
        {{ highlight.name }}
      </h3>
      <p class="date">{{ formatDate(highlight.date) }}</p>
      <p>{{ highlight.description }}</p>
      <!-- slot for adding additional unique info.
    e.g "Location", "Species", and "Endanger status" on the Wildlife card -->
      <slot name="additonal-info" />
      <div v-if="highlight.news">
        <h4 class="news-title">News</h4>
        <p class="news-description">{{ news }}</p>
      </div>
      <a v-if="highlight.quiz" :href="highlight.quiz" class="quiz-link">
        <VueFontawesome
          icon="question-circle"
          size="1.1"
          color="#ff9f1c"
          class="title-icon"
        />
        Take a quiz!
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MuseumHighlight",
  props: {
    highlight: {
      type: Object,
      required: true
    },
    highlightType: {
      type: String,
      required: true,
      validator: (value) => {
        return (
          ["space", "dinosaur", "wildlife", "oceans"].indexOf(value) !== -1
        );
      }
    }
  },
  computed: {
    news() {
      if (this.highlight.news?.date) {
        return `${this.formatDate(this.highlight.news.date)} - ${
          this.highlight.news.title
        }`;
      } else {
        return this.highlight.news?.title || "";
      }
    }
  },
  methods: {
    // this method could be moved into a service/mixin and be used elsewhere within the app
    formatDate(date) {
      const dateObject = new Date(date);
      return `${dateObject.getDate()}/${dateObject.getMonth() +
        1}/${dateObject.getFullYear()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.museum-highlight {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 300px;
  background-color: #ffffff;
  border-radius: 7px;
  position: relative;

  .badge-container {
    position: absolute;
    top: -12px;
    right: -12px;
  }

  .image {
    width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  .info-container {
    padding: 20px 10px;

    .name {
      margin: 0;
      font-size: 20px;
    }
    .date {
      margin: 0;
      font-size: 14px;
    }
    .news-title {
      margin-bottom: 0;
    }
    .news-description {
      margin: 0;
    }
  }

  .quiz-link {
    margin-top: 16px;
    display: block;
    color: #2c3e50;
    text-decoration: none;
  }
}
</style>
