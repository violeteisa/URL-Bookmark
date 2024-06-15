var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteUrlInput = document.getElementById("websiteUrl");
var searchInput = document.getElementById("searchUrl");
var layer=document.getElementById("validationLayer");
var closeBtn=document.getElementById("closeBtn");
var submitBtn =document.getElementById("submitBtn");

var websiteList = []; //array to add website 
if (localStorage.getItem('websiteContainer') !== null) {
    websiteList = JSON.parse(localStorage.getItem('websiteContainer'));
    displayData();
}
//ADD WEBSITE FUNCTION
function addWebsite() {
    if( validationName()===true && validationUrl()===true){

        if (websiteUrlInput.value.indexOf('https://') !== 0) {
            websiteUrlInput.value = 'https://' + websiteUrlInput.value;
        }

        var website = {
            name: bookmarkNameInput.value,
            Url: websiteUrl,
        };
        websiteList.push(website);
        displayData();
        localStorage.setItem('websiteContainer', JSON.stringify(websiteList));
        console.log(websiteList);
    }
}

//CLEAR FUNCTION WHEN SUBMIT TO ADD ANOTHER WEBSITE
function clearData() {
    bookmarkNameInput.value = "";
    websiteUrlInput.value = "";
    bookmarkNameInput.classList.remove("is-valid");
    websiteUrlInput.classList.remove("is-valid")
}   


//DISPLAY DATA ON TABLET
function displayData() {
    var cartona = "";
    for (var i = 0; i < websiteList.length; i++) {
        cartona += `
        <tr>
        <td>${i+1}</td>
        <td>${websiteList[i].name }</td>
        <td> <button class="btn btn-outline-info" onclick="window.open('${websiteList[i].Url}')">
        <i class="fa-solid fa-eye"></i> Visit
        </button></td>
        <td> <button  onclick="deleteWebsite(${i})" class="btn btn-outline-secondary">
        <i class="fa-solid fa-trash-can"></i> Delete
        </button></td>
        </tr>
        `;
    }
        document.getElementById("displayData").innerHTML=cartona;
}

//DELETE  FUNCTION
//! CALL THIS FUNCTION ONCLICK DELETE BUTTON
function deleteWebsite(indexItem){

    websiteList.splice(indexItem,1)
    localStorage.setItem('websiteContainer',JSON.stringify(websiteList))
    displayData();
    console.log(websiteList)
}


//SEARCH INPUT  
function searchUrl(){
    var term =searchInput.value;
    var cartona = "";
    for (var i = 0; i < websiteList.length; i++) {
            if (websiteList[i].name.toLowerCase().includes(term.toLowerCase())==true){
                cartona += `
                <tr>
                <td>${i+1}</td>
                <td>${websiteList[i].name }</td>
                <td> <button class="btn btn-outline-info" onclick="window.open('${websiteList[i].Url}')">
                <i class="fa-solid fa-eye"></i> Visit
                </button></td>
                <td> <button  onclick="deleteWebsite(${i})" class="btn btn-outline-secondary">
                <i class="fa-solid fa-trash-can"></i> Delete
                </button></td>
                </tr>
                `;
            }
    }
    document.getElementById("displayData").innerHTML=cartona;
}


//NAME VALIDATION WITH REGEX
function validationName(){
    var text = bookmarkNameInput.value;
    var regex =/^\w{3,}(\s+\w+)*$/;
    if( regex.test(text) == true){
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");

        return true;
    }
    else{
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");

        return false;
    }
}


//URL VALIDATION WITH REGEX
function validationUrl(){
    var text = websiteUrlInput.value;
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if( regex.test(text) == true){
        websiteUrlInput.classList.add("is-valid");
        websiteUrlInput.classList.remove("is-invalid");
    
        return true;
    }
    else{
        websiteUrlInput.classList.add("is-invalid");
        websiteUrlInput.classList.remove("is-valid");
        return false;
    }
}


//SUBMIT BUTTON
    submitBtn.addEventListener('click', function () {
        if (validationName() === false || validationUrl() === false) {
            layer.classList.replace('d-none', 'd-flex');
        } else {
            layer.classList.replace('d-flex', 'd-none');
            clearData();
        }
    });


//CLOSE BUTTON INTO MODAL   
closeBtn.addEventListener('click', function(e){
    e.preventDefault();
    layer.classList.replace('d-flex','d-none')
})



















