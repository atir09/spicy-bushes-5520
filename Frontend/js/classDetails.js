const baseURL="https://rich-plum-barracuda-fez.cyclic.app" 

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("../html/login.html");
}
let loggedInUserEmail = loggedInUser.email;

const urlParams = new URLSearchParams(window.location.search)
const classId = urlParams.get("id")

// .....................................................................................................

// const classId="645514f72272571e775560e4"
// const loggedInUserEmail="ucannotseeme09@gmail.com"

// .....................................................................................................




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



// ......................................Rebder Class and Trainer details............................................


getAllClass(classId)
async function getAllClass(classId){
    try{
     let dataFetch=await fetch(`${baseURL}/class/${classId}`,{
        headers:{
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
           let trainerID=res.classes.trainerID
           let trainerInfo=getTrainer(trainerID)
           trainerInfo.then((temp)=>{renderAllData(res.classes,temp)})
        })
       }else{
        alert("Classes Not Fetched")
        swal({text: "Classes Not Fetched", icon: "error", button: "ok", timer:1000})        
       }    
       } catch (error) {
        console.log(error)
       }
}

async function getTrainer(trainerID){
    try{
        let dataFetch=await fetch(`${baseURL}/user/${trainerID}`,{
           headers:{
               authorization:`Bearer ${loggedInUserEmail}`
           }
       })
            if(dataFetch.ok){
                let temp= await dataFetch.json()
               return (temp.user)
            }else{
                // alert("Trainer Not Fetched")       
                swal({text: "Trainer Not Fetched", icon: "error", button: "ok", timer:1000})
            }
    } catch (error) {
           console.log(error)
    }
}

let mainDiv=document.getElementById('renderallinfo')

async function  renderAllData(classes,trainerInfo){
    // console.log(classes,trainerInfo)
   mainDiv.innerHTML=`

   <div id="classalldesc">
      <div id="imgandjoinbtn">
       <div id="descimg">
           <img src=${classes.activity?renderImages(classes.activity):renderImages("Dance")} alt="" id="trainerimg">
       </div>
       <div id="descjoin">
           <button id="joinclassdesc" data-id=${classes._id}>Join Class</button>
       </div>
      </div>
       <div id="descdesc">
           <p>${classes.activity? rederActDesc(classes.activity):rederActDesc("Dance")}</p>
       </div>
   </div>

   <div id="infoall">
       <div id="infoclass">
           <h3 id="" class="heading" ><span>Class Details</span></h3>
           <div id="onlyclassinfo">
               <div id="classheads">
                   <h4>Name : ${classes.title}</h4>
                   <h4>Activity : ${classes.activity}</h4>
                   <h4>Date : ${classes.classDate}</h4>
                   <h4>Time : ${classes.classTime}</h4>
                   <h4>Mode: ${classes.venue}</h4>
                   <h4 id="linkH4Key">Link/Location : ${classes.locationOrLink}</h4>
                   <h4>Duration: ${classes.duration}</h4>
                   <h4>Total Seats : ${classes.seatTotal}</h4>
                   <h4>Seats Occupied : ${classes.seatOccupied}</h4>              
               </div>
              
           </div>
       </div>
       <div id="infomode">
           <h3 id="" class="heading"><span>Mode of Class</span></h3>
           <img src=${rendermode(classes.venue)} alt="" id="modeimg">
       </div>
       <div id="infotrainer">
           <h3 id="" class="heading" ><span>Trainer Information</span></h3>
           <div id="trainermaininfo">
               <img src=${renderTrainerProfile()} alt="" id="trainerimg">
               <div id="trainerdetails">
                   <div id="trainerhead">
                       <h4>Trainer:</h4>
                       <h4>Coutry:</h4>
                       <h4>Contact:</h4>
                       <h4>Email:</h4>
                   </div>
                   <div id="trainerheadinfo">
                       <h4>${trainerInfo.name}</h4>
                       <h4>${trainerInfo.country}</h4>
                       <h4>${trainerInfo.phone?trainerInfo.phone:"Not Provided"}</h4>
                       <h4>${trainerInfo.email}</h4>
                   </div>
               </div>
           </div>
       </div>

   </div>
   <img src=${classes.activity?renderImages(classes.activity):renderImages("Dance")} alt="" id="activityimg">
   `

//    let joinbtn=document.querySelector('#joinclassdesc')

//     joinbtn.addEventListener('click',(event)=>{
//     let id = event.target.dataset.id;
//     window.location.assign(`./bookClass.html?id=${id}`)
//     })
    // toggleClassLinkVisibility(classes)
}


