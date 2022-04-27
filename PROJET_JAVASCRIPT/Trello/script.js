const entete = document.querySelector('.entete');
const power = document.getElementById('power');
const container = document.getElementById('container');
const colonne = document.getElementById('colonne');
const notes = document.getElementById('notes');
const closeModal = document.getElementById('closeModal');
const modalContainer = document.querySelector('.modal-container');
const btnTâche = document.getElementById('btnTâche');
const form = document.getElementById('form');
const texta = document.getElementById('textarea');
const date = document.getElementById('date');
const heureDebut = document.getElementById('heureDebut');
const heureFin = document.getElementById('heureFin');
const restauration = document.getElementById('menu-recycle');
const nav = document.querySelector('.nav-bar');
const corbeille = document.getElementById('Corbeille');
const columnContainTrash = document.getElementById('column-contain-trash');
const menuSave = document.getElementById('menu-save');
const menu = document.querySelector('.menu')

//dertermine la date locale
var n = new Date();
function formatISOLocal(d) {
    let z = n => ('0' + n).slice(-2);
    return d.getFullYear()+'-'+z(d.getMonth()+1) + '-' + z(d.getDate());
  }
  date.setAttribute('min',formatISOLocal(n));

        //Evènnement apparition corbeille
        corbeille.addEventListener('click',function(){
            nav.classList.toggle('show-nav')
        })

//Evennement qui déclenche la Validation Form
form.addEventListener('submit',function(e){
    e.preventDefault();
        if((checkRequired(texta,date) == false) || (checkHour(heureDebut,heureFin) == false)){
            console.log(checkRequired(texta))
            checkRequired(texta,date);
            checkHour(heureDebut,heureFin);
        }
        else{
            // console.log("ok")
            if(btnTâche.getAttribute('data-edit') != 'edit'){
                const div2 = document.querySelector('.column-contain');
                createTask(div2);
                form.reset();
                btnTâche.removeAttribute('data-edit');
        }
   }
})
// 
//Bouton fermeture du modal
closeModal.addEventListener('click',function(){
    modalContainer.classList.remove('show-modal');
    btnTâche.removeAttribute('data-edit');
})
// addTask.addEventListener('click',function(){
//     modalContainer.classList.remove('show-modal');
// })
//  addTask.addEventListener('click',function(){
//      modalContainer.classList.remove('show-modal');
//  })

power.addEventListener('click',function(){ 
    entete.classList.toggle('closeMenu');
})

var i=1;
//Evennement notes
notes.addEventListener('click',function(){
    if(i !== 1){
        modalContainer.classList.toggle('show-modal');
    }
})

