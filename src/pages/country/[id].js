const Country = ({ country }) => {
  console.log(country);
  return (
    <>
      <div>Country</div>
    </>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/name/${params.name}`
  );
  const country = await res.json();
  return {
    props: {
      country,
    },
  };
};
