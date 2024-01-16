const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + " by " + author + ", " + pages + " pages, " + (read ? "read" : "not read yet");
    };
}

//Toggles between read and not read
Book.prototype.swapReadStatus = function() {
    this.read = !this.read;
}

//Add display/hide form
const form = document.getElementById("popup-background");

function displayForm() {
    form.style.display = "block";
}

const showForm = document.getElementById("btn-show");
showForm.addEventListener("click", displayForm);

//Add to array function;
function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.querySelector("#input-title");
    const author = document.querySelector("#input-author");
    const pages = document.querySelector("#input-pages");
    const read = document.querySelector("#input-read");

    const newBook = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(newBook);

    //Clear form after submission
    form.style.display = "none";
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "";

    populateContent();

}

const addBook = document.getElementById("btn-add");
addBook.addEventListener("click", addBookToLibrary);

//Initializes a book div for every book found in the array and appends it to MyLibrary;
function displayBooks() {
    const content = document.querySelector(".content");
    let newBook, title, author, pages, read, close;
    let index = 0;

    myLibrary.forEach((e) => {
        newBook = document.createElement("div");
        newBook.className = "card";
        newBook.dataset.indexNumber = index++;

        title = document.createElement("h2");
        title.id = "title";
        title.textContent = e.title;
        newBook.appendChild(title);
        
        author = document.createElement("h3");
        author.id = "author";
        author.textContent = e.author;
        newBook.appendChild(author);

        pages = document.createElement("h4");
        pages.id = "pages";
        pages.textContent = e.pages;
        newBook.appendChild(pages);

        read = document.createElement("button");
        read.id = "read";
        if(e.read) {
            read.textContent = "Read";
        } 
        else {
            read.textContent = "Not Read";
            read.className = "not-read";
        }
        read.addEventListener("click", toggleRead);
        newBook.appendChild(read);

        close = document.createElement("a");
        close.id = "close";
        close.href = "javascript:void(0)";
        close.innerHTML = "&#10006;";
        close.addEventListener("click", deleteBook);
        newBook.appendChild(close);
        
        content.appendChild(newBook);
    });
}

function deleteBook(e) {
    const index = e.target.parentElement.dataset.indexNumber;

    myLibrary.splice(index, 1);

    populateContent();
}

//Toggle read function
function toggleRead(e) {
    const index = e.target.parentElement.dataset.indexNumber;

    myLibrary[index].swapReadStatus();

    if(myLibrary[index].read) {
        e.target.className = "";
        e.target.textContent = "Read";       
    } else {
        e.target.className = "not-read";
        e.target.textContent = "Not Read";
    }
}

//Populate Content Div with contents of myLibrary 
function populateContent() {
    const content = document.querySelector(".content");

    while(content.firstChild) {
        content.removeChild(content.firstChild);
    }

    displayBooks();
}