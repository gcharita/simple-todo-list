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
            todoTitle: "",
            todoDescription: "",
            todoID: -1
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
            addUpdateTodo: function() {
                if (this.todoID == -1) {
                    this.items.push(itemWithValues(this.nextID++, this.todoTitle, this.todoDescription, false));
                } else {
                    this.items.forEach(item => {
                        if (item.id == this.todoID) {
                            item.title = this.todoTitle;
                            item.description = this.todoDescription;
                        }
                    });
                }
                this.clearCurrentTodo();
                this.showModal = false;
            },
            openModal: function(item) {
                this.todoTitle = item.title;
                this.todoDescription = item.description;
                this.todoID = item.id;
                this.showModal = true;
            },
            closeModal: function() {
                this.clearCurrentTodo();
                this.showModal = false;
            },
            clearCurrentTodo: function() {
                this.todoTitle = "";
                this.todoDescription = "";
                this.todoID = -1;
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
