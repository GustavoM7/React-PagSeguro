import React from "react";
import Modal from "../Modal/Modal";

const AuthConfirm = (props) => {
  return(
    <Modal listenersId={props.listenersId}>
      <form>
        <h3>{props.title}</h3>
        <section>
        <p className="form-row">
            {props.text}
        </p>
        <p className="form-row">
            Insira sua senha atual para confirmar.
        </p>
        <div className="form-row">
            <label>SENHA:</label>
            <input name="password" type="password" value={props.st.password} onChange={props.handlePassword}/>
        </div>
        </section>
      </form>
      <div className={props.st.password ? "Danger" : "Disabled"}>
        <button 
        id="updateConfirm" 
        type="button" 
        disabled={!props.st.password}
        onClick={() => props.confirmUser(props.type)}>CONFIRMAR</button>
      </div>
    </Modal>
  )
}

export default AuthConfirm;