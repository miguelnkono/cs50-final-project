import { add, get, getLast, Subject } from "./subject";

const subject_name = document.getElementById("subject-name");
const subject_mark_cc = document.getElementById("subject-mark-cc");
const subject_mark_sn = document.getElementById("subject-mark-sn");
const submit_btn = document.getElementById("submit");

let count = 1;

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
    document.getElementsByTagName("tbody")[0].innerHTML += `
      <tr>
          <td>${subject.idx}</td>
          <td>${subject.name}</td>
          <td>${subject.mark_cc}</td>
          <td>${subject.mark_sn}</td>
          <td>${subject.total}</td>
      </tr>
    `;   
  }

});