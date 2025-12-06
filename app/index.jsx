import { router } from "expo-router";
import{View,StyleSheet,Text,Image} from "react-native"
import { FokusButton } from "../src/components/FokusButton";


export default function Index() {
  return(
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} />

      <View style={styles.inner}>

        <Text style={styles.text}>Otimize sua produtividade,{'\n'} 
          <Text style={styles.textBold}>mergulhe no que importa</Text>
        </Text>

        <Image source={require('../assets/images/tela_inicial.png')} />

        <FokusButton 
        title='Quero Iniciar!'
        onPress={() => router.navigate('/viacep') }/>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Projeto fictício e sem fins comerciais.</Text>
        <Text style={styles.footerText}>Desenvolvido por Aluno.</Text>
      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap:40,
  },

  inner:{
    gap:40,
  },

  text:{
    color:'#FFFFFF',
    textAlign:"center",
    fontSize:26,

  },

  textBold:{
    fontWeight:"bold",
  },

  link:{
    color:'#FFFFFF',
    fontSize:18,
  },

  footer: {
    width: '80%',
  },

  footerText: {
    textAlign: "center",
    color: '#98A0A8',
    fontSize: 15,
  },


})