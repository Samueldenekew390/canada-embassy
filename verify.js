// verify.js

import { db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = new URLSearchParams(window.location.search).get("id");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const error = document.getElementById("error");

if (!id) {
  loading.style.display = "none";

  error.classList.remove("hidden");

  throw new Error("Missing ID");
}

async function loadApplicant() {
  try {
    const ref = doc(db, "registrations", id);

    const snap = await getDoc(ref);

    loading.style.display = "none";

    if (!snap.exists()) {
      error.classList.remove("hidden");

      return;
    }

    const data = snap.data();

    result.classList.remove("hidden");

    document.getElementById("fullname").textContent = data.fullName || "";

    document.getElementById("email").textContent = data.email || "";

    document.getElementById("phone").textContent = data.phone || "";

    document.getElementById("gender").textContent = data.gender || "";

    document.getElementById("dob").textContent = data.dob || "";

    document.getElementById("nationality").textContent = data.nationality || "";

    document.getElementById("address").textContent = data.address || "";

    document.getElementById("regid").textContent = id;

    document.getElementById("photo").src = data.photoUrl || "";

    
  } catch (e) {
    loading.style.display = "none";

    error.classList.remove("hidden");

    console.error(e);
  }
}

loadApplicant();
