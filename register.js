import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CLOUD_NAME = "qfi6xcnp";
const UPLOAD_PRESET = "qr_uploads";

const form = document.getElementById("registrationForm");

const submitBtn = document.getElementById("submitBtn");

async function uploadToCloudinary(file) {
  if (!file) return "";

  const fd = new FormData();

  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: fd,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error.message);
  }

  return data.secure_url;
}

function randomID() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

  let id = "";

  for (let i = 0; i < 12; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return id;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;

  submitBtn.innerHTML = "Uploading...";

  try {
    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const gender = document.getElementById("gender").value;

    const dob = document.getElementById("dob").value;

    const nationality = document.getElementById("nationality").value.trim();

    const address = document.getElementById("address").value.trim();

    const photo = document.getElementById("photo").files[0];

   
    submitBtn.innerHTML = "Uploading Photo...";

    const photoUrl = await uploadToCloudinary(photo);

  
    const registrationId = randomID();

    const verifyURL = `${location.origin}${location.pathname.replace("register.html", "verify.html")}?id=${registrationId}`;

    submitBtn.innerHTML = "Generating QR Code...";

    const qrURL =
      "https://quickchart.io/qr?size=500&text=" + encodeURIComponent(verifyURL);

    await setDoc(doc(db, "registrations", registrationId), {
      registrationId,

      fullName,

      email,

      phone,

      gender,

      dob,

      nationality,

      address,

      status: "ACCEPTED",

      photoUrl,

      qrCode: qrURL,

      verifyURL,

      createdAt: serverTimestamp(),
    });

    document.getElementById("qrImage").src = qrURL;

    document.getElementById("qrLink").href = verifyURL;

    document.getElementById("registrationID").innerText = registrationId;

    document.getElementById("successBox").style.display = "block";

    form.reset();

    window.scrollTo({
      top: document.body.scrollHeight,

      behavior: "smooth",
    });
  } catch (err) {
    console.error(err);

    alert(err.message);
  }

  submitBtn.disabled = false;

  submitBtn.innerHTML = "Register";
});
