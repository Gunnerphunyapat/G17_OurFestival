document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("stage");
    const miniWheel = document.getElementById("miniWheel");
    const nodes = document.querySelectorAll(".node");

    const popup = document.getElementById("memberPopup");
    const popupImg = document.getElementById("popupImg");
    const popupName = document.getElementById("popupName");
    const popupTitle = document.getElementById("popupTitle");
    const popupBio = document.getElementById("popupBio");

    const popupNameBox = document.getElementById("popupNameBox");
    const popupSurnameBox = document.getElementById("popupSurnameBox");
    const popupRoleBox = document.getElementById("popupRoleBox");
    const popupDataBox = document.getElementById("popupDataBox");
    const popupImgBox = document.getElementById("popupImgBox");
    const popupImgRole = document.getElementById("popupImgRole");

    const overlay = document.getElementById("overlay");

    let activeNode = null;

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

    function showNodePopups(node) {
        popupNameBox.textContent = node.dataset.name || '';
        popupSurnameBox.textContent = node.dataset.surname || '';
        popupRoleBox.textContent = node.dataset.title || '';
        popupDataBox.textContent = node.dataset.bio || '';
        popupImgRole.src = node.dataset.rolepic || node.querySelector("img").src;

        popupRoleBox.className = "popup-single show";

    // เพิ่ม class ตามตำแหน่งบทบาท
    switch(node.dataset.title) {
        case 'Project Manager': popupRoleBox.classList.add('role-PM'); break;
        case 'Product Owner':   popupRoleBox.classList.add('role-PO'); break;
        case 'Team Lead':       popupRoleBox.classList.add('role-TL'); break;
        case 'QA Team':         popupRoleBox.classList.add('role-QA'); break;
        case 'Scrum Master':    popupRoleBox.classList.add('role-SM'); break;
        case 'Developer':       popupRoleBox.classList.add('role-DEV'); break;
        case 'Soft. Architect': popupRoleBox.classList.add('role-SA'); break;
        case 'UX/UI Designer':  popupRoleBox.classList.add('role-UXUI'); break;
        case 'Testers':         popupRoleBox.classList.add('role-TESTER'); break;
        case 'Bus. Analyst':    popupRoleBox.classList.add('role-BA'); break;
    }

        [popupNameBox, popupSurnameBox, popupRoleBox, popupDataBox, popupImgBox].forEach(p => {
            p.classList.remove("hidden");
            p.classList.add("show");
        });
    }

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

    nodes.forEach(node => {
        node.addEventListener("click", e => {
            e.stopPropagation();
            if (activeNode) activeNode.classList.remove("active");
            node.classList.add("active");
            activeNode = node;

            stage.classList.add("compact");
            miniWheel.classList.add("show");

            showNodePopups(node);
            showPopupInfoFromNode(node);
        });
    });

    overlay.addEventListener("click", () => {
        expandStage();
    });

    popup.addEventListener("click", () => expandStage());
    [popupNameBox, popupSurnameBox, popupRoleBox, popupDataBox, popupImgBox].forEach(p => {
        p.addEventListener("click", () => expandStage());
    });

    function expandStage() {
        if (stage.classList.contains("compact")) {
            hideAllPopups();
            if (activeNode) { activeNode.classList.remove("active"); activeNode = null; }
            stage.classList.add("expand-back");
            stage.classList.remove("compact");
            setTimeout(() => { stage.classList.remove("expand-back"); miniWheel.classList.remove("show"); }, 300);
        }
    }

    stage.addEventListener("click", () => { if (stage.classList.contains("compact")) expandStage(); });
    miniWheel.addEventListener("click", e => { e.stopPropagation(); if (stage.classList.contains("compact")) expandStage(); });

});