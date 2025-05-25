import { add, get, Subject, subjects, update } from "./subject";

const subject_name = document.getElementById("subject-name");
const subject_mark_cc = document.getElementById("subject-mark-cc");
const subject_mark_sn = document.getElementById("subject-mark-sn");
const submit_btn = document.getElementById("submit");
const modify_btn = document.getElementById("modify");
const delete_btn = document.getElementById("delete");

delete_btn.addEventListener("click", () => {
  const index = prompt("Enter the row number to delete:");
  if (index === null) return; // User cancelled

  const idxToDelete = Number(index);
  if (isNaN(idxToDelete)) {
    alert("Please enter a valid number.");
    return;
  }

  remove(idxToDelete);

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = get().join('');

  // save();
});

modify_btn.addEventListener("click", () => {
  const index = prompt("Enter the row number to modify:");
  if (index === null) return;

  const idxToModify = Number(index);
  if (isNaN(idxToModify)) {
    alert("Invalid number.");
    return;
  }

  const subject = subjects.find(sub => sub.idx === idxToModify);
  if (!subject) {
    alert("Subject not found.");
    return;
  }

  const newName = prompt("Enter new name:", subject.name);
  if (newName === null) return;

  const newCC = prompt("Enter new CC mark (0-20):", subject.mark_cc);
  if (newCC === null) return;
  const ccNum = Number(newCC);
  if (isNaN(ccNum) || ccNum < 0 || ccNum > 20) {
    alert("CC mark must be between 0 and 20.");
    return;
  }

  const newSN = prompt("Enter new SN mark (0-20):", subject.mark_sn);
  if (newSN === null) return;
  const snNum = Number(newSN);
  if (isNaN(snNum) || snNum < 0 || snNum > 20) {
    alert("SN mark must be between 0 and 20.");
    return;
  }

  update(idxToModify, newName, ccNum, snNum);

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = get().join('');
});

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = subject_name.value;
  const mark_cc = subject_mark_cc.value;
  const mark_sn = subject_mark_sn.value;

  // calcul the total mark.
  if (isNaN(mark_cc) || isNaN(mark_sn)) {
    alert("the mark for the cc or the sn is not a number!!\nplease change it to number.");
    return;
  }

  // convert to numeric.
  const cc = Number(mark_cc);
  const sn = Number(mark_sn);

  const subject = new Subject(name, cc, sn);

  if (add(subject)) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = get().join("");
    
    subject_name.value = '';
    subject_mark_cc.value = '';
    subject_mark_sn.value = '';
  }

});