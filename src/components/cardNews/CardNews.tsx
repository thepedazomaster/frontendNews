import { SaveOutlined } from "@ant-design/icons";
import styles from "./cardNews.module.css";
import { Popover } from "antd";
interface Props {
  title: string;
  description: string | null;
  imagePath: string | null;
  urlNews: string;
}

function CardNews({ title, description, imagePath, urlNews }: Props) {
  return (
    <article className={styles.cardContainer}>
      <img
        src={imagePath ?? "deafultImage.svg"}
        alt="imagen representativa de noticia"
        width={150}
        height={150}
        className={styles.cardImage}
      />
      <div className={styles.containerText}>
        <div className={styles.headerCard}>
          <a href={urlNews} target="_blank">
            <h3>{title}</h3>
          </a>
          <span className={styles.actionsCard}>
            <Popover
              title={"guardar y analizar"}
              content={<p>guarda y analiza la noticia para verla mas tarde</p>}
            >
              <SaveOutlined />
            </Popover>
          </span>
        </div>
        <hr />
        <p>
          {description ? description : " Esta noticia no posee una descripción"}
        </p>
      </div>
    </article>
  );
}

export default CardNews;
