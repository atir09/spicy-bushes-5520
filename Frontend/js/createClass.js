let baseURL="https://rich-plum-barracuda-fez.cyclic.app" 

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
// if(!loggedInUser){    
//     window.location.assign("../html/login.html");
// }
// let loggedInUserEmail = loggedInUser.email;
let loggedInUserEmail = "ucannotseeme09@gmail.com";


// .......................................Navbar........................................................


let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
	menu.classList.toggle('fa-times');
	navbar.classList.toggle('active');
};

window.onscroll = () => {
	menu.classList.remove('fa-times');
	navbar.classList.remove('active');
};



// ................................................Create Class Form...................................................................


let form = document.querySelector("form");

let venue=document.getElementById("venue");
let locationOrLink=document.getElementById("locationOrLink");
let date_time=document.getElementById("date_time");
let activity=document.getElementById("activity");
let left_img_part=document.querySelector("#left_img_part img");

// activity.addEventListener("input",()=>{
//     left_img_part.src=renderImages(activity.value)
// })




locationOrLink.readOnly = true;

venue.addEventListener("input",()=>{
    if(venue.value=="offline"){
        locationOrLink.readOnly = false;
        locationOrLink.placeholder= "Enter City name";
        locationOrLink.value= "";
    }else{
        locationOrLink.readOnly = true;
        locationOrLink.placeholder= "Select Class Date & Time to generate class link";
        locationOrLink.value= "Select Class Date & Time to generate class link";
    }
})

date_time.addEventListener("input",()=>{
    if(venue.value=="online"){
        locationOrLink.value= "https://us06web.zoom.us/j/9314210793";
    }
})

form.addEventListener("submit",(e)=>{

    e.preventDefault();
	console.log(form.date_time.value)
    let date_time= form.date_time.value.split("T");
	let date=date_time[0][8]+date_time[0][9]+date_time[0][7]+date_time[0][5]+date_time[0][6]+date_time[0][4]+date_time[0][0]+date_time[0][1]+date_time[0][2]+date_time[0][3]
    
    let obj = {
        title: form.title.value,
        price: form.price.value,  
        activity: form.activity.value,
        seatTotal: form.seatTotal.value,
        venue: form.venue.value,
        locationOrLink: form.locationOrLink.value,
        duration: form.duration.value,
        classDate: date,
        classTime: date_time[1],
		userID:loggedInUser._id,
		username:loggedInUser.name 
		// Check Session Storage Key names
    }
    classSaveInDB(obj);
	// console.log(obj)
})


async function classSaveInDB(obj){
    try {
        let url = baseURL+"/class/create"
        let res = await fetch(url,{
            method:"POST",
            headers: {
              authorization:`Bearer ${loggedInUserEmail}`,
              "Content-Type": "application/json",
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(res.status==400){
            // alert(data.message)            
            swal({text: data.message, icon: "error", button: "ok", timer:1000})
            console.log(data.error)
        }else{
            // alert(data.message);
            swal({text: data.message, icon: "success", button: "ok", timer:1000})
            .then(()=>{ 
                window.location.assign("../html/createClass.html");
            })
            console.log(data.classes);
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}

function renderImages(actname){
    let allImagesData={
        yoga:["../Images/Classes_Images/yoga1.jpg","../Images/Classes_Images/yoga2.jpg","../Images/Classes_Images/yoga3.jpg"],
        cardio:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/crossfit1.jpg"],
        swimming:["../Images/Classes_Images/swimming1.jpg","../Images/Classes_Images/swimming2.jpg","../Images/Classes_Images/swimming3.jpg"],
        running:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        zumba:["../Images/Classes_Images/zumba1.jpg","../Images/Classes_Images/zumba2.jpg","../Images/Classes_Images/zumba3.jpg"],
        aerobics:["../Images/Classes_Images/aerobics1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/aerobics3.jpg"],
        ballet:["../Images/Classes_Images/ballet1.jpg","../Images/Classes_Images/ballet2.jpg","../Images/Classes_Images/ballet3.jpg"],
        basketball:["../Images/Classes_Images/basketball1.jpg","../Images/Classes_Images/basketball2.jpg","../Images/Classes_Images/basketball3.jpg"],
        boxing:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/boxing3.jpg","../Images/Classes_Images/boxing2.jpg"],
        crossfit:["../Images/Classes_Images/crossfit1.jpg","../Images/Classes_Images/crossfit3.jpg","../Images/Classes_Images/crossfit2.jpg"],
        cycling:["../Images/Classes_Images/cycling1.jpg","../Images/Classes_Images/cycling2.jpg","../Images/Classes_Images/cycling3.jpg"],
        football:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        kickboxing:["../Images/Classes_Images/kickboxing1.jpg","../Images/Classes_Images/kickboxing2.jpg","../Images/Classes_Images/kickboxing3.jpg"],
        singing:["../Images/Classes_Images/singing1.jpg","../Images/Classes_Images/singing3.jpg","../Images/Classes_Images/singing2.jpg"],
        weighttraining:["../Images/Classes_Images/weighttraining1.jpg","../Images/Classes_Images/weighttraining2.jpg","../Images/Classes_Images/weighttraining3.jpg"],
        dance:["../Images/Classes_Images/dance1.jpg","../Images/Classes_Images/dance2.jpg","../Images/Classes_Images/dance3.jpg"]
    }
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
   let randomIndex = Math.floor(Math.random() * 2);
   let item = arr[randomIndex];
  return item;
}