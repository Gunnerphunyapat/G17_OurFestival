async function loadSummary() {
    try {
        const res = await fetch("get_registration.php");
        const users = await res.json();

        if (!Array.isArray(users) || users.length === 0) {
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
                </tr>
            `;
        });

        table += "</tbody></table>";
        summaryDiv.innerHTML = table;

    } catch (err) {
        summaryDiv.innerHTML = "<p>โหลดข้อมูลล้มเหลว</p>";
    }
}
