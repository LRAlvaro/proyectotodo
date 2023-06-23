import * as React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList'
import { todosData } from '../data/todos';
import { Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';



export default function Home() {

   const todos = useSelector(state => state.todos.todos)
   const [isHidden, setIsHidden] = React.useState(false);
   const navigation = useNavigation();
   const dispatch = useDispatch ();


  //  const [localData, setLocalData] = React.useState(
  //     todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
  //  )

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("@todos")
        if (todos !== null) {
          dispatch(setTodosReducer(JSON.parse(todos)));
        }
      }catch (e) {
        console.log(e);
      }
    }
    getTodos ()
   }, []);

   
   const handleHidePress = async () => {
      if (isHidden) {
        setIsHidden(false)
        const todos = await AsyncStorage.getItem("@todos");
        if (todos !== null) {
          dispatch(setTodosReducer(JSON.parse(todos)));
        }
        return;
      }
      setIsHidden(true);
      dispatch(hideComplitedReducer())


      //   setLocalData(todosData.sort((a,b) => {return a.isCompleted - b.isCompleted}))
      //   return;
      // }
      // setIsHidden(!isHidden)
      // setLocalData(localData.filter(todo=> !todo.isCompleted))
   }

  return (
    <View style={styles.container}>
        <Image
            source = {{ uri: 'https://unavatar.io/instagram/fernandezzalvaro'}}
            style = {styles.pic}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Hoy</Text>
          <TouchableOpacity onPress={handleHidePress} >
            <Text style={{color: '#3478f6'}}>{isHidden ? "Mostrar completas" : "Ocultar completas"}</Text>
          </TouchableOpacity>
        </View>
       
        <TodoList todosData={todos.filter(todo => todo.isToday )} />

        <Text style={styles.title}>Mañana</Text>  
        <TodoList todosData={todos.filter(todo => !todo.isToday )} /><TodoList />
        <TouchableOpacity onPress={() => navigation.navigate("Add")} style= {styles.button}>
          <Text style= {styles.plus}>+</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    paddingTop: 40, 
    paddingHorizontal: 15
  },

  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end'
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 50,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: '#fff',
    position: 'absolute',
    top: -8,
    left: 10,
  }
});
