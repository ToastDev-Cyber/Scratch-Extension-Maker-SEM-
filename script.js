Blockly.defineBlocksWithJsonArray([
  {
    "type": "sem_hat_loop",
    "message0": "Hat Loop ID %1 Name %2 Type %3",
    "args0": [
      { "type": "field_input", "name": "ID", "text": "myBlock" },
      { "type": "field_input", "name": "NAME", "text": "My Block" },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["Command", "COMMAND"],
          ["Reporter", "REPORTER"],
          ["Boolean", "BOOLEAN"]
        ]
      }
    ],
    "message1": "inputs %1",
    "args1": [
      { "type": "input_statement", "name": "INPUTS" }
    ],
    "message2": "function %1",
    "args2": [
      { "type": "input_statement", "name": "FUNCTION" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210
  },
  {
    "type": "sem_input_block",
    "message0": "input id %1 type %2 default %3",
    "args0": [
      { "type": "field_input", "name": "INPUT_ID", "text": "input1" },
      {
        "type": "field_dropdown",
        "name": "INPUT_TYPE",
        "options": [
          ["Number", "NUMBER"],
          ["Text", "TEXT"],
          ["Boolean", "BOOLEAN"]
        ]
      },
      { "type": "input_value", "name": "DEFAULT" }
    ],
    "output": null,
    "colour": 160
  }
]);

const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  renderer: "zelos",
  trashcan: true,
  scrollbars: true,
  zoom: {
    controls: true,
    wheel: true
  }
});
