/* beats-config.js — beat data only, no logic */
/* Sub-beats use letter suffixes (beat-6a, beat-9a); counter logic lives in app.js */

var BEATS = [

  {
    id: 'beat-1',
    sectionTitle: 'Our Norm:  Image  ≠  Reality',
    scripture: null,
    visual: 'imageStatue',
    subBeats: []
  },

  {
    id: 'beat-2',
    sectionTitle: 'Christ: Just an Image or God himself?',
    scripture: { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
    visual: 'imageLakeReflection',
    subBeats: [
      {
        id: 'beat-2a',
        sectionTitle: 'eikōn = reality',
        scripture: 
      [
        { ref: 'Col 1:15', text: 'He is the image of the invisible God.' },
        { ref: 'John 14:9-10', text: 'Whoever has seen me has seen the Father. How can you say, ‘Show us the Father’? 10 Do you not believe that I am in the Father and the Father is in me?' },

      ],
        visual: 'romaneikon',
        subBeats: []
      }
    ]
  },

  {
    id: 'beat-3',
    sectionTitle: 'The Son: Before all things',
    scripture: [
      { ref: 'Col 1:17',  text: 'He is before all things.' },
      { ref: 'John 17:5', text: 'No one has ever seen God; the only Son, who is in the bosom of the Father, he has made him known.' }
    ],
    visual: 'orbIntro',
    subBeats: []
  },

  {
    id: 'beat-4',
    sectionTitle: 'The Word: Holds all creation together',
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
      { ref: 'Col 1:19', text: 'For in him all the fullness of God was pleased to dwell.' },
      { ref: 'John 1:14', text: 'And the Word became flesh and dwelt among us' },
    ],
    visual: 'orbState3',
    subBeats: []
  },

  {
    id: 'beat-6',
    sectionTitle: 'The Cross: Cost of relationship',
    scripture: [
      { ref: 'Col 1:21', text: 'And you, who once were alienated and hostile in mind, doing evil deeds...' },
      { ref: 'Col 1:20', text: '...making peace by the blood of his cross.' },
    ],
    visual: 'orbState4a',
    subBeats: [
      {
        id: 'beat-6a',
        sectionTitle: 'The Cross: Our sin vanquished through his death',
        scripture: [
          { ref: 'Col 1:22', text: '...he has now reconciled in his body of flesh by his death...' },
          { ref: 'Matt 27:46', text: 'My God, my God, why have you forsaken me?' },
          { ref: 'Matt 27:50', text: 'And Jesus cried out again with a loud voice and yielded up his spirit.' },
        ],
        visual: 'orbState4b',
        subBeats: []
      }
    ]
  },

  {
    id: 'beat-7',
    sectionTitle: 'The Firstborn from the Dead: Relationship Restored',
    scripture: [
      { ref: 'Col 1:22',   text: '...in order to present you holy and blameless and above reproach before him' },
      { ref: '2 Cor 3:18', text: 'And we all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image' }
    ],
    visual: 'orbState5',
    subBeats: []
  },

  {
    id: 'beat-8',
    sectionTitle: 'The Head: A Holy, Blameless Church',
    scripture: [
      { ref: 'Col 1:18', text: 'And he is the head of the body, the church.' },
    ],
    visual: 'orbState5Held',
    subBeats: [
      {
        id: 'beat-8a',
        sectionTitle: 'The Hope of the Gospel: All things reconciled to Him',
        scripture: [
          { ref: 'Col 1:20', text: '...and through him to reconcile to himself all things, whether on earth or in heaven, making peace by the blood of his cross.' },
          { ref: 'Col 1:23', text: 'If indeed you continue in the faith, stable and steadfast, not shifting from the hope of the gospel that you heard, which has been proclaimed in all creation under heaven.' },
        ],
        visual: 'orbStateAll',
        subBeats: []
      }
    ]
  },

  {
    id: 'beat-9',
    sectionTitle: 'The Fullness: Father, Spirit, Son',
        scripture: [
          { ref: 'John 14:2', text: 'In my Father\'s house are many rooms. If it were not so, would I have told you that I go to prepare a place for you?' },
        ],
    visual: 'orbFull',
    subBeats: []
  }

];
