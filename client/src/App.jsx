import { Button, Container, HStack, Heading, Input } from "@chakra-ui/react"
import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState, useEffect, useRef } from "react"

const Header = () => {
  return (
    <Container p={10} >
      <Heading as="h1" >My Todos App</Heading>
    </Container>
  )
}

const Todo = ({ todo, count, countInc }) => {

  const handleDelete = () => {
    countInc(count + 1)
    deleteTodos()
  }

  const hanldeDone = () => {
    countInc(count + 1)
    updateTodos()
  }

  const updateTodos = () => {
    fetch("http://localhost:8000/api/todos/" + todo.id, {
      method: "PATCH",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(error => console.error("On updating todos: ", error))

  }

  const deleteTodos = () => {
    fetch("http://localhost:8000/api/todos/" + todo.id, {
      method: "DELETE",
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(error => console.error("On Deleting todos: ", error))

  }


  return (
    <Container p={2}>
      <HStack>
        <Input placeholder="Edit Todo" isDisabled={true} defaultValue={todo.body} />
        <Button colorScheme={todo.completed ? "green" : "white"} onClick={hanldeDone}><CheckIcon color={todo.completed ? "white" : "green"} /></Button>
        <Button colorScheme="red" onClick={handleDelete}><DeleteIcon /></Button>
      </HStack>
    </Container>
  )

}

const TodoForm = ({ count, countInc }) => {

  const inputtxt = useRef(null);
  const createTodos = (task) => {
    fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: task
      })
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(error => console.error("On creating todos: ", error))
  }
  const handleAdd = () => {
    countInc(count + 1)
    createTodos(inputtxt.current.value.trim())
    inputtxt.current.value = ""
    // console.log(inputtxt.current.value)
  }
  return (
    <Container p={2}>
      <HStack>
        <Input ref={inputtxt} placeholder="Add Todo" onKeyDown={e => e.key === "Enter" ? handleAdd() : ""} />
        <Button colorScheme="pink" onClick={handleAdd} ><AddIcon /></Button>
      </HStack>
    </Container>
  )
}

const TodoList = ({ count, countInc }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetch("http://localhost:8000/api/todos", {
      mode: "cors",
      method: "GET"
    })
      .then(response => response.json())
      .then(json => setTodos(json))
      .then(error => console.error("On getting todos", error))
  }

  useEffect(() => {
    getTodos()
  }, [count]);

  return (
    todos && todos.map((todo) => {
      return (
        <Todo key={todo.id} todo={todo} count={count} countInc={countInc} />
      )
    })
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <TodoForm count={count} countInc={setCount} />
      <TodoList count={count} countInc={setCount} />
    </>
  )
}

export default App
