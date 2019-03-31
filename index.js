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
            todoDescription: ""
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
                this.items.push(itemWithValues(this.nextID++, this.todoTitle, this.todoDescription, false));
                this.todoTitle = "";
                this.todoDescription = "";
                this.showModal = false;
            },
            openModal: function(item) {
                this.todoTitle = item.title;
                this.todoDescription = item.description;
                this.showModal = true;
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
