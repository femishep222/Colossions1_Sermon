/* beats-config.js — beat data only, no logic */
/* Beat IDs match the counter displayed in the UI (beat-1 = "1 · 10", beat-10 = "10 · 10") */

var BEATS = [

  {
    id: 'beat-1',
    sectionTitle: 'The Norm:  Image  vs  Reality',
    scripture: null,
    visual: null,
    subBeats: []
  },

  {
    id: 'beat-2',
    sectionTitle: 'The Paradox: Just an Image or God himself?',
    scripture: { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
    visual: null,
    subBeats: []
  },

  {
    id: 'beat-3',
    sectionTitle: 'The Son: Relationship Eternal',
    scripture: [
      { ref: 'Col 1:17',  text: 'He is before all things.' },
      { ref: 'John 17:5', text: 'Glorify me in your own presence with the glory I had with you before the world existed.' }
    ],
    visual: 'orbIntro',
    subBeats: []
  },

  {
    id: 'beat-4',
    sectionTitle: 'The Word: Relationship in Creation',
    scripture: [
      { ref: 'Col 1:16–17', text: 'All things were created through him and for him. In him all things hold together.' },
      { ref: 'John 1:1–3',  text: 'In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him.' }
    ],
    visual: 'orbState2',
    subBeats: []
  },

  {
    id: 'beat-5',
    sectionTitle: 'The Image: Relationship Embodied',
    scripture: [
      { ref: 'Col 1:15, 19', text: 'The image of the invisible God… all the fullness of God was pleased to dwell in him.' },
      { ref: 'John 1:14',    text: 'The Word became flesh.' }
    ],
    visual: 'orbState3',
    subBeats: []
  },

  {
    id: 'beat-6',
    sectionTitle: 'The Cross: Relationship at Cost',
    scripture: { ref: 'Col 1:20–22', text: 'Making peace by the blood of his cross… you who were once alienated.' },
    visual: 'orbState4a',
    subBeats: [
      {
        id: 'beat-7',
        sectionTitle: 'The Cross: Relationship at Cost',
        scripture: { ref: 'Col 1:20–22', text: 'Making peace by the blood of his cross… you who were once alienated.' },
        visual: 'orbState4b',
        subBeats: []
      }
    ]
  },

  {
    id: 'beat-8',
    sectionTitle: 'The Church: Relationship Fulfilled',
    scripture: [
      { ref: 'Col 1:18',   text: 'He is the head of the body, the church.' },
      { ref: '2 Cor 3:18', text: 'We are being transformed into the same image from one degree of glory to another.' }
    ],
    visual: 'orbState5',
    subBeats: []
  },

  {
    id: 'beat-9',
    sectionTitle: 'The Invitation: In the Heart',
    scripture: null,
    visual: 'orbState5Held',
    subBeats: [
      {
        id: 'beat-10',
        sectionTitle: 'All Things: Through Him and For Him',
        scripture: null,
        visual: 'orbStateAll',
        subBeats: []
      }
    ]
  }

];
