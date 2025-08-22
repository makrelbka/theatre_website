document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/json/artists.json")
    .then(res => res.json())
    .then(data => {

      for (const groupName in data) {
        let targetId;
        if (groupName === "Младшая группа") targetId = "junior-carousel";
        if (groupName === "Средняя группа") targetId = "middle-carousel";
        if (groupName === "Старшая группа") targetId = "senior-carousel";
        console.log(`Группа: ${groupName}, Целевой ID: ${targetId}`);
        const carousel = document.getElementById(targetId);

        data[groupName].forEach(artist => {
          const artistDiv = document.createElement("div");
          artistDiv.classList.add("artist");

          const img = document.createElement("img");
          img.src = artist.photo;
          img.alt = `Фото ${artist.name}`;
          artistDiv.appendChild(img);

          const name = document.createElement("h3");
          name.textContent = artist.name;
          artistDiv.appendChild(name);

          artist.plays.forEach(play => {
            const h4 = document.createElement("h4");
            h4.textContent = `«${play}»`;
            artistDiv.appendChild(h4);
          });

          carousel.appendChild(artistDiv);
        });
      }
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));
});
