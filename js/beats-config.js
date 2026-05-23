/* beats-config.js — beat data only, no logic */

var BEATS = [

  {
    id: 1,
    visual: 'imageStatue',
    persistVisual: false,
    scriptureA: { text: 'Image?', provocation: true },
    scriptureB: { text: 'Image ≠ reality?', provocation: true },
  },

  {
    id: 2,
    visual: 'romaneikon',
    persistVisual: false,
    scriptureA: { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
    scriptureB: { text: 'Image (Eikōn) = reality?', provocation: true },
  },

  {
    id: 3,
    visual: 'orbIntro',
    persistVisual: false,
    scriptureA: { text: '1 = 2 = 3  ???', provocation: true },
    scriptureB: { text: 'Co-inherence.', provocation: true },
  },

  {
    id: 4,
    visual: 'orbState2',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:16–17', text: 'All things were created through him and for him. And he is before all things, and in him all things hold together.' },
    scriptureB: { ref: 'John 1:1–3', text: 'In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him.' }
  },

  {
    id: 5,
    visual: 'orbState3',
    persistVisual: true,
    scriptureA: { text: 'Word → Physical: ultimate example?', provocation: true },
    scriptureB: { ref: 'John 1:14', text: 'And the Word became flesh and dwelt among us.' }
  },

  {
    id: 6,
    visual: 'orbState3',
    persistVisual: true,
    scriptureA: { ref: 'John 14:8', text: 'Philip said to him, “Lord, show us the Father, and it is enough for us.”' },
    scriptureB: { ref: 'John 14:9–10', text: '"Whoever has seen me has seen the Father. How can you say, \'Show us the Father\'? Do you not believe that I am in the Father and the Father is in me?"', crimson: true  }
  },

  {
    id: 7,
    visual: 'orbState4a',
    persistVisual: false,
    scriptureA: { text: 'Why go from Classy to ashy?', provocation: true },
    scriptureB: { ref: 'Col 1:21', text: 'And you, who once were alienated and hostile in mind, doing evil deeds…' }
  },

  {
    id: 8,
    visual: 'orbState4aPhase1',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:19', text: 'making peace by the blood of his cross.' },
    scriptureB: { ref: 'Col 1:22', text: '…he has now reconciled in his body of flesh by his death, in order to present you holy and blameless and above reproach before him.' }
  },

  {
    id: 9,
    visual: 'orbState4bPhase1',
    persistVisual: true,
    scriptureA: { text: 'The exchange?', provocation: true },
    scriptureB: { ref: 'Matt 26:28', text: '…for this is my blood of the covenant, which is poured out for many for the forgiveness of sins.' }
  },

  {
    id: 10,
    visual: 'orbState4bPhase2',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:22', text: 'He has now reconciled in his body of flesh by his death, in order to present you holy and blameless and above reproach before him.' },
    scriptureB: [
      { ref: 'Matt 27:46', text: 'My God, my God, why have you forsaken me?', crimson: true },
      { ref: 'Matt 27:50', text: 'And Jesus cried out again with a loud voice and yielded up his spirit.' }
    ]
  },

  {
    id: 11,
    visual: 'orbState5',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:18', text: 'He is… the firstborn from the dead.' },
    scriptureB: { ref: 'John 16:7', text: 'It is to your advantage that I go away, for if I do not go away, the Helper will not come to you. But if I go, I will send him to you.' }
  },

  {
    id: 12,
    visual: 'orbState5',
    persistVisual: true,
    scriptureA: { ref: 'John 16:7', text: 'I tell you the truth: it is to your advantage that I go away, for if I do not go away, the Helper will not come to you. But if I go, I will send him to you.' },
    scriptureB: { ref: 'John 17:22', text: 'The glory that you have given me I have given to them, that they may be one even as we are one, I in them and you in me.' }
  },

  {
    id: 13,
    visual: 'orbState5Held',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:18', text: 'And he is the head of the body, the church.' },
    scriptureB: null
  },

  {
    id: 14,
    visual: 'orbState5Held',
    persistVisual: true,
    scriptureA: { ref: 'Col 1:23', text: 'If indeed you continue in the faith, stable and steadfast, not shifting from the hope of the gospel that you heard, which has been proclaimed in all creation under heaven.' },
    scriptureB: { ref: '2 Cor 3:18', text: 'We all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image.' }
  },

  {
    id: 15,
    visual: 'orbFull',
    persistVisual: true,
    scriptureA: { ref: 'John 14:2', text: '"In my Father\'s house are many rooms. If it were not so, would I have told you that I go to prepare a place for you?"', crimson: true },
    scriptureB: null
  }

];
