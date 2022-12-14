import React from "react";
import { Outlet } from "react-router-dom";
import PreviewMesagge from "../PreviewMesagge";
import styles from "./index.module.css";

function Chats() {
  return (
    <main className={styles.page_Chats}>
      <div className={styles.sections_Preview_Page}>
        <PreviewMesagge title={"Messages"} messages={messagess} />
        <PreviewMesagge title={"Matchs"} messages={messagessGroup} />
      </div>
      <Outlet />
    </main>
  );
}
const messagess = [
  {
    id: 1,
    image: [
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",
    ],
    message: "poquito",
    time: "8:25",
    name: "Facundo Martinez",
  },
  {
    id: 3,
    image: [
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
    ],
    message: "poquito",
    time: "8:25",
    name: "Andres Aldao",
  },
  {
    id: 4,
    image: [
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
    ],
    message: "poquito",
    time: "8:30",
    name: "Luiz Lazarte",
  },
  {
    id: 5,
    image: [
      "https://gamer-commerce.vercel.app/static/media/RogerPf.d7086f5b.jpeg",
    ],
    time: "8:30",
    message: "poquito",
    name: "Roger Perez",
  },
  {
    id: 6,
    image: [
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
    ],
    message: "poquito",
    name: "Nacho",
  },
];

const messagessGroup = [
  {
    id: 1,
    image:
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Programadores",
  },
  {
    id: 2,
    image:
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",

    time: "8:30",
    message: "Reunion de trabajo",
    name: "Grupo Office",
  },
  {
    id: 3,
    image:
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",

    time: "8:30",
    message: "poquito",
    name: "Argentinos",
  },
  {
    id: 4,
    image:
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Viajes",
  },
  {
    id: 5,
    image:
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Trabajadores",
  },
  {
    id: 6,
    image:
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Diego",
  },
  {
    id: 7,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",

    message: "poquito",
    time: "8:30",
    name: "Diego",
  },
];

export default Chats;
