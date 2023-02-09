<template>
  <div class="background-container">
    <div class="main-container">
      <div class="insert-container">
        <input v-model="item" type="text" placeholder="Insert your item..." />
        <Button @click="clickEvent"><i class="fa-solid fa-plus"></i></Button>
      </div>
      <Button class="options-button"><i class="fa-solid fa-bars"></i></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractionBarComponent",
  data() {
    return {
      item: "",
    };
  },
  methods: {
    clickEvent() {
      this.$emit("itemAdded", this.item);
      this.item = "";
    },
  },
};
</script>

<style scoped>
.background-container {
  width: 100%;
  height: 10vh;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
}
.main-container {
  /* general positioning */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: auto;

  /* styling */
  height: 4vh;
  background-color: cornflowerblue;
  padding: 1rem;
  border-radius: 15px;
}

.input-container {
  display: flex;
}

input {
  background-color: lightblue;
  border: 0px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 0.2rem 1rem 0.2rem 1rem;
  width: 50vw;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: black;
  font-style: italic;
}

.insert-container button {
  background-color: lightblue;
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0.2rem 1rem 0.2rem 0;
}

.options-button {
  background-color: lightblue;
  border: none;
  border-radius: 5px;
}
</style>
