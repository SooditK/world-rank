import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import Image from "next/image";

const Country = ({ country }) => {
  console.log(country);
  return (
    <Layout title={country[0].name}>
      <div>
        <div className={styles.overview_panel}>
          {country.flag}
          {console.log(country.flag)}
          <Image
            src={country[0].flag}
            alt={country[0].name}
            height={400}
            width={600}
            className={styles.overview_image}
          />
          <h1 className={styles.overview_name}>{country[0].name}</h1>
          <div className={styles.overview_region}>{country[0].region}</div>
          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>
                {country[0].population}
              </div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country[0].area}</div>
              <div className={styles.overview_area}>Area</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${params.id}`);
  const country = await res.json();
  return {
    props: {
      country,
    },
  };
};
