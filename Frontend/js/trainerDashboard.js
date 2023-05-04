let baseURL = "http://localhost:9876"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
// if(!loggedInUser){    
//     window.location.assign("../html/login.html");
// }
// let loggedInUserEmail = loggedInUser.email;

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



// .......................................Trainer Info........................................................

let trainerinfo = document.getElementById("userInfo")
// trainerinfo.innerText=`Hi, ${loggedInUser.name}`

let totallength;


async function getAllClassLength() {
	try {
		let dataFetch = await fetch(`${baseURL}/searchByTrainerID/${loggedInUser._id}`, {
			headers: {
				authorization: `Bearer ${loggedInUserEmail}`
			}
		})
		if (dataFetch.ok) {
			let temp = dataFetch.json()
				.then(res => {
					totallength = res.length
					renderClassInfo(totallength)
					renderClasses(res)
				})
		} else {
			//    alert("Classes Not Fetched")
		}
	} catch (error) {
		//    alert("Server not responding");
		console.log(error.message)
	}
}

function renderClassInfo(totallength) {
	document.getElementById("total-class").innerText = totallength
}


function renderClasses(res) {
	let tablebody = document.querySelector(".responsive-table__body")

	let BodyContent = res.map((el) => {
		return createRow(el)
	})

	tablebody.innerHTML = BodyContent.join(" ")
}

function createRow(el) {
	`<tr class="responsive-table__row">
		<td class="responsive-table__body__text responsive-table__body__text--name" data-id=${el._id} onclick="RedirectClassPage(${el._id})">
			<img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" class="user-icon">
			${el.title}
		</td>
		<td class="responsive-table__body__text responsive-table__body__text--price">${el.price}</td>
		<td class="responsive-table__body__text responsive-table__body__text--seats">${el.seatOccupied}/${el.seatTotal}</td>
		<td class="responsive-table__body__text responsive-table__body__text--date">${el.classDate},${el.classTime}</td>
		<td class="responsive-table__body__text responsive-table__body__text--venue">${el.venue == "offline" ? el.locationOrLink : el.venue}</td>
		<td class="responsive-table__body__text responsive-table__body__text--delete"><button class="cancel-btn" onclick="DeleteClass(${el.id})">Cancel</button></td>
	</tr>`
}


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
			getAllClassLength()
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


function RedirectClassPage(id){
	window.location.assign("./trainerSingleClass.html");
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

