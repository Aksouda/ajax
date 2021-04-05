const btn =  document.getElementById('btn');
const btn1 =  document.getElementById('btn1');
const main =  document.querySelector('main');

btn.addEventListener('click',getMessage);

function getMessage(){
    //creating an XHR
    var req = new XMLHttpRequest ;
    //feching the request
    req.open('GET','message.json',true);
    
    
    req.onload = function(){
        if(req.status === 200){
            //identifying the request as json
            var user = JSON.parse(req.responseText);

            console.log(user);
            //creating an element
           const msg = document.createElement('div');
           msg.classList.add('message');
            //appending that element in html
           msg.innerHTML = user.likes;
            main.appendChild(msg);

        }else{
            console.log('it aint here');
        }
    }
    req.send();
}

btn1.addEventListener('click',getall);

function getall(){
    var reqAll = new XMLHttpRequest ;
    reqAll.open('GET','all.json',true);
     
    reqAll.onload = function (){
        var allusers = JSON.parse(reqAll.responseText);
        console.log(allusers);

        allusers.forEach(user => {
           var userEL = document.createElement('div');
            userEL.classList.add('allusers');
            userEL.innerHTML = `<ul>
            <li>name:${user.name}</li>
            <li>likes:${user.likes}</li>
            <li>age:${user.age}</li>
            </ul>`;
        document.body.appendChild(userEL);
    });
        
    }
    reqAll.send();
}


const btn3 = document.getElementById('btn3');
const card = document.getElementById('card');


/* the old way of getting data from an api */

/* btn3.addEventListener('click',githubusers); */

/* function githubusers (){
    
    var reqgithub = new XMLHttpRequest 
    reqgithub.open('GET','https://api.github.com/users',true);
    reqgithub.onload = function(){
        if(reqgithub.status === 200){
            var githubData = JSON.parse(reqgithub.responseText);
            console.log(githubData);
            githubData.forEach(dev =>{
                var devEL = document.createElement('div');
                devEL.classList.add('dev');
                devEL.innerHTML = `<img src="${dev.avatar_url}" alt="img" >
                <div class="dev-info">name: ${dev.login}</div>`;
                card.appendChild(devEL);
            });
        }
    }
    reqgithub.send();
} */


const APIURL = "https://api.github.com/users" ;
async function hubbers(){
    let resphubbers = await fetch(APIURL);
    let respData = await resphubbers.json();
    console.log(respData);
    respData.forEach(person=>{
        let personEL = document.createElement('div');
        personEL.classList.add('dev');
        personEL.innerHTML = `<img src="${person.avatar_url}" alt="img">
        <div class="dev-info">developer's name : ${person.login}</div>`;
        card.appendChild(personEL);
    });
   return respData;
}

hubbers();