var app = new Vue ({
  el: "#app",

  data: {
      page: "blog",
      drawer: false,
      categories: [
          "all",
          "clothing",
          "hunting",
          "books",
          "cards",
          "coins",
          "keychains",
          "comic books",
          "misc"
      ],
      selected_category: "all",
      new_category: "Select a Catgeory",
      new_title: "",
      new_author: "",
      new_image: "",
      new_text: "",
      edit_category: "Select a Catgeory",
      edit_title: "",
      edit_author: "",
      edit_image: "",
      edit_text: "",
      edit_id: "",
      posts: [],
      //     {
      //         title: "first post",
      //         author: "mr. author",
      //         category: "shoes",
      //         date: "today",
      //         image: "https://i.imgur.com/HuwV4CW.jpg",
      //         text: "a;lksdf."
      //     },
      //     {
      //         title: "first post",
      //         author: "mr. author",
      //         category: "comic book",
      //         date: "today",
      //         image: "https://i.imgur.com/HuwV4CW.jpg",
      //         text: "a;lksdf."
      //     },
      //     {
      //         title: "first post",
      //         author: "mr. author",
      //         category: "hunting",
      //         date: "today",
      //         image: "https://i.imgur.com/HuwV4CW.jpg",
      //         text: "a;lksdf."
      //     },
      //     {
      //         title: "first post",
      //         author: "mr. author",
      //         category: "shoes",
      //         date: "today",
      //         image: "https://i.imgur.com/HuwV4CW.jpg",
      //         text: "a;lksdf."
      //     },
      server_url: "https://collector-blog-brian.herokuapp.com",
      show_delete: true,
      secret_keycode: "",

  },


  created: function() {
      this.getPosts();
      window.addEventListener("keyup", this.keyEvents);
  },


  methods: {
    //   keyEvents: function(event){
    //      console.log(event.which);
    //      if(event.which == 68){
    //          if (this.secret_keycode == ""){
    //              this.secret_keycode = "D";
    //          } else {
    //              this.secret_keycode = "";
    //          }
    //      } else if (event.which == 69){
    //         if  (this.secret_keycode == "D") {
    //              this.secret_keycode = "DE";
    //          } else {
    //              this.secret_keycode = "";
    //          }
    //     } else if (event.which == 76){
    //         if (this.secret_keycode == "DE") {
    //              this.secret_keycode = "DEL";
    //          } else {
    //              this.secret_keycode = "";
    //      }else{
    //          this.secret_keycode = "";
    //     }
    //     },
    // },
      getPosts: function () {
        fetch(`${this.server_url}/posts`).then(function(res){
            res.json().then(function(data){
                console.log(data);
                app.posts = data.posts;
            });
        });
      },
      addPost: function () {
          var new_post = {
              title: this.new_title,
              author: this.new_author,
              category: this.new_category,
              date: new Date(),
              image: this.new_image,
              text: this.new_text,
          };
          fetch(`${this.server_url}/posts`, {
              method: "POST",
              headers: {
                  "Content-type": "application/json"
              },
              body: JSON.stringify(new_post)
          }).then(function(){
              app.posts.unshift(new_post);
              app.new_title = "";
              app.new_author = "";
              app.new_category = "all";
              app.new_image = "";
              app.new_text = "";
              app.page = "blog";
              app.getPosts();
          })
      },

      deletePost: function(post){
          fetch(`${this.server_url}/posts/${post._id}`, {
              method: "DELETE"
          }).then(function(response){
              if (response.status == 204){
                  console.log("It worked");
                  app.getPosts();
              } else if(response.status == 400){
                  response.json().then(function(data){
                      alert(data.msg);
                  })
              }
          })
      },

      editPost: function(post) {
          this.page = "edit";
          app.edit_title = post.title;
          app.edit_author = post.author;
          app.edit_category = post.category;
          app.edit_image = post.image;
          app.edit_text = post.text;
          app.edit_id = post._id;
    },
    updatePost: function(){
        fetch(`${this.server_url}/posts/${app.edit_id}`, {
            method: "PUT"
        }).then(function(response){
            if (response.status == 204){
                console.log("It worked");
                app.getPosts();
            } else if(response.status == 400){
                response.json().then(function(data){
                    alert(data.msg);
                })
            }
        })
    },
      // formatDate:
  },

  computed: {
      sorted_posts: function (){
          if (this.selected_category == "all"){
              return this.posts;
          } else {
              var sorted_posts = this.posts.filter(function (post){
                 return post.category == app.selected_category
              });
              return sorted_posts
          }
      },
      show_delete: function(){
          return this.secret_keycode == "DEL";
      }
  },
})
