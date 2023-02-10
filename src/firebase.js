// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, setDoc, collection } from "firebase/firestore";
import {
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


const firebaseConfig = {
  //insert the firebase-config from external file//
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function initializeBaseItem(itemName) {
    await setDoc(doc(db, "items", itemName), {
    name: itemName,
    unit: "",
    store: {
      globusm: false,
      kaufland: false,
      penny: false,
      aldi: false,
      real: false,
      real: false,
      globusb: false,
    },
    tags: {
      Angebot: false,
      Tiefgekühlt: false,
      Kleidung: false,
      Spielzeug: false,
      Hygiene: false,
      Backzutaten: false,
      Konserven: false,
      Getränke: false,
      Fleisch: false,
      Fisch: false,
      Haushalt: false,
      Bücher: false,
      Schreibwaren: false,
      Elektrogeräte: false,
      Nudeln: false,
      Gewürze: false,
      Obst: false,
      Käse: false,
      Eier: false,
      Brot: false,
      Gemüse: false,
      Eingelegt: false,
      Reis: false,
    },
  });

  console.log("base-item initialized.");
  //return a value to prevent a void-promise
  return true;
}

async function checkForBaseItem(itemName) {
  const query = await getDoc(doc(db, "items", itemName));
  let baseItem = query;

  if(!baseItem.data()) {
    await initializeBaseItem(itemName)
  }
}

export async function addItemToList(itemName) {

    const baseItem = await getBaseItem(itemName);
    await setDoc(doc(db, "shopping-list", itemName), {
    name: itemName,
    quantity: 1,
    unit: baseItem.unit,
    store: baseItem.store,
    isDiscounted: false,
    notes: "",
    addedBy: "wombat",
    addedAt: new Date().toLocaleDateString(),
    tags: baseItem.tags,
  })
}

async function getBaseItem(name) {
  await checkForBaseItem(name);

  const query = await getDoc(doc(db, "items", name));
  let baseItem = query;

  return  baseItem.data();

}

export async function getData() {
  const dataset = await getDocs(collection(db, "shopping-list"));

  return dataset;
}

export async function getDetailedInformation(id) {
  const data = await getDoc(doc(db, "shopping-list", id));

  return data.data();
}

export async function updateEntries(
  id,
  name,
  quantity,
  unit,
  store,
  discounted,
  notes,
  tags
) {
  await updateDoc(doc(db, "shopping-list", id), {
    name: name,
    quantity: quantity,
    unit: unit,
    store: store,
    isDiscounted: discounted,
    notes: notes,
    tags: tags,
  });

  updateBaseItem(id, name, unit, store, tags)
}

export async function updateBaseItem(id, name, unit, store, tags) {
  await updateDoc(doc(db, "items", id), {
    name: name,
    unit: unit,
    store: store,
    tags: tags,
  });
  
}

export async function deleteEntry(id) {
  await deleteDoc(doc(db, "shopping-list", id));
}
