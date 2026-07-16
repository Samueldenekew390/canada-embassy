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
  if (!file) {
    throw new Error("Please select a passport photo.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed.");
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
  submitBtn.textContent = "Uploading...";

  try {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const nationality = document.getElementById("nationality").value.trim();
    const address = document.getElementById("address").value.trim();

    const photoFile = document.getElementById("photo").files[0];

    submitBtn.textContent = "Uploading Photo...";

    const photoUrl = await uploadToCloudinary(photoFile);

    const registrationId = randomID();

    const verifyURL = `https://canada-embassy-sigma.vercel.app/verify.html?id=${registrationId}`;

    const qrURL = `https://quickchart.io/qr?size=500&text=${encodeURIComponent(verifyURL)}`;

    submitBtn.textContent = "Saving...";

    await setDoc(doc(db, "registrations", registrationId), {
      registrationId,
      fullName,
      email,
      phone,
      gender,
      dob,
      nationality,
      address,

      photoUrl,

      status: "ACCEPTED",

      qrCode: qrURL,

      verifyURL,

      createdAt: serverTimestamp(),
    });

    document.getElementById("registrationID").textContent = registrationId;

    document.getElementById("qrImage").src = qrURL;

    document.getElementById("qrLink").href = verifyURL;

    document.getElementById("qrLink").textContent = "Open Verification Page";

    document.getElementById("successBox").style.display = "block";

    form.reset();

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  } catch (error) {
    console.error(error);

    alert(error.message);
  } finally {
    submitBtn.disabled = false;

    submitBtn.textContent = "Register";
  }
});
