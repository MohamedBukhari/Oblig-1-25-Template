document.addEventListener("DOMContentLoaded", () => {
  /* 
     open \ close books --->
  */

  const bookView = document.getElementById("book-view");
  const spellPages = document.querySelectorAll(".spell-page");

  function hideAllPages() {
    spellPages.forEach((page) => page.classList.add("hidden"));
  }

  function openPage(pageId) {
    bookView.classList.remove("hidden");
    hideAllPages();
    document.getElementById(pageId).classList.remove("hidden");
  }

  document.getElementById("close-tome").addEventListener("click", () => {
    bookView.classList.add("hidden");
    hideAllPages();
  });

  document
    .getElementById("change-password-book-cover")
    .addEventListener("click", () => openPage("change-password-book"));

  document
    .getElementById("change-name-book-cover")
    .addEventListener("click", () => openPage("change-name-book"));

  document
    .getElementById("summon-familiar-book-cover")
    .addEventListener("click", () => openPage("summon-familiar-book"));

  /* 
     change password form event listener
  */

  document
    .getElementById("change-password-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const password = document.getElementById("password").value;
      const repeatPassword = document.getElementById("repeat-password").value;

      if (password === repeatPassword) {
        console.log("Successfully changed password");
        event.target.reset();
      } else {
        console.log("Password does not match. Try again.");
      }
    });

  /* 
     rename wizard
  */

  function updateWizardNameAndTitle(name, adjective) {
    document
      .querySelectorAll(".wizard-name")
      .forEach((el) => (el.textContent = name || "Mexyll"));

    document
      .querySelectorAll(".wizard-adjective")
      .forEach((el) => (el.textContent = adjective || "Magnificent"));
  }

  document
    .getElementById("rename-wizard-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("wizard-name").value;
      const adjective = document.getElementById("wizard-adjective").value;

      updateWizardNameAndTitle(name, adjective);
    });

  /* 
     summon familiar
 */

  const hasWingsCheckbox = document.getElementById("has-wings");
  const wingsSelection = document.getElementById("wings-selection");

  hasWingsCheckbox.addEventListener("change", () => {
    wingsSelection.classList.toggle("hidden", !hasWingsCheckbox.checked);
  });

  const moodDescriptions = [
    "Angry",
    "Grumpy",
    "Irate",
    "Apathetic",
    "Sleepy",
    "Hesitant",
    "Inspired",
    "Thankful",
    "Confident",
    "Curious",
    "Joyful",
  ];

  const moodRange = document.getElementById("familiar-mood");
  const moodText = document.getElementById("mood-description");

  moodRange.addEventListener("input", () => {
    moodText.textContent = moodDescriptions[moodRange.value - 1];
  });

  document.getElementById("summon-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const name = data.familiarName;
    const base = data.creatureBase;
    const wings = data.hasWings ? data.creatureWings : "No Wings";

    const customizations = [
      data.custFireBreath,
      data.custExtraHead,
      data.custLevitating,
    ].filter(Boolean);

    const mood = moodDescriptions[data.familiarMood - 1];
    const contractEnd = data.contractEnd || "an unknown date";

    const customizationText = customizations.length
      ? ` It has the following customizations: ${customizations.join(", ")}.`
      : " It has no customizations.";

    alert(
      `You have summoned: ${name}, a ${base} with ${wings}.` +
        `${customizationText} It appears to be ${mood}. ` +
        `The contract ends on ${contractEnd}.`,
    );

    event.target.reset();
    wingsSelection.classList.add("hidden");
  });
});