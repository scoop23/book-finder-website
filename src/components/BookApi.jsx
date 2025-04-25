class BookApi{
    #apikey;
    
    constructor(apikey) {
        this.#apikey = apikey;
    }

   async fetchBookByAuthor(searchText, setBookData, setIsloading) {
    try{
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchText}&key=${this.#apikey}`);
      const data = await response.json();
      setBookData(data);
    }catch(e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
     
   }
   
   async fetchBookByTitle(searchText, setBookData, setIsloading) {
     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&key=${this.#apikey}`)
   
     try{
       const data = await response.json();
       setBookData(data);
     } catch(err) {
       console.log("An Error Occured: ", err);
     } finally {
      setIsloading(false);
     }
   }

   getBookApi() {
    return this.#apikey;
   }
}

export default BookApi;