import { db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const id = new URLSearchParams(window.location.search).get("id");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");

if (!id) {
  loading.style.display = "none";
  error.classList.remove("hidden");
  throw new Error("Missing Registration ID");
}

const verificationCodes = [
  ["Abebe Tadesse Bekele", "Ep0163552"],
  ["Dawit Alemayehu Tesfaye", "Ep9324180"],
  ["Biruk Getachew Assefa", "Ep6788618"],
  ["Henok Girma Kebede", "Ep4453058"],
  ["Natnael Haile Mesfin", "Ep6147332"],
  ["Yonas Belay Demissie", "Ep2988511"],
  ["Elias Fikru Endale", "Ep4874928"],
  ["Bereket Mengistu Ayele", "Ep6542195"],
  ["Kalkidan Teshome Workneh", "Ep9071517"],
  ["Meron Tigabu Tadesse", "Ep5894646"],
  ["Selamawit Mekonnen Bekele", "Ep0127121"],
  ["Bethlehem Girma Asfaw", "Ep4228909"],
  ["Hana Abebe Tesfaye", "Ep9530515"],
  ["Tigist Alemu Demissie",  "Ep8898937"],
  ["Rahel Kebede Fikadu", "Ep4839555"],
  ["Ruth Hailemariam Assefa", "Ep8094327"],
  ["Eyerusalem Getachew Belay", "Ep6642572"],
  ["Mihret Tadesse Wondimu", "Ep4830357"],
  ["Biniam Desta Ayalew", "Ep9501125"],
  ["Fitsum Bekele Mengesha", "Ep7433605"],
  ["Solomon Endris Kassaye", "Ep2189543"],
];

async function loadApplicant() {
  try {
    const ref = doc(db, "registrations", id);
    const snap = await getDoc(ref);

    loading.style.display = "none";

    // Always show verification codes
    const tbody = document.getElementById("codesTable");
    tbody.innerHTML = "";

    verificationCodes.forEach(([name, code]) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${name}</td>
        <td>${code}</td>
      `;

      tbody.appendChild(row);
    });

    if (!snap.exists()) {
      error.classList.remove("hidden");
      return;
    }

    const data = snap.data();

    error.classList.add("hidden");
    result.classList.remove("hidden");

    document.getElementById("fullName").textContent = data.fullName || "";
    document.getElementById("email").textContent = data.email || "";
    document.getElementById("phone").textContent = data.phone || "";
    document.getElementById("gender").textContent = data.gender || "";
    document.getElementById("dob").textContent = data.dob || "";
    document.getElementById("nationality").textContent = data.nationality || "";
    document.getElementById("address").textContent = data.address || "";
    document.getElementById("registrationId").textContent =
      data.registrationId || id;

    const photoUrl =
      data.photoUrl || "https://i.ibb.co/tB6f9CH/default-applicant.jpg";

    document.getElementById("photo").src = photoUrl;
    document.getElementById("photoPreview").src = photoUrl;
    document.getElementById("photoLink").href = photoUrl;
  } catch (err) {
    console.error(err);

    loading.style.display = "none";
    error.classList.remove("hidden");
  }
}

loadApplicant();
