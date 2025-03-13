import fs from "fs";

const data = JSON.parse(fs.readFileSync("./moviesFixture.json", "utf8"));

const movieMap = new Map();
const duplicates = [];

data.forEach((movie) => {
  const key = `${movie.title}-${movie.release_date}`;
  if (movieMap.has(key)) {
    duplicates.push(movie);
  } else {
    movieMap.set(key, movie);
  }
});

if (duplicates.length > 0) {
  console.log("Duplicate movies found:");
  duplicates.forEach((duplicate) => {
    console.log(
      `Title: ${duplicate.title}, Release Date: ${duplicate.release_date}`
    );
  });
} else {
  console.log("No duplicate movies found.");
}
