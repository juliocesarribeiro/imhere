import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
export function Home() {
  const participants = ['Julio', 'John', 'Bob', 'Cesar', 'Ana', 'Rodrigo', 'Ribeiro', 'Joao', 'Renato', 'Antonio'];

  function handleParticipantAdd() {
    if (participants.includes("Julio")) {
      return Alert.alert(`Participante já existe,`)
    }
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remove", `Deseja remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("Deletado")
      },
      {
        text: 'Não',
        onPress: () => console.log('Cancelado'),
        style: 'cancel',
      }
    ])
  }


  return (
    <View style={styles.container}>

      <Text style={styles.eventName} >
        Nome do evento
      </Text>

      <Text style={styles.eventDate} >
        Data: Quinta-feira 14 de novembro de 2024
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor={"#6b6b6b"}
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
        keyExtractor={item => item}
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
