let baseURL = "https://rich-plum-barracuda-fez.cyclic.app"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.href="../index.html"
}
let loggedInUserEmail = loggedInUser.email

let loding_container=document.getElementById("loding_container")

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


document.getElementById("user_name").innerText=loggedInUser.name

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


getAllClass();
let newData;
async function getAllClass() {
    try {
        loding_container.style.display="block";
        let dataFetch = await fetch(baseURL + "/class/all", {
            headers: {
                authorization: `Bearer ${loggedInUserEmail}`
            }
        })
        if (dataFetch.ok) {
            let temp = dataFetch.json()
                .then(res => {
                    loding_container.style.display="none";
                    newData = res.classes
                    console.log(newData)
                    renderAllData(res.classes)
                })
        } else {
            // alert("Classes Not Fetched")
            loding_container.style.display="none";
            swal({ text: "Classes Not Fetched", icon: "error", button: "ok", timer: 1000 })
        }
    } catch (error) {
        // alert("Server not responding");
        loding_container.style.display="none";
        swal({ text: "Server not responding", icon: "error", button: "ok", timer: 1000 })
        console.log(error.message)
    }
}


function renderAllData(res) {
    let tablebody = document.querySelector(".responsive-table__body")

    let BodyContent = res.map((el) => {
        return createRow(el)
    })
    tablebody.innerHTML = BodyContent.join(" ")
    renderTables()

}


function createRow(el) {
	return `<tr class="responsive-table__row">
		<td class="responsive-table__body__text responsive-table__body__text--name" data-id=${el._id} onclick="RedirectClassPage(${el._id})">
			<img src=${el.activity?renderImages(el.activity): "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}  class="user-icon">
			${el.title}
		</td>
		<td class="responsive-table__body__text responsive-table__body__text--price">${el.price}</td>
		<td class="responsive-table__body__text responsive-table__body__text--seats">${el.seatOccupied}/${el.seatTotal}</td>
		<td class="responsive-table__body__text responsive-table__body__text--date">${el.classDate},${el.classTime}</td>
		<td class="responsive-table__body__text responsive-table__body__text--venue">${el.venue == "offline" ? el.locationOrLink : el.venue}</td>
		<td class="responsive-table__body__text responsive-table__body__text--delete"><a href=./trainerSingleClass.html?id=${el._id}><button class="details-btn" >Details</button></a></td>
	</tr>`
}



let joicClassbtn = document.querySelectorAll('.joinclassbutton')
joicClassbtn.forEach(elem => {
    elem.addEventListener('click', (event) => {
        let id = event.target.dataset.id;
        window.location.assign(`./bookClass.html?id=${id}`)
    })
})


function checkvenue(venue, locationOrLink) {
    if (venue === "online") {
        return 'Online-via Zoom'
    } else {
        return `Venue - At ${locationOrLink}`
    }
}


let searchbar = document.getElementById("searchBox")
searchbar.addEventListener('input', (event) => {
    let searchdata = searchalldata(event)
    renderAllData(searchdata)
})

function searchalldata(event) {
    let searchdata = event.target.value
    // console.log(newData)
    let temp = newData.filter(function (elem) {
        let ans = elem.locationOrLink.toLowerCase().includes(searchdata.toLowerCase()) || elem.title.toLowerCase().includes(searchdata.toLowerCase()) || elem.activity.toLowerCase().includes(searchdata.toLowerCase()) || elem.venue.toLowerCase().includes(searchdata.toLowerCase())
        return ans;
    })
    return temp;
}

let activitiname = document.getElementById('acttype')
activitiname.addEventListener("change", (event) => {
    let searchactivity = searchactivityfun(event.target.value)
    if (searchactivity) {
        return renderAllData(searchactivity)
    } else {
        allclassescard.innerHTML = `<h2>Data Not Found</h3>`
    }
})

function searchactivityfun(activity) {
    if (activity == "all") {
        getAllClass()
    } else {
        let temp = newData.filter(function (elem) {
            let ans = elem.activity.toLowerCase().includes(activity.toLowerCase()) || elem.venue.toLowerCase().includes(activity.toLowerCase())
            return ans
        })
        return temp;
    }
}

let attendacesearch = document.getElementById('atttype')
attendacesearch.addEventListener("change", (event) => {
    let searchattendace = searchactivityfun(event.target.value)
    if (searchattendace) {
        renderAllData(searchattendace)
    } else {
        allclassescard.innerHTML = `<h2>Data Not Found</h3>`
    }
})

