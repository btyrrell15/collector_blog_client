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
      server_url: "https://collector-blog-brian.herokuapp.com"

  },


  created: function() {
      this.getPosts();
  },


  methods: {
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
      }
  },
})
