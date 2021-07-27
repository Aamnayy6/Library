let Library=[];
let readcount=0;
const addbutton = document.getElementById('addbutton');
const newbook=document.getElementById('newbook');
const bookform = document.getElementById('bookform');
function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    if(read=="Read"){
        this.read="Read";
        readcount++;
    }
    else
    this.read = "Not read yet";
    this.info= function(){
        let str =  this.title + "<br/>Author: " + this.author + "<br/>Number of Pages: " + this.pages +"<br/>Read Status: " + this.read + "<br/>";
        return str;
    }
}
function updatebooklog(){
    const logs = document.querySelectorAll('.log');
    logs[0].textContent = "Total Books "+Library.length;
    logs[1].textContent = "Books Read "+readcount;
    logs[2].textContent ="Books Unread "+ (Library.length-readcount);
}
function addBookToLibrary(){
  
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
    updatebooklog();
}
addbutton.addEventListener('click', ()=>{
    if(bookform.checkValidity())
    addBookToLibrary();
});

function displaybooks(creatingbook){
        let bookssection = document.querySelector('.books');
        let newbook = document.createElement('div');
        let removebook = document.createElement('button');
        let para = document.createElement('p');
        para.classList.add('paraedits');
        removebook.classList.add('bookdisplaybuttons');
        removebook.innerHTML = "Remove Book";
        newbook.appendChild(para);
        para.innerHTML += creatingbook.info();
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
                readcount++;
            readstatus.innerHTML = "Unread";
            creatingbook.read="Read";
            updatebooklog();
        }
            else{
                readcount--;
            readstatus.innerHTML = "Read";
            creatingbook.read="Not read yet";
            updatebooklog();
            }
            para.innerHTML = creatingbook.info(); 
        })
    
}





const addbookbutton = document.getElementById('add');
addbookbutton.addEventListener('click', ()=>{
   
    newbook.style.display= "block";
})

const cancelbutton = document.getElementById('cancel');
cancelbutton.addEventListener('click', ()=>newbook.style.display="none");