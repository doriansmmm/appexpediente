import { Document, Page, Text, View, Image, StyleSheet  } from "@react-pdf/renderer";

import '../../../styles/receta.css'

import LogoMabe from '../../../archivos/logomabe.png'
const styles = StyleSheet.create({
    div: {
        width: "80%",
        "vertical-align": "middle",
       "align-items": "center",
        "margin": "auto",
    }
  });


const RecetaPDF = ( { json2, bandFirma}) => {

    


    return (

        <Document>
            <Page>
            <View style={styles.div}>

                <View className='divLineas'></View>
                <View className='divLineas2'></View>

                <View className='block_container'>
                    <View className='div2'>
                        Tratamiento
                        {
                            json2.medicamentos.map(e => (
                                <Text>{e.nombreMedicamento} {e.cantidadDosis} {e.tiempoDosis} {e.indicacionesA}</Text>
                            ))
                        }
                    </View>
                    <View className='div3'>

                    </View>
                </View>
                <View className='block_container'>
                    <View className='div2'>
                        <Text>Lugar de trabajo</Text>
                        <Text>Lavanta</Text>
                    </View>
                    <View className='div3'>
                        {bandFirma !== true ? (
                            <View>
                                <View className='divFirma'>
                                    <Image alt='firma' src={json2.medicoFirma} />

                                </View>

                                <Text>Firma del médico</Text>
                            </View>
                        ) : null
                        }
                    </View>
                </View>
            </View>
            </Page>
        </Document>
    )
}

export default RecetaPDF