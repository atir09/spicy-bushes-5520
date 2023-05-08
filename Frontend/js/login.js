
document.querySelector("#create-an-account").addEventListener("click",()=>{
    window.location="signup.html"
})

let google_button = document.querySelector("#login-google-button")

google_button.addEventListener("click", async () => {
 window.location = "https://rich-plum-barracuda-fez.cyclic.app/auth/google"
  });



  const onLogin = () => {
    const payload = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    }
    if(payload.email == "" || payload.password == ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the details....',
  
      })
  
       return;
    }

    if(payload.email == "admin@gmail.com" || payload.pass == "admin"){
      Swal.fire(
        'Welcome Admin !!',
        'You Loggged in',
        'success'
      )
      setTimeout(() => {
        window.location.href = "adminDashboard.html"
       }, 2000)
 
      }
  
    
    fetch("https://rich-plum-barracuda-fez.cyclic.app/user/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload),

    }).then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem("email", res.email)
            localStorage.setItem("isLogin", true)
            Swal.fire(
                'Good job',
                'You Loggged in',
                'success'
              )

          
               setTimeout(() => {
                window.location.href = "https://cute-praline-7c3192.netlify.app/"
            }, 2000)
         
           
        })
        .catch((err) => 
        console.log(err)
        )
}
  