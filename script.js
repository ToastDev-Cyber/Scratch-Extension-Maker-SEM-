// --- 1. Define Custom Blocks ---

// The main Extension definition block
Blockly.Blocks['ext_main'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Extension Name:")
        .appendField(new Blockly.FieldTextInput("My Extension"), "NAME");
    this.appendDummyInput()
        .appendField("ID:")
        .appendField(new Blockly.FieldTextInput("myExtension"), "ID");
    this.appendStatementInput("BLOCKS")
        .setCheck(null)
        .appendField("Blocks");
    this.setColour("#9966FF");
    this.setTooltip("The root of your extension.");
  }
};

// Browser Category Blocks
Blockly.Blocks['browser_alert'] = {
  init: function() {
    this.appendValueInput("TEXT").setCheck("String").appendField("alert");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BFFF");
  }
};

Blockly.Blocks['browser_open'] = {
  init: function() {
    this.appendValueInput("URL").setCheck("String").appendField("open URL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BFFF");
  }
};

// Technical Category Block
Blockly.Blocks['tech_eval'] = {
  init: function() {
    this.appendValueInput("JS").setCheck("String").appendField("run javascript");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#575E75");
  }
};

// Time Category Block
Blockly.Blocks['time_now'] = {
  init: function() {
    this.appendDummyInput().appendField("current timestamp");
    this.setOutput(true, "Number");
    this.setColour("#0FBD8C");
  }
};

// Movement Placeholder
Blockly.Blocks['move_step'] = {
  init: function() {
    this.appendValueInput("STEPS").setCheck("Number").appendField("move steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
  }
};

// --- 2. Initialize Blockly ---

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos', // THE SCRATCH LOOK
    theme: Blockly.Themes.Classic,
    grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9 }
});

// --- 3. Extension Export Logic ---

function exportExtension() {
    const rootBlock = workspace.getAllBlocks(false).find(b => b.type === 'ext_main');
    
    if (!rootBlock) {
        alert("Please add the 'Extension Root' block to your workspace first!");
        return;
    }

    const extName = rootBlock.getFieldValue('NAME');
    const extId = rootBlock.getFieldValue('ID').replace(/\s+/g, '');

    // Note: A real maker would iterate through the "BLOCKS" input to build the JSON.
    // This is a template to show how the generated file is structured.
    const generatedCode = `(function(Scratch) {
  'use strict';
  class ${extId} {
    getInfo() {
      return {
        id: '${extId}',
        name: '${extName}',
        blocks: [
          {
            opcode: 'mainBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'extension block run',
          }
        ]
      };
    }
    mainBlock() {
      console.log("${extName} is running!");
    }
  }
  Scratch.extensions.register(new ${extId}());
})(Scratch);`;

    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${extId}.js`;
    link.click();
}
