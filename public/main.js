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
    const U1 = new User( "anil", "Anil1132");
    console.log(U1);
  document.addEventListener('DOMContentLoaded', () => {
    
    const registrationForm = document.getElementById('registerform');
    if(registrationForm){
     registrationForm.addEventListener('submit', (event) => {
      
      event.preventDefault();
  
      
      const nameInput = document.getElementById('username');
      
      const passwordInput = document.getElementById('pswd');
  
      
      const registerUser = new User(nameInput.value, passwordInput.value);
  
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
  
        
        const userInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
  
        
        const loginUser = new User("", userInput.value, passwordInput.value);
  
        
        console.log(loginUser);
        fetch("http://localhost:3000/users/getAllUsers")
     .then((response) =>{return response.json();})
     .then((data) => {
       console.log(data);
     })
     .catch((err) => {
       console.log(err.message);
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
  
        
        const postInput = document.getElementById("post");
  
      
        console.log(postInput.value);
      });
    }
  });