import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPaises {
  id: number,
  nome: string,
}

export default function App() {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [paises, setPaises] = useState<IPaises[]>([]);

  useEffect(() => {
    async function loadData() {
      const dado = await AsyncStorage.getItem('@mydata:data');
      if (dado) {
        setPaises(JSON.parse(dado));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@mydata:data', JSON.stringify(paises));
    }
    saveData();
  }, [paises]);

  async function removeAll() {
    await AsyncStorage.removeItem('@mydata:data');
    setPaises([]);
  }

  function handlePress() {
    if (nome) {
      setPaises([...paises, { id, nome }]);
      setNome("");
      setId("");
    }
  }

  function deleteItem(id: number) {
    const items = paises.filter(pais => pais.id !== id);
    setPaises(items);
  }

  return (
    <View style={styles.container}>
     <View style={styles.containersmall}>
      <Text style={styles.title}>Cadastro de Paises</Text>
      <TextInput
        style={styles.input}
        placeholder="Codigo do Pais"
        onChangeText={text => setId(text)}
        defaultValue={id}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Pais"
        onChangeText={text => setNome(text)}
        defaultValue={nome}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text>Salvar</Text>
      </TouchableOpacity>

      {
        paises.map(pais =>
          <TouchableOpacity
            key={pais.id}
            onPress={() => { deleteItem(pais.id) }}
          >
            <Text>{pais.id} - {pais.nome}</Text>
          </TouchableOpacity>
        )
      }
      </View>
   </View>
  );
} ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4B5',
    alignItems: 'center',
    justifyContent: 'center'
  },

  containersmall: {
    width: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8ff',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#FF4500'
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF4500'
  },

  input: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4
  },
  button: {
    backgroundColor: '#FA8072',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    fontSize: 32,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});