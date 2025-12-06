import { useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTasks } from '../../context/taskContext';

// Componente para cada item da tarefa
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[
          styles.checkbox,
          task.completed && styles.checkboxChecked
        ]}
      >
        {task.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>
      
      <View style={styles.taskContent}>
        <Text style={[
          styles.taskText,
          task.completed && styles.taskTextCompleted
        ]}>
          {task.text}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tela de estado vazio
const EmptyState = ({ onAddTask }) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Empty state</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Lista de tarefas:</Text>
      
      <Text style={styles.emptyText}>
        Ainda não há tarefas na sua lista, que tal adicionar?
      </Text>

      <TouchableOpacity
        style={styles.emptyTaskItem}
        onPress={onAddTask}
      >
        <View style={styles.checkbox} />
        <Text style={styles.taskText}>Adicionar nova tarefa</Text>
      </TouchableOpacity>

      <View style={[styles.emptyTaskItem, { marginTop: 8 }]}>
        <View style={styles.checkbox} />
        <Text style={styles.taskText}></Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={styles.footerBold}>Projeto:</Text> <Text style={styles.footerItalic}>Fictício e sem fins comerciais.</Text>
        </Text>
        <Text style={styles.footerText}>Desenvolvido por Aluno.</Text>
      </View>
    </View>
  );
};

// Tela principal de lista de tarefas
export default function TaskListScreen() {
  const router = useRouter();
  const { 
    tasks, 
    toggleTask, 
    deleteTask, 
    deleteAllTasks,
    getStats 
  } = useTasks();

  const stats = getStats();

  const handleDeleteTask = (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => deleteTask(id)
        }
      ]
    );
  };

  const handleDeleteAll = () => {
    if (tasks.length === 0) return;
    
    Alert.alert(
      'Limpar Tudo',
      'Tem certeza que deseja excluir todas as tarefas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar Tudo', 
          style: 'destructive',
          onPress: () => deleteAllTasks()
        }
      ]
    );
  };

  const navigateToAddTask = () => {
    router.push('/app/add-task/index.jsx');
  };

  // Se não houver tarefas, mostra o estado vazio
  if (tasks.length === 0) {
    return <EmptyState onAddTask={navigateToAddTask} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.mainTitle}>Lista de tarefas</Text>
          {tasks.length > 0 && (
            <TouchableOpacity onPress={handleDeleteAll} style={{ padding: 8 }}>
              <Text style={{ color: '#E83F5B', fontSize: 14, fontWeight: '600' }}>
                Limpar tudo
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#04D361' }]}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#E83F5B' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Lista de tarefas:</Text>

        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
          />
        ))}

        <TouchableOpacity
          style={styles.emptyTaskItem}
          onPress={navigateToAddTask}
        >
          <View style={styles.checkbox} />
          <Text style={styles.taskText}>Adicionar nova tarefa</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Projeto fictício e sem fins comerciais.
          </Text>
          <Text style={styles.footerText}>Desenvolvido por Aluno.</Text>
        </View>
      </View>
    </ScrollView>
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
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  emptyTaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#04D361',
    borderColor: '#04D361',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#E83F5B',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
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
  footerBold: {
    fontWeight: 'bold',
  },
  footerItalic: {
    fontStyle: 'italic',
  },
});