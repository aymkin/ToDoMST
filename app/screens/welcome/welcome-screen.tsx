import React, { FC } from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  Text,
  GradientBackground,

} from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { TextInput, Button, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const CONTAINER_INPUT: ViewStyle = { marginTop: spacing[3], flexDirection: 'row', alignItems: 'center'}
const INPUT: ViewStyle = { width: '80%'}
const TRASH_ICON: ViewStyle = { marginLeft: spacing[5] }


export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  () => {
    const [text, setText] = React.useState("");
    const { todoStore } = useStores()
    const { todos } = todoStore

    const addTodo = () => {
      todoStore.addTodo(text)
      setText('')
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerText="To Dp list" />
          <View style={CONTAINER_INPUT}>
            <View style={INPUT}>
              <TextInput

                placeholder="What is next to do?"
                value={text}
                onChangeText={text => setText(text)}
              />
            </View>
            <View>
              <Button mode="contained" onPress={addTodo}>
                +
              </Button>
            </View>

          </View>
          <View>
            {todos.map((todo) => {
              return (
                <Todo todo={todo} key={todo.id} />
              )
            })}
          </View>
          <Text>
            Tasks left: { todoStore.unfinishedTodoCount }
          </Text>
          <TouchableOpacity onPress={todoStore.removeAllTodos}>
            <Text>
              Erase ALL todos: <Icon name="eraser" size={30} color="#900" />
            </Text>
          </TouchableOpacity>
        </Screen>
      </View>
    )
  },
)

export const Todo = observer(({ todo }) => {
  const { todoStore } = useStores()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox status={todo.finished ? 'checked' : 'unchecked'} onPress={() => todo.toggle()} uncheckedColor="#ccc" />
      <Text preset={todo.finished ? 'default' : 'bold'} text={todo.title} />
      {todo.finished ? null : <TouchableOpacity onPress={() => todoStore.removeTodo(todo.id)} style={TRASH_ICON}>
        <Icon name="trash" size={30} color="#900" />
      </TouchableOpacity>}
    </View>
  )
})
