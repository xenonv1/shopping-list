<template>
  <InteractionBar @itemAdded="(i) => addItem(i)" />
  <ResultList @itemDeleted="loadItems" :items="items" :itemIds="itemIds" />
</template>

<script>
import InteractionBar from "../components/InteractionBarComponent.vue";
import ResultList from "../components/ResultsListComponent.vue";
import { initializeItem, getData } from "../firebase.js";

export default {
  name: "HomeView",
  components: {
    InteractionBar,
    ResultList,
  },
  methods: {
    addItem(item) {
      initializeItem(item);
      this.loadItems();
    },
    async loadItems() {
      this.items = [];
      const data = await getData();

      data.forEach((item) => {
        this.items.push(item.data());
        this.itemIds.push(item.id);
      });
    },
  },
  data() {
    return {
      items: [],
      itemIds: [],
    };
  },
  created() {
    this.loadItems();
  },
};
</script>
