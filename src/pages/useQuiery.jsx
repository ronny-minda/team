import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, getPost, postPost, putPost } from "../api/post";
import { motion, AnimatePresence } from "framer-motion";

import LayoutPage from "../components/layoutPage";
import Spiner from "../components/spiner";
import { useState } from "react";

const UseQuiery = () => {
  const [agg, setAgg] = useState({
    title: "",
    author: "",
  });
  const [actu, setActu] = useState({
    id: "",
    title: "",
    author: "",
  });
  // Pedir los datos GET
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["post"],
    queryFn: getPost,
  });

  // Enviar datos POST
  const queryClient = useQueryClient();
  const agregarPostMutacion = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      // invalidamos la cache refechin
      queryClient.invalidateQueries("post");
      setAgg({
        title: "",
        author: "",
      });
    },
  });

  // Enviar datos POST
  // const queryClient = useQueryClient();
  const ActualizarPutMutacion = useMutation({
    mutationFn: putPost,
    onSuccess: () => {
      // invalidamos la cache refechin
      queryClient.invalidateQueries("post");
      setActu({
        id: "",
        title: "",
        author: "",
      });
    },
  });

  // Borra un dato DELETE
  // const queryClient = useQueryClient();
  const BorraDeleteMutacion = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // invalidamos la cache refechin
      queryClient.invalidateQueries("post");
      console.log("deletePost");
    },
  });

  const agregar = (e) => {
    setAgg({ ...agg, [e.target.name]: e.target.value });
  };

  const actualizar = (e) => {
    setActu({ ...actu, [e.target.name]: e.target.value });
  };

  return (
    <LayoutPage>
      <h1>UseQuiery</h1>
      <hr />
      <h2>Agregar</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          agregarPostMutacion.mutate(agg);
          console.log("creado");
        }}
      >
        <label>
          <input
            value={agg.title}
            type="text"
            name="title"
            placeholder="title"
            className="outline outline-offset-1 mx-2 outline-blue-500"
            onChange={(e) => agregar(e)}
          />
        </label>
        <label>
          <input
            value={agg.author}
            type="text"
            name="author"
            placeholder="author"
            className="outline outline-offset-1 mx-2 outline-blue-500"
            onChange={(e) => agregar(e)}
          />
        </label>

        <input type="submit" value="Agregar" />
      </form>

      <hr />

      <h2>Actualizar</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ActualizarPutMutacion.mutate(actu);
          console.log("creado");
        }}
      >
        <label>
          <input
            value={actu.title}
            type="text"
            name="title"
            placeholder="title"
            className="outline outline-offset-1 mx-2 outline-red-500"
            onChange={(e) => actualizar(e)}
          />
        </label>
        <label>
          <input
            value={actu.author}
            type="text"
            name="author"
            placeholder="author"
            className="outline outline-offset-1 mx-2 outline-red-500"
            onChange={(e) => actualizar(e)}
          />
        </label>

        <input type="submit" value="Actualizar" />
      </form>

      <div className="relative">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 h-full w-full backdrop-blur-sm flex justify-center items-center"
              style={{ backgroundColor: "#00000078" }}
            >
              <Spiner />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading &&
            data?.data.map((value, key) => {
              return (
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  key={key}
                  className="my-10 mx-5 shadow-md bg-slate-100 relative"
                  onClick={() => {
                    setActu({
                      id: value.id,
                      title: value.title,
                      author: value.author,
                    });
                  }}
                >
                  <div className="px-5">
                    <b>id: </b>
                    <span>{value.id}</span>
                  </div>
                  <div className="px-5">
                    <b>title: </b>
                    <span>{value.title}</span>
                  </div>
                  <div className="px-5">
                    <b>author: </b>
                    <span>{value.author}</span>
                  </div>
                  <button
                    className="bg-red-200 hover:bg-red-300 active:bg-red-400 p-2"
                    onClick={() => {
                      BorraDeleteMutacion.mutate(value.id);
                    }}
                  >
                    borrar
                  </button>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </LayoutPage>
  );
};

export default UseQuiery;
