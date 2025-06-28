const validate=(email,password,confirmPassword=password)=>{
    if((email.length==0) || (password.toString().length==0) || (confirmPassword.toString().length==0))
    {
        return "please fill the field properly"
    } 
}

export default validate