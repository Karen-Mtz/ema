//Declaración de variables 
txtName = document.getElementById('txt-name');
txtTestimony = document.getElementById('txt-testimony');
shareTestimonyBtn = document.getElementById('share-testimony');
areaTestimony = document.getElementById('area-testimony');
emailArea = document.getElementById('email');

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//   Subir información a la bd testimonios
const saveTesimony = () => {
    let name = txtName.value;
    let testimony = txtTestimony.value;
    let area = areaTestimony.value;
    let email = emailArea.value;
    db.collection("testimonies").add({
        name: name,
        testimony: testimony,
        area: area,
        email: email,     
   })
        .then((docRef) => {
            txtName.value = "";
            txtTestimony.value = "";
            areaTestimony.value = "";
            emailArea.value = "";
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}


// Imprimir testimonios en el foro
db.collection("testimonies").onSnapshot((querySnapshot) => {
    forum.innerHTML= "";
    querySnapshot.forEach(function(doc) {
      forum.innerHTML += `
      <div class="row white section">
        <blockquote >
        <div class="section">
        <p class = "flow-text">${doc.data().name}</p>
        <p>${doc.data().area}</p>
        <p  class = "section">${doc.data().testimony}</p>
        </div>
        <button class = "btn1"><i class="fas fa-comments"></i></button></div>
        </blockquote>

        `
    })
  });
 


shareTestimonyBtn.addEventListener('click', saveTesimony);