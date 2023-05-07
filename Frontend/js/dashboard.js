// import baseURL from "./baseURL.js";
const baseURL = `http://localhost:9876/`;

let depObj={
    1:"Neurology",
    2:"Dermatology",
    3:"Dental",
    4:"Ayurveda",
    5:"Gastroenterology",
    6:"Gynaecology",
    7:"ENT",
    8:"General Physician",
    9:"Orthopedic",
    10:"Cardiology"
}

// if(!localStorage.getItem("admin")){
//     swal("", "Please Login!", "warning").then(function() {
//         window.location.href="./admin.login.html";
//     });
// }

//Dark-Light Theme Toggler
let sidemenu=document.querySelector("aside");
let themetoggler=document.querySelector(".theme-toggler")

themetoggler.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme-variables");
    themetoggler.querySelector("span").classList.toggle("active"); 
});

//On click section activate
let dash_btn=document.getElementById("menu-dash");
let doc_btn=document.getElementById("menu-doc");
let patient_btn=document.getElementById("menu-patient");
let app_btn=document.getElementById("menu-app");

let dash_cont=document.getElementById("dash-cont");
let doc_cont=document.getElementById("doc-cont");
let patient_cont=document.getElementById("patient-cont");
let app_cont=document.getElementById("app-cont");

