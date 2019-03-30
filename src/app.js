//Declaración de variables 
txtName = document.getElementById('txt-name');
txtTestimony = document.getElementById('txt-testimony');
shareTestimonyBtn = document.getElementById('share-testimony');

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//   Subir información a la bd testimonios
const saveTesimony = () => {
    let name = txtName.value;
    let testimony = txtTestimony.value;
    db.collection("testimonies").add({
        name: name,
        testimony: testimony,
   })
        .then((docRef) => {
            txtName.value = "";
            txtTestimony.value = "";
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
      <p>${doc.data().name}</p>
      <p>${doc.data().testimony}</p>
     `
    })
  });
 


shareTestimonyBtn.addEventListener('click', saveTesimony);