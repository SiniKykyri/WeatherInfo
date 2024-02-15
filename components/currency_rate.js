
import { ActivityIndicator, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';


const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest?'
const BASE_CURRENCY = 'EUR'
const API_KEY = 'fca_live_ryOpYCnBRc9769IQUlPhupeZGvgR4WsGxqrTqPRO'

export default function App() {

  const [open, setOpen] = useState(false);
  const [eur, setEur] = useState()
  const [result, setResult] = useState(0)
  const [rates, setRates] = useState([])
  const [rate, setRate] = useState(0)
  const [isloading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  
  const calculate = (text) => {
    setEur(text)
    console.log("eur: ", eur);
    console.log("rate: ", rate);
    setResult(text * rate)
    console.log("tulos: ", result);
  }

  const changeRate = (value) => {
    setRate(value)
    console.log("value", value)
    setResult(eur * value)
  }

  useEffect(() => {
    const address = `${BASE_URL}&apikey=${API_KEY}`
    console.log(address)
    fetch(address)
      .then(response => response.json())
      .then((result) => {
        const tempRates = []
        const json = result
        tempRates.push({ key: 'GBP', label: 'Pounds', value: json.data.GBP })
        tempRates.push({ key: 'SEK', label: 'Swedish crown', value: json.data.SEK })
        tempRates.push({ key: 'NOK', label: 'Norwegian crown', value: json.data.NOK })
        tempRates.push({ key: 'USD', label: 'US dollars', value: json.data.USD })
        setRates(tempRates)
        setIsLoading(false)
      }).catch((error) => {
        setError(error)
        setIsLoading(false)
        setRate(0)
      })
  }, [])

  if (isloading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  else {
    if(!isNaN(result)){
      console.log("tulos: ", result);

    }else{
      console.log("Result ei ole numero")
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Currency calculator</Text>
        <Text>EUR</Text>
        <TextInput style = {styles.textInput} keyboardType="decimal-pad" value={eur} onChangeText={text => calculate(text)} placeholder="Amount of euros" />
        <DropDownPicker
          open={open}
          value={rate}
          items={rates}
          setOpen={setOpen}
          setValue={setRate}
          setItems={setRates}
          onChangeValue={item => {
            console.log("Tuleeko tää", item);
            changeRate(item);
          }}
        />

        <Text style={styles.field}>{result.toFixed(2)}</Text>



      </View>
    )
  
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center'
  },

});