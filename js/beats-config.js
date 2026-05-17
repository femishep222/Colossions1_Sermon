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
    sectionTitle: 'The Christ: Just an Image or God himself?',
    scripture: { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
    visual: null,
    subBeats: []
  },

  {
    id: 'beat-3',
    sectionTitle: 'The Son: Before all things',
    scripture: [
      { ref: 'Col 1:17',  text: 'He is before all things.' },
      { ref: 'John 17:5', text: 'Glorify me in your own presence with the glory I had with you before the world existed.' }
    ],
    visual: 'orbIntro',
    subBeats: []
  },

  {
    id: 'beat-4',
    sectionTitle: 'The Word: Holds all things together',
    scripture: [
      { ref: 'Col 1:16–17', text: 'All things were created through him and for him. And he is before all things, and in him all things hold together.' },
      { ref: 'John 1:1–3',  text: 'In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him.' }
    ],
    visual: 'orbState2',
    subBeats: []
  },

  {
    id: 'beat-5',
    sectionTitle: 'The Image: God Incarnated',
    scripture: [
      { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
      { ref: 'Col 1:16', text: 'For in him all the fullness of God was pleased to dwell.'},
      { ref: 'John 1:14',    text: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.' }
    ],
    visual: 'orbState3',
    subBeats: []
  },

  {
    id: 'beat-6',
    sectionTitle: 'The Cross: Cost of relationship',
        scripture: { ref: 'Col 1:21', text: 'And you, who once were alienated and hostile in mind, doing evil deeds...' },
    visual: 'orbState4a',
    subBeats: [
      {
        id: 'beat-7',
        sectionTitle: 'The Cross: Our sin vanguished through his death',
        scripture: { ref: 'Col 1:22', text: '...he has now reconciled in his body of flesh by his death...' },
        visual: 'orbState4b',
        subBeats: []
      }
    ]
  },

  {
    id: 'beat-8',
    sectionTitle: 'The Firstborn from the Dead: Relationship Restored',
    scripture: [
      { ref: 'Col 1:18',   text: '...in order to present you holy and blameless and above reproach before him' },
      { ref: '2 Cor 3:18', text: 'We are being transformed into the same image from one degree of glory to another.' }
    ],
    visual: 'orbState5',
    subBeats: []
  },

  {
    id: 'beat-9',
    sectionTitle: 'The Head of the Church: A Holy, Blameless Body',
    scripture: [
      { ref: 'Col 1:16–17', text: 'And he is the head of the body, the church.' },
    ],
    visual: 'orbState5Held',
    subBeats: [
      {
        id: 'beat-10',
        sectionTitle: 'The Hope of the Gospel: All things reconciled to Him',
    scripture: [
            { ref: 'Col 1:16–17', text: 'and through him to reconcile to himself all things, whether on earth or in heaven, making peace by the blood of his cross.' },
            { ref: 'Col 1:16–17', text: 'If indeed you continue in the faith, stable and steadfast, not shifting from the hope of the gospel that you heard, which has been proclaimed in all creation under heaven' },
    ],
        visual: 'orbStateAll',
        subBeats: []
      }
    ]
  }

];
