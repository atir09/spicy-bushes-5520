

document.querySelector("#back-to-login").addEventListener("click",()=>{
    window.location = "login.html"
})

const onSignUp = () => {
    const payload = {
    
        name : document.querySelector("#firstName").value + " " + document.querySelector("#lastName").value,
        email: document.querySelector("#Email").value,
        password: document.querySelector("#signup-password").value,
        country: document.querySelector("#country").value,
        sex: document.querySelector("#gender").value,
        role:document.querySelector("#role").value
    }
    console.log(payload)

    fetch("http://localhost:9876/user/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            Swal.fire(
                'Good job',
                'User Registered',
                'success'
              )
        })
        .catch((err) => console.log(err))

}