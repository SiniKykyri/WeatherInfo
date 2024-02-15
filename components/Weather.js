import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICON_URL
}

export default function Weather(props) {
    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const url = api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
            }).catch((error) => {
                setDescription('Error retrieving weather')
                console.log(error)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={[styles.temp, { color: temp < 0 ? '#0000FF' : temp < 10 ? '#FFFF00' : '#FFA500' }]}>{temp}°C</Text>
            {icon &&
                <View style={styles.imageContainer}>
                    <Image source={{ uri: icon }} style={styles.image} />
                </View>
            }
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temp: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: -20,
    },
    image: {
        width: 150,
        height: 100,
    },
    description: {
        fontSize: 20,
        marginTop: 20,
        color: '#666',
    },
});
