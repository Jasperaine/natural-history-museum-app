<template>
    <router-link :to="tab.route">
        <!-- At mobile size I would have this turn into a hamburger menu style navigation -->
        <button class="tab" @click="$emit('selected', tab)">
            {{ tab.label }}
            <VueFontawesome
                :icon="tab.icon"
                size="1.1"
                :color="iconColor"
                :key="iconColor"
                class="title-icon"
            />
        </button>
    </router-link>
</template>

<script>
export default {
    name: "Tab",
    props: {
        tab: Object,
        required: true
    },
    computed: {
        iconColor() {
            return this.tab.selected ? "#ff9f1c" : "#2c3e50";
        }
    }
};
</script>

<style lang="scss" scoped>
.tab {
    border: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 20px;
    background-color: #ffffff;
    margin-right: 5px;
    text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
}
</style>
