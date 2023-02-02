<template>
  <div class="main-container">
    <div class="insert-container">
      <input type="text" placeholder="Insert your item..." />
      <Button><i class="fa-solid fa-plus"></i></Button>
    </div>
    <Button class="options-button"><i class="fa-solid fa-bars"></i></Button>
  </div>
</template>

<script>
export default {
  name: "InteractionBarComponent",
};
</script>

<style scoped>
.main-container {
  /* general positioning */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: auto;

  /* styling */
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
  padding: 0.2rem;
}

.options-button {
  background-color: lightblue;
  border: none;
  border-radius: 5px;
}
</style>
