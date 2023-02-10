<template>
  <div class="main-container">
    <div @click="pushRoute" class="name-container">
      <p v-if="item.name.length <= 20">{{ item.name }}</p>
      <p v-else>{{ item.name.substring(0, 19) + "..." }}</p>
      <i v-if="item.isDiscounted" class="fa-solid fa-percent"></i>
    </div>
    <div @click="pushRoute" class="event-container"></div>
    <div class="delete-container">
      <p>x{{ item.quantity }}</p>
      <Button @click="deleteItem" class="button-delete"
        ><i class="fa-solid fa-trash"></i
      ></Button>
    </div>
  </div>
</template>

<script>
import { deleteEntry } from "../firebase.js";

export default {
  name: "ResultComponent",
  props: {
    item: Object,
  },
  data() {
    return {
      timerStart: null,
    };
  },
  methods: {
    pushRoute() {
      this.$router.push({ name: "details", params: { id: this.item.name } });
    },
    deleteItem() {
      deleteEntry(this.item.name);
      this.$emit("itemDeleted");
    },
  },
};
</script>

<style scoped>
/* general positioning */
.main-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 1vh auto;
  height: 5vh;
  font-size: 1rem;

  /* styling */
  background-color: coral;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  color: white;
  cursor: pointer;
}

.delete-container {
  display: flex;
}

/* invisible container in the middle to allow interactions in between the other containers without adding the event listeners
to the whole main-container to prevent triggering the events on button clicks*/
.event-container {
  width: 100%;
  height: 100%;
}

Button {
  background-color: coral;
  border: none;
  padding: 1rem;
  color: white;
  cursor: pointer;
}
</style>
