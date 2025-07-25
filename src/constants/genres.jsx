import genres from './genres.json';
 // hardcoded subjects. is there a way to get all the subjects/genre using the google books api?
 // there is no possible way..
export function toHex(genreColor) {
  const hex = genreColor.replace('bg-' , ''); 
  const someHex = hex.replace('[' , '');
  const someHex2 = someHex.replace(']' , '');
  return someHex2
}

export default genres;