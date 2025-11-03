import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTracks = defineStore("tracks", () => {
  const tracks = ref([]);

  const searchQuery = ref("");
  const activeFilter = ref(null);
  const selectedAuthor = ref("");
  const selectedYear = ref("");
  const selectedGenre = ref("");
  const sortBy = ref("name");
  const sortOrder = ref("asc");

  const displayedTracks = computed(() => {
    return filteredTracks.value;
  });

  const filteredTracks = computed(() => {
    let filtered = [...tracks.value];

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (track) =>
          track.name?.toLowerCase().includes(query) ||
          track.author?.toLowerCase().includes(query) ||
          track.album?.toLowerCase().includes(query)
      );
    }

    if (selectedAuthor.value) {
      filtered = filtered.filter(
        (track) => track.author === selectedAuthor.value
      );
    }

    if (selectedYear.value) {
      filtered = filtered.filter((track) => {
        if (selectedYear.value === "Неизвестно") return !track.release_date;

        if (track.release_date) {
          const date = new Date(track.release_date.split("<")[0]);
          if (!isNaN(date.getTime())) {
            return date.getFullYear().toString() === selectedYear.value;
          }
        }
        return false;
      });
    }

    if (selectedGenre.value) {
      filtered = filtered.filter((track) => {
        if (Array.isArray(track.genre)) {
          return track.genre.some(
            (g) => g?.toLowerCase().trim() === selectedGenre.value.toLowerCase()
          );
        }
        return (
          track.genre?.toLowerCase().trim() ===
          selectedGenre.value.toLowerCase()
        );
      });
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy.value) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "author":
          aValue = a.author || "";
          bValue = b.author || "";
          break;
        case "release_date":
          aValue = a.release_date
            ? new Date(a.release_date.split("<")[0])
            : new Date(0);
          bValue = b.release_date
            ? new Date(b.release_date.split("<")[0])
            : new Date(0);
          break;
        case "duration":
          aValue = a.duration_in_seconds || 0;
          bValue = b.duration_in_seconds || 0;
          break;
        default:
          aValue = a.name || "";
          bValue = b.name || "";
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder.value === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  });

  const authorItems = computed(() => {
    const items = new Set();
    tracks.value.forEach((track) => {
      if (track.author) items.add(track.author);
    });
    return Array.from(items).sort((a, b) => a.localeCompare(b));
  });

  const yearItems = computed(() => {
    const items = new Set();
    tracks.value.forEach((track) => {
      let year = "Неизвестно";
      if (track.release_date) {
        const date = new Date(track.release_date.split("<")[0]);
        if (!isNaN(date.getTime())) {
          year = date.getFullYear().toString();
        }
      }
      items.add(year);
    });
    return Array.from(items).sort((a, b) => b.localeCompare(a));
  });

  const genreItems = computed(() => {
    const items = new Set();
    tracks.value.forEach((track) => {
      if (Array.isArray(track.genre)) {
        track.genre.forEach((g) => g && items.add(g.toLowerCase().trim()));
      } else if (track.genre) {
        items.add(track.genre.toLowerCase().trim());
      }
    });
    return Array.from(items).sort((a, b) => a.localeCompare(b));
  });

  const setTracks = (newTracks) => {
    tracks.value = newTracks;
  };

  const setSearchQuery = (query) => (searchQuery.value = query);
  const setActiveFilter = (filter) =>
    (activeFilter.value = activeFilter.value === filter ? null : filter);
  const setSelectedAuthor = (author) => {
    selectedAuthor.value = author === selectedAuthor.value ? "" : author;
    activeFilter.value = null;
  };
  const setSelectedYear = (year) => {
    selectedYear.value = year === selectedYear.value ? "" : year;
    activeFilter.value = null;
  };
  const setSelectedGenre = (genre) => {
    selectedGenre.value = genre === selectedGenre.value ? "" : genre;
    activeFilter.value = null;
  };
  const setSort = (field, order = "asc") => {
    sortBy.value = field;
    sortOrder.value = order;
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    tracks,
    searchQuery,
    activeFilter,
    selectedAuthor,
    selectedYear,
    selectedGenre,
    sortBy,
    sortOrder,

    filteredTracks,
    displayedTracks,
    authorItems,
    yearItems,
    genreItems,

    setTracks,
    setSearchQuery,
    setActiveFilter,
    setSelectedAuthor,
    setSelectedYear,
    setSelectedGenre,
    setSort,
    formatDuration,
  };
});
