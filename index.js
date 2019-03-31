window.onload = function() {
    // register modal component
    Vue.component("modal", {
        template: "#modal-template"
    });

    new Vue({
        el: "#todo-list-container",
        data: {
            items: [],
            nextID: 0,
            showModal: false,
            todoTitle: "",
            todoDescription: "",
            todoID: -1
        },
        mounted() {
            if (localStorage.getItem("todo-items")) {
                try {
                    this.items = JSON.parse(localStorage.getItem("todo-items"));

                    if (this.items.length != 0) {
                        var ids = this.items.map(item => item.id);
                        this.nextID = Math.max.apply(null, ids) + 1;
                    }
                } catch (e) {
                    localStorage.removeItem("todo-items");
                }
            }
        },
        watch: {
            items() {
                this.saveItems();
            }
        },
        methods: {
            setDone(item) {
                var index = this.items.indexOf(item);
                this.items[index].done = !this.items[index].done;
                this.saveItems();
            },
            remove(item) {
                var index = this.items.indexOf(item);
                this.items.splice(index, 1);
            },
            addUpdateTodo() {
                if (this.todoID == -1) {
                    this.items.push(itemWithValues(this.nextID++, this.todoTitle, this.todoDescription, false));
                } else {
                    this.items.forEach(item => {
                        if (item.id == this.todoID) {
                            item.title = this.todoTitle;
                            item.description = this.todoDescription;
                        }
                    });
                    this.saveItems();
                }
                this.clearCurrentTodo();
                this.showModal = false;
            },
            openModal(item) {
                this.todoTitle = item.title;
                this.todoDescription = item.description;
                this.todoID = item.id;
                this.showModal = true;
            },
            closeModal() {
                this.clearCurrentTodo();
                this.showModal = false;
            },
            removeDone() {
                this.items = this.items.filter(function(item) {
                    return !item.done;
                });
            },
            clearCurrentTodo() {
                this.todoTitle = "";
                this.todoDescription = "";
                this.todoID = -1;
            },
            saveItems() {
                const parsed = JSON.stringify(this.items);
                localStorage.setItem("todo-items", parsed);
            }
        },
        computed: {
            hasDoneItems() {
                var returnValue = false;
                this.items.forEach(item => {
                    if (item.done) {
                        returnValue = true;
                    }
                });
                return returnValue;
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
