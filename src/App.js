import React, {Component} from 'react';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import PredefinedDays from "./PredefinedDays";
import RemoveAll from "./RemoveAll";
import Instructions from "./Instructions";
import "./App.css";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        todos: [],
        todosImportant: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.toggleCompleteStatus = this.toggleCompleteStatus.bind(this);
    this.highlight = this.highlight.bind(this);
    this.showOnlyImportant = this.showOnlyImportant.bind(this);
    this.verimliGun = this.verimliGun.bind(this);
    this.tembelGun = this.tembelGun.bind(this);
  }

  componentDidMount() {
    // Component oluştuktan sonra gerekli olan datayı localstoragedan geyiriyoruz.
    let localTodos = window.localStorage.getItem("todos");
    if(localTodos){
      localTodos  = JSON.parse(localTodos);
    }
    // Getirdiğimiz datayı state'e kaydediyoruz.
    this.setState({
      todos: localTodos || []
    })
  }

  addTodo(newTodo){
      // Parametre olarak inputtan yeni eklenen değeri "newTodo" olarak alıyoruz.
      // State'i mutate etmemek için rest operatörü ile bir kopyalama yapıp yeni todoyu concat ile ekliyoruz.
      if (newTodo.length <5){
        newTodo.length === 0 ? alert("Bu kısım boş bırakılamaz") : alert("5 ve üzeri karakter girmelisiniz");
        return;
      } else{
      this.setState({
        todos: [...this.state.todos,
            { content: newTodo, id: Math.random(), checked: false, important: false}
        ]

      }, () => {
          // Todo ekrana eklendikten sonra bunu localstorage'a da ekliyoruz.
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
      })}
  }

  removeTodo(id){
      // Silinecek todo'nun idsini parametre olarak alıyoruz.
      // State içerisindeki todolardan filter ile bu id'yi çıkarıyoruz.
      // Mutate etmemk için filter kullandık, filter bize yeni bir array döner.
      const newArray = this.state.todos.filter((todo) => {
         return todo.id !== id;
      });
      this.setState({
          todos: newArray
      }, () => {
          window.localStorage.setItem("todos", JSON.stringify(this.state.todos));
      });
  }


  showOnlyImportant(){
    const newArray = this.state.todos.filter(todo => {
      return todo.important === true})
      this.setState({todos: newArray},()=>window.localStorage.setItem("todos",JSON.stringify(this.state.todos)))
}

  removeAllTodos(){
    this.setState({
        todos: []
    }, () => {
        window.localStorage.removeItem("todos");
    })
  }

  toggleCompleteStatus(id){
      // Map ile mevcut todolar arasında döngüye girip, değiştirmek istediğimi farklı şekilde dönüyorum.
      // Aradığım itemin checked statusunu değiştiriyorum, rest ile kopyalayarak yani mutate etmeden.
      // Diğer elemanları olduğu gibi dönüyorum, "return todo";
      const newArr = this.state.todos.map((todo) => {
          if(id === todo.id){
              let currentTodo = {...todo};
              currentTodo.checked = !currentTodo.checked;
              return currentTodo;
          }else{
              return todo;
          }
      });
      this.setState({
          todos: newArr
      }, () => {
          window.localStorage.setItem("todos", JSON.stringify(this.state.todos));
      });
  }

  highlight(id,important){
    const newArr = this.state.todos.map(todo =>{
      if (id === todo.id){
        let currentTodo = {...todo};
        currentTodo.important = !currentTodo.important;
        return currentTodo;
      } else{
        return todo;
      }
    });
    this.setState({
      todos: newArr}, ()=> {
        window.localStorage.setItem("todos",JSON.stringify(this.state.todos));
    })
  }

  verimliGun(){
    this.setState({
      todos: [
        {content: "Erken Kalk", id: Math.random(), checked: false, important: false},
        {content: "Kitap Oku", id: Math.random(), checked: false, important: false},
        {content: "Yeni bilgiler öğren", id: Math.random(), checked: false, important: false},
        {content: "Kendini Geliştir", id: Math.random(), checked: false, important: false},
      ]
    },()=>window.localStorage.setItem("todos",JSON.stringify(this.state.todos)));
  }

  tembelGun(){
    this.setState({
      todos: [
        {content: "Yat", id: Math.random(), checked: false, important: false},
        {content: "Biraz daha yat", id: Math.random(), checked: false, important: false},
        {content: "Daha fazla yat", id: Math.random(), checked: false, important: false},
        {content: "En fazla yat", id: Math.random(), checked: false, important: false},
      ]
    },()=>window.localStorage.setItem("todos",JSON.stringify(this.state.todos)));
  }

  render(){
    return (
        <div className="App" id="todo">
            <div className="todo-list todo-list-add">
                <h3>Todo Ekle / Sil</h3>
                <div>
                    <AddTodo   onTodoAdd={this.addTodo} />
                    <PredefinedDays verimliGun={this.verimliGun} tembelGun={this.tembelGun}/>
                    <RemoveAll showOnlyImportant={this.showOnlyImportant} onRemoveAll={this.removeAllTodos}/>
                    <Instructions />
                </div>
            </div>

            <TodoList
                title="Tamamlanmamış Todolar"
                todos={this.state.todos.filter(item => item.checked !== true)}
                onTodoRemove={this.removeTodo}
                onCheckedToggle={this.toggleCompleteStatus}
                highlight={this.highlight} />

            <TodoList
                title="Tamamlanmış Todolar"
                todos={this.state.todos.filter(item => item.checked === true)}
                onTodoRemove={this.removeTodo}
                onCheckedToggle={this.toggleCompleteStatus}
                highlight={this.highlight} />


        </div>
    );
  }
}

export default App;
