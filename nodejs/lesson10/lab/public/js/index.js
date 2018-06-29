var app = new Vue({
  el: "#todoVue",
  data: {
    titleTask: "",
    tasks: []
  },
  methods: {
    newElement: function() {
      axios
        .post("/db/add", {
          title: this.titleTask,
          isDeleting: false
        })
        .then(result => {
          this.tasks.push({
            id: result.data[0]._id,
            title: result.data[0].title,
            isDeleting: result.data[0].isDeleting
          });
        })
        .catch(err => {});

      this.titleTask = "";
    },
    deleteElement: function() {
      var arr = [];
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].isDeleting) {
          arr.push(this.tasks[i].id);
        }
      }
      axios
        .post("/db/delete", { arr: arr })
        .then(result => {
          this.tasks = [];
          for (let index = 0; index < result.data.length; index++) {
            this.tasks.push({
              id: result.data[index]._id,
              title: result.data[index].title,
              isDeleting: result.data[index].isDeleting
            });
          }
        })
        .catch(err => {});
    },
    allElement: function() {
      axios
        .post("/db/allElement", {})
        .then(result => {
          for (let index = 0; index < result.data.length; index++) {
            this.tasks.push({
              id: result.data[index]._id,
              title: result.data[index].title,
              isDeleting: result.data[index].isDeleting
            });
          }
        })
        .catch(err => {});
    }
  }
});

app.allElement();
