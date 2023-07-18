/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import CardNews from "../../components/cardNews/CardNews";
import useNewsUser from "../../hooks/useNewsUser";
import styles from "./myNewsScreen.module.css";

function MyNewsScreen() {
  const { newsUser } = useNewsUser();
  return (
    <>
      <h1>Mis noticias guardas</h1>
      <section className={styles.newsUserContainer}>
        {newsUser.map((news, key) => (
          <CardNews
            key={key}
            title={news.title}
            description={news.description}
            urlToImage={news.urlToImage}
            url={news.url}
            content={news.url}
            author={news.author}
            publishedAt={news.publishedAt}
            relevance={news.relevance.name}
            font_Type={news.font_type.name}
            tone={news.tone.name}
            format={news.format.name}
            feeling={news.feeling.name}
            lenguage={news.lenguage.name}
          />
        ))}
      </section>
    </>
  );
}

export default MyNewsScreen;
