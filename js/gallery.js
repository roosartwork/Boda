const supabaseClient = supabase.createClient(
  "https://ejwneemiwnyzujcwzldf.supabase.co",
  "YOUR_ANON_KEY"
);

window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const chooseBtn = document.getElementById("chooseBtn");
  const uploadBtn = document.getElementById("uploadBtn");
  const gallery = document.getElementById("gallery");

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
        .from("boda")
        .upload(fileName, file);

      if (error) {
        console.error(error.message);
      }
    }

    selectedFiles = [];
    fileInput.value = "";
    uploadBtn.style.display = "none";

    loadGallery();
  });

  async function loadGallery() {
    const { data, error } = await supabaseClient.storage
      .from("boda")
      .list("", { limit: 100 });

    if (error) {
      console.error(error.message);
      return;
    }

    gallery.innerHTML = "";

    for (const file of data) {
      const url = supabaseClient.storage
        .from("boda")
        .getPublicUrl(file.name).data.publicUrl;

      const ext = file.name.split(".").pop().toLowerCase();

      let media;

      if (["mp4", "webm", "mov"].includes(ext)) {
        media = document.createElement("video");
        media.src = url;
        media.controls = true;
        media.width = 300;
      } else {
        media = document.createElement("img");
        media.src = url;
        media.width = 300;
      }

      gallery.appendChild(media);

      const download = document.createElement("a");
      download.href = url;
      download.download = "";
      download.textContent = "Download";

      gallery.appendChild(download);
      gallery.appendChild(document.createElement("hr"));
    }
  }

  loadGallery();
});