// 取得元素
const birthDateInput = document.getElementById("birthDate");
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const dialog = document.getElementById("resultDialog");
const dialogCloseBtn = document.getElementById("dialogClose");
const resultText = document.getElementById("resultText");

// 把今天設定成日期輸入最大值，避免選到未來
(function setMaxDateToToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  birthDateInput.max = `${yyyy}-${mm}-${dd}`;
})();

// 計算狗狗年齡（年為單位，含小數）
function calculateDogAgeYears(birthDate) {
  const now = new Date();
  const birth = new Date(birthDate);

  if (isNaN(birth.getTime()) || birth > now) {
    return null;
  }

  const diffMs = now - birth;
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return years;
}

// 使用 UCSD 公式轉換成人類年齡
function convertDogToHumanYears(dogAgeYears) {
  if (dogAgeYears <= 0) return null;
  const humanAge = 16 * Math.log(dogAgeYears) + 31; // ln = Math.log
  return humanAge;
}

// 顯示結果的對話框
function showResultDialog(dogAgeYears, humanAgeYears) {
  const dogAgeDisplay = dogAgeYears.toFixed(1);
  const humanAgeDisplay = humanAgeYears.toFixed(1);

  resultText.textContent = `妙麗是 ${dogAgeDisplay} 歲狗狗，換算成人類大約是 ${humanAgeDisplay} 歲。`;
  dialog.style.display = "flex";
}

// 關閉對話框
function closeDialog() {
  dialog.style.display = "none";
}

// 按下「開始計算」
calcBtn.addEventListener("click", () => {
  const birthValue = birthDateInput.value;

  if (!birthValue) {
    alert("請先選擇妙麗的出生日期 🐾");
    return;
  }

  const dogAgeYears = calculateDogAgeYears(birthValue);
  if (dogAgeYears === null || dogAgeYears <= 0) {
    alert("出生日期不合法，請重新選擇。");
    return;
  }

  const humanAgeYears = convertDogToHumanYears(dogAgeYears);
  if (humanAgeYears === null || isNaN(humanAgeYears)) {
    alert("無法計算人類年齡，請確認日期是否正確。");
    return;
  }

  showResultDialog(dogAgeYears, humanAgeYears);
});

// 按下「清除」
clearBtn.addEventListener("click", () => {
  birthDateInput.value = "";
});

// 關閉對話框事件
dialogCloseBtn.addEventListener("click", closeDialog);

// 點擊背景也關閉
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

// ESC 也可以關閉
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.style.display === "flex") {
    closeDialog();
  }
});
// =============================
// 📝 妙麗小小備忘錄（localStorage）
// =============================

const NOTE_KEY = "hermione-note"; // 存在 localStorage 裡的 key 名稱
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const noteDisplay = document.getElementById("noteDisplay");

// 保護一下：如果之後這支 JS 被用在別的頁面沒有記事本，就不會報錯
if (noteInput && saveNoteBtn && noteDisplay) {
  // 頁面載入時，先嘗試把以前存的內容讀出來
  const saved = localStorage.getItem(NOTE_KEY);
  if (saved) {
    noteInput.value = saved;
    noteDisplay.textContent = "目前儲存的文字：" + saved;
  }

  // 按下「儲存備忘錄」時，把文字存進 localStorage
  saveNoteBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();

    // 存進 localStorage
    localStorage.setItem(NOTE_KEY, text);

    // 更新畫面顯示
    noteDisplay.textContent = text
      ? "目前儲存的文字：" + text
      : "目前還沒有儲存任何文字。";
  });
}
