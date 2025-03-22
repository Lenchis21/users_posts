import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]); 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
        const postsResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");

        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, []);

  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Неизвестный пользователь";
  };

  return (
    <div>
        <h1 className="title">Посты</h1>
        <div className="card" style={{ padding: "20px" }}>
        {posts.map((post) => (

          <div  className="post" key={post.id}>
      
            <div className="card_athor">
              Автор: {getUserNameById(post.userId)}
            </div>

            <div>
              <h3 className="post_title">{post.title}</h3>
              <p className="post_body">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default App;
