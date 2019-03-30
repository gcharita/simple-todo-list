window.onload = function() {
    new Vue({
        el: "#todo-list-container",
        data: {
            items: [
                {
                    id: 0,
                    label: "some"
                }
            ],
            nextID: 1
        },
        methods: {
            add: function() {
                // this.items.push("some" + this.nextID++);
                this.items.push({
                    id: this.nextID++,
                    label: "some"
                });
            },
            remove: function(item) {
                var index = this.items.indexOf(item);
                console.log(index);
                this.items.splice(index, 1);
            }
        }
    });
};
