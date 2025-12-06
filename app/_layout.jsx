import { Drawer } from 'expo-router/drawer';
import { TaskProvider } from '../context/taskContext';

export default function Layout() {
  return (
    <TaskProvider>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#021123'
          },
          headerTintColor: '#FFFFFF',
          drawerStyle: {
            backgroundColor: '#021123'
          },
          drawerLabelStyle: {
            color: '#FFFFFF'
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
          }}
        />
        <Drawer.Screen
          name="viacep"
          options={{
            drawerLabel: 'Meu cep',
            title: '',
          }}
        />
        <Drawer.Screen
          name="pomodoro"
          options={{
            drawerLabel: 'Pomodoro',
            title: 'Pomodoro Timer',
          }}
        />
        <Drawer.Screen
          name="tasks/index"
          options={{
            drawerLabel: 'Minhas Tarefas',
            title: 'Lista de Tarefas',
            headerStyle: {
              backgroundColor: '#FFFFFF'
            },
            headerTintColor: '#000000',
          }}
        />
        <Drawer.Screen
          name="tasks/add"
          options={{
            drawerLabel: 'Adicionar Tarefa',
            title: 'Adicionar Tarefa',
            headerStyle: {
              backgroundColor: '#FFFFFF'
            },
            headerTintColor: '#000000',
          }}
        />
      </Drawer>
    </TaskProvider>
  );
}