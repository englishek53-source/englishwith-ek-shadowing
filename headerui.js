/* ============================================================
   EnglishWith_EK — Header UI polish (top-bar redesign tail)
   ------------------------------------------------------------
   Loaded WITH the other scripts (before the main inline script),
   but it only acts on window "load", after the main script has
   defined its globals — same technique as practice.js.

   Job: the lesson-number chip is hidden in the course view for a
   clean visual hierarchy, but it must reappear with the category
   name while a Library item is open in the player. setModeUI()
   lives past the editable region of index.html, so we wrap it
   here and force the chip visibility after the original logic.
   ============================================================ */
window.addEventListener("load", function () {

  if (typeof setModeUI !== "function") return;

  var originalSetModeUI = setModeUI;
  window.setModeUI = function (mode) {
    originalSetModeUI(mode);
    var lessonNumber = document.getElementById("lessonNumber");
    if (lessonNumber) {
      lessonNumber.style.display = (mode === "library") ? "" : "none";
    }
  };

});
