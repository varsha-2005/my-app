import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { addTask, auth, getTasks, updateTask, deleteTask } from '../firebase/firebase';

export default function Todo() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchTasks = async () => {
            if (userId) {
                const tasks = await getTasks(userId);
                setTodoList(tasks);
            }
        };
        fetchTasks();
    }, [userId]);

    const handleAddTodo = async () => {
        if (!todo.trim()) {
            alert("Please enter a task!");
            return;
        }
        const newTask = await addTask(userId, todo);
        if (newTask) {
            setTodoList([...todoList, { id: newTask.id, title: todo }]);
        }
        setTodo("");
    };

    const handleDeleteTodo = async (id) => {
        await deleteTask(id);
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    };

    const handleUpdateTodo = async () => {
        await updateTask(editedTodo.id, todo);
        const updatedTodos = todoList.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo };
            }
            return item;
        });
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("");
    };

    const renderTodos = ({ item }) => {
        return (
            <View style={styles.todo}>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400", marginHorizontal: 8, flex: 1 }}>{item.title}</Text>
                <View style={{ flexDirection: "row", alignItems: 'space-evenly' }}>
                    <Text style={{ fontSize: 20 }} onPress={() => handleEditTodo(item)}>🖋️</Text>
                    <Text style={{ marginLeft: 10, fontSize: 20 }} onPress={() => handleDeleteTodo(item.id)}>🚮</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.text} placeholder='Add a Task' value={todo} onChangeText={(userText) => setTodo(userText)} />
            {editedTodo ? (
                <Pressable style={styles.touch} onPress={handleUpdateTodo}>
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 20 }}>Save</Text>
                </Pressable>
            ) : (
                <Pressable style={styles.touch} onPress={handleAddTodo}>
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 20 }}>Add</Text>
                </Pressable>
            )}
            {todoList.length <= 0 ? (
                <Text style={styles.noTask}>Add the Tasks</Text>
            ) : (
                <FlatList
                    data={todoList}
                    renderItem={renderTodos}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    text: {
        borderWidth: 2,
        width: '100%',
        borderColor: "#1e99ff",
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 13,
    },
    todo: {
        backgroundColor: "#1e99ff",
        borderRadius: 6,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    noTask: {
        marginTop: 20,
        fontSize: 18,
        color: "#555",
        textAlign: "center",
    },
    touch: {
        backgroundColor: "#000",
        borderRadius: 6,
        paddingVertical: 12,
        marginVertical: 15,
        alignItems: "center",
    },
});