var tabColor=["beige", "turquoise", "gray", "aqua", "salmon"];
//Evennement colonne
colonne.addEventListener('click',function(){
        createColumn();
})
//Création  colonne
function createColumn(){
    //Creation divG = container Columb
    const divG = document.createElement('div');
    divG.className="column";
    //Creation div1 = Entete Colum  
    const div1 = document.createElement('div');
    div1.className="column-name";
    const p = document.createElement('p');
    p.className="removable";
    p.innerText="colonne "+i;
      // Creation Button CloseColum
    const CloseColum = document.createElement('i');
    CloseColum.className="fa-solid fa-xmark";
    CloseColum.setAttribute('id','iButton');
     //Creation input
    const input = document.createElement('input');
    input.className='inputRename';
    div1.appendChild(input);
    //div2 = centreColum
    const div2 = document.createElement('div');
    div2.className="column-contain";
    div2.setAttribute('id',i);
    div2.style.backgroundColor=tabColor[i-1];
    //Evennement fermeture colonne avec teste du 1er colonne
    CloseColum.addEventListener('click',function(e){
        var testId = parseInt(e.target.parentElement.nextElementSibling.getAttribute('id'));
        var countColumn = document.querySelectorAll('.column').length;
        if(testId!=1 || (countColumn==1 && testId==1) ){
            e.target.parentElement.parentElement.remove();
            i--;
            colonne.style.display="block";
            refresh();
            console.log(testId)
        }
    });
    //Creation div Logo
    const divLogo = document.createElement('div');
    divLogo.className="logo";
    //Ajout iamgeLogo
    const img = document.createElement('img');
    // img.style.backgroundImage = "url('img.png')";
    img.setAttribute('height','120px');
    img.src="img.png";

    divLogo.appendChild(img);
    div1.appendChild(p);
    div1.appendChild(CloseColum);
    divG.appendChild(div1);
    divG.appendChild(div2);
    divG.appendChild(divLogo);
    container.appendChild(divG);

    if(i==5){
        colonne.style.display="none";
    }
    i++;
    //Editer l'entête
    div1.addEventListener('dblclick',function(){
        p.style.display="none";
        input.style.display="block";
        input.addEventListener('blur',function(){
            p.style.display="block";
            input.style.display="none";
            input.focus();
            p.innerText=input.value;
        })
    })
    
}
//Création Tâche    
function createTask(div){
    //Création div tâche
    const divTask = document.createElement('div');
    divTask.className="task";
    divTask.setAttribute('data-text',texta.value);
    divTask.setAttribute('data-date',date.value);
    divTask.setAttribute('data-hour-begin',heureDebut.value);
    divTask.setAttribute('data-hour-end',heureFin.value);
    divTask.setAttribute('class','task testEdit');
    //Bouton Arrow left
    const i1 = document.createElement('i');
    i1.className="fa-solid fa-angles-left";
    
    //Création bouton suppression tâche
    const supTâche = document.createElement('i');
    supTâche.className="fa-solid fa-box-archive";
    supTâche.style.color='red'
    supTâche.style.marginTop='-28%'
    supTâche.style.marginLeft='0%'
    //Bouton Restaurer
    const Restaurer = document.createElement('i');
    Restaurer.className="fas fa-trash-restore";
    Restaurer.style.color='white'
    Restaurer.style.marginTop='-30%'
     //Arrow rightRestaurer.style.
    const i2 = document.createElement('i');
    i2.className="fa-solid fa-angles-right";
    //divDesc = Info saisi au niveau du texarea
    const divDesc = document.createElement('div');
    divDesc.className = "taskInfo";
    divDesc.innerText = texta.value;

    const divOver = document.createElement('div');
    divOver.className="divOver";
    
    const p1 = document.createElement('p');
    p1.innerHTML = `<br>Date : ${date.value}` ;
    p1.style.marginLeft ='-20%';
    const p2 = document.createElement('p');
    p2.innerText = `Heure debut : ${heureDebut.value}`;
    p2.style.marginLeft ='-20%';
    const p3 = document.createElement('p');
    p3.innerText = `Heure fin : ${heureFin.value}`;
    p3.style.marginLeft ='-20%';
    divOver.appendChild(p1);
    divOver.appendChild(p2);
    divOver.appendChild(p3);
    divTask.appendChild(i1);
    divTask.appendChild(supTâche);
    divTask.appendChild(Restaurer);
    divTask.appendChild(i2);
    divDesc.appendChild(divOver);
    divTask.appendChild(divDesc);
    div.appendChild(divTask);
    //
    setInterval(() => {
        var dateValue = divTask.getAttribute('data-date');
        var heureDebutValue = divTask.getAttribute('data-hour-begin');
        var heureFinValue = divTask.getAttribute('data-hour-end');
        var time_input_debut = heureDebutValue.split(':');
        var heure_input_debut = time_input_debut[0];
        var min_input_debut = time_input_debut[1];
        var time_input_fin = heureFinValue.split(':');
        var heure_input_fin = time_input_fin[0];
        var min_input_fin = time_input_fin[1];

        var now = new Date();
        var hour_now = now.getHours();
        var min_now = now.getMinutes();
        if((heure_input_debut == hour_now) && (min_input_debut == min_now)){
            divTask.style.backgroundColor = "green";
        }
        else if((heure_input_fin == hour_now) && (min_input_fin == min_now)){
            divTask.style.backgroundColor = "gray";
            i1.style.visibility="hidden";
            i2.style.visibility="hidden";
            supTâche.style.visibility="hidden";
            divTask.classList.remove('testEdit');
        }

   },1000); 
    
    divTask.addEventListener('dblclick',function(e){//Pour renommer une tâche

        if(divTask.parentElement.classList.contains('column-contain2')==false){
            if(divTask.classList.contains('testEdit')){
                modalContainer.classList.toggle('show-modal');
                texta.value = divTask.getAttribute('data-text');
                date.value = divTask.getAttribute('data-date');
                heureDebut.value = divTask.getAttribute('data-hour-begin');
                heureFin.value = divTask.getAttribute('data-hour-end');
                btnTâche.setAttribute('data-edit','edit');
        
                // var cssObj = window.getComputedStyle(divTask);
                // console.log(cssObj)
                // console.log( window.getComputedStyle(divTask))
                // var color = cssObj.backgroundColor;
                btnTâche.addEventListener('click',function(){
                        if(btnTâche.getAttribute('data-edit') == 'edit'){
                            divTask.setAttribute('data-text',texta.value);
                            divTask.setAttribute('data-date',date.value);
                            divTask.setAttribute('data-hour-begin',heureDebut.value);
                            divTask.setAttribute('data-hour-end',heureFin.value);
                            divDesc.innerText = divTask.getAttribute('data-text');
                            p1.innerText = `Date : ${divTask.getAttribute('data-date')}`;
                            p2.innerText = `Heure debut : ${divTask.getAttribute('data-hour-begin')}`;
                            p3.innerText = `Heure fin : ${divTask.getAttribute('data-hour-end')}`;
                            divOver.appendChild(p1);
                            divOver.appendChild(p2);
                            divOver.appendChild(p3);
                            divDesc.appendChild(divOver)
                            divTask.appendChild(divDesc);
                        }
                    })
            }
        }
        
    })
     //Pour modifier la bordure divTask "agrandir"
    divTask.addEventListener('mouseenter',function(){
        var testClass = divTask.parentElement.classList;
        supTâche.style.display = 'block';
        Restaurer.style.display = "none";
        divOver.style.display = 'block';
        if(testClass.contains('column-contain2')){
            Restaurer.style.display = "block";
            supTâche.style.display = 'none';
        }
        divTask.style.height = "100px";
    })
     //Contraire de mousseenter
    divTask.addEventListener('mouseleave',function(){
        supTâche.style.display = 'none';
        Restaurer.style.display = "none";
        divTask.style.height = "50px";
        divOver.style.display = "none";
    })

    supTâche.addEventListener('click',function(e){
        var search = e.target.parentElement.parentElement.getAttribute('id');
        // console.log(search)
        columnContainTrash.appendChild(e.target.parentElement);
       
        Restaurer.addEventListener('click',function(e){
            var divColumn1 = document.getElementById(search);
            divColumn1.appendChild(e.target.parentElement);
        })
    })

    
    setInterval(() => {
        var test = parseInt(divTask.parentElement.getAttribute('id'));
        if(test==1){
            i1.style.visibility="hidden";
        }
    },1000); 
        i1.addEventListener('click',function(){
            i2.style.visibility="visible"
            divTask.classList.add('select');
            var indice_left = parseInt(divTask.parentElement.getAttribute('id'));
            indice_left = indice_left-1;
            var part_left = document.getElementById(indice_left);
            move(part_left);
            divTask.classList.remove('select');
        });
      
        i2.addEventListener('click',function(){
            var tab = document.querySelectorAll('.column-contain'); 
            divTask.classList.add('select');
            var indice_right = parseInt(divTask.parentElement.getAttribute('id'));
            i1.style.visibility="visible";
            indice_right = indice_right+1;
            setInterval(() => {
                var tab = document.querySelectorAll('.column-contain'); 
                var indice_right = parseInt(divTask.parentElement.getAttribute('id'));
                if((indice_right==tab.length) ){
                    i2.style.visibility="hidden";
                }
                else{
                    i2.style.visibility="visible";
                }
            },1000); 
            var part_right = document.getElementById(indice_right);
            move(part_right);
            divTask.classList.remove('select');

        });
             
        restauration.addEventListener('click',function(e){
            moveAll(document.querySelector('.column-contain'));
        })
        
}

