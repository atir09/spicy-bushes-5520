
document.querySelector("#create-an-account").addEventListener("click",()=>{
    window.location="signup.html"
})

let google_button = document.querySelector("#login-google-button")

google_button.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:9876/auth/google");
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error(error); 
    }
  });



  const onLogin = () => {
    const payload = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    }
    fetch("http://localhost:9876/user/login", {
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
                'You Loggged in',
                'success'
              )
       
            //    setTimeout(() => {
            //     window.location.href = "account.html"
            // }, 2000)
         
           
        })
        .catch((err) => 
        console.log(err)
        )
}
  