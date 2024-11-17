import { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';
export function Home() {
  const [participants, setParticipants] = useState<String[]>([]);
  const [participantNames, setParticipantNames] = useState('');
  const agora = new Date();

  function handleParticipantAdd() {
    if (participants.includes(participantNames)) {
      return Alert.alert('Novo Participante', `Participante ${participantNames} já existe !`)
    } if (participantNames === '') {
      return Alert.alert('Obrigátorio inserir o nome do participante !')
    }
    setParticipants(prevState => [...prevState, participantNames]);
    setParticipantNames('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remove", `Deseja remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name)),
      },
      {
        text: 'Não',
        onPress: () => console.log('Operação Cancelada pelo usuário'),
        style: 'cancel',
      }
    ]);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.eventName} >
        Nome do evento
      </Text>

      <Text style={styles.eventDate} >
        Data: {agora.toLocaleDateString()}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor={"#6b6b6b"}
          onChangeText={setParticipantNames}
          value={participantNames}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item: string) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhum participante adicionado
          </Text>
        )}
      />

    </View>
  );
}
