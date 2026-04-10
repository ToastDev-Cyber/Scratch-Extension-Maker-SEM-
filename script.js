Blockly.defineBlocksWithJsonArray([]);

const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  renderer: "zelos",
  trashcan: true,
  scrollbars: true
});
