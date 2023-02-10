<template>
  <InteractionBar @itemAdded="(i) => addItem(i)" />
  <ResultList @itemDeleted="loadItems" :items="items" :itemIds="itemIds" />
</template>

<script>
import InteractionBar from "../components/InteractionBarComponent.vue";
import ResultList from "../components/ResultsListComponent.vue";
import { addItemToList, getData } from "../firebase.js";

export default {
  name: "HomeView",
  components: {
    InteractionBar,
    ResultList,
  },
  methods: {
    async addItem(item) {
      await addItemToList(item);
      this.loadItems();
    },
    async loadItems() {
      this.items = [];
      const data = await getData();

      const itemsUnsorted = [];

      data.forEach((item) => {
        itemsUnsorted.push(item.data());
      });

      //Sorting the items by tags//

      //defines the order the tags can be found in the store
      const sortingBlueprint = [
        "Kleidung",
        "Bücher",
        "Spielzeug",
        "Schreibwaren",
        "Haushalt",
        "Hygiene",
        "Elektrogeräte",
        "Backzutaten",
        "Nudeln",
        "Reis",
        "Eingelegt",
        "Gewürze",
        "Getränke",
        "Obst",
        "Gemüse",
        "Fleisch",
        "Käse",
        "Fisch",
        "Eier",
        "Brot",
        "Tee",
        "Kaffee",
        "Süßwaren",
        "Tiefgekühlt",
      ];

      //filter items using blueprint and pushing sortedItems into items-array
      //all items that have at least one tags (except discount)
      sortingBlueprint.forEach((filter) => {
        console.log(filter);
        const itemsSorted = itemsUnsorted.filter(
          (item) => item.tags[filter] === true
        );
        this.items.push(...itemsSorted);
      });

      //all items that don't have any tags (e.g. new items)
      itemsUnsorted.forEach((item) => {
        //checks if every value in the tags-object is false
        if (Object.values(item.tags).every((v) => v === false))
          this.items.unshift(item);
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
