import * as React from 'react';
import { View, TouchableOpacity,  Text, StyleSheet, TextInput, Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AddTodo() {

    const [hora, setHora] = React.useState ();
    const [task, setTask] = React.useState('');
    const [minutos, setMinutos] = React.useState();
    const [show, setShow] = React.useState(false)
    const [date, setDate] = React.useState(new Date());
    const[name, setName] = React.useState('');
    const[isToday, setIsToday] = React.useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const listTodos = useSelector(state => state.todos.todos)

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() *1000000),
            text: name,
            hour: date.toString(),
            isToday: isToday,
            isCompleted: false
        }

        try {
            await AsyncStorage.setItem("@todos", JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (event, selectedDate) =>{
        setShow(!setShow);
        setDate(selectedDate);
        setHora(selectedDate.getHours());
        setMinutos(selectedDate.getMinutes())
    }

    return (
        <View style={styles.container}>
          <Text style= {styles.title}> Agregar Tarea </Text>
          <View style={styles.inputContainer}>
            <Text style= {styles.inputTitle}>Nombre</Text>
            <TextInput 
                style= {styles.textInput}
                placeholder="Tarea"
                placeholderTextColor="#00000030"
                onChangeText={(text) => {setName(text)}} 
            />
           </View> 

           <TouchableOpacity onPress={setShow} style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Hora</Text>
              <Text style={styles.inputHour}>
              {hora || minutos ? `${hora}:${minutos}` : `00:00`}
              </Text>
            </TouchableOpacity>

           <View style={styles.inputContainer}>
            <Text style= {styles.inputTitle}>Hoy</Text>
            <Switch
                value={isToday}
                onValueChange={(value) => { setIsToday(value) }}
            />
           </View> 

            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style= {{color: 'white'}}>Listo</Text> 
            </TouchableOpacity>
            <Text style={{color: '#00000060'}}>Si deshabilitas hoy, la tarea se guardara para mañana</Text>


           
            {show && (
            <DateTimePicker
                accessibilityLanguage='Arg'
                testID='dateTimePicker'
                value={date}
                mode={'time'}
                is24Hour={true}
                style={{ width: '80%' }}
                onChange={onChange}
                display='clock'
                />
            )} 

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight:'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
        paddingLeft: 8
    },
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    }
})

