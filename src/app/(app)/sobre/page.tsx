import Image from "next/image";
import styles from "./about.module.css";
import bannerUrl from "./banner-about.png";
import devImg from "./img-dev.png";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Image
        className={styles.banner}
        src={bannerUrl}
        alt="Banner tecnológico verde da CodeConnect"
        priority
      />
      <section className={styles.hero}>
        <h1>Bem-vindo ao CodeConnect!</h1>
        <h2>Onde a comunidade e o código se unem!</h2>
      </section>
      <p className={styles.text}>
        No coração da revolução digital está a colaboração. CodeConnect nasceu
        para criar um espaço onde pessoas desenvolvedoras e entusiastas de
        tecnologia podem se conectar, aprender e colaborar.
      </p>
      <section className={styles.mission}>
        <div>
          <h3>Nossa missão</h3>
          <p className={styles.text}>
            Fornecer uma plataforma em que mentes criativas compartilhem
            conhecimento e desenvolvam projetos extraordinários,
            independentemente do nível de experiência.
          </p>
        </div>
        <Image
          src={devImg}
          alt="Pessoa programando em ambiente tecnológico verde"
        />
      </section>
      <section className={styles.join}>
        <h3>Junte-se a nós!</h3>
        <p className={styles.text}>
          Descubra o poder da colaboração no mundo do código e compartilhe
          aquilo que está construindo.
        </p>
      </section>
      <footer className={styles.footer}>
        <span>∞</span>
        <p>
          Juntos, vamos transformar ideias em inovações e moldar o futuro
          digital.
        </p>
      </footer>
    </main>
  );
}
