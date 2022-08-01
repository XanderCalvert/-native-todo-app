import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';


export default function App() {

    const [task, setTask] = useState<string | null>('');

    const [taskItems, setTaskItems] = useState<string[]>([])

    const handleAddTask = () => {
        console.log(task);
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (i) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(i, 1);
        setTaskItems(itemsCopy);
    }

    return (
        <View style={styles.container}>
            {/* Today's Tasks */}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTile}>
                    Today's Tasks
                </Text>

                <View style={styles.items}>
                    {/* This is where all the tasks will go! */}
                    {
                        taskItems.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => completeTask(i)}>
                                    <Task text={item} />
                                </TouchableOpacity>
                            )

                        })
                    }
                </View>
            </View>

            {/* Write a task section */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTile: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#c0c0c0',
        borderWidth: 1,
        width: 250,

    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderWidth: 1,
    },
    addText: {

    }
});
