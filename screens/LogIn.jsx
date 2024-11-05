import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { signIn } from '../firebase/firebase';

export default function LogIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await signIn(email, password);
            alert('Login successful!');
            navigation.navigate('ToDoScreen');
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} />
            <Pressable onPress={handleLogin}>
                <Text style={styles.btn}>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.SignBtn}>Don't have an account? Sign Up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1e99ff',
    },
    input: {
        height: 40,
        borderColor: '#1e99ff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    SignBtn: {
        marginTop: 20,
        color: '#1e99ff',
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#1e99ff',
        color: '#e3e8e5',
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 5,
        marginVertical: 10,
    },
});
