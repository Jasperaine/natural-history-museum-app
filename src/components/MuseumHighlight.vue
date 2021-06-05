<template>
    <div class="museum-highlight">
        <div class="museum-highlight__badge-container">
            <slot name="badge" />
        </div>
        <img
            v-if="highlight.image"
            class="museum-highlight__image"
            :src="highlight.image"
            :alt="highlight.name"
        />
        <div class="info-container">
            <h3 class="info-container__name">{{ highlight.name }}</h3>
            <p class="info-container__date">{{ formatDate(highlight.date) }}</p>
            <p>{{ highlight.description }}</p>
            <!-- slot for adding additional unique info.
            e.g "Location", "Species", and "Endanger status" on the Wildlife card-->
            <slot name="additonal-info" />
            <div v-if="highlight.news">
                <h4 class="info-container__news-title">News</h4>
                <p class="info-container__news-description">{{ news }}</p>
            </div>
            <a
                v-if="highlight.quiz"
                :href="highlight.quiz"
                target="_blank"
                class="info-container__quiz-link"
            >
                <VueFontawesome
                    icon="question-circle"
                    size="1.1"
                    color="#ff9f1c"
                    style="margin-right: 8px"
                />Take a quiz!
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
        // Not currently used but could be used to differentiate styles/functionality between cards
        highlightType: {
            type: String,
            required: true,
            validator: value => {
                return (
                    ["space", "dinosaur", "wildlife", "oceans"].indexOf(
                        value
                    ) !== -1
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

    &__badge-container {
        position: absolute;
        top: -12px;
        right: -12px;
    }

    &__image {
        width: 100%;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }
}
.info-container {
    padding: 20px 10px;

    &__name {
        margin: 0;
        font-size: 20px;
    }
    &__date {
        margin: 0;
        font-size: 14px;
    }
    &__news-title {
        margin-bottom: 0;
    }
    &__news-description {
        margin: 0;
    }
    &__quiz-link {
        margin-top: 16px;
        display: block;
        color: #2c3e50;
        text-decoration: none;
    }
}
</style>
