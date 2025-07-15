import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {MyContext } from '../context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const{setUser} = useContext(MyContext);

  const handleSignUp = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      setUser(name);  // sets context for use across app
      alert('Account created!');
      navigation.navigate('Home');
    })
    .catch(error => {
      alert(error.message);
    });
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput
      style={styles.input}
      placeholder="Name"
      value={name}
      onChangeText={setName}
      autoCapitalize="words"  
      autoCorrect={false}    
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.button}>
        <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
  marginTop: 10,
  width: '50%', // Wider for better usability, change as needed
  alignSelf: 'center', // This centers it horizontally
},

});
