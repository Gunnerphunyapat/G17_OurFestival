document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", function (e) {
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

            const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            users.push({
                name,
                surname,
                gender: gender.value,
                email,
                phone,
                time: new Date().toLocaleString()
            });

            localStorage.setItem("registeredUsers", JSON.stringify(users));


            window.location.href = "register_summary.html";
        });
    }

    const summaryDiv = document.getElementById("summaryList");
    if (summaryDiv) {
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        if (users.length === 0) {
            summaryDiv.innerHTML = "<p>ยังไม่มีผู้ลงทะเบียน</p>";
        } else {
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
          </tr>
        `;
            });

            table += "</tbody></table>";
            summaryDiv.innerHTML = table;
        }
    }
});