document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("username").value.trim();
      const message = document.getElementById("feedbackMessage").value.trim();
      const rating = document.getElementById("rating").value;

      if (!name || !rating) {
        alert("กรุณากรอกชื่อและเลือกคะแนนประเมิน");
        return;
      }

      try {
        const res = await fetch("save_feedback.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message, rating })
        });
        const result = await res.json();
        if (result.success) {
          window.location.href = "feedback_summary.html";
        } else {
          alert("บันทึก Feedback ล้มเหลว: " + result.message);
        }
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      }
    });
  }

  const summaryDiv = document.getElementById("feedbackSummary");
  if (summaryDiv) {
    loadFeedback();
  }

  async function loadFeedback() {
    try {
      const res = await fetch("get_feedback.php");
      const feedbacks = await res.json();

      if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
        summaryDiv.innerHTML = "<p class='text-center'>ยังไม่มีข้อมูล Feedback</p>";
        return;
      }

      const avg =
        feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) / feedbacks.length;

      let html = `
        <h5 class="text-center mb-3">Average Rating: ⭐ ${avg.toFixed(1)}</h5>
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th>No.</th>
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

    } catch (err) {
      summaryDiv.innerHTML = "<p>โหลดข้อมูล Feedback ล้มเหลว</p>";
    }
  }
});
