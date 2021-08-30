//No se que hice pero no sirve
function submit(){
    var e=/[A-Z]/;
    var a=/[123456789]/;

    name= document.getElementById('Name').value;
    lastName= document.getElementById('Lastname').value;
    userName= document.getElementById('Username').value;
    email= document.getElementById('Email').value;
    password= document.getElementById('Password').value;
    cardNumber= document.getElementById('CardNumber').value;
    CVV= document.getElementById('CVV').value;

    

    if (name.length>0&&lastName.length>0&&userName.length>0&&email.length>0&&e.test(password)&&a.test(password)&&password.length>=6&&cardNumber.length==18&&CVV.length==3){
        document.getElementById("form-register").submit(); 
        
    }else{
        alert("No introdujo los datos correctamente");
    }
	
}