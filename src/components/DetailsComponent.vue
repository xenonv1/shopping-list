<template>
  <div class="centering-container">
    <div v-if="item" class="main-container">
      <div class="item-information">
        <input
          @input="(event) => setName(event.target.value)"
          type="text"
          :value="item.name"
        />
        <div class="quantity-container">
          <input
            @input="(event) => setQuantity(event.target.value)"
            type="text"
            :value="item.quantity"
          />
          <select
            @input="(event) => setUnit(event.target.value)"
            name="Einheit"
            id="unit"
          >
            <option value="" :selected="!item.unit">Einheit wählen...</option>
            <option value="mililiters" :selected="item.unit === 'mililiters'">
              Mililiter
            </option>
            <option value="liters" :selected="item.unit === 'liters'">
              Liter
            </option>
            <option value="grams" :selected="item.unit === 'grams'">
              Gramm
            </option>
            <option value="kilos" :selected="item.unit === 'kilos'">
              Kilogramm
            </option>
            <option value="bottles" :selected="item.unit === 'bottles'">
              Flasche
            </option>
            <option value="packages" :selected="item.unit === 'packages'">
              Packung
            </option>
            <option value="pieces" :selected="item.unit === 'pieces'">
              Stück
            </option>
          </select>
        </div>
        <div class="buttons-container">
          <Button @click="increaseQuantity"
            ><i class="fa-solid fa-plus"></i
          ></Button>
          <Button @click="decreaseQuantity"
            ><i class="fa-solid fa-minus"></i
          ></Button>
        </div>
      </div>
      <div class="store-container">
        <div v-for="(value, key) in item.store">
          <input
            @input="(event) => setStore(event.target)"
            type="checkbox"
            :id="key"
            :checked="value"
          />
          <label v-if="key !== 'globusm' && key !== 'globusb'" :for="key">
            {{ key[0].toUpperCase() + key.substring(1) }}
          </label>
          <label v-else-if="key == 'globusm'" :for="key"
            >Globus Markthalle</label
          >
          <label v-else :for="key">Globus Baumarkt</label>
        </div>
      </div>
      <div class="add-info-container">
        <p>
          von
          {{ item.addedBy }}
          am
          {{ item.addedAt }}
        </p>
      </div>
      <textarea
        @input="(event) => setNotes(event.target.value)"
        :value="item.notes"
      />
      <div class="tag-container">
        <div v-for="(value, key) in item.tags">
          <input
            @input="(event) => setTag(event.target)"
            type="checkbox"
            :id="key"
            :checked="value"
          />
          <label :for="key">
            {{ key[0].toUpperCase() + key.substring(1) }}</label
          >
        </div>
      </div>
      <Button @click="updateItem" class="save-button"
        >Änderungen speichern</Button
      >
    </div>
  </div>
</template>

<script>
import { getDetailedInformation, updateEntries } from "../firebase.js";
export default {
  name: "DetailsComponent",
  data() {
    return {
      item: {},
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
  },
  methods: {
    async getData(id) {
      this.item = await getDetailedInformation(id);
    },
    setName(name) {
      this.item.name = name;
    },
    increaseQuantity() {
      this.item.quantity++;
    },
    decreaseQuantity() {
      const quantity = this.item.quantity;
      if (quantity > 1) this.item.quantity--;
    },
    setQuantity(quantity) {
      console.log(quantity);
      this.item.quantity = quantity;
    },
    setUnit(unit) {
      this.item.unit = unit;
    },
    setStore(target) {
      this.item.store[target.id] = target.checked;
    },
    setNotes(notes) {
      this.item.notes = notes;
    },
    setTag(target) {
      this.item.tags[target.id] = target.checked;
    },
    updateItem() {
      updateEntries(
        this.id,
        this.item.name,
        this.item.quantity,
        this.item.unit,
        this.item.store,
        this.item.isDiscounted,
        this.item.notes,
        this.item.tags
      );
    },
  },
};
</script>

<style scoped>
.centering-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
}
.main-container {
  /* general positioning*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /*styling*/
  width: 90%;
  margin: auto auto;
  row-gap: 2.5vh;
  font-size: 1rem;
}

.item-information {
  display: flex;
  flex-direction: column;
  row-gap: 1vh;
  justify-content: space-between;
  width: 100%;
}

.item-information input {
  height: 3vh;
  font-family: "Open Sans", sans-serif;
}

.item-information button {
  width: 50%;
  height: 5vh;
  border: none;
  background-color: coral;
}

.quantity-container {
  display: flex;
  justify-content: space-between;
}

.quantity-container input {
  width: 48%;
}
select {
  width: 48%;
  height: 3.7vh;
  border: none;
  border-radius: 3px;
}
.store-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
}

.add-info-container {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

textarea {
  width: 100%;
  height: 10vh;
  resize: none;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
}

.tag-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
}

.save-button {
  width: 100%;
  height: 5vh;
  background-color: cornflowerblue;
  border: none;
  color: white;
  font-size: 1.3rem;
}
</style>