function renderTrainerProfile(){
    let prfileImg=["../imgs/Profile_Images/1680420864318.png","../imgs/Profile_Images/1680420887007.png","../imgs/Profile_Images/1680420927232.png","../imgs/Profile_Images/1680420953188.png","../imgs/Profile_Images/1680420980976.png","../imgs/Profile_Images/1680421002568.png","../imgs/Profile_Images/1680421096922.png"]

    let imgLink=getRandomItem(prfileImg)
    return imgLink
}

function rendermode(mode){
    mode=mode.toLowerCase()
    if(mode=="online"){
        return 'https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6'
        // return 'https://img.freepik.com/free-vector/hand-drawn-online-yoga-class-concept_23-2148563475.jpg?w=740&t=st=1680414196~exp=1680414796~hmac=13a91aae4059df3bf5e76c9b55b4bd885aa21c7503f9225439c450615ff0481a'
        // return 'https://img.freepik.com/free-vector/flat-design-online-yoga-class-style_23-2148549504.jpg?w=740&t=st=1680414576~exp=1680415176~hmac=1e9847c8f673dc0edf5d0ad6c24cf364830518e86dec7bdb71dd1dd56d575ca4'
        // return 'https://beta.classfit.com/images/zoom-img-cover.png'
    }else{
        return `https://img.freepik.com/free-vector/pregnant-women-doing-exercises-with-big-ball-cartoon-illustration_74855-14492.jpg?w=740&t=st=1680414881~exp=1680415481~hmac=ad34b4302c74a73603a5534be8a88d00b0ec9e2c6633babb1d4a3318868db729`
        // return `https://e7.pngegg.com/pngimages/992/203/png-clipart-internet-t-shirt-9gag-online-and-offline-humour-t-shirt-text-logo.png`
    }
}