let pricecomp = document.getElementById('location')
pricecomp.addEventListener("change", (event) => {
    let searchlocation = event.target.value
    if (searchlocation == "low") {
        let lowtohigh = newData.sort(function (a, b) {
            return a.price - b.price
        })
        renderAllData(lowtohigh)
    } else if (searchlocation == "high") {
        let lowtohigh = newData.sort(function (a, b) {
            return b.price - a.price
        })
        renderAllData(lowtohigh)
    } else {
        getAllClass()
    }
})


function renderImages(actname) {
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
    // let allImagesData={
    //     yoga:["https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5384538/pexels-photo-5384538.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     cardio:["https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     swimming:["https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/73760/swimming-swimmer-female-race-73760.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/260598/pexels-photo-260598.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     running:["https://images.pexels.com/photos/3621183/pexels-photo-3621183.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5038818/pexels-photo-5038818.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4719931/pexels-photo-4719931.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     zumba:["https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4090009/pexels-photo-4090009.jpeg?auto=compress&cs=tinysrgb&w=600","https://media.istockphoto.com/id/535496960/photo/fit-young-women-dancing-and-exercising.jpg?b=1&s=612x612&w=0&k=20&c=uKsgbASv7eOmkp3CZUersB7wAO53Xcp58TEjJzr96Kw="],
    //     aerobics:["https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=1600","https://images.pexels.com/photos/866021/pexels-photo-866021.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    //     ballet:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     basketball:["https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     boxing:["https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     crossfit:["https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/116079/pexels-photo-116079.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     cycling:["https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5312233/pexels-photo-5312233.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5807576/pexels-photo-5807576.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     football:["https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3041176/pexels-photo-3041176.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     kickboxing:["https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4804077/pexels-photo-4804077.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     singing:["https://images.pexels.com/photos/236149/pexels-photo-236149.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3388899/pexels-photo-3388899.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1456642/pexels-photo-1456642.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     weighttraining:["https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1886487/pexels-photo-1886487.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     dance:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"]
    // }

    let newactname = actname.toLowerCase()
    let name = allImagesData[`${newactname}`]

    let imgLink = getRandomItem(name)
    return (imgLink)
}

function getRandomItem(arr) {
    let randomIndex = Math.floor(Math.random() * 2);
    let item = arr[randomIndex];
    return item;
}




// Classes List

renderTables()
function renderTables() {

    const headTitleName = document.querySelector(
        ".responsive-table__head__title--name"
    );
    const headTitleStatus = document.querySelector(
        ".responsive-table__head__title--price"
    );
    const headTitleTypes = document.querySelector(
        ".responsive-table__head__title--seats"
    );
    const headTitleUpdate = document.querySelector(
        ".responsive-table__head__title--date"
    );
    const headTitleCountry = document.querySelector(
        ".responsive-table__head__title--venue"
    );

    const headTitleDelete = document.querySelector(
        ".responsive-table__head__title--delete"
    );

    // Select tbody text from Dom
    const bodyTextName = document.querySelectorAll(
        ".responsive-table__body__text--name"
    );
    const bodyTextStatus = document.querySelectorAll(
        ".responsive-table__body__text--price"
    );
    const bodyTextTypes = document.querySelectorAll(
        ".responsive-table__body__text--seats"
    );
    const bodyTextUpdate = document.querySelectorAll(
        ".responsive-table__body__text--date"
    );
    const bodyTextCountry = document.querySelectorAll(
        ".responsive-table__body__text--venue"
    );

    const bodyTextDelete = document.querySelectorAll(
        ".responsive-table__body__text--delete"
    );

    // Select all tbody table row from Dom
    const totalTableBodyRow = document.querySelectorAll(
        ".responsive-table__body .responsive-table__row"
    );

    // Get thead titles and append those into tbody table data items as a "data-title" attribute
    for (let i = 0; i < totalTableBodyRow.length; i++) {
        bodyTextName[i].setAttribute("data-title", headTitleName.innerText);
        bodyTextStatus[i].setAttribute("data-title", headTitleStatus.innerText);
        bodyTextTypes[i].setAttribute("data-title", headTitleTypes.innerText);
        bodyTextUpdate[i].setAttribute("data-title", headTitleUpdate.innerText);
        bodyTextCountry[i].setAttribute("data-title", headTitleCountry.innerText);
        // bodyTextDelete[i].setAttribute("data-title", headTitleDelete.innerText);

    }

}


function logoutFun(){
    sessionStorage.clear();
    window.location.href="../index.html"
}