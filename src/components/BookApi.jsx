class BookApi{
    #apikey;
    
    constructor(apikey) {
        this.#apikey = apikey;
    }

   async fetchBookByAuthor(searchText, setBookData, ) {
    try{
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchText}&key=${this.#apikey}`);
      const data = await response.json();
      setBookData(data);
    }catch(e) {
      console.error(e);
    }
     
   }
   
   async fetchBookByTitle(searchText, setBookData) {
     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&key=${this.#apikey}`)
   
     try{
       const data = await response.json();
       setBookData(data);
     } catch(err) {
       console.log("An Error Occured: ", err);
     }
   }

   getBookApi() {
    return this.#apikey;
   }
}

export default BookApi;