
// Scratch-like Blockly theme
const ScratchTheme = Blockly.Theme.defineTheme('scratchTheme', {
  base: Blockly.Themes.Classic,
  blockStyles: {
    motion_blocks: {
      colourPrimary: '#4C97FF'
    },
    looks_blocks: {
      colourPrimary: '#9966FF'
    },
    control_blocks: {
      colourPrimary: '#FFAB19'
    },
    operator_blocks: {
      colourPrimary: '#40BF4A'
    }
  },
  categoryStyles: {
    motion_category: {
      colour: '#4C97FF'
    },
    looks_category: {
      colour: '#9966FF'
    },
    control_category: {
      colour: '#FFAB19'
    },
    operator_category: {
      colour: '#40BF4A'
    }
  }
});

// inject Blockly
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  theme: ScratchTheme,
  trashcan: true,
  scrollbars: true,
  zoom: {
    controls: true,
    wheel: true
  }
});
