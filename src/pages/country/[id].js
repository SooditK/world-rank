import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };
  useEffect(() => {
    return () => {
      getBorders();
    };
  }, []);
  // console.log(borders);
  // console.log(country);
  return (
    <Layout title={country[0].name}>
      <div>
        <div className={styles.overview_panel}>
          {/* {country[0].flag} */}
          {/* {console.log(country.flag)} */}
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
        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>
              {country[0].capital}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Sub Region</div>
            <div className={styles.details_panel_value}>
              {country[0].subregion}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Language</div>
            <div className={styles.details_panel_value}>
              {country[0].languages.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Currency</div>
            <div className={styles.details_panel_value}>
              {country[0].currencies.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Native Name</div>
            <div className={styles.details_panel_value}>
              {country[0].nativeName}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Gini</div>
            <div className={styles.details_panel_value}>{country[0].gini}%</div>
          </div>
        </div>

        <div className={styles.details_panel_borders}>
          {borders.map(({ flag, name }) => (
            <div key={name} className={styles.details_panel_borders_country}>
              <Image src={flag} alt={name} height={100} width={200} />
              <div className={styles.details_panel_borders_name}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
