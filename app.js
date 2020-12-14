

class Book {
  constructor(title,author,pages,didRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.didRead = didRead;
    this.id = null;
    this.container = null;
  }
  setId(newId){
     this.id = newId;
  }

  setTitle(newTitle){
     this.title = newTitle;
  }
  
  setPages(newPages){
    this.pages =newPages;
  }
  
  setAuthor(newAuthor){
     this.author = newAuthor;
  }

  setDidRead(newDidRead){
     this.didRead = newDidRead;
  }

 editBook(title,author,pages,didRead) {
      this.title = title;
      this.author =author;
      this.pages = pages;
      this.didRead = didRead;
  }
}

function createBookContainer(book) {
  // card div
   let card = document.createElement("div");
   card.classList.add("card");
   card.setAttribute("data-id",book.id);

  //circle div
   let circle = document.createElement("div");
   circle.classList.add("circle");
   card.appendChild(circle);
  // circle h2 
   let circleH2 = document.createElement("h2");
   circleH2.textContent = book.title;
   circle.appendChild(circleH2);
  //circle removeButton
   let removeButton = document.createElement("button");
   removeButton.classList.add("remove");
   removeButton.innerHTML = "X";
   removeButton.addEventListener('click',()=>{
    let id = removeButton.parentElement.parentElement.getAttribute("data-id");
    removeBook(id);
   });
   circle.appendChild(removeButton);

   //content div
   let content = document.createElement("div");
   content.classList.add("content");
   card.appendChild(content);
   // content div h3
   let contentH3 = document.createElement("h3");
   contentH3.textContent = "Author:"+book.author;
   content.appendChild(contentH3);
   // content div pages p
   let contentPagesP = document.createElement("p");
   contentPagesP.textContent = "Pages:"+book.pages;
   content.appendChild(contentPagesP);
   // content div status p
   let contentStatusP = document.createElement("p");
   contentStatusP.textContent = "Status:"+book.didRead;
   content.appendChild(contentStatusP);
   //content div edit button
   let contentEditButton = document.createElement("button");
   contentEditButton.innerHTML="Edit";

   contentEditButton.addEventListener('click',()=>{
       submitValue = 1;
       let elementId = contentEditButton.parentElement.parentElement.getAttribute("data-id");
       openPopUp();
       titleInput.value = book.title;
       authorInput.value = book.author;
       pagesInput.value = book.value;
       statusInput.value = book.didRead;
       

     submitButton.addEventListener('click',()=>{
       book.editBook(titleInput.value,authorInput.value,pagesInput.value,statusInput.value);
       circleH2.textContent = titleInput.value
       contentH3.textContent ="Author:"+authorInput.value
       contentPagesP.textContent = "Pages:"+pagesInput.value;
       contentStatusP.textContent = "Status:"+statusInput.value;
       console.log(book);
       submitValue = 0;
       closePopUp();
    })

   });
   content.appendChild(contentEditButton);

   return card;

} 

function addBook(title,author,pages,didRead) {
   let book = new Book(title,author,pages,didRead);
   let id = Math.floor((Math.random()*100)+1);
   book.setId(id);
   books.push(book);
   book.container = createBookContainer(book);
   mainDiv.insertBefore(book.container,mainDiv.lastElementChild);
   localStorage.setItem('books',JSON.stringify([]));
   populateStorage();
}

function removeBook(id) {
   
  for (let index = 0; index < books.length; index++) {
     let element = books[index];
     if (element.id == id) {
       books.splice(index,1);
       populateStorage()
     }
  }

 for (let index = 0; index < mainDiv.children.length; index++) {
   const element = mainDiv.children[index];
   let cardId = mainDiv.children[index].getAttribute("data-id");
 
   if(cardId== id){
      mainDiv.removeChild(element);
   }
   
 }

}


function openPopUp(params) {
  mainDiv.classList.add("toggle");
  popup.classList.add("active");
}
function closePopUp(params) {
  popup.classList.remove("active");
  mainDiv.classList.remove("toggle");
}

function getEveryBookFromStorage(params) {
    books = JSON.parse(localStorage.getItem('books'))
    if (books.length != 0) {
      books.forEach(element => {
        element.container = createBookContainer(element);

        mainDiv.insertBefore(element.container,mainDiv.lastElementChild);
    });
    console.log(books);
    }
    
}

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

function populateStorage() {
  localStorage.setItem('books',JSON.stringify(books));
  console.log(JSON.parse(localStorage.getItem('books')));
}



const button = document.querySelector("#edit-button");
const mainDiv = document.querySelector("main");
const addButton = document.querySelector(".add-button");
const submitButton= document.querySelector("#submit-button");
const popUpcloseButton= document.querySelector("#close-button");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("status");

// 0 for add 1 for edit
let submitValue = 0;


if(storageAvailable('sessionStorage')){
  console.log("True");
}else{
  console.log("False");
}

let books = [];
getEveryBookFromStorage();



addButton.addEventListener('click',()=>{
  let popup = document.getElementById("popup");
  openPopUp()
 titleInput.value = "";
 authorInput.value = "";
 pagesInput.value = "";
 statusInput.value = "";
});

submitButton.addEventListener('click',()=>{
  if(submitValue == 0){
  let popup = document.getElementById("popup");

  addBook(titleInput.value,authorInput.value,pagesInput.value,statusInput.value);

  closePopUp()
  }
})

popUpcloseButton.addEventListener('click',()=>{
   closePopUp();
});









