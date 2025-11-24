document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.getElementById("orderBackdrop");
    const closeBtn = document.getElementById("orderClose");
    const itemNameEl = document.getElementById("orderItemName");
    const basePriceEl = document.getElementById("orderBasePrice");
    const totalPriceEl = document.getElementById("orderTotalPrice");
    const qtyEl = document.getElementById("orderQty");
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");
    const orderForm = document.getElementById("orderForm");

    let currentBasePrice = 0;

    function updateTotalPrice() {
        const qty = parseInt(qtyEl.textContent, 10) || 1;
        const total = currentBasePrice * qty;
        totalPriceEl.textContent = total;
    }


    document.querySelectorAll(".btn-buy").forEach((btn) => {
        btn.addEventListener("click", () => {
            const itemName = btn.dataset.item || "สินค้า";
            const price = Number(btn.dataset.price || 0);

            itemNameEl.textContent = itemName;
            basePriceEl.textContent = price;
            currentBasePrice = price;

            orderForm.reset();
            qtyEl.textContent = "1";
            updateTotalPrice();

            backdrop.classList.add("show");
        });
    });


    function closeModal() {
        backdrop.classList.remove("show");
    }

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
    });


    qtyMinus.addEventListener("click", () => {
        let qty = parseInt(qtyEl.textContent, 10) || 1;
        if (qty > 1) {
            qty--;
            qtyEl.textContent = qty;
            updateTotalPrice();
        }
    });

    qtyPlus.addEventListener("click", () => {
        let qty = parseInt(qtyEl.textContent, 10) || 1;
        qty++;
        qtyEl.textContent = qty;
        updateTotalPrice();
    });


    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("เพิ่มลงตะกร้าเรียบร้อย!");
        closeModal();
    });
});