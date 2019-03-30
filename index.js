window.onload = function() {
    // register modal component
    Vue.component("modal", {
        template: "#modal-template"
    });

    new Vue({
        el: "#todo-list-container",
        data: {
            items: [itemWithValues(0, "some", "", true)],
            nextID: 1,
            showModal: false,
            newTodo: "",
            newTodoDescription: ""
        },
        methods: {
            setDone: function(item) {
                var index = this.items.indexOf(item);
                this.items[index].done = !this.items[index].done;
            },
            remove: function(item) {
                var index = this.items.indexOf(item);
                console.log(index);
                this.items.splice(index, 1);
            },
            addTodo: function() {
                this.items.push(itemWithValues(this.nextID++, this.newTodo, this.newTodoDescription, false));
                this.newTodo = "";
                this.newTodoDescription = "";
                this.showModal = false;
            }
        }
    });
};

function itemWithValues(id, title, description, done) {
    return {
        id: id,
        title: title,
        description: description,
        done: done
    };
}
