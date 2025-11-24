document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.getElementById("mochiBackdrop");
    const closeBtn = document.getElementById("mochiClose");
    const form = document.getElementById("mochiForm");
    const basePriceEl = document.getElementById("mochiBasePrice");
    const totalPriceEl = document.getElementById("mochiTotalPrice");
    const qtyEl = document.getElementById("mochiQty");
    const qtyMinus = document.getElementById("mochiQtyMinus");
    const qtyPlus = document.getElementById("mochiQtyPlus");
    const creamLimitText = document.getElementById("creamLimitText");
    const toppingLimitText = document.getElementById("toppingLimitText");
    let currentSize = null;
    let basePrice = 0;
    let creamLimit = 0;
    let toppingLimit = 0;
    document.querySelectorAll(".btn-buy").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            form.reset();
            qtyEl.textContent = "1";
            currentSize = null;
            basePrice = 0;
            creamLimit = 0;
            toppingLimit = 0;
            basePriceEl.textContent = "0";
            totalPriceEl.textContent = "0";
            creamLimitText.textContent = "(เลือกตามสิทธิ์ของไซส์)";
            toppingLimitText.textContent = "(เลือกตามสิทธิ์ของไซส์)";
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
    form.addEventListener("change", (e) => {
        if (e.target.name === "size") {
            currentSize = e.target.value;
            basePrice = Number(e.target.dataset.price || 0);
            basePriceEl.textContent = basePrice;
            updateLimits();
            updateTotal();
        }
        if (e.target.name === "cream") {
            enforceLimit('input[name="cream"]:checked', creamLimit,
                "เลือกครีมชีสได้สูงสุด " + creamLimit + " สกู๊ป");
        }
        if (e.target.name === "topping") {
            enforceLimit('input[name="topping"]:checked', toppingLimit,
                "เลือกท็อปปิ้งได้สูงสุด " + toppingLimit + " ตัว");
        }
    });
    function updateLimits() {
        if (currentSize === "S") {
            creamLimit = 2;
            toppingLimit = 2;
        } else if (currentSize === "L") {
            creamLimit = 3;
            toppingLimit = 4;
        } else {
            creamLimit = 0;
            toppingLimit = 0;
        }
        if (creamLimit > 0) {
            creamLimitText.textContent = `(เลือกได้สูงสุด ${creamLimit} สกู๊ป)`;
        }
        if (toppingLimit > 0) {
            toppingLimitText.textContent = `(เลือกได้สูงสุด ${toppingLimit} ตัว)`;
        }
        enforceLimit('input[name="cream"]:checked', creamLimit);
        enforceLimit('input[name="topping"]:checked', toppingLimit);
    }
    function enforceLimit(selector, limit, message) {
        if (!limit) return;
        const items = Array.from(form.querySelectorAll(selector));
        if (items.length > limit) {
            const last = items[items.length - 1];
            last.checked = false;
            if (message) {
                alert(message);
            }
        }
    }
    function updateTotal() {
        const qty = parseInt(qtyEl.textContent, 10) || 1;
        const total = basePrice * qty;
        totalPriceEl.textContent = total;
    }
    qtyMinus.addEventListener("click", () => {
        let qty = parseInt(qtyEl.textContent, 10) || 1;
        if (qty > 1) {
            qty--;
            qtyEl.textContent = qty;
            updateTotal();
        }
    });
    qtyPlus.addEventListener("click", () => {
        let qty = parseInt(qtyEl.textContent, 10) || 1;
        qty++;
        qtyEl.textContent = qty;
        updateTotal();
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!currentSize) {
            alert("กรุณาเลือกไซส์ก่อนค่ะ");
            return;
        }
        const creams = form.querySelectorAll('input[name="cream"]:checked');
        const toppings = form.querySelectorAll('input[name="topping"]:checked');
        if (creams.length === 0) {
            alert("กรุณาเลือกครีมชีสอย่างน้อย 1 สกู๊ป");
            return;
        }
        if (toppings.length === 0) {
            alert("กรุณาเลือกท็อปปิ้งอย่างน้อย 1 ตัว");
            return;
        }
        alert("เพิ่ม Cream Cheese Mochi ลงตะกร้าเรียบร้อย!\nราคารวม " +
            totalPriceEl.textContent + " บาท");
        closeModal();
    });
});