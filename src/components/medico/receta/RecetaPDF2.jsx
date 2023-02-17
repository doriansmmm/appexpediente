import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

import '../../../styles/receta.css'



import LogoMabe from '../../../archivos/logomabe.png'

import useAuth from '../../../hooks/useAuth';
import useConsulta from '../../../hooks/useConsulta';
import { useEffect, useState } from 'react';

const RecetaPDF2 = () => {

    let json = localStorage.getItem('jsonexpmed')
    const json2 = JSON.parse(json)
    const { datosConsulta, ventana, bandFirma } = useAuth()
    const { medicoNombre, medicoPApellido, medicoSApellido } = datosConsulta
    const [textAlergias, setTextAlergias] = useState('')
    const [textIdx, setTextIdx] = useState('')
    useEffect(() => {
        

        var text = ''
        var text2 = ''
        json2.alergias.forEach(e => {
            text += e.alNombre
        });
        json2.diagnosticos.forEach(e => {
            text2 += e.diNombre
        });
        setTextAlergias(text)
        setTextIdx(text2)
    }, [])


    return (
        


        (<div className='div'>
            <table className="table">
                <tr className="tr">
                    <td className='td1'><img width='100px' src={json2.medicoLogo} /></td>
                    <td className="td2"><h2>{json2.medicoNombre} {json2.medicoPApellido} {json2.medicoSApellido}</h2></td>
                </tr>
                <tr className="tr">
                    <td className='td1'></td>
                    <td className="td2">{json2.medicoUniv}</td>
                </tr>
                <tr className="tr">
                    <td className='td1'></td>
                    <td className="td2">{json2.medicoTitulo}</td>
                </tr>
                <tr className="tr">
                    <td className='td1'></td>
                    <td className="td2">{json2.medicoCedula}</td>
                </tr>
            </table>
            <div className='divLineas'></div>
            <div className='divLineas2'></div>
            <table className="table">
                <tr className="tr" >
                    <td className='td5'>Nombre:</td>
                    <td className="td3 ">{json2.pacienteNombre} {json2.pacientePApellido} {json2.pacienteSApellido}</td>
                    <td className='td5'>Fecha: </td>
                    <td className="td3">{json2.medicoFechaCita}</td>
                </tr>
            </table>
            <div className='block_container'>
                <div className='div2'>
                    Tratamiento
                    {
                        json2.option !== 2 ?
                        json2.medicamentos.map(e => (
                            <p>{e.nombreMedicamento} {e.cantidadDosis} {e.tiempoDosis} {e.indicacionesA}</p>
                        ))
                        : 
                        json2.medicamentos.map(e => (
                            <p>{e.mNombre} {e.reMedTiempoDosis} {e.reMedTiempoDosis} {e.indicacionesA}</p>
                        ))
                    }
                </div>
                <div className='div3'>
                    <table className="table">
                        <tr className="tr">
                            <td className='td4'>Edad:</td>
                            <td className="td3">{json2.pacienteEdad}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>T/A:</td>
                            <td className="td3">{json2.pacienteTa}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Frec. Card.:</td>
                            <td className="td3">{json2.pacienteFrecCar}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Frec. Resp.:</td>
                            <td className="td3">{json2.pacienteFrecResp}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Temp:</td>
                            <td className="td3">{json2.pacienteTemp}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>SATO2%:</td>
                            <td className="td3">{json2.pacienteSato}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Peso:</td>
                            <td className="td3">{json2.pacientePeso}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Talla:</td>
                            <td className="td3">{json2.pacienteTalla}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Alergias:</td>
                            <td className="td3">{textAlergias}</td>
                        </tr>
                        <tr className="tr">
                            <td className='td4'>Idx:</td>
                            <td className="td3">{textIdx}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='block_container'>
                <div className='div2'>
                    <p>Lugar de trabajo</p>
                    <p>{json2.medicoUnidadTrabajo}</p>
                </div>
                <div className='div3'>
                    {bandFirma !== true ? (
                        <div>
                        <div className='divFirma'>
                            <img alt='firma' src={json2.medicoFirma} />
                            
                        </div>
                        <br/>
                        <p>Firma del médico</p>
                        </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
        )


    )
}

export default RecetaPDF2