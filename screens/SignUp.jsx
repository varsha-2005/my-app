import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { signUp } from '../firebase/firebase';

export default function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !conPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== conPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await signUp(email, password);
            alert('Sign Up successful! You can now log in.');
            navigation.navigate('LogInScreen');
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry value={conPassword} onChangeText={setConPassword} />
            <Pressable onPress={handleSignUp}>
                <Text style={styles.btn}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('LogInScreen')}>
                <Text style={styles.logBtn}>Already have an account? Login</Text>
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
    logBtn: {
        marginTop: 20,
        textAlign: 'center',
        color: '#1e99ff',
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
