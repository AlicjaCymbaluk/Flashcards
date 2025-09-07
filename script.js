localStorage.setItem("collectionArray",JSON.stringify([])); //inicjacja tablicy w local storage

const home=document.getElementById("btn-home");
const myCollectionBtn=document.getElementById("btn-my-collection");
const myMarksBtn=document.getElementById("btn-my-marks");
const homeSection=document.querySelector(".home");
const myCollectionSection=document.querySelector(".my-collection");
const marksSection=document.querySelector(".marks");
const flashCard = document.querySelector(".flash-card");

myCollectionBtn.addEventListener("click", function () {
    myCollectionSection.classList.remove("hidden");
    homeSection.classList.add("hidden");
    marksSection.classList.remove("visible");
    marksSection.classList.add("hidden");
    flashCard.classList.remove("visible");
    flashCard.classList.add("hidden");

});

home.addEventListener("click", function () {
    myCollectionSection.classList.remove("visible");
    myCollectionSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
    marksSection.classList.remove("visible");
    marksSection.classList.add("hidden");
    flashCard.classList.remove("visible");
    flashCard.classList.add("hidden");
});

myMarksBtn.addEventListener("click", function () {
    myCollectionSection.classList.remove("visible");
    myCollectionSection.classList.add("hidden");
    homeSection.classList.add("hidden");
    marksSection.classList.remove("hidden");
    marksSection.classList.add("visible");
    flashCard.classList.remove("visible");
    flashCard.classList.add("hidden");
    });

const switchBox=document.querySelector(".switch");
const checkBox=document.querySelector(".checkbox");
switchBox.addEventListener("click", function(){
    checkBox.checked=!checkBox.checked;
    if(checkBox.checked){
        document.querySelector("body").classList.add("dark-mode-color");
    } else{
        document.querySelector("body").classList.remove("dark-mode-color");
    }
});

function addCollection(){
    const collectionName = document.querySelector(".collection-name").value; //pobranie nazwy kolekcji podanej przez użytkownika z imputa
    const collectionArray = JSON.parse(localStorage.getItem("collectionArray")); //odczytuje tablicę z local storage
    collectionArray.push(collectionName);//dodaje nową nazwę do tej tablicy
    localStorage.setItem("collectionArray", JSON.stringify(collectionArray));//dopisanie
    console.log(JSON.parse(localStorage.getItem("collectionArray")));
    document.querySelector(".collection-name").value="";//czysci pole tekstowe, żeby wpisać kolejną nazwę
    //dodać zabezpieczenie gdy warość jest pusta
}
function deleteSet(element){
    // const targetIcon = event.currentTarget;
    //     const element = targetIcon.parentElement.querySelector(".set-name");
        console.log(element);
        const collectionArray = JSON.parse(localStorage.getItem("collectionArray"));
        const updatedArray = collectionArray.filter(item=> item!== element);
        localStorage.setItem("collectionArray", JSON.stringify(updatedArray)); //dodanie do local storage zaktualizowanej tablicy, zamiana tablicy na JSON (format tekstowy do przechowywania danych)
        showSets();
}

function showSets(){
    const collectionArray = JSON.parse(localStorage.getItem("collectionArray")); //Pobiera dane z localStorage pod kluczem "collectionArray" i zamienia je z formatu JSON na tablicę JavaScript
    const setList = document.querySelector(".set-list"); //Wybiera kontener, do którego będą dodawane nowe zestawy (czyli kolekcje użytkownika).
    const setObject = document.querySelector(".btn-set");//Wybiera istniejący element .btn-set, który jest statycznie wpisany w HTML — służy jako szablon do klonowania.
    const newSet = setObject.cloneNode(true); //Tworzy kopię tego szablonu — ale tylko jedną kopię, co jest problemem (więcej o tym niżej).
    collectionArray.forEach(element => {   //Iteruje po tablicy collectionArray, nadpisuje zawartość newSet tekstem z tablicy
        newSet.querySelector(".set-name").innerHTML=element;
        newSet.querySelector(".fi-rr-trash").addEventListener("click", ()=>{deleteSet(element)});

        // const newSet = document.createElement("div");
        // newSet.classList.add("btn-set");
        // newSet.textContent=element;

        newSet.style.display="block";


        // newSet.appendChild(trashIcon);//dodaje ikone jako nast. dziecko
        setList.appendChild(newSet);//dodaje go do kontenera setList.
    });
    addFlashcard();
}



function addFlashcard (){
    const setObjects = document.querySelectorAll(".btn-set");
    //const collectionArray = JSON.parse(localStorage.getItem("collectionArray"));

    setObjects.forEach(set=>{
        set.addEventListener("click", function(event) {
        if (event.target.classList.contains("fi-rr-trash")) return; //przerywa działanie jesli przedmiot eventu jest koszem
        myCollectionSection.classList.remove("visible");
        myCollectionSection.classList.add("hidden");
        flashCard.classList.remove("hidden");
        flashCard.classList.add("visible");
        const header = document.querySelector(".my-collection-name");
        header.innerText = event.currentTarget.textContent; //zamiana treści nagłówka ale coś się zapętliło i jest  !!!!!!
        });
    });
}

// function showFlashcard (){

// }

//     //console.log(collectionArray);
    // const setObjects = document.querySelector(".btn-set");
    // collectionArray.forEach(element=>{
   // })

    //po klknięciu na element listy widac nowy widok

//klikam na kolekcję dodaną i dodaję w niej tablice do tablicy -> jedna strona to nazwa . druga strona odpowiedz
// na klika musi się zmianiać widok znika add collection i pojawia sie dwie strony ->fiszka i odpowiedz i jest opcja sprawdź
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", showSets);

