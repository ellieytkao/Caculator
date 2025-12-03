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
