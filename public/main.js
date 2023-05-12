class User{
    constructor  (uname, password){
        this.UserName = uname;
        this.UserPassword = password;
    
    
    }
    getUserName = ()=>{
        return this.UserName;
    }
    getUserPassword = ()=>{
        return this.UserPassword;
    }
    setUserName =(uname) =>{
        this.UserName = uname;
    }
    setUserPassword =(password) =>{
        this.UserPassword = password;
    }
    }
    let Data = document.getElementById("getmyuser");
    if(Data)Data.addEventListener('click',getAllUsers);
    
      function getAllUsers(){
        fetch('http://localhost:3000/users/')
        .then((response) =>response.json())
      .then((data) => console.log(data))
      
    }
    function setCurrentUser(user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    function getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
    function Signout() {
      localStorage.removeItem('user');
      window.location.href = "Login.html"
    }
    const U1 = new User( "anil", "Anil1132");
    console.log(U1);
  document.addEventListener('DOMContentLoaded', () => {
    
    const registrationForm = document.getElementById('registerform');
    if(registrationForm){
     registrationForm.addEventListener('submit', (event) => {
      
      event.preventDefault();
  
      
      const UserName = document.getElementById('username');
      
      const UserPassword = document.getElementById('pswd');
  
      
      const registerUser = new User(UserName, UserPassword);
      
       console.log(registerUser);
       fetchData("/users/register", registerUser, "POST")
       .then(data => {
         setCurrentUser(data)
         window.location.href = "post.html"
       })
       .catch(err => {
         document.querySelector("#registerform p.error").innerHTML = err.message;
         document.getElementById("pwd").value = ""
       })
  
      // Print the User object to check if everything was done correctly
      console.log(registerUser);
     });
     
    }
  });
  
  //login form
  document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.getElementById("loginform");
    if(loginForm){
      loginForm.addEventListener("submit", (event) => {
        
        event.preventDefault();
  
        
        const UserName = document.getElementById("username");
        const UserPassword = document.getElementById("password");
  
        
        const loginUser = new User(UserName, UserPassword);
  
        
        console.log(loginUser);
        fetchData('/users/login', LoginUser, "POST")
       .then(data => {
         setCurrentUser(data);
         window.location.href = "post.html"
       })
       .catch(err => {
         document.querySelector("#loginform p.error").innerHTML = err.message;
         document.getElementById("userName").value = ""
         document.getElementById("pswd").value = ""
       })
      });
    }  
  }); 
  
  //post form
  document.addEventListener('DOMContentLoaded', () => {
   
    const postForm = document.getElementById('postform');
    if(postForm){
      postForm.addEventListener('submit', (event) => {
      
        event.preventDefault();
  
        
       
        let currentUser = getCurrentUser();
       const post = {
         postcontent: document.getElementById("post").value,
         userID: currentUser.userID
       }
       fetchData('/posts/add', post, "POST")
       .then(data => {
         window.location.href = "post.html"
       })
       .catch(err => {
         document.querySelector("#post-form p.error").innerHTML = err.message;
       })
    
       console.log(post);
  
      
        console.log(postInput.value);
      });
    }
  });
  async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }