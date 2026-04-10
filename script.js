
// 🧩 Scratch-like Blockly setup using ZELOS renderer
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),

  // ⭐ this makes it look closest to Scratch
  renderer: "zelos",

  trashcan: true,
  scrollbars: true,

  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },

  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: true
  }
});


//  optional: keeps workspace tidy
workspace.addChangeListener(() => {
  // you can later use this for autosave or live preview
  // console.log("blocks changed");
});


//  placeholder (future step)
// later we will convert blocks → Scratch extension JS
function generateCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);
}
