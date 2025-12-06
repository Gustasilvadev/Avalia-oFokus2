import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";


export default function ViaCep(){

    //CEP
    // ENDERECO
    //ERRO
    //useState hook

    const [ cepInput, SetCepInput] = useState('');
    const [ endereco, SetEndereco] = useState(null);
    const [ error, SetError] = useState(null);


    const buscarCep = async () => {
        SetEndereco(null)
        SetError(null)


        try{
            const url =`https://viacep.com.br/ws/${cepInput}/json/`
            const response = await fetch(url);
            const data = await response.json();

            if(data.erro){
                SetError("CEP não encontrado ou inválido!");
            }else{
                SetEndereco(data);
            }

        }catch(error){
            SetError("Houve um erro ao tentar buscar o CEP.(Verifique sua conexão ou tente mais tarde).")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Buscador de endereço via CEP
            </Text>

            <TextInput style={styles.input}
                placeholder="Digite o Cep"
                value={cepInput}
                onChangeText={SetCepInput}
                keyboardType="numeric"
                maxLength={8}
                
            />
            <Button style={styles.button}
                title="Buscar"
                onPress={buscarCep}
            />

        </View>
    );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: '#CCC',
    gap: 40,
    padding:20,
  },

  title:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:20,
  },

  input:{
    height:50,
    borderColor:'#CCCCCC',
    borderWidth:1,
    borderRadius:8,
    paddingHorizontal:15,
    fontSize:16,
    backgroundColor:'#FFFFFF',
    marginBottom:20,
  },

})