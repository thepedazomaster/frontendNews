import { FileUnknownOutlined } from "@ant-design/icons";
import CardNews from "../../components/cardNews/CardNews";
import useNewsTopHeadlines from "../../hooks/useNewsTopHeadlines";
import styles from "./topNewsScreen.module.css";
import { useMemo, useState } from "react";
import { Input, Select } from "antd";
import useCountriesNews from "../../hooks/useCountriesNews";
import useCategoriesNews from "../../hooks/useCategoriesNews";

function TopNewsScreen() {
  const { news, getNews } = useNewsTopHeadlines();
  const [textSearch, setTextSearch] = useState<string | null>(null);
  const { countriesNews } = useCountriesNews();
  const { categoriesNews } = useCategoriesNews();
  const [coutriesSearch, setCoutriesSearch] = useState<string | null>(null);
  const [categoriesSearch, setCategoriesSearch] = useState<string | null>(null);

  const searchItems = useMemo(
    () => ({
      country: coutriesSearch,
      category: categoriesSearch,
      q: textSearch,
    }),
    [categoriesSearch, coutriesSearch, textSearch]
  );

  const onChangeTextSearch: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTextSearch(e.target.value);
  };

  const onChangeCountry: (
    value: string,
    option:
      | {
          label: string;
          value: string;
        }
      | {
          label: string;
          value: string;
        }[]
  ) => void = (value) => {
    setCoutriesSearch(value);
  };

  const onChangeCategory: (
    value: string,
    option:
      | {
          label: string;
          value: string;
        }
      | {
          label: string;
          value: string;
        }[]
  ) => void = (value) => {
    setCategoriesSearch(value);
  };

  const handleSearch = () => {
    if (searchItems.q || searchItems.country || searchItems.category) {
      void getNews(searchItems);
    }
  };

  return (
    <>
      <h1>Principales titulares</h1>
      <section className={styles.newsContainer}>
        <h2>Buscador de noticias</h2>
        <div className={styles.searchContainer}>
          <Input
            className={styles.textInput}
            onChange={onChangeTextSearch}
            placeholder="Escribe una busqueda"
          />
          <Select
            placeholder="Seleccione un pais"
            options={countriesNews.map((country) => ({
              label: country.name,
              value: country.code,
            }))}
            onChange={onChangeCountry}
          />
          <Select
            placeholder="Seleccione una categoria"
            options={categoriesNews.map((category) => ({
              label: category.name,
              value: category.name,
            }))}
            onChange={onChangeCategory}
          />
          <button className={styles.buttonSearch} onClick={handleSearch}>
            Buscar
          </button>
        </div>

        {news.length === 0 ? (
          <FileUnknownOutlined height={200} width={200} />
        ) : (
          news.map((article, key) => (
            <CardNews
              key={key}
              title={article.title}
              description={article.description}
              imagePath={article.urlToImage}
              urlNews={article.url}
            />
          ))
        )}
      </section>
    </>
  );
}

export default TopNewsScreen;