function move(right){
    const tabDiv = document.querySelectorAll('.task');
    tabDiv.forEach(div => {
            if(div.classList.contains('select')){
                right.appendChild(div);
            }
    });
    console.log(move(right))
}

function moveAll(right){
    const tabDiv = document.querySelectorAll('.task');
    tabDiv.forEach(div => {
        if(div.parentElement.classList.contains('column-contain') == true){
            right.appendChild(div);
        }
        console.log( moveAll(right))
    });
}

//Rendre en ordre les colonnes(entete)
function refresh(){
    var removables = document.querySelectorAll('.removable');
    removables.forEach((element,i) => {
        element.innerHTML = `colonne ${i+1}`;
        // console.log(removables)
    });
    //Rendre en ordre les colonnes(colum)
    var removablesId = document.querySelectorAll('.column-contain');
    removablesId.forEach((id,i) => {
        i++;
        id.setAttribute('id',i);
        // console.log(removablesId)
    }); 
}

function showError(input,message){
   const formControl = input.parentElement
    formControl.className = 'form-control error'
    const span = formControl.querySelector('small')
    span.innerText = message
}
function showSuccess(input,message){
   const formControl = input.parentElement
    formControl.className = 'form-control success'
    const span = formControl.querySelector('small')
    span.innerText = message
}

// Validation champ vide
function checkRequired(input,input0) {
    if (input.value.trim() === '' || input0.value.trim() === '') {
        showError(input,"veuillez remplir ce champ");
        showError(input0,"veuillez remplir ce champ");
        return false;
    }
    else{
        showSuccess(input);
        showSuccess(input0);

        return true;
    }
}

