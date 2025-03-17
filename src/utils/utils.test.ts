import { describe, it, expect, vi } from "vitest";
import { getImageSrc, getUniqueMovies, formatDate, debounce } from "./utils";
import { Movie } from "../types";
import { BASE_URL, FILE_SIZE } from "../constants";

describe("getImageSrc", () => {
  it("should return correct image src", () => {
    const path = "/image.jpg";
    const result = getImageSrc(path);
    expect(result).toBe(`${BASE_URL}${FILE_SIZE}${path}`);
  });

  it("should handle null path", () => {
    const result = getImageSrc(null);
    expect(result).toBe(`${BASE_URL}${FILE_SIZE}null`);
  });
});

describe("getUniqueMovies", () => {
  it("should return unique movies sorted by rating", () => {
    const movies: Movie[] = [
      {
        id: 1,
        poster_path: "/path1.jpg",
        ratings: [{ rating: 5, id: "imdb" }],
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "en",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
      {
        id: 2,
        poster_path: "/path2.jpg",
        ratings: [{ rating: 4, id: "imdb" }],
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "en",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
      {
        id: 1,
        poster_path: "/path1.jpg",
        ratings: [{ rating: 5, id: "imdb" }],
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "en",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
    ];
    const result = getUniqueMovies(movies);
    expect(result).toEqual([
      {
        id: 1,
        poster_path: "/path1.jpg",
        ratings: [{ rating: 5, id: "imdb" }],
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "en",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
      {
        id: 2,
        poster_path: "/path2.jpg",
        ratings: [{ rating: 4, id: "imdb" }],
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        original_language: "en",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
    ]);
  });

  it("should filter out movies without poster_path", () => {
    const movies: Movie[] = [
      {
        id: 1,
        poster_path: null,
        ratings: [{ rating: 5, id: "imdb" }],
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: "",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
      {
        id: 2,
        poster_path: "/path2.jpg",
        ratings: [{ rating: 4, id: "imdb" }],
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: "",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
    ];
    const result = getUniqueMovies(movies);
    expect(result).toEqual([
      {
        id: 2,
        poster_path: "/path2.jpg",
        ratings: [{ rating: 4, id: "imdb" }],
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: "",
        original_title: "",
        overview: "",
        release_date: "",
        title: "",
        video: false,
      },
    ]);
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const dateString = "2023-10-05T00:00:00Z";
    const result = formatDate(dateString);
    expect(result).toBe("05.10.2023.");
  });
});

describe("debounce", () => {
  it("should debounce function calls", () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
