
var mode = "letters";
var findMeTileWord = null;
var startTiles = [];

var tileColors = [
    "tile-green",
    "tile-pink",
    "tile-orange",
    "tile-blue",
    "tile-violet"
  ];

var letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
    "T", "U", "V", "W", "X", "Y", "Z"  
  ];

var numbers = [
    {
      "letter" : "1",
      "word"   : "One",
      "class"  : "tile-orange"
    },
    {
      "letter" : "2",
      "word"   : "Two",
      "class"  : "tile-pink"
    },
    {
      "letter" : "3",
      "word"   : "Three",
      "class"  : "tile-violet"
    },
    {
      "letter" : "4",
      "word"   : "Four",
      "class"  : "tile-blue"
    },
    {
      "letter" : "5",
      "word"   : "Five",
      "class"  : "tile-green"
    },
    {
      "letter" : "6",
      "word"   : "Six",
      "class"  : "tile-pink"
    },
    {
      "letter" : "7",
      "word"   : "Seven",
      "class"  : "tile-orange"
    },
    {
      "letter" : "8",
      "word"   : "Eight",
      "class"  : "tile-violet"
    },
    {
      "letter" : "9",
      "word"   : "Nine",
      "class"  : "tile-green"
    },
    {
      "letter" : "10",
      "word"   : "Ten",
      "class"  : "tile-blue"
    },
  ];

var colors = [
  {
    "word" : "Yellow",
    "color" : "yellow",
    "textcolor" : "black"
  },
  {
    "word" : "Orange",
    "color" : "orange",
    "textcolor" : "black"
  },
  {
    "word" : "Red",
    "color" : "red",
    "textcolor" : "white"
  },
  {
    "word" : "Pink",
    "color" : "pink",
    "textcolor" : "black"
  },
  {
    "word" : "Green",
    "color" : "green",
    "textcolor" : "white"
  },
  {
    "word" : "Blue",
    "color" : "blue",
    "textcolor" : "white"
  },
  {
    "word" : "Brown",
    "color" : "brown",
    "textcolor" : "white"
  },
  {
    "word" : "Grey",
    "color" : "grey",
    "textcolor" : "white"
  },
  {
    "word" : "Violet",
    "color" : "violet",
    "textcolor" : "white"
  },
  {
    "word" : "Black",
    "color" : "black",
    "textcolor" : "white"
  },
  {
    "word" : "White",
    "color" : "white",
    "textcolor" : "black"
  },

];

var tiles = {
    "A" : [ "Apple", "Airplane", "Airport", "Alphabet", "Arm" ],
    "B" : [ "Ball", "Banana", "Bee", "Book", "Box", "Boy" ],
    "C" : [ "Cake", "Calendar", "Camera", "Car", "Carrot", "Cat", "Cherry" ],
    "D" : [ "Doctor", "Dog", "Drop", "Duck" ],
    "E" : [ "Elephant", "Eye", "Egg"],
    "F" : [ "Farmer", "Fire", "Fish", "Flower" ],
    "G" : [ "Giraffe", "Girl", "Gorilla" ],
    "H" : [ "Hamburger", "Heart", "Horse", "Honey" ],
    "I" : [ "Ice", "Ice-cream", "Island" ],
    "J" : [ "Jam", "Jeep", "Juice", "Jewel", "Jumper" ],
    "K" : [ "King", "Kite", "Kiwi", "Knight" ],
    "L" : [ "Lake", "Lemon", "Letter", "Lion" ],
    "M" : [ "Man", "Mango", "Monkey", "Mountain", "Moustache" ],
    "N" : [ "Newspaper", "Nose", "Nail", "Nurse" ],
    "O" : [ "Olives", "Orange", "Orca" ],
    "P" : [ "Panda", "Pictures", "Pineapple", "Princess" ], // Pear
    "Q" : [ "Queen", "Question" ],
    "R" : [ "Rabbit", "Rainbow", "River", "Roof" ],
    "S" : [ "Sea", "Shark", "Ship", "Strawberry", "Sun", "Spoon", "Swing" ],
    "T" : [ "Tent", "Tractor", "Tea", "Ticket", "Toilet", "Tomato", "Tools", "Towel", "Train", "Table" ],
    "U" : [ "Umbrella", "Unicorn" ],
    "V" : [ "Village", "Violin", "Van" ],
    "W" : [ "Watermelon", "Whale", "Window", "Woman", "Wheel" ],
    "X" : [ "X-rays" ],
    "Y" : [ "Yellow", "Yoghurt" ],
    "Z" : [ "Zebra" ]
  };