// array of subjects, this is met to hold all the subjects 

import { saveSubjects } from "./storage";

// records.
let subjects = [];

// index variable
let idx = 1;

export function getNextIndex() {
    return idx++;
}
  
export function setIndex(newIndex) {
    idx = newIndex;
}

// feedback function
export function showFeedback(message, isError = false) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = isError ? 'error' : 'success';
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 3000);
  }

function add (subject)
{
    if (subject instanceof Subject) 
    {
        // check if the subject name already exists inside the subjects global variable.
        const exists = subjects.some(sub => sub.name.toLowerCase() === subject.name.toLowerCase());
        if (exists) {
            showFeedback('Subject already exists!', true);
            return false;
        }

        if (subject.name === "") {
            showFeedback("You need to provide the name of the subject you want to add!", true)
            return false;
        }
        if (subject.mark_cc > 20 || subject.mark_cc < 0) {
            showFeedback("The mark for the cc can not be less or greater than zero!", true);
            return false;
        }
        if (subject.mark_sn > 20 || subject.mark_sn < 0) {
            showFeedback("The mark for the cc can not be less or greater than zero!", true);
            return false;
        }
        subjects.push(subject);
        showFeedback("subject add successfully");
        // save the subject to localStorage.
        saveSubjects();
    }
    else 
    {
        throw new Error(`the ${subject} is not an instance of the Subject class`);
    }
    return true;
}

export function remove (index)
{
    const idx = subjects.findIndex(subject => subject.idx === index);
    if (idx !== -1)
    {
        subjects.splice(index - 1, 1);
        // save to localStorage
        saveSubjects();
    }
    else 
    {
        showFeedback("subject not found!");
        return;
    }
}

export function update(targetIdx, newName, newCC, newSN) {
    const subject = subjects.find(sub => sub.idx === targetIdx);
    if (!subject) return false;
  
    try {
      // Validate using temporary subject
      const temp = new Subject(newName, newCC, newSN);
      
      // Check for duplicate names
      const nameExists = subjects.some(sub => 
        sub.idx !== targetIdx && 
        sub.name.toLowerCase() === temp.name.toLowerCase()
      );
      
      if (nameExists) {
        showFeedback('Subject name already exists', true);
        return false;
      }
  
      // Update values
      subject.name = temp.name;
      subject.mark_cc = temp.mark_cc;
      subject.mark_sn = temp.mark_sn;
      subject.computeTotal();
      
      saveSubjects();
      return true;
    } catch (e) {
      showFeedback(e.message, true);
      return false;
    }
  }

function escapeHTML (str)
{
    return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function get () 
{
    return subjects.map(sub => {
        return `
            <tr>
              <td>${sub.idx}</td>
              <td>${escapeHTML(sub.name)}</td>
              <td>${sub.mark_cc}</td>
              <td>${sub.mark_sn}</td>
              <td>${sub.total.toFixed(2)}</td>
            </tr>
        `;
    });
}

// the subject class
class Subject {
    constructor(name, mark_cc, mark_sn, id) {
        // Validation
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Subject name is required');
        }
        if (isNaN(mark_cc) || mark_cc < 0 || mark_cc > 20) {
            throw new Error('CC mark must be 0-20');
        }
        if (isNaN(mark_sn) || mark_sn < 0 || mark_sn > 20) {
            throw new Error('SN mark must be 0-20');
        }   

        if (id !== undefined) {
            this.idx = id; // For loading existing subjects
        } else {
            this.idx = idx++; // For new subjects
        }

        this.name = name.trim();
        this.mark_cc = Number(mark_cc);
        this.mark_sn = Number(mark_sn);
        this.computeTotal();
    }

    computeTotal() {
        this.total = (this.mark_cc * 0.4) + (this.mark_sn * 0.6);
    }
}

export { Subject, get, add,  subjects, };