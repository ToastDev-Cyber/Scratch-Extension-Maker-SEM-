// 1. Define custom "Scratch-style" Extension block
Blockly.Blocks['ext_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Extension Name:")
        .appendField(new Blockly.FieldTextInput("My App"), "NAME");
    this.appendStatementInput("BLOCKS")
        .setCheck(null)
        .appendField("Blocks");
    this.setColour(290);
    this.setTooltip("Define your Scratch extension here");
  }
};

// 2. Initialize Workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos', // This makes it look like Scratch!
    theme: Blockly.Themes.Classic,
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true }
});

// 3. Generator Logic
function exportExtension() {
    // Note: In a full app, you'd use Blockly.JavaScript.workspaceToCode(workspace)
    // For this demo, we'll extract the "Name" field directly
    const rootBlock = workspace.getAllBlocks(false).find(b => b.type === 'ext_definition');
    
    if (!rootBlock) {
        alert("Please add an Extension Definition block!");
        return;
    }

    const extName = rootBlock.getFieldValue('NAME');
    const extId = extName.toLowerCase().replace(/[^a-z0-9]/g, '');

    const code = `
(function(Scratch) {
  class ${extId} {
    getInfo() {
      return {
        id: '${extId}',
        name: '${extName}',
        blocks: [{
          opcode: 'hello',
          blockType: Scratch.BlockType.COMMAND,
          text: 'hello world'
        }]
      };
    }
    hello() { console.log("Hello from ${extName}!"); }
  }
  Scratch.extensions.register(new ${extId}());
})(Scratch);`;

    const blob = new Blob([code], {type: 'text/javascript'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'extension.js';
    a.click();
}
