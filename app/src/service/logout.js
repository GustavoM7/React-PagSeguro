const logout = () =>{
  localStorage.removeItem('@reactpagseguro/logintoken');
  window.location.replace('/Authenticate');
}

export default logout;