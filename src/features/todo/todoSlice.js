import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState  = {
    todos:[],
    error:null,
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const existingTodo = state.todos.find(todo => todo.text === action.payload);
            if(!existingTodo){
                const todo = {
                    id:nanoid(),
                    text: action.payload,
                    completed:false
                }
                state.todos.push(todo)
                state.error = null
            }
            else{
                state.error = "Todo Already Exist"
            }
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter(todo=>{
              return todo.id != action.payload
            })
        },
        updateTodo:(state,action)=>{
            state.todos = state.todos.map(todo=>{
                if(action.payload.id==todo.id){
                    return {...todo,text:action.payload.text}
                }
                return todo;
            })
        },
        isCompleted: (state, action) => {
            state.todos = state.todos.map(todo => {
              if (action.payload === todo.id) {
                
                return { ...todo, completed: !todo.completed };
              }
              return todo;
            });
        },
        clearError:(state,action)=>{
            state.error = null;
        }
        
    }
})

export const { addTodo, removeTodo, updateTodo, isCompleted, clearError} = todoSlice.actions

export default todoSlice.reducer