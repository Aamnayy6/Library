let readcount=0;
const addbutton = document.getElementById('addbutton');
const newbook=document.getElementById('newbook');
const bookform = document.getElementById('bookform');
const addbookbutton = document.getElementById('add');
class Book{
    constructor(title, author, pages, read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        if(read=="Read"){
            this.read="Read";
            readcount++;
        }
        else
        this.read = "Not read yet";
        
    }
    info(){
        let str =  this.title + "<br/>Author: " + this.author + "<br/>Number of Pages: " + this.pages +"<br/>Read Status: " + this.read + "<br/>";
        return str;
    }
}
class Libraryofbooks{
      
    constructor(){
       this.Library=[];
    }
     updatebooklog(){
        const logs = document.querySelectorAll('.log');
        logs[0].textContent = "Total Books "+this.Library.length;
        logs[1].textContent = "Books Read "+readcount;
        logs[2].textContent ="Books Unread "+ (this.Library.length-readcount);
    }
     addBookToLibrary(creatingbook){
        this.Library.push(creatingbook);
        newbook.style.display="none";
        this.displaybooks(creatingbook);
        this.updatebooklog();
    }
 
    
     displaybooks(creatingbook){
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
                let index = this.Library.findIndex(Book=>Book.title = creatingbook.title);
                if(creatingbook.read=="Read")
                readcount--;
                this.Library.splice(index, 1);
                 creatingbook= "";
                newbook.remove();
                this.updatebooklog();
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
                this.updatebooklog();
            }
                else{
                    readcount--;
                readstatus.innerHTML = "Read";
                creatingbook.read="Not read yet";
                this.updatebooklog();
                }
                para.innerHTML = creatingbook.info(); 
            })
        
    }
  
    
}
let Lib =new  Libraryofbooks();
const librarylog = document.querySelector('.librarystats');
const showheaderbutton = document.getElementById('showheader');
showheaderbutton.addEventListener('click', ()=>{
    if(librarylog.style.width== "0px" || librarylog.style.width==""){
    librarylog.style.width = "40%";
    }
    else
    librarylog.style.width = "0px";
    })
addbutton.addEventListener('click', ()=>{
    if(bookform.checkValidity())
    createbook();
});
const cancelbutton = document.getElementById('cancel');
cancelbutton.addEventListener('click', ()=>newbook.style.display="none");

addbookbutton.addEventListener('click', ()=>{
    newbook.style.display= "block";
})
function createbook(){
    let title=bookform.elements[0].value;
        let author = bookform.elements[1].value;
        let pages = bookform.elements[2].value;
        let isRead;
        if(bookform.elements[3].checked)
         isRead= "Read";
         else
         isRead="Not read yet";
        const creatingbook = new Book(title, author, pages, isRead);
        Lib.addBookToLibrary(creatingbook);
}