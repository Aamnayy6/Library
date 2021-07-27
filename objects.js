let Library=[];
const addbutton = document.getElementById('addbutton');
const newbook=document.getElementById('newbook');
function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    if(read=="Read")
    this.read="Read";
    else
    this.read = "Not read yet"
    this.info= function(){
        let str =  this.title + "<br/>Author: " + this.author + "<br/>Number of Pages: " + this.pages +"<br/>Read Status: " + this.read + "<br/>";
        return str;
    }
}
function addBookToLibrary(){
    const bookform = document.getElementById('bookform');
    let title=bookform.elements[0].value;
    let author = bookform.elements[1].value;
    let pages = bookform.elements[2].value;
    let isRead;
    if(bookform.elements[3].checked)
     isRead= "Read";
     else
     isRead="Not read yet";
    const creatingbook = new Book(title, author, pages, isRead);
    Library.push(creatingbook);
    newbook.style.display="none";
    displaybooks(creatingbook);
}
addbutton.addEventListener('click', addBookToLibrary);

function displaybooks(creatingbook){
        let bookssection = document.querySelector('.books');
        let newbook = document.createElement('div');
        let removebook = document.createElement('button');
        removebook.classList.add('bookdisplaybuttons');
        removebook.innerHTML = "Remove Book";
        newbook.innerHTML += creatingbook.info();
        newbook.classList.add('bookdisplay');
        bookssection.appendChild(newbook);
        newbook.appendChild(removebook);
        removebook.addEventListener('click', ()=>{
            let index = Library.findIndex(Book=>Book.title = creatingbook.title);
            Library.splice(index, 1);
            delete creatingbook;
            newbook.remove();
        })
        let readstatus= document.createElement('button');
        if(creatingbook.read=="Read")
        readstatus.innerHTML="Unread";
        else
        readstatus.innerHTML = "Read";
        readstatus.classList.add('bookdisplaybuttons');
        newbook.appendChild(readstatus);
        readstatus.addEventListener('click', ()=>{
            if(readstatus.innerHTML=="Read"){
            readstatus.innerHTML = "Unread";
            creatingbook.read="Read";
        }
            else{
            readstatus.innerHTML = "Read";
            creatingbook.read="Not read yet";
            }
        })
    
}





const addbookbutton = document.getElementById('add');
addbookbutton.addEventListener('click', ()=>{
   
    newbook.style.display= "block";
})

const cancelbutton = document.getElementById('cancel');
cancelbutton.addEventListener('click', ()=>newbook.style.display="none");