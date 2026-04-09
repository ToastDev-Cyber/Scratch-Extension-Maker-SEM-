<script>
    // --- 1. Block Definitions (Same as before) ---
    Blockly.Blocks['ext_main'] = {
      init: function() {
        this.appendDummyInput().appendField("Extension Name:").appendField(new Blockly.FieldTextInput("My App"), "NAME");
        this.appendDummyInput().appendField("ID:").appendField(new Blockly.FieldTextInput("myApp"), "ID");
        this.appendStatementInput("BLOCKS").setCheck(null).appendField("Custom Blocks");
        this.setColour("#9966FF");
        this.maxInstances = 1; 
      }
    };

    Blockly.Blocks['custom_block_creator'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("New Block - ID:")
            .appendField(new Blockly.FieldTextInput("myBlock"), "BLOCK_ID")
            .appendField("Name:")
            .appendField(new Blockly.FieldTextInput("say [INPUT]"), "BLOCK_NAME");
        this.appendStatementInput("INPUTS").setCheck("input_def").appendField("Inputs");
        this.appendStatementInput("FUNCTION").setCheck(null).appendField("Function Logic");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FFAB19");
      }
    };

    Blockly.Blocks['block_input_def'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Input ID:")
            .appendField(new Blockly.FieldTextInput("INPUT"), "INP_ID")
            .appendField("Default:")
            .appendField(new Blockly.FieldTextInput("Hello"), "DEFAULT")
            .appendField("Type:")
            .appendField(new Blockly.FieldDropdown([["string","STRING"], ["number","NUMBER"], ["boolean","BOOLEAN"]]), "TYPE");
        this.setPreviousStatement(true, "input_def");
        this.setNextStatement(true, "input_def");
        this.setColour("#FF661A");
      }
    };

    // Standard blocks definitions...
    Blockly.Blocks['browser_alert'] = { init: function() { this.appendValueInput("TEXT").setCheck("String").appendField("alert"); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour("#00BFFF"); }};

    // --- 2. Initialize Blockly ---
    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        renderer: 'zelos', 
        zoom: {controls: true, wheel: true}
    });
    window.addEventListener('resize', () => Blockly.svgResize(workspace), false);
    Blockly.svgResize(workspace);

    // --- 3. THE REAL GENERATOR ---
    function exportExtension() {
        const root = workspace.getAllBlocks(false).find(b => b.type === 'ext_main');
        if (!root) { alert("Add the Extension Root block first!"); return; }
        
        const extId = root.getFieldValue('ID').replace(/\s+/g, '');
        const extName = root.getFieldValue('NAME');

        // Find all custom blocks attached to the root
        let blocksDefinitions = [];
        let methods = [];
        
        let currentBlock = root.getInputTargetBlock('BLOCKS');
        while (currentBlock) {
            if (currentBlock.type === 'custom_block_creator') {
                const bId = currentBlock.getFieldValue('BLOCK_ID');
                const bName = currentBlock.getFieldValue('BLOCK_NAME');
                
                // Collect Inputs
                let args = {};
                let inputBlock = currentBlock.getInputTargetBlock('INPUTS');
                while (inputBlock) {
                    const inpId = inputBlock.getFieldValue('INP_ID');
                    const inpDef = inputBlock.getFieldValue('DEFAULT');
                    const inpType = inputBlock.getFieldValue('TYPE');
                    args[inpId] = { type: `Scratch.ArgumentType.${inpType}`, defaultValue: inpDef };
                    inputBlock = inputBlock.getNextBlock();
                }

                blocksDefinitions.push({
                    opcode: bId,
                    blockType: "Scratch.BlockType.COMMAND",
                    text: bName,
                    arguments: args
                });

                // Generate a dummy method for the logic
                methods.push(`${bId}(args) { console.log("Block ${bId} executed with:", args); }`);
            }
            currentBlock = currentBlock.getNextBlock();
        }

        const code = `(function(Scratch) {
    'use strict';
    class ${extId} {
        getInfo() {
            return {
                id: '${extId}',
                name: '${extName}',
                blocks: ${JSON.stringify(blocksDefinitions, null, 4).replace(/"Scratch\.(.*?)"/g, 'Scratch.$1')}
            };
        }
        ${methods.join('\n        ')}
    }
    Scratch.extensions.register(new ${extId}());
})(Scratch);`;

        const blob = new Blob([code], {type: 'text/javascript'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = extId + '.js';
        a.click();
    }
</script>
