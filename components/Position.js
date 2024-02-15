import * as Location from 'expo-location';
import Weather from './Weather';
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Position() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [message, setMessage] = useState('Retrieving location...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async() => {
            let {status}= await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try{
                if(status !== 'granted'){
                    setMessage('Permission to access location was denied')
                }else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage("Error retrieving location")
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
            <Weather latitude = {latitude} longitude = {longitude} />
            }
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coords: {
      fontSize: 20, 
      marginBottom: 10,
      color: '#666',
    },
    message: {
      fontSize: 18,
      marginBottom: 10,
      color: '#888',
    },
  });

