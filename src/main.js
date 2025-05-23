const subject_name = document.getElementById("subject-name");
const subject_mark = document.getElementById("subject-mark");
const subject_type = document.getElementById("subject-option");
const submit_btn = document.getElementById("submit");

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(subject_name.value);
  console.log(subject_type.value);
  console.log(subject_mark.value);

  subject_name.value = "";
  subject_mark.value = "";
  subject_type.value = "";
});