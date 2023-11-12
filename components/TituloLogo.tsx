import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

interface TituloLogoProps {
    titulo: string; // Aquí especificamos que 'titulo' debe ser de tipo string
  }

  const TituloLogo: React.FC<TituloLogoProps> = ({ titulo }) => {
    return (
    <View style={styles.container}>
        <Image 
        style={styles.imagen}
        source={require('../assets/logo.png')} />
        <Text style={styles.fuente}>{titulo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      flexDirection: 'row'
    },
    imagen:{
        width: 50,
        height: 50,
    },
    fuente:{
        flex:1,
        marginStart:10,
        alignSelf:'center',
        color:'#000',
        fontSize:24  
    }
})

export default TituloLogo