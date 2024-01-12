const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function () {
        return title + " by " + author + ", " + pages + " pages, " + (read ? "read" : "not read yet");
    };
}

//Add display/hide form
const form = document.getElementById("popup-background");

function displayForm() {
    form.style.display = "block";
}

const showForm = document.getElementById("btn-show");
showForm.addEventListener("click", displayForm);

//Add to array function;
function addBookToLibrary() {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    const newBook = new Book(title.value, author.value, pages.value, read.value);

    myLibrary.push(newBook);

    form.style.display = "none";
}

const addBook = document.getElementById("btn-add");
addBook.addEventListener("click", addBookToLibrary);


function displayBooks() {

}