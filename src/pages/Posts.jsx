import { db } from '../firebaseConnection'
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  CollectionReference,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConnection';
import { useNavigate } from 'react-router-dom';
import './posts.css'
export default function Posts() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState("");
  const [assunto, setAssunto] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    async function loadPosts() {
      onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPosts = [];
        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            assunto: doc.data().assunto
          });
        });
        setPosts(listaPosts);
      });
    }
    loadPosts();
  }, []);
  function cleanInputs() {
    setTitulo('');
    setAutor('');
    setIdPost('');
    setAssunto('');
  }
  async function salvarPost() {
    const postRef = collection(db, "posts");

    await addDoc(postRef, {
      titulo,
      autor,
      assunto
    })
      .then(() => {
        toast.success("Post Salvo com sucesso");
        cleanInputs();
      })
      .catch((erro) => {
        toast.error("Erro ao salvar post");
        console.log(erro);
      });
  }

  async function buscarPost() {
    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let listaPosts = [];
        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            assunto: doc.data().assunto
          });
        });
        setPosts(listaPosts);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  async function hasAtualizarPost() {
    if (titulo && autor) {
      try {
        const docRef = doc(db, "posts", idPost);
        await updateDoc(docRef, {
          titulo: titulo,
          autor: autor,
          assunto: assunto
        });
        toast.success("Post atualizado com sucesso", {
          autoClose: 900,
          pauseOnHover: false,
        });
        cleanInputs();
      } catch (error) {
        toast.error("Houve um erro ao atualizar o post!", {
          autoClose: 900,
          pauseOnHover: false,
          hideProgressBar: false,
        });
        console.error(error);
      }
    } else {
      toast.warn("Preencha todos os campos!", {
        autoClose: 3000,
      });
    }
  }

  async function hasDeletePost(id) {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef)

      toast.success("Post Deletado!", {
        autoClose: 900,
        pauseOnHover: false,
      })
    } catch (error) {
      console.log(error);
      toast.warn("Houve um erro ao deletar post");
    }
  }

  async function hasLogout() {
    try {
      await signOut(auth)
      toast.success('Logout feito com sucesso!')
      navigate('/')
    }
    catch (error) {
      console.log(error);
      toast.error('Erro ao sair da sua conta!')
    }
  }

  return (
    <div className='container-main'>

      <div className="top-container">
        <h1>Dev Posts</h1>
        <button onClick={hasLogout}>Logout</button>
      </div>

      <div className="form-container">
        <input
          type="text"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
          placeholder="Digite o id do post"
        />


        <label>Titulo</label>
        <textarea
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite seu titulo"
        ></textarea>

        <label>Assunto</label>
        <textarea placeholder="Assunto" value={assunto} onChange={(e) => setAssunto(e.target.value)}></textarea>


        <label>Autor</label>
        <input
          type="text"
          placeholder="Digite seu autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />



        <div className="button-group">
          <button onClick={salvarPost}>Salvar</button>
          <button onClick={hasAtualizarPost}>Atualizar posts</button>
          <button onClick={buscarPost}>Buscar Post</button>
        </div>
      </div>



      <ToastContainer autoClose={3000} />

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>ID: {post.id}</span>
            <h3>Titulo: {post.titulo}</h3>
            <p>Autor: {post.autor}</p>
            <p>Assunto: {post.assunto}</p>
            <button onClick={() => hasDeletePost(post.id)}>Deletar Post</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
