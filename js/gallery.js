const supabaseClient = supabase.createClient(
  "https://ejwneemiwnyzujcwzldf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqd25lZW1pd255enVqY3d6bGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTQ0OTEsImV4cCI6MjA5NjU5MDQ5MX0.Nqa_wsgEuJHptNhQFvb24x30mtdnC_v4EPPUzlRgooA"
);

window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const chooseBtn = document.getElementById("chooseBtn");
  const uploadBtn = document.getElementById("uploadBtn");
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("zoom");
  const closeModal = document.getElementById("X");
  const modalImage = document.getElementById("imageModal");
  const downloadBtnModal = document.getElementById("download");

  let selectedFiles = [];

  uploadBtn.style.display = "none";

  chooseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    selectedFiles = Array.from(e.target.files);
    uploadBtn.style.display = selectedFiles.length ? "inline-block" : "none";
  });

  uploadBtn.addEventListener("click", async () => {
    if (!selectedFiles.length) return;

    for (const file of selectedFiles) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabaseClient.storage
        .from("Boda")
        .upload(fileName, file);

      if (error) {
        console.error(error.message);
      }
    }

    selectedFiles = [];
    fileInput.value = "";
    uploadBtn.style.display = "none";

    await loadGallery();
  });

  async function loadGallery() {
    const { data, error } = await supabaseClient.storage
      .from("Boda")
      .list("", { limit: 100 });

    if (error) {
      console.error(error.message);
      return;
    }

    gallery.innerHTML = "";

    for (const file of data) {
      const url = supabaseClient.storage
        .from("Boda")
        .getPublicUrl(file.name).data.publicUrl;

      const ext = file.name.split(".").pop().toLowerCase();

      let media;

      if (["mp4", "webm", "mov", "mkv", "avi"].includes(ext)) {
        media = document.createElement("video");
        media.src = url;
        media.controls = true;
      } else {
        media = document.createElement("img");
        media.src = url;
        media.alt = file.name;
        media.classList.add("photos");
      }

      media.addEventListener("click", () => {
      modalImage.src = url;

      downloadBtnModal.download = file.name;
      downloadBtnModal.href = url;

      document.body.style.overflow = "hidden";
      modal.classList.add("active");
    });
      
      const card = document.createElement("div");
      card.classList.add("post");

      card.appendChild(media);

      gallery.appendChild(card);
    }
  }

  loadGallery();

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", (e) => {
  if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

});