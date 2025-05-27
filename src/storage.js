import { subjects, Subject, setIndex } from './subject.js';

export function saveSubjects() {
  const data = subjects.map(sub => ({
    name: sub.name,
    mark_cc: sub.mark_cc,
    mark_sn: sub.mark_sn,
    idx: sub.idx,
    total: sub.total
  }));
  localStorage.setItem('subjects', JSON.stringify(data));
}

export function loadSubjects() {
  const saved = localStorage.getItem('subjects');
  if (!saved) return;

  const data = JSON.parse(saved);
  let maxIdx = 0;
  
  data.forEach(subData => {
    try {
      const subject = new Subject(
        subData.name,
        subData.mark_cc,
        subData.mark_sn,
        subData.idx
      );
      subjects.push(subject);
      if (subject.idx > maxIdx) maxIdx = subject.idx;
    } catch (e) {
      console.error('Invalid subject:', e.message);
    }
  });

  setIndex(maxIdx + 1);
}