var nouns = [
  "The old man",
  "Dumbledorf",
  "The magician",
  "Rachet",
  "The Wraith King",
  "A goblin",
  "The devil",
  "The butcher",
  "The lizard man",
  "The forsaken one"
];

var adjectives = [
  'glowing',
  'glimmering',
  'wicked',
  'black',
  'rusty'
];

var clauses = [
  "of smiting",
  "of retribution"
];

var synonyms = {
  sword: ['sword', 'sickle', 'dagger', 'blade'],
  hammer: ['hammer', 'stick', 'bludgeon', 'mace'],
  axe: ['axe']
};

var randomItem = function(array){
  return array[Math.round(Math.random()*(array.length-1))];
};

module.exports = function(itemType){
  var showClause = Math.random()>.85;
  var showAdjective = Math.random()>.5;
  return randomItem(nouns) + "'s"
    + (showAdjective ? randomItem(adjectives) : '')
    + randomItem(synonyms[itemType])
    + (showClause ? randomItem(clauses) : '');
}
