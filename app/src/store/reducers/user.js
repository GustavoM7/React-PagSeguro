const init = { id: "", name: "", phone_code: "", phone: "", street: "", number: "", complement: "", district: "", postal_code:"", city: "", state: "", country: "", email: "",};

export default function user(state = init, action){
  if(action.type === "SET_USER") return {...state,user: action.user}
  
  return state
}