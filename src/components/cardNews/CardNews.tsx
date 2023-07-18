import { SaveOutlined } from "@ant-design/icons";
import styles from "./cardNews.module.css";
import { Popover, Tag } from "antd";
import useNewsUser from "../../hooks/useNewsUser";
import { Article } from "../../interfaces/newsResponse.interface";
type NewArticle = Omit<Article, "source">;
interface Props extends NewArticle {
  relevance?: string;
  font_Type?: string;
  tone?: string;
  format?: string;
  feeling?: string;
  lenguage?: string;
}

function CardNews({
  title,
  description,
  urlToImage,
  url,
  author,
  content,
  publishedAt,
  relevance,
  font_Type,
  tone,
  format,
  feeling,
  lenguage,
}: Props) {
  const { createNewsUser } = useNewsUser();

  const onClickSave = () => {
    void createNewsUser({
      title,
      description,
      url_image: urlToImage,
      url,
      author,
      content,
      publishedAt,
    });
  };

  return (
    <article className={styles.cardContainer}>
      <img
        src={urlToImage ?? "deafultImage.svg"}
        alt="imagen representativa de noticia"
        width={150}
        height={150}
        className={styles.cardImage}
      />
      <div className={styles.containerText}>
        <div className={styles.headerCard}>
          <a href={url} target="_blank">
            <h3>{title}</h3>
          </a>
          <span className={styles.actionsCard}>
            <Popover
              title={"guardar y analizar"}
              content={<p>guarda y analiza la noticia para verla mas tarde</p>}
            >
              <SaveOutlined onClick={onClickSave} />
            </Popover>
          </span>
        </div>
        <hr />
        <p>
          {description ? description : " Esta noticia no posee una descripción"}
        </p>
        <div className={styles.tags}>
          {relevance && <Tag>{relevance}</Tag>}
          {font_Type && <Tag>{font_Type}</Tag>}
          {tone && <Tag>{tone}</Tag>}
          {format && <Tag>{format}</Tag>}
          {feeling && <Tag>{feeling}</Tag>}
          {lenguage && <Tag>{lenguage}</Tag>}
        </div>
      </div>
    </article>
  );
}

export default CardNews;
