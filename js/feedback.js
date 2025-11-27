document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const consoleDiv = document.getElementById("console");
  const summaryDiv = document.getElementById("feedbackSummary");

  // Submit form
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("username").value.trim();
      const message = document.getElementById("feedbackMessage").value.trim();
      const rating = document.getElementById("rating").value;

      if (!name || !rating) {
        alert("กรุณากรอกชื่อและเลือกคะแนนประเมิน");
        return;
      }

      try {
        const res = await fetch("../php/save_feedback.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message, rating }),
        });

        const data = await res.json();

        if (consoleDiv) consoleDiv.innerText = JSON.stringify(data);

        if (data.success) {
          alert("บันทึกความคิดเห็นเรียบร้อยแล้ว!");
          feedbackForm.reset();
          window.location.href = "feedback_summary.html";
        } else {
          alert("เกิดข้อผิดพลาด: " + data.message);
        }
      } catch (err) {
        if (consoleDiv) consoleDiv.innerText = "Error: " + err;
      }
    });
  }

  // Load summary
  if (summaryDiv) {
    (async () => {
      try {
        const res = await fetch("../php/get_feedback.php");
        const feedbacks = await res.json();

        if (!feedbacks || feedbacks.length === 0) {
          summaryDiv.innerHTML = "<p>ยังไม่มีข้อมูล Feedback</p>";
          return;
        }

        const avg = feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) / feedbacks.length;

        let html = `<h5>Average Rating: ⭐ ${avg.toFixed(1)}</h5>
          <table class="table table-striped">
          <thead><tr>
            <th>No.</th><th>Name</th><th>Message</th><th>Rating</th><th>Time</th>
          </tr></thead><tbody>`;

        feedbacks.forEach((f, i) => {
          html += `<tr>
            <td>${i + 1}</td>
            <td>${f.name}</td>
            <td>${f.message}</td>
            <td>${"⭐".repeat(f.rating)}</td>
            <td>${f.time}</td>
          </tr>`;
        });

        html += "</tbody></table>";
        summaryDiv.innerHTML = html;
      } catch (err) {
        summaryDiv.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ</p>";
      }
    })();
  }
});
