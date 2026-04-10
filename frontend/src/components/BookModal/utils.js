export function parseDescription(rawDescription) {
  const getLinks = () => /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const getLinks2 = () => /\[([1-9]\d*)\]:\s(https?:\/\/[^\s]+)/g;
  const unformattedDescription = rawDescription.split("Contains:");
  let description = '';
  let links = [];
  console.log(unformattedDescription);
  // get the links if it exists
  // if possible let this be a function?
  if (rawDescription.includes("Contains:")) {
    if (!description || description === '') {
      console.log("hey")
      const tempDescription = unformattedDescription[1].trim();
      const plainEntries = [...tempDescription.matchAll(getLinks())];
      links = plainEntries.map(entry => {
        return ({
          title: entry[1],
          url: entry[2]
        });
      });
      description = unformattedDescription[0].trim();
    }
  } else if (getLinks().test(rawDescription)) {

    const plainEntries = [...rawDescription.matchAll(getLinks())];
    links = plainEntries.map(entry => {
      return ({
        title: entry[1],
        url: entry[2]
      });
    });
    console.log(unformattedDescription[0].trim());
    // description = unformattedDescription[0].trim();
  } else if (getLinks2().test(rawDescription)) {
    const plainEntries = [...rawDescription.matchAll(getLinks2())];
    links = plainEntries.map(entry => {
      return ({
        num: entry[1],
        url: entry[2]
      })
    })
    console.log(plainEntries);
  } else {
    description = unformattedDescription[0].trim();
  }
  return { description, links };
}
