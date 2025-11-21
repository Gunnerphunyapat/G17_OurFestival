const stage = document.getElementById("stage");
const miniWheel = document.getElementById("miniWheel");
const nodes = document.querySelectorAll(".node");

// หมุนวงเมื่อกด node (ตัวอย่าง: หมุนรอบทวนเข็ม)
function rotateStageCW(deg = 360) {
  stage.style.transition = 'transform 0.3s ease';
  stage.style.transform = `rotate(${deg}deg) scale(${stage.classList.contains('compact') ? 0.35 : 1})`;
  setTimeout(() => { stage.style.transition = ''; stage.style.transform = ''; }, 300);
}

// ----------------------------
// คลิก node → ย่อวง + หมุนรอบทวนเข็ม
// ----------------------------
nodes.forEach(node => {
  node.addEventListener("click", e => {
    e.stopPropagation();
    stage.classList.add("compact");
    miniWheel.classList.add("show");

  });
});

// ----------------------------
// คลิก mini wheel หรือวงเล็ก → ขยายวงใหญ่ 
// ----------------------------
function expandStage() {
  if (stage.classList.contains("compact")) {
    popup.classList.remove("show");
    popup.classList.add("hidden");

    stage.classList.add("expand-back");
    stage.classList.remove("compact");
    setTimeout(() => {

      stage.classList.remove("compact");
      miniWheel.classList.remove("show");

    }, 300);
  }
}

// กดตรงวงเล็กตรงไหนก็กลับวงใหญ่
stage.addEventListener("click", expandStage);
miniWheel.addEventListener("click", e => {
  e.stopPropagation();
  expandStage();
});

// ----------------------
// POPUP มุมขวาล่าง
// ----------------------
const popup = document.getElementById("memberPopup");
const popupImg = document.getElementById("popupImg");
const popupName = document.getElementById("popupName");
const popupTitle = document.getElementById("popupTitle");
const popupBio = document.getElementById("popupBio");

// เมื่อกด node → แสดง popup
nodes.forEach(node => {
  node.addEventListener("click", e => {
    const img = node.querySelector("img").src;
    const name = node.dataset.name;
    const title = node.dataset.title;
    const bio = node.dataset.bio;

    popupImg.src = img;
    popupName.textContent = name;
    popupTitle.textContent = title;
    popupBio.textContent = bio;

    popup.classList.remove("hidden");
    popup.classList.add("show");
  });
});

// คลิกที่ popup → ซ่อน popup
popup.addEventListener("click", () => {
  popup.classList.remove("show");
  popup.classList.add("hidden");
});