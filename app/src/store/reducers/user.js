const init = {
  user: {}
}

export default function user(state = init, action){
  if(action.type === "SET_USER") return {...state,user: action.user};
 
  return state;
}