const myModal = new bootstrap.Modal("#register-modal");
let logged= sessionStorage.getItem("logged");
const session= localStorage.getItem("session")

checarlogin();



//LOGIN PAGINA INICIAL

document.getElementById("login-paginainicial").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-input").value;
    const password= document.getElementById("password-input").value;
    const checksession= document.getElementById("session-check").checked;
    
    const conta= getAccount(email);

    if(!conta) {
        alert("Opps! Verifique o usuário ou a senha.")
        return;

    }

    if(conta) {
        if(conta.password !== password){

            alert("Opps! Verifique o usuário ou a senha.")
        return;

        }

        saveSession(email, checksession);

        window.location.href= "home.html";
    }
    


    console.log(email, password, session)
})

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-create-input").value;
    const password= document.getElementById("password-create-input").value;
    

    console.log(email, password)
    
    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido");
        return;
    }

    if(password.length < 4) {

        alert("preencha a senha com no mínimo 4 digitos")
        return;

    }
     

    saveAccount ({
        login: email,
        password: password,
        transactions: []
    }) 
    
    myModal.hide ();

    alert("Conta criada com sucesso.")

    
});

function checarlogin(){
    if(session) {
        sessionStorage.setItem("logged", session)
        logged=session
    }

    if(logged) {
        saveSession(logged, session)

        window.location.href= "home.html"
    }

}

function saveAccount (data) {

    localStorage.setItem (data.login, JSON.stringify(data))
    
}

function saveSession (data, saveSession){

    if(saveSession){
        localStorage.setItem("session", data);}

        sessionStorage.setItem("logged", data);
    
    
}

function getAccount (key) {

    const conta = localStorage.getItem(key)

    if(conta) {
        return JSON.parse(conta)

    }
    return "";
}