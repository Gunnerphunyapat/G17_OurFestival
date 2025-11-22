document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("stage");
    const miniWheel = document.getElementById("miniWheel");
    const nodes = document.querySelectorAll(".node");

    // popup หลัก (มุมขวาล่าง)
    const popup = document.getElementById("memberPopup");
    const popupImg = document.getElementById("popupImg");
    const popupName = document.getElementById("popupName");
    const popupTitle = document.getElementById("popupTitle");
    const popupBio = document.getElementById("popupBio");

    // popup 
    const popupNameBox = document.getElementById("popupNameBox");
    const popupSurnameBox = document.getElementById("popupSurnameBox");
    const popupRoleBox = document.getElementById("popupRoleBox");
    const popupDataBox = document.getElementById("popupDataBox");
    const popupImgBox = document.getElementById("popupImgBox");
    const popupImgRole = document.getElementById("popupImgRole");

    // overlay
    const overlay = document.getElementById("overlay");

    // --------------------------------------------------
    // ฟังก์ชันซ่อน popup ทั้งหมด
    // --------------------------------------------------
    function hideAllPopups() {
        [popupNameBox, popupSurnameBox, popupRoleBox, popupDataBox, popupImgBox].forEach(p => {
            p.classList.remove("show");
            p.classList.add("hidden");
        });

        popup.classList.remove("show");
        popup.classList.add("hidden");

        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    }

    // --------------------------------------------------
    // แสดง popup 5 ตัว (จาก node)
    // --------------------------------------------------
    function showNodePopups(node) {
        popupNameBox.textContent = node.dataset.name || '';
        popupSurnameBox.textContent = node.dataset.surname || ''; 
        popupRoleBox.textContent = node.dataset.title || '';
        popupDataBox.textContent = node.dataset.bio || '';
        popupImgRole.src = node.dataset.rolepic || node.querySelector("img").src;

        [popupNameBox, popupSurnameBox, popupRoleBox, popupDataBox, popupImgBox].forEach(p => { // <-- เพิ่ม popupSurnameBox
            p.classList.remove("hidden");
            p.classList.add("show");
        });
    }

    // --------------------------------------------------
    // แสดง member-popup (มุมขวาล่าง) จาก node
    // ใช้ data-info-* ของ node
    // --------------------------------------------------
    function showPopupInfoFromNode(node) {
        popupImg.src = node.dataset.infoImg || '';
        popupName.textContent = node.dataset.infoName || '';
        popupTitle.textContent = node.dataset.infoTitle || '';
        popupBio.textContent = node.dataset.infoBio || '';

        popup.classList.remove("hidden");
        popup.classList.add("show");

        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
    }

    // --------------------------------------------------
    // คลิก node → ย่อวงล้อ + แสดง popup ทั้งหมด
    // --------------------------------------------------
    nodes.forEach(node => {
        node.addEventListener("click", e => {
            e.stopPropagation();

            stage.classList.add("compact");
            miniWheel.classList.add("show");

            // 4 popup จาก node
            showNodePopups(node);

            // popup-info แยกตาม node
            showPopupInfoFromNode(node);
        });
    });

    // --------------------------------------------------
    // คลิก overlay → ปิด popup + ขยายวงล้อกลับ
    // --------------------------------------------------
    overlay.addEventListener("click", () => {
        hideAllPopups();
        expandStage();
    });

    // --------------------------------------------------
    // popup ถูกคลิก → ซ่อน popup ทั้งหมด
    // --------------------------------------------------
    popup.addEventListener("click", hideAllPopups);
    [popupNameBox, popupSurnameBox, popupRoleBox, popupDataBox, popupImgBox].forEach(p => { // <-- เพิ่ม popupSurnameBox
        p.addEventListener("click", hideAllPopups);
    });

    // --------------------------------------------------
    // คลิกวงเล็กหรือ stage → ขยายกลับ
    // --------------------------------------------------
    function expandStage() {
        if (stage.classList.contains("compact")) {
            hideAllPopups();

            stage.classList.add("expand-back");
            stage.classList.remove("compact");

            setTimeout(() => {
                stage.classList.remove("expand-back");
                miniWheel.classList.remove("show");
            }, 300);
        }
    }

    stage.addEventListener("click", () => {
        if (stage.classList.contains("compact")) expandStage();
    });

    miniWheel.addEventListener("click", e => {
        e.stopPropagation();
        if (stage.classList.contains("compact")) expandStage();
    });


    

});

