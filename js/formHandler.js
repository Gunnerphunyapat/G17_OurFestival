document.addEventListener("DOMContentLoaded", function () {

    // ====== 1) Submit Form → ส่งไป save_registration.php ======
    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const surname = document.getElementById("surname").value.trim();
            const gender = document.querySelector('input[name="gender"]:checked');
            const email = document.getElementById("emailaddress").value.trim();
            const phone = document.getElementById("phonenumber").value.trim();

            if (!name || !surname || !gender || !email || !phone) {
                alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
                return;
            }

            const payload = {
                name,
                surname,
                gender: gender.value,
                email,
                phone
            };

            try {
                const res = await fetch("save_registration.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();

                if (data.success) {
                    window.location.href = "register_summary.html";
                } else {
                    alert("บันทึกข้อมูลล้มเหลว: " + data.message);
                }

            } catch (err) {
                alert("เกิดข้อผิดพลาด: " + err);
            }
        });
    }

    // ====== 2) Summary Page → โหลดข้อมูลจาก get_registration.php ======
    const summaryDiv = document.getElementById("summaryList");

    if (summaryDiv) {
        loadSummary();
    }

    async function loadSummary() {
        try {
            const res = await fetch("get_registration.php");
            const users = await res.json();

            if (!users || users.length === 0) {
                summaryDiv.innerHTML = "<p>ยังไม่มีผู้ลงทะเบียน</p>";
                return;
            }

            let table = `
            <table class="table table-striped table-bordered mt-4">
              <thead class="table-dark">
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
            `;

            users.forEach((u, i) => {
                table += `
                <tr>
                  <td>${i + 1}</td>
                  <td>${u.name}</td>
                  <td>${u.surname}</td>
                  <td>${u.gender}</td>
                  <td>${u.email}</td>
                  <td>${u.phone}</td>
                  <td>${u.time}</td>
                </tr>`;
            });

            table += "</tbody></table>";
            summaryDiv.innerHTML = table;

        } catch (err) {
            summaryDiv.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ</p>";
        }
    }
});
