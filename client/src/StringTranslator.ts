const STRING_DICTONARY = {
  "ID": {
    "fr": "#"
  },
  "ITEM": {
    "fr": "Article"
  },
  "NAME": {
    "fr": "Nom"
  },
  "DESCRIPTION": {
    "fr": "Description"
  },
  "SERIAL_NUMBER": {
    "fr": "Numéro de série"
  },
  "ARTICLE": {
    "fr": "Article"
  },
  "LOCATION": {
    "fr": "Location"
  },
  "ADDRESS": {
    "fr": "Adresse"
  },
  "CODE": {
    "fr": "Code"
  },
  "NODE_ID": {
    "fr": "Noeud"
  },
  "IDENTIFIER": {
    "fr": "Identifiant"
  }
};

/**
 * Return a humain readable string from a property id;
 * @param {String} id The property id.
 */
export function translate(id, language = 'fr') {
  return STRING_DICTONARY[id][language];
}