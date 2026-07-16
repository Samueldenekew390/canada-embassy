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
  ["Abebe Tadesse Bekele", "A7K9M2P4Q"],
  ["Dawit Alemayehu Tesfaye", "D3X8L5N1R"],
  ["Biruk Getachew Assefa", "B6H2Q9T7M"],
  ["Henok Girma Kebede", "H4V8P1K6Z"],
  ["Natnael Haile Mesfin", "N9C3R7J2W"],
  ["Yonas Belay Demissie", "Y5M1X8Q4L"],
  ["Elias Fikru Endale", "E2T7N9K5A"],
  ["Bereket Mengistu Ayele", "B8P4W6R1H"],
  ["Kalkidan Teshome Workneh", "K1L9D3X7F"],
  ["Meron Tigabu Tadesse", "M7Q2A8V5N"],
  ["Selamawit Mekonnen Bekele", "S4J6P9T2Y"],
  ["Bethlehem Girma Asfaw", "B5R1K7M8C"],
  ["Hana Abebe Tesfaye", "H2N8X4Q6L"],
  ["Tigist Alemu Demissie", "T9V3P5J1R"],
  ["Rahel Kebede Fikadu", "R6K2M7D9W"],
  ["Ruth Hailemariam Assefa", "R1X8L4T5P"],
  ["Eyerusalem Getachew Belay", "E7Q3H9N2M"],
  ["Mihret Tadesse Wondimu", "M4C6R1K8V"],
  ["Biniam Desta Ayalew", "B9T5P2X7L"],
  ["Fitsum Bekele Mengesha", "F3W8J6N1Q"],
  ["Solomon Endris Kassaye", "S8M4D7R2K"],
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
