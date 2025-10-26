document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");

  // ✅ หน้าฟอร์ม feedback.html
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("username").value.trim();
      const message = document.getElementById("Feedback message").value.trim();
      const rating = document.getElementById("rating").value;

      // ✅ บังคับ name + rating
      if (!name || !rating) {
        alert("กรุณากรอกชื่อและเลือกคะแนนประเมิน");
        return;
      }

      // ดึง feedback เก่า
      const feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

      // เพิ่ม feedback ใหม่
      feedbacks.push({
        name,
        message: message || "(No feedback message)",
        rating,
        time: new Date().toLocaleString(),
      });

      // เก็บกลับเข้า localStorage
      localStorage.setItem("feedbackData", JSON.stringify(feedbacks));

      alert("บันทึกความคิดเห็นเรียบร้อยแล้ว!");
      feedbackForm.reset();

      // ✅ ไปหน้า summary
      window.location.href = "feedback_summary.html";
    });
  }

  // ✅ หน้าสรุป feedback_summary.html
  const summaryDiv = document.getElementById("feedbackSummary");
  if (summaryDiv) {
    const feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

    if (feedbacks.length === 0) {
      summaryDiv.innerHTML =
        "<p class='text-center'>ยังไม่มีข้อมูล Feedback</p>";
      return;
    }

    // ✅ คำนวณค่าเฉลี่ยคะแนน
    const avg =
      feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) / feedbacks.length;

   

    let html = `
      <h5 class="text-center mb-3">Average Rating: ⭐ ${avg.toFixed(1)}</h5>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Message</th>
            <th>Rating</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
    `;

    feedbacks.forEach((f, i) => {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${f.name}</td>
          <td>${f.message}</td>
          <td>${"⭐".repeat(f.rating)}</td>
          <td>${f.time}</td>
        </tr>
      `;
    });

    html += "</tbody></table>";
    summaryDiv.innerHTML = html;
  }
});

 // localStorage.clear();  เอาไว้ล้าง ประวัติ feedback