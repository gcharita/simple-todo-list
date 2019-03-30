window.onload = function() {
    new Vue({
        el: "#todo-list-container",
        data: {
            items: [itemWithValues(0, "some", true)],
            nextID: 1
        },
        methods: {
            add: function() {
                this.items.push(itemWithValues(this.nextID++, "some", false));
            },
            setDone: function(item) {
                var index = this.items.indexOf(item);
                this.items[index].done = !this.items[index].done;
            },
            remove: function(item) {
                var index = this.items.indexOf(item);
                console.log(index);
                this.items.splice(index, 1);
            }
        }
    });
};

function itemWithValues(id, label, done) {
    return {
        id: id,
        label: label,
        done: done
    };
}
