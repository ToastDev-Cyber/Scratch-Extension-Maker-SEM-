const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  renderer: "zelos",
  trashcan: true,
  scrollbars: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1
  }
});

function generateCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);
}