dash_btn.addEventListener("click",()=>{
    dash_btn.classList.add("active");
    doc_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_btn.classList.remove("active");
    dash_cont.classList.remove("div-hide");
    doc_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

doc_btn.addEventListener("click",()=>{
    doc_btn.classList.add("active");
    dash_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_btn.classList.remove("active");
    doc_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

patient_btn.addEventListener("click",()=>{
    patient_btn.classList.add("active");
    dash_btn.classList.remove("active");
    doc_btn.classList.remove("active");
    app_btn.classList.remove("active");
    patient_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    doc_cont.classList.add("div-hide");
    app_cont.classList.add("div-hide");
});

app_btn.addEventListener("click",()=>{
    app_btn.classList.add("active");
    dash_btn.classList.remove("active");
    doc_btn.classList.remove("active");
    patient_btn.classList.remove("active");
    app_cont.classList.remove("div-hide");
    dash_cont.classList.add("div-hide");
    doc_cont.classList.add("div-hide");
    patient_cont.classList.add("div-hide");
});


//Dashboard Functions 

getStatus();
recentDocs();
recentPatients();
recentApps();

async function getStatus(){
    try{
        let res = await fetch(baseURL+"admin/all");
        // console.log(res)
        if(res.ok){
            let data=await res.json();
            // console.log(data)
            // document.getElementById("total-doc").innerText=data.totalTrainers;
            document.getElementById("total-pat").innerText=data.totalUsers;
            document.getElementById("total-app").innerText=data.totalClasses;
        }
    }catch(err){
        console.log(err);
    }
}

async function recentDocs(){
    try{
        let res=await fetch(baseURL+"doctor/allDoctor");
        if(res.ok){
            let data=await res.json();
            //console.log(data);
            let arr=data.doctor;
            renderDocsData(data.doctor);
            renderRecentDocs(arr[arr.length-1],arr[arr.length-2],arr[arr.length-3]);
        }
    }catch(err){
        console.log(err);
    }    
}

function renderRecentDocs(elem1,elem2,elem3){
    //console.log(elem1)

    document.getElementById("doc-tbody").innerHTML=`
    <tr>
        <td>${elem1.doctorName}</td>
        <td>${depObj[elem1.departmentId]}</td>
        <td>${elem1.phoneNo}</td>
        <td>${elem1.experience.split(" ")[0]}</td>
    </tr>
    <tr>
        <td>${elem2.doctorName}</td>
        <td>${depObj[elem2.departmentId]}</td>
        <td>${elem2.phoneNo}</td>
        <td>${elem2.experience.split(" ")[0]}</td>
    </tr>
    <tr>
        <td>${elem3.doctorName}</td>
        <td>${depObj[elem3.departmentId]}</td>
        <td>${elem3.phoneNo}</td>
        <td>${elem3.experience.split(" ")[0]}</td>
    </tr>
`
}

async function recentPatients(){
    try{
        let res=await fetch(baseURL+"admin/all");
        if(res.ok){
            let data=await res.json();
            // console.log(data);
            renderPatientsData(data.usersRegistered);
            let arr=data.usersRegistered;
            renderRecentPatients(arr[arr.length-1],arr[arr.length-2],arr[arr.length-3]);
        }
    }catch(err){
        console.log(err);
    }    
}

function renderRecentPatients(elem1,elem2,elem3){
    document.getElementById("pat-tbody").innerHTML=`
    <tr>
        <td>${elem1.name}</td>
        <td>${elem1.email}</td>
        <td>${elem1.phone}</td>
    </tr>
    <tr>
        <td>${elem2.name}</td>
        <td>${elem2.email}</td>
        <td>${elem2.phone}</td>
    </tr>
    <tr>
        <td>${elem3.name}</td>
        <td>${elem3.email}</td>
        <td>${elem3.phone}</td>
    </tr>
`
}

async function recentApps(){
    try{
        let res=await fetch(baseURL+"class/all");
        if(res.ok){
            let data=await res.json();
            // console.log(data.classes[0].title);
            renderAppsData(data.classes);
            let arr=data.classes;
            renderRecentApps(arr[arr.length-1],arr[arr.length-2],arr[arr.length-3]);  
        }
    }catch(err){
        console.log(err);
    }    
}

function renderRecentApps(elem1,elem2,elem3){
    document.getElementById("app-tbody").innerHTML=`
    <tr>
        <td>${elem1.title}</td>
        <td>${elem1.trainerName}</td>
        <td>${elem1.classDate}</td>
        <td>${elem1.classTime}</td>
    </tr>
    <tr>
        <td>${elem2.title}</td>
        <td>${elem2.trainerName}</td>
        <td>${elem2.classDate}</td>
        <td>${elem2.classTime}</td>
    </tr>
    <tr>
        <td>${elem3.title}</td>
        <td>${elem3.trainerName}</td>
        <td>${elem3.classDate}</td>
        <td>${elem3.classTime}</td>
    </tr>
`
}

//Doctor Functions 

function renderDocsData(arr){
    let docs_tbody=document.getElementById("doc-render");

    docs_tbody.innerHTML="";
    arr.forEach((elem,ind)=>{
        let tr=document.createElement("tr");

        let pfp=document.createElement("td");
        pfp.classList.add("pfp-td");
        let img=document.createElement("img");
        img.src=elem.image;
        img.classList.add("render-pfp");
        pfp.append(img);

        let name=document.createElement("td");
        name.innerText=elem.doctorName;

        let dept=document.createElement("td");
        dept.innerText=depObj[elem.departmentId];

        let email=document.createElement("td");
        email.innerText=elem.email;

        let phone=document.createElement("td");
        phone.innerText=elem.phoneNo;

        let status=document.createElement("td");
        if(elem.status){
            status.innerText="Approved";
            status.style.color="blue";
        }else{
            status.innerText="Click to approve";
            status.style.color="red"; 
            status.addEventListener("click",(e)=>{
                // console.log(arr);
                swal("", "Confirm Approval?", "info").then(function() {
                    approveDoctor(elem._id);
                    });
            })          
        }

        let del=document.createElement("td");
        del.innerText="Remove";
        del.style.color="red";
        del.addEventListener("click",(e)=>{
            swal("", "Confirm Delete?", "info").then(function() {
                deleteDoc(elem._id);
                });
        })

        tr.append(pfp,name,dept,email,phone,status,del);
        docs_tbody.append(tr);
    })
}

//ADD NEW DOCTOR
let docForm=document.querySelector(".create-doc form");

docForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const submit=confirm("Confirm submission?");
    if(submit){addDoc();}
})

async function addDoc(){
    let docObj={
        doctorName: docForm.name.value,
        email: docForm.email.value,
        qualifications: docForm.qual.value,
        experience: docForm.exp.value,
        phoneNo: docForm.phone.value,
        city: docForm.city.value,
        departmentId: docForm.dept.value,
        status: docForm.status.value,
        image: docForm.img.value,
    }
    // console.log(docObj);
    try{
        let res=await fetch(baseURL+`doctor/addDoctor`,{
            method:"POST",
            headers:{
				"content-type": "application/json"
			},
            body: JSON.stringify(docObj)
        });
        if(res.ok){
            let data=await res.json();
            swal("", `${data.msg}`, "success").then(function() {
                recentDocs();
                });
            }else{
                swal("",`${data.msg}`,"warning");
            }
    }catch(err){
        swal("","Error 404","warning");
    }    
}

//APPROVE DOCTOR
async function approveDoctor(id){
    // console.log(id);
    try{
        let res=await fetch(baseURL+`doctor/updateDoctorStatus/${id}`,{
            method:"PATCH",
            headers:{
				"content-type": "application/json"
			}
        });
        if(res.ok){
            let data=await res.json();
            recentDocs();
        }
    }catch(err){
        console.log(err);
    }    
}

//DELETE DOCTOR
async function deleteDoc(id){
    try{
        let res=await fetch(baseURL+`class/delete/${id}`,{
            method:"DELETE",
            headers:{
				"content-type": "application/json"
			}
        });
        if(res.ok){
            let data=await res.json();
            recentDocs();
        }
    }catch(err){
        console.log(err);
    }    
}

async function deleteUser(id){
    try{
        let res=await fetch(baseURL+`user/delete/${id}`,{
            method:"DELETE",
            headers:{
				"content-type": "application/json"
			}
        });
        if(res.ok){
            let data=await res.json();
            recentDocs();
        }
    }catch(err){
        console.log(err);
    }    
}


//SEARCH DOCTOR
let docInputTag=document.querySelector("#doc-sf-left>input");
docInputTag.addEventListener("input", async (e)=>{
    let searchVal=docInputTag.value;
    try{
        let res=await fetch(baseURL+`doctor/search?q=${searchVal}`);
        if(res.ok){
            let data=await res.json();
            //console.log(data);
            renderDocsData(data);
        }
    }catch(err){
        console.log(err);
    }
})

//FILTER BY DEPT ID
let docFilterTag=document.querySelector("#doc-sf-right>select");
docFilterTag.addEventListener("change",async (e)=>{
    let filterValue=docFilterTag.value;
    try{
        let res=await fetch(baseURL+`doctor/allDoctor/${filterValue}`);
        if(res.ok){
            let data=await res.json();
            if(data.msg){
                swal("", `${data.msg}`, "info").then(function() {
                    recentDocs();
                    });
                }else{
                    renderDocsData(data.doctor);
                }                
            } 
    }catch(err){
        console.log(err);
    }
})

//FILTER BY PENDING APPROVAL

document.querySelector("#filter-approval>button").addEventListener("click",async (e)=>{
    try{
        let res=await fetch(baseURL+`doctor/docPending`);
        if(res.ok){
            let data=await res.json();
            renderDocsData(data.docPending);
        }
    }catch(err){
        console.log(err);
    }
})

//RESET FILTERS

document.querySelector("#filter-approval>p").addEventListener("click",async (e)=>{
    try{
        recentDocs();
    }catch(err){
        console.log(err);
    }
})


//USERS DATA DISPLAY

function renderPatientsData(arr){
    let users_tbody=document.getElementById("user-render");

    users_tbody.innerHTML="";
    arr.forEach((elem)=>{
        let tr=document.createElement("tr");

        let name=document.createElement("td");
        name.innerText=elem.name;

        let email=document.createElement("td");
        email.innerText=elem.email;

        let phone=document.createElement("td");
        phone.innerText=elem.phone;

        let gender=document.createElement("td");
        gender.innerText=elem.sex;

        let block=document.createElement("td");
        block.innerText="Block";
        block.style.color="red";
        block.addEventListener("click",(e)=>{
            swal("", "Confirm Delete?", "info").then(function() {
                deleteUser(elem._id);
                });
        })


        tr.append(name,email,phone,gender,block);
        users_tbody.append(tr);
    })
}

//CLASSES DATA DISPLAY

function renderAppsData(arr){
    // console.log(arr);
    let apps_tbody=document.getElementById("apps-render");

    apps_tbody.innerHTML="";
    arr.forEach((elem)=>{
        let tr=document.createElement("tr");

        let title=document.createElement("td");
        title.innerText=elem.title;

        let trainerName=document.createElement("td");
        trainerName.innerText=elem.trainerName;

        let date=document.createElement("td");
        date.innerText=elem.classDate;

        let time=document.createElement("td");
        time.innerText=elem.classTime;

        let venue=document.createElement("td");
        venue.innerText=elem.venue;

        let del=document.createElement("td");
        del.innerText="Remove";
        del.style.color="red";
        del.addEventListener("click",(e)=>{
            swal("", "Confirm Delete?", "info").then(function() {
                deleteDoc(elem._id);
                });
        })



        tr.append(title,trainerName,date,time,venue,del);
        apps_tbody.append(tr);
    })
}

let classInputTag=document.querySelector("#app-sf-left>input");
classInputTag.addEventListener("input", async (e)=>{
    let searchVal=classInputTag.value;
    try{
        let res=await fetch(baseURL+`class/all`);
        if(res.ok){
            let data=await res.json();
            //console.log(data);
            let newData = data.classes.filter(function(element){
        return element.title.toLowerCase().includes(searchVal.toLowerCase());
    });
            renderAppsData(newData);
        }
    }catch(err){
        console.log(err);
    }
})


let userInputTag=document.querySelector("#patient-sf-left>input");
userInputTag.addEventListener("input", async (e)=>{
    let searchVal=userInputTag.value;
    try{
        let res=await fetch(baseURL+`user/all`);
        if(res.ok){
            let data=await res.json();
            //console.log(data);
            let newData = data.users.filter(function(element){
        return element.name.toLowerCase().includes(searchVal.toLowerCase());
    });
            renderPatientsData(newData);
        }
    }catch(err){
        console.log(err);
    }
})


//APPROVE Appointment
async function approveApp(id){
    // console.log(id);
    try{
        let res=await fetch(baseURL+`appointment/approve/${id}`,{
            method:"PATCH",
            headers:{
				"content-type": "application/json"
			}
        });
        if(res.ok){
            let data=await res.json();
            recentApps();
        }
    }catch(err){
        console.log(err);
    }    
}

//Logout
document.getElementById("menu-logout").addEventListener("click",(e)=>{
    localStorage.removeItem("admin");
    swal("", `Logged out successfully`, "success").then(function(){
        window.location.href="./index.html";
    });
})






