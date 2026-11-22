async function loadSiteData() {
  try {
    const response = await fetch("data/site.json");

    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych firmy.");
    }

    const data = await response.json();

    // Nagłówek i opis strony
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle && data.hero_title) {
      heroTitle.textContent = data.hero_title;
    }

    const heroDescription = document.querySelector(".hero .lead");
    if (heroDescription && data.hero_description) {
      heroDescription.textContent = data.hero_description;
    }

    // Opis firmy
    const about = document.querySelector(".intro-content p");
    if (about && data.about_text) {
      about.textContent = data.about_text;
    }

    // Rok założenia
    document.querySelectorAll(".years strong, .mark-caption b")
      .forEach(el => {
        if (data.year) el.textContent = data.year;
      });

    // Usługi
    const serviceGrid = document.getElementById("serviceGrid");

    if (serviceGrid && Array.isArray(data.services)) {
      serviceGrid.innerHTML = "";

      data.services.forEach((service, index) => {
        const article = document.createElement("article");
        article.className = "service";

        const number = document.createElement("span");
        number.className = "num";
        number.textContent =
          String(index + 1).padStart(2, "0") + " / USŁUGA";

        const title = document.createElement("h3");
        title.textContent = service.name || "";

        const description = document.createElement("p");
        description.textContent = service.description || "";

        article.append(number, title, description);

        if (service.price) {
          const price = document.createElement("span");
          price.className = "price";
          price.textContent = service.price;
          article.appendChild(price);
        }

        serviceGrid.appendChild(article);
      });
    }

    // Dane kontaktowe
    const contactCard = document.querySelector(".contact-card");

    if (contactCard) {
      const paragraphs = contactCard.querySelectorAll("p");

      if (paragraphs[0] && data.address) {
        paragraphs[0].textContent = "📍 " + data.address;
      }

      if (paragraphs[1]) {
        paragraphs[1].innerHTML = "";

        if (data.phone_joanna) {
          const link = document.createElement("a");
          link.href = "tel:" + data.phone_joanna.replace(/\s/g, "");
          link.textContent = "Joanna: " + data.phone_joanna;
          paragraphs[1].append("☎ ", link);
        }

        if (data.phone_michal) {
          const link = document.createElement("a");
          link.href = "tel:" + data.phone_michal.replace(/\s/g, "");
          link.textContent = "Michał: " + data.phone_michal;
          paragraphs[1].append(document.createElement("br"), "☎ ", link);
        }
      }

      if (paragraphs[2] && data.email) {
        paragraphs[2].innerHTML = "";

        const link = document.createElement("a");
        link.href = "mailto:" + data.email;
        link.textContent = data.email;
        paragraphs[2].append("✉ ", link);
      }

      if (paragraphs[3] && data.nip) {
        paragraphs[3].textContent = "NIP: " + data.nip;
      }
    }

    // Galeria realizacji
    const gallery = document.getElementById("gallery");

    if (gallery && Array.isArray(data.gallery) && data.gallery.length) {
      gallery.innerHTML = "";

      data.gallery.forEach(item => {
        const imagePath =
          typeof item.image === "string"
            ? item.image
            : item.image?.path || item.image?.url || "";

        if (!imagePath) return;

        const figure = document.createElement("figure");
        figure.className = "gallery-item";

        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = item.title || "Realizacja THANOS BC";

        figure.appendChild(img);

        if (item.title) {
          const caption = document.createElement("figcaption");
          caption.textContent = item.title;
          figure.appendChild(caption);
        }

        gallery.appendChild(figure);
      });
    }

    // Nazwa firmy
    const brand = document.querySelector(".contact-label");
    if (brand && data.company_name) {
      brand.textContent = data.company_name.toUpperCase();
    }

    // Rok w stopce
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

  } catch (error) {
    console.error("Błąd wczytywania danych THANOS:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSiteData);