// Validation Cas différence d'heure 
function checkHour(input1,input2){
    var startTime = moment(input1.value, 'HH:mm');
    var endTime = moment(input2.value, 'HH:mm');

    var duration = moment.duration(endTime.diff(startTime));

    var hours = parseInt(duration.asHours());

    var minutes = parseInt(duration.asMinutes()) % 60;
   
    if(hours <=0 && minutes <=0 ){
        showError(input1," ");
        showError(input2,"l heure de fin doit etre superieur a l heure de debut");
        return false;
    }else if(input1.value.trim() === '' || input2.value.trim() === ''){
        showError(input1,"veuillez remplir ce champ");
        showError(input2,"veuillez remplir ce champ");
        return false;
    }
    else{
        showSuccess(input1);
        showSuccess(input2);
        return true;
    }
}

menuSave.addEventListener ('click',async () => {
    var data = await testFetch();
})

async function testFetch() {
    var tab = [];
    var columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        var tasks = column.querySelectorAll('.task');
        var nomColonne = column.childNodes[0].innerText;
        var positionColumn = column.childNodes[1].getAttribute('id');
        tasks.forEach(task => {
            var object = {
                taches : Array({
                    label_task : task.getAttribute('data-text'),
                    date_task : task.getAttribute('data-date'),
                    hour_task_begin : task.getAttribute('data-hour-begin'),
                    hour_task_end : task.getAttribute('data-hour-end'),
                    nom_colonne : nomColonne,
                    position_colonne : positionColumn,
                })
            }
            tab.push(object);
        });
    });

    var json = JSON.stringify(tab);

    var formTest = new FormData();
    var dateNow =  moment().format('MMMM Do YYYY, h:mm:ss a');
    formTest.append("controller","tache");
    formTest.append("action","create");
    formTest.append("column",json);
    formTest.append("dateNow",dateNow);
    //formTest.append("nom_colonne",nomColonne);
    let rawResponse = await fetch('http://127.0.0.1/PROJET_JAVASCRIPT_MVC/public/', {
      method: 'POST',
      body: formTest
    });
    return await rawResponse.json();
  
  };

//   console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
























//   { <form id="theForm" method="post" acion="">
// //   <input type="firstname" value="" required />
// //   <input type="lastname" value="" required />
// //   <input type="button" name="button" value="Submit" />  
// // </form>

// window.onload = function () {
//   var form = document.getElementById('theForm');
//   form.button.onclick = function (){
//     for(var i=0; i < form.elements.length; i++){
//       if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
//         alert('There are some required fields!');
//         return false;
//       }
//     }
//     form.submit();
//   }; 
// }; }
// window.onload = async ()=>{
//     //  let data = await getdata();
//     //  console.log(await getdata())
//  }

//  async function getdata(ob_etat){

//     let form = new FormData();

//     form.append("controller","securite") 
//     form.append("Nom",JSON.stringify(ob_etat));
//     // form.append("Prenom","Mor");

//      let reponse= await fetch("http://localhost:8002/",{
//         method: "POST",
//         body:form 
//      })
//      return await reponse.json();
//  }
 
//  save.addEventListener('click',async function(){
//     alert("Enregistrement avec succes")
//     var data= savedonnes() 
//     console.log(await getdata(data)); 
    
    
// })
// function savedonnes(){
    
//      var ladate=moment();
     
//     var tourcolonne=document.querySelectorAll('.colonne')
//     var ob_etat={
//         date:"",
//         colonnes:[]
//     }
//     ob_etat.date=`${ladate}`
//     tourcolonne.forEach(element => {
//         var col={
//             nom:"",
//             taches:[]
//         }
//         col.nom=element.querySelector('.input').innerHTML
//         col.taches=[]
//         element.querySelectorAll('.div').forEach(element1 => {
//             var tache={
//                 description:"",
//                 date:"",
//                 heured:"",
//                 heuref:"",
//             };
//             tache.description=element1.querySelector('.divTask').value
//             tache.date=element1.querySelector('.sppan').firstElementChild.innerHTML
//             tache.heured=element1.querySelector('.sppan').firstElementChild.nextElementSibling.innerHTML
//             tache.heuref=element1.querySelector('.sppan').lastElementChild.innerHTML
//             col.taches.push(tache)
//         });
//         // ob_etat.date=ladate.innerHTML;
//         ob_etat.colonnes.push(col)
//         // console.log(ob_etat)  

//     });
//     return ob_etat;
  

// }
