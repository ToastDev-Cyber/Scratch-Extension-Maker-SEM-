// Define custom Browser/Technical blocks
Blockly.Blocks['browser_alert'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("browser alert");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BFFF");
  }
};

Blockly.Blocks['time_get_now'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("current timestamp");
    this.setOutput(true, "Number");
    this.setColour("#0FBD8C");
  }
};

Blockly.Blocks['technical_eval'] = {
  init: function() {
    this.appendValueInput("JS")
        .setCheck("String")
        .appendField("run raw javascript");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#575E75");
  }
};

// Initialize the Workspace with the new Toolbox
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos',
    theme: Blockly.Themes.Classic,
    grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.85 }
});
