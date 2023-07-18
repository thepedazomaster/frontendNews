import { DatePicker, DatePickerProps, Input, Select } from "antd";
import CardNews from "../../components/cardNews/CardNews";
import useNewsEverithing from "../../hooks/useNewsEverything";
import useLenguageNews from "../../hooks/useLenguageNews";
import { useMemo, useState } from "react";
import styles from "./everythingNewsScreen.module.css";

function EverythingNewsScreen() {
  const { newsEverything, getNewsEverything } = useNewsEverithing();
  const { lenguagesNews } = useLenguageNews();

  const [lenguageSearch, setLenguageSearch] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [textSearch, setTextSearch] = useState<string | null>(null);

  const onChangeTextSearch: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTextSearch(e.target.value);
  };

  const onChangeLenguage: (
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
    setLenguageSearch(value);
  };

  const onChangeDateFrom: DatePickerProps["onChange"] = (_date, dateString) => {
    setDateFrom(dateString);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (_date, dateString) => {
    setDateTo(dateString);
  };

  const handleSearch = () => {
    if (
      (searchItems.q && searchItems.lenguage) ||
      (searchItems.from && searchItems.to)
    ) {
      void getNewsEverything(searchItems);
    }
  };

  const searchItems = useMemo(
    () => ({
      lenguage: lenguageSearch,
      from: dateFrom,
      to: dateTo,
      q: textSearch,
    }),
    [dateFrom, dateTo, lenguageSearch, textSearch]
  );

  return (
    <>
      <h1>Cualquier titular</h1>
      <section className={styles.newsContainer}>
        <h2>Buscador de noticias</h2>
        <div className={styles.searchContainer}>
          <Input
            className={styles.textInput}
            onChange={onChangeTextSearch}
            placeholder="Escribe una busqueda"
          />
          <Select
            placeholder="Seleccione un lenguaje"
            options={lenguagesNews.map((lenguage) => ({
              label: lenguage.name,
              value: lenguage.code,
            }))}
            onChange={onChangeLenguage}
          />
          <DatePicker placeholder="Desde" onChange={onChangeDateFrom} />
          <DatePicker placeholder="Hasta" onChange={onChangeDateTo} />
          <button className={styles.buttonSearch} onClick={handleSearch}>
            Buscar
          </button>
        </div>
        {newsEverything.map((article, key) => (
          <CardNews
            key={key}
            title={article.title}
            description={article.description}
            imagePath={article.urlToImage}
            urlNews={article.url}
          />
        ))}
      </section>
    </>
  );
}

export default EverythingNewsScreen;
