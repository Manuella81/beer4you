import React, {useState, useEffect} from 'react'
import ivrogne from "../assets/logo/ivrogne.jpg"

const PopUp = (props) =>{
    return (
        <div>
            {props.isPopUp && <div className="popUp">
                <p
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >
                    X
                </p>
                <h4>Félicitations</h4>
                <p>{props.msg}</p>
                <img src={ivrogne} />
                <button
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >
                    Retour aux achats
                </button>
            </div>}
        </div>
    )
}

export default PopUp