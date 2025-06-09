const sampleData = [
  "/fjTU1Bgh3KJu4aatZil3sofR2zC.jpg",
  "/gLhHHZUzeseRXShoDyC4VqLgsNv.jpg",
  "/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
  "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
  "/b4OaXw2MW97VvIiZE0Sbn1NfxSh.jpg",
  "/4LdpBXiCyGKkR8FGHgjKlphrfUc.jpg",
  "/oOleziEempUPu96jkGs0Pj6tKxj.jpg",
  "/aHTUpo45qy9QYIOnVITGGqLoVcA.jpg",
  "/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg",
  "/d5SatGKWi0VpO9QX0Z74zLh9i91.jpg",
  "/lMrxYKKhd4lqRzwUHAy5gcx9PSO.jpg",
  "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
  "/iujbETnK8hvNcgkNwzS7Nv4Thqc.jpg",
];

const DemoPage = () => {
  return (
    <div className="demo-page-container">
      {sampleData.map((movie) => (
        <img src={`https://image.tmdb.org/t/p/w500${movie}`} alt="poster" />
      ))}
    </div>
  );
};

export default DemoPage;