function renderImages(actname){
    let allImagesData={
        yoga:["../imgs/Classes_Images/yoga1.jpg","../imgs/Classes_Images/yoga2.jpg","../imgs/Classes_Images/yoga3.jpg"],
        cardio:["../imgs/Classes_Images/boxing1.jpg","../imgs/Classes_Images/aerobics2.jpg","../imgs/Classes_Images/crossfit1.jpg"],
        swimming:["../imgs/Classes_Images/swimming1.jpg","../imgs/Classes_Images/swimming2.jpg","../imgs/Classes_Images/swimming3.jpg"],
        running:["../imgs/Classes_Images/football1.jpg","../imgs/Classes_Images/football2.jpg","../imgs/Classes_Images/football3.jpg"],
        zumba:["../imgs/Classes_Images/zumba1.jpg","../imgs/Classes_Images/zumba2.jpg","../imgs/Classes_Images/zumba3.jpg"],
        aerobics:["../imgs/Classes_Images/aerobics1.jpg","../imgs/Classes_Images/aerobics2.jpg","../imgs/Classes_Images/aerobics3.jpg"],
        ballet:["../imgs/Classes_Images/ballet1.jpg","../imgs/Classes_Images/ballet2.jpg","../imgs/Classes_Images/ballet3.jpg"],
        basketball:["../imgs/Classes_Images/basketball1.jpg","../imgs/Classes_Images/basketball2.jpg","../imgs/Classes_Images/basketball3.jpg"],
        boxing:["../imgs/Classes_Images/boxing1.jpg","../imgs/Classes_Images/boxing3.jpg","../imgs/Classes_Images/boxing2.jpg"],
        crossfit:["../imgs/Classes_Images/crossfit1.jpg","../imgs/Classes_Images/crossfit3.jpg","../imgs/Classes_Images/crossfit2.jpg"],
        cycling:["../imgs/Classes_Images/cycling1.jpg","../imgs/Classes_Images/cycling2.jpg","../imgs/Classes_Images/cycling3.jpg"],
        football:["../imgs/Classes_Images/football1.jpg","../imgs/Classes_Images/football2.jpg","../imgs/Classes_Images/football3.jpg"],
        kickboxing:["../imgs/Classes_Images/kickboxing1.jpg","../imgs/Classes_Images/kickboxing2.jpg","../imgs/Classes_Images/kickboxing3.jpg"],
        singing:["../imgs/Classes_Images/singing1.jpg","../imgs/Classes_Images/singing3.jpg","../imgs/Classes_Images/singing2.jpg"],
        weighttraining:["../imgs/Classes_Images/weighttraining1.jpg","../imgs/Classes_Images/weighttraining2.jpg","../imgs/Classes_Images/weighttraining3.jpg"],
        dance:["../imgs/Classes_Images/dance1.jpg","../imgs/Classes_Images/dance2.jpg","../imgs/Classes_Images/dance3.jpg"]
    }
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function rederActDesc(activity){
    let obj={
        yoga:"Yoga is an accessible form of exercise that benefits physical and mental health. Most people are able to start with beginner yoga poses from the comfort of their own home. In addition to improving flexibility, strength, and balance, yoga can also reduce stress levels and aid in weight management.",
        cardio:"Cardiovascular exercise is any vigorous activity that increases heart rate and respiration and raises oxygen and blood flow throughout the body while using large muscle groups of the body repetitively and rhythmically.",
        swimming:"Swimming is a great workout because you need to move your whole body against the resistance of the water. Swimming is a good all-round activity because it: keeps your heart rate up but takes some of the impact stress off your body.",
        running:"Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Running is a type of gait characterized by an aerial phase in which all feet are above the ground.",
        zumba:"Zumba is a powerful exercise with a 600 to 1,000-calorie burn in just an hour. Tones your entire body. You may feel sore in places you never knew existed, but it gets results. Zumba targets lots of different muscle groups at once for total body toning.",
        aerobics:"What is aerobic exercise? Aerobic exercise provides cardiovascular conditioning. The term aerobic actually means 'with oxygen,' which means that breathing controls the amount of oxygen that can make it to the muscles to help them burn fuel and move.",
        ballet:"Barre and Stretch VIRTUAL is a hybrid of pilates, stretch, strength and core training .High reps  and low weights. No Impact . Light weights, towel and ,mat required",
        basketball:"While not renowned as an aerobic sport, it is still a great workout that can help you: burn calories (an hour of basketball can burn 630–750 calories) build endurance. improve balance and coordination.",
        boxing:"Boxing requires speed, agility, strength, power, and cardiovascular fitness. The focus of strength training workouts is usually on improving coordination, power, and speed of force development rather than on building muscle mass and gaining size.",
        crossfit:"A form of high intensity interval training, CrossFit is a strength and conditioning workout that is made up of functional movement performed at a high intensity level. These movements are actions that you perform in your day-to-day life, like squatting, pulling, pushing etc.",
        cycling:"Cycling is mainly an aerobic activity, which means that your heart, blood vessels and lungs all get a workout. You will breathe deeper, perspire and experience increased body temperature, which will improve your overall fitness level. ",
        football:"Playing football is equivalent to muscular strength exercises (anaerobic) such as running at high speed and lifting weights. As these types of exercises help to burn body fat as much as possible, the risk of heart disease and the accumulation of fat in the blood vessels are eliminated.",
        kickboxing:"Just like other cardio workouts, kickboxing offers all the benefits of a high-intensity routine, including better coordination, mobility and strength. You'll not only knock your muscles into high gear, but you'll squash the stress of the day.",
        singing:"By exercising your voice beforehand, you may be able to strengthen your speaking or singing voice. Warm up your voice by breathing deeply, moving your tongue around and pretending to chew. To strengthen your speaking or singing voice, trill your lips and practice saying tongue twisters.",
        weighttraining:"Weight training is an important part of any fitness program. Combined with aerobic exercise, weight training can increase your strength and muscle tone, increase muscle mass, improve your bone density, help maintain weight, and help you lose fat.",
        dance:"Zumba is a powerful exercise with a 600 to 1,000-calorie burn in just an hour. Tones your entire body. You may feel sore in places you never knew existed, but it gets results. Zumba targets lots of different muscle groups at once for total body toning."
        
    }
    activity=activity.toLowerCase()
    let desc=obj[`${activity}`]
    return desc
}





// ........................Delete Class.............................................
async function DeleteClass(classid){
    try {
        let data=await fetch(baseURL+`/class/delete/${classid}`,{
            method:"DELETE",
            headers:{   
                authorization:`Bearer ${loggedInUserEmail}`
            }
        })
        if(data.ok){
            // alert("Class Deleted Successfully")
            swal({text: "Class Deleted Successfully", icon: "success", button: "ok", timer:1000})
			    window.location.assign(`./trainerDashboard.html`)
        }else{
            // alert("Class not deleted")
            swal({text: "Class not deleted", icon: "error", button: "ok", timer:1000})
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}


function logoutFun(){
    sessionStorage.clear();
    window.location.assign("../index.html")
}

// showing user's name on nav bar
let user_name=document.getElementById("user_name");

user_name.innerText=loggedInUser.name;

function logoutFun(){
    sessionStorage.clear();
    window.location.href="../index.html"
}