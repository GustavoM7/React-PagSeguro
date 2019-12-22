import React from "react";
import Modal from "../Modal/Modal";
import {InfoIcon, SearchIcon} from "../Icons/Icons";
import "./formsStyle.css";

const UpdateForm = (props) => {
  return(
  <Modal listenersId={["configButton", "remove", "update"]}>
    <form>
      <h3>ATUALIZAR DADOS</h3>
      <section>
      <div className="form-row">
        <label>NOME:</label>
        <input name="name" value={props.userUpdate.name} onChange={props.handleInput}/>
      </div>

      <div className="form-row">
        <label>EMAIL:</label>
        <input name="email" type="email" value={props.userUpdate.email} onChange={props.handleInput}/>
      </div>

      <div className="form-row">
        <label>DDD:</label>
        <input className="short-input" name="phone_code" maxLength={2} value={props.userUpdate.phone_code} onChange={props.handleInput}/>

        <label>TELEFONE:</label>
        <input name="phone" value={props.userUpdate.phone} onChange={props.handleInput}/>
      </div>

      <div>
      <div className="form-row cepShow">
        <div className="cepInfoIcon">
          <InfoIcon/>
        </div>

        <label >CEP:</label>
        <input className="short-input" name="postal_code" maxLength={8} value={props.userUpdate.postal_code} onChange={props.handleInput}/>

        <span onClick={() => props.searchCep()}>
          <SearchIcon />
        </span>

        <label>BAIRRO:</label>
        <input name="district" value={props.userUpdate.district} onChange={props.handleInput}/>
      </div>

      <div className="cepInfo">
      <p className="form-row">
        Pesquise um CEP válido para preencher seu endereço automaticamente. &nbsp; <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank" rel="noopener noreferrer"> Consulte seu CEP </a>
      </p>
      </div>

      {props.cepErrorMsg ?
        <p className="form-row" style={{color:"#ff3232"}}>{props.cepErrorMsg}</p>
      :null
      }
      </div>
      
      <div className="form-row">
        <label>RUA:</label>
        <input name="street" value={props.userUpdate.street} onChange={props.handleInput}/>

        <label>NÚMERO:</label>
        <input className="short-input" name="number" value={props.userUpdate.number} onChange={props.handleInput}/>

        <label>COMPLEMENTO:</label>
        <input name="complement" value={props.userUpdate.complement} onChange={props.handleInput}/>
      </div>
      
      <div className="form-row">
        <label>CIDADE:</label>
        <input name="city" value={props.userUpdate.city} onChange={props.handleInput}/>

        <label>ESTADO:</label>
        <input name="state" value={props.userUpdate.state} onChange={props.handleInput}/>

        <label>PAÍS:</label>
        <input name="country" value={props.userUpdate.country} onChange={props.handleInput}/>
      </div>

      </section>
      <button id="update" type="button">SALVAR</button>

    </form>
    <hr/>
    <div className="Danger"><button id="remove" type="button">EXCLUIR CONTA</button></div>
  </Modal>
  );
}

export default UpdateForm;