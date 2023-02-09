// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
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

async function checkForItem() {}

export async function initializeItem(itemName) {
  const docRef = await addDoc(collection(db, "items"), {
    name: itemName,
    quantity: 1,
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
    isDiscounted: false,
    notes: "",
    addedBy: "wombat",
    addedAt: new Date().toLocaleDateString(),
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

  console.log("Document written with ID: ", docRef.id);
}

export async function getData() {
  const dataset = await getDocs(collection(db, "items"));

  return dataset;
}

export async function getDetailedInformation(id) {
  const data = await getDoc(doc(db, "items", id));

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
  await updateDoc(doc(db, "items", id), {
    name: name,
    quantity: quantity,
    unit: unit,
    store: store,
    isDiscounted: discounted,
    notes: notes,
    tags: tags,
  });
}

export async function deleteEntry(id) {
  await deleteDoc(doc(db, "items", id));
}
