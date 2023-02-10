<template>
  <ListItem
    v-for="item in items"
    :item="item"
    @itemDeleted="$emit('itemDeleted')"
  />
</template>

<script>
import ListItem from "./ResultComponent.vue";
export default {
  name: "ResultListComponent",
  components: {
    ListItem,
  },
  props: {
    items: Array,
    itemIds: Array,
  },
};
</script>
