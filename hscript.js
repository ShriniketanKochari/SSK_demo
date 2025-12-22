const editor = document.getElementById("editor");

let undoStack = [];
let redoStack = [];
let lastValue = "";

/* TRACK CHANGES */
editor.addEventListener("input", () => {
  undoStack.push(lastValue);   // store previous state
  lastValue = editor.value;    // update current state
  redoStack = [];              // clear redo stack
});

/* UNDO */
function undo() {
  if (undoStack.length === 0) return;

  redoStack.push(editor.value);     // move current to redo
  editor.value = undoStack.pop();   // restore last state
  lastValue = editor.value;
}

/* REDO */
function redo() {
  if (redoStack.length === 0) return;

  undoStack.push(editor.value);     // move current to undo
  editor.value = redoStack.pop();   // restore redo state
  lastValue = editor.value;
}

/* SAVE TO BACKEND (NOTEPAD) */
function save() {
  fetch("http://localhost:5000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: editor.value   // save current state only
    })
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => console.error(err));
}
