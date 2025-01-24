import Image from "next/image";
import styles from "./page.module.css";
import Landing from "./landing";

export default function Home() {
  return (
    <div className="main">
      <Landing />
    </div>
  );
}
