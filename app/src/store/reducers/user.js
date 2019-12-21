const init = {
  user: {}
}

export default function user(state = init, action){
  console.log("Alterando estado");
  console.log(action.user);
  if(action.type === "SET_USER") return {...state,user: action.user};
 
  return state;
}