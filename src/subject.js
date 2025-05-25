// array of subjects, this is met to hold all the subjects 
// records.
let subjects = [];

// index variable
let idx = 1;

function add (subject)
{
    if (subject instanceof Subject) 
    {
        if (subject.name === "") {
            alert("You need to provide the name of the subject you want to add!");
            return false;
        }
        if (subject.mark_cc > 20 || subject.mark_cc < 0) {
            alert("The mark for the cc can not be less or greater than zero!");
            return false;
        }
        if (subject.mark_sn > 20 || subject.mark_sn < 0) {
            alert("The mark for the cc can not be less or greater than zero!");
            return false;
        }
        subjects.push(subject);
    }
    else 
    {
        throw new Error(`the ${subject} is not an instance of the Subject class`);
    }
    return true;
}

function remove (index)
{
    const idx = subjects.findIndex(subject => subject.idx === index);
    if (idx !== -1)
    {
        subjects = subjects.filter(subject => subject.idx !== index);
    }
}

function update (idx, name, cc, sn){
    subjects.forEach(subject => {
        if (subject.idx === idx) {
            subject.name = name;
            subject.mark_cc = cc;
            subject.mark_sn = sn;
        }
    });
}

function get () 
{
    return subjects.map(sub => {
        return `
            <tr>
              <td>${sub.idx}</td>
              <td>${sub.name}</td>
              <td>${sub.mark_cc}</td>
              <td>${sub.mark_sn}</td>
              <td>${sub.total}</td>
            </tr>
        `;
    });
}



// save the subject record into a file
// async function saveAll() {
//     const subs = subjects.map((sub) => {
//         return `
//             {
//                 idx: ${sub.idx},
//                 name: ${sub.name},
//                 mark_cc: ${sub.mark_cc},
//                 mark_sn: ${sub.mark_sn},
//                 total: ${sub.total}
//             }
//         `;
//     });
//     try {
//         await writeFile("./subjects_records.json", subs);
//     } catch (err) {
//         throw new Error("error while writing to a file");
//     }
// }

// async function save() {
//     const subs = subjects.map((sub) => {
//         return `
//             {
//                 idx: ${sub.idx},
//                 name: ${sub.name},
//                 mark_cc: ${sub.mark_cc},
//                 mark_sn: ${sub.mark_sn},
//                 total: ${sub.total}
//             }
//         `;
//     });
//     try {
//         await writeFile("./subjects_records.json", subs, { flag: "a+" });
//     } catch (err) {
//         throw new Error("error while writing to a file");
//     }
// }

// the subject class
class Subject {
  static count = 0;

  #name;
  #mark_cc;
  #mark_sn;
  #idx;
  #total;

  constructor(name, mark_cc, mark_sn) {
    this.#name = name;
    this.#mark_cc = mark_cc;
    this.#mark_sn = mark_sn;
    this.#idx = idx++;
    this.computeTotal();
  }

  computeTotal ()
  {
    this.#total = (this.#mark_cc * 0.4) + (this.#mark_sn * 0.6);
    return this.#total;
  }

  get name () { return this.#name; }
  get mark_cc () { return this.#mark_cc; }
  get mark_sn () { return this.#mark_sn; }
  get idx () { return this.#idx; }
  get total () { return this.#total; }

  set name (new_name) { this.#name = new_name; }
  set mark_cc (new_cc_mark) { 
    this.#mark_cc = new_cc_mark;
    this.computeTotal();
  }
  set mark_sn (new_sn_mark) { 
    this.#mark_sn = new_sn_mark;
    this.computeTotal();
  }
}

export { Subject, get, update, add, remove, subjects, };