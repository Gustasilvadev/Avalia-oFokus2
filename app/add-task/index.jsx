// app/add-task/index.jsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// FIX: Use the correct import path
import { useTasks } from '../../context/taskContext'; // Adjust path as needed

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks(); // This will now work
  const [taskText, setTaskText] = useState('');

  const handleSave = () => {
    if (!taskText.trim()) {
      Alert.alert('Atenção', 'Por favor, digite uma descrição para a tarefa.');
      return;
    }

    const newTask = addTask(taskText);
    if (newTask) {
      setTaskText('');
      router.push('/task'); // Navigate back to task list
    }
  };

  const handleCancel = () => {
    if (taskText.trim()) {
      Alert.alert(
        'Cancelar',
        'Tem certeza que deseja cancelar? Sua tarefa será perdida.',
        [
          { text: 'Continuar Editando', style: 'cancel' },
          { 
            text: 'Cancelar', 
            style: 'destructive',
            onPress: () => {
              setTaskText('');
              router.push('/task');
            }
          }
        ]
      );
    } else {
      router.push('/task');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Adicionar tarefa</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.boldText}>Adicionar tarefa:</Text>
          
          <Text style={styles.questionText}>Em que você está trabalhando?</Text>

          <View style={styles.inputContainer}>
            <View style={styles.checkbox} />
            <TextInput
              style={styles.input}
              placeholder="Digite sua tarefa aqui..."
              placeholderTextColor="#666666"
              value={taskText}
              onChangeText={setTaskText}
              multiline
              textAlignVertical="top"
              autoFocus
              maxLength={500}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.buttonItem}
              onPress={handleCancel}
            >
              <View style={styles.checkbox} />
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonItem}
              onPress={handleSave}
            >
              <View style={[styles.checkbox, styles.checkboxChecked]}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.navigationItem}
            onPress={() => router.push('/task')}
          >
            <View style={styles.checkbox} />
            <Text style={styles.navigationText}>Adicionar nova tarefa</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text style={styles.footerItalic}>Projeto fictício e sem fins comerciais.</Text>
            </Text>
            <Text style={styles.footerText}>Desenvolvido por Aluno.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 12,
    marginTop: 4,
  },
  checkboxChecked: {
    backgroundColor: '#04D361',
    borderColor: '#04D361',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  buttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
    lineHeight: 24,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  navigationText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
    width: '100%',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerItalic: {
    fontStyle: 'italic',
  },
});