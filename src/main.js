import { loadSubjects, saveSubjects } from "./storage";
import { add, get, remove, showFeedback, Subject, subjects, update } from "./subject";

const subject_name = document.getElementById("subject-name");
const subject_mark_cc = document.getElementById("subject-mark-cc");
const subject_mark_sn = document.getElementById("subject-mark-sn");
const submit_btn = document.getElementById("submit");
const modify_btn = document.getElementById("modify");
const delete_btn = document.getElementById("delete");

// load the subjects from the local storage when the site load
document.addEventListener('DOMContentLoaded', () => {
  loadSubjects();
  document.querySelector('tbody').innerHTML = get().join('');
});

delete_btn.addEventListener("click", () => {
  const index = prompt("Enter the row number to delete:");
  if (index === null) return; 

  const idxToDelete = Number(index);
  if (isNaN(idxToDelete)) {
    showFeedback("Please enter a valid number.")
    return;
  }

  remove(idxToDelete);

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = get().join('');

});

// Modify Handler
document.querySelector('tbody').addEventListener('dblclick', (e) => {
  const td = e.target.closest('td');
  if (!td) return;

  const cellIndex = td.cellIndex;
  const row = td.closest('tr');
  const idx = Number(row.cells[0].textContent);
  const subject = subjects.find(s => s.idx === idx);
  
  // Only allow editing name, cc, and sn columns
  if (!subject || cellIndex < 1 || cellIndex > 3) return;

  // Store original value
  const originalValue = td.textContent;
  
  // Enable editing
  td.contentEditable = true;
  td.focus();
  
  const finishEdit = () => {
    td.contentEditable = false;
    const newValue = td.textContent.trim();
    let isValid = true;
    let message = '';

    // Validation based on column
    let numValue = 0;
    switch(cellIndex) {
      case 1: // Name
        if (!newValue) {
          isValid = false;
          message = 'Subject name cannot be empty';
        } else if (subjects.some(s => 
          s.idx !== idx && s.name.toLowerCase() === newValue.toLowerCase()
        )) {
          isValid = false;
          message = 'Subject name already exists';
        }
        break;
        
      case 2: // CC Mark
      case 3: // SN Mark
        numValue = parseFloat(newValue);
        if (isNaN(numValue)) {
          isValid = false;
          message = 'Please enter a valid number';
        } else if (numValue < 0 || numValue > 20) {
          isValid = false;
          message = 'Mark must be between 0 and 20';
        }
        break;
    }

    if (!isValid) {
      showFeedback(message, true);
      td.textContent = originalValue;
      return;
    }

    try {
      // Update specific field
      switch(cellIndex) {
        case 1:
          subject.name = newValue;
          break;
        case 2:
          subject.mark_cc = numValue;
          break;
        case 3:
          subject.mark_sn = numValue;
          break;
      }

      // Only update total cell if marks changed
      if (cellIndex === 2 || cellIndex === 3) {
        row.cells[4].textContent = subject.total.toFixed(2);
        showFeedback('Total updated successfully');
      } else {
        showFeedback('Changes saved successfully');
      }
      
      saveSubjects();

    } catch (error) {
      td.textContent = originalValue;
      showFeedback(error.message, true);
    }
  };

  // Handle Enter key and blur
  td.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEdit();
    }
  });

  td.addEventListener('blur', finishEdit);
});

submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  try {
    const subject = new Subject(
      subject_name.value,
      subject_mark_cc.value,
      subject_mark_sn.value
    );
    
    if (add(subject)) {
      document.querySelector('tbody').innerHTML = get().join('');
      // Clear inputs
      subject_name.value = '';
      subject_mark_cc.value = '';
      subject_mark_sn.value = '';
    }
  } catch (e) {
    showFeedback(e.message, true);
  }
});