(() => {
  const PEOPLE = [
    {
      id: "cedric-frere",
      name: "Cedric Frère",
      title: "Administrateur Trésorier",
    },
    {
      id: "charlotte-friling",
      name: "Charlotte Friling",
      title: "Présidente du Conseil d’Administration",
    },
    {
      id: "william-frere",
      name: "William Frère",
      title: "Administrateur",
    },
    {
      id: "margaret-frere",
      name: "Margaret Frère",
      title: "Administrateur",
    },
    {
      id: "victor-delloye",
      name: "Victor Delloye",
      title: "Administrateur Délégué",
    },
    {
      id: "christelle-bonnenge",
      name: "Christelle Bonnenge",
      title: "Secrétariat",
    },
    {
      id: "patrick-de-coster",
      name: "Patrick De Coster",
      title: "Administrateur",
    },
    {
      id: "philippe-bossard",
      name: "Philippe Bossard",
      title: "Administrateur",
    },
    {
      id: "segolene-gallienne",
      name: "Ségolène Gallienne",
      title: "Vice-présidente du Conseil d’Administration",
    },
  ];

  const LOGO_NATURAL_WIDTH = 4000;
  const LOGO_NATURAL_HEIGHT = 957;

  const selectEl = document.getElementById("person-select");
  const previewEl = document.getElementById("signature-preview");
  const copyBtn = document.getElementById("copy-btn");
  const selectBtn = document.getElementById("select-btn");
  const statusEl = document.getElementById("copy-status");

  const tuneFontSize = document.getElementById("tune-font-size");
  const tuneNameTitleGap = document.getElementById("tune-name-title-gap");
  const tuneTextLogoGap = document.getElementById("tune-text-logo-gap");
  const tuneLogoWidth = document.getElementById("tune-logo-width");

  const tuneFontSizeValue = document.getElementById("tune-font-size-value");
  const tuneNameTitleGapValue = document.getElementById(
    "tune-name-title-gap-value"
  );
  const tuneTextLogoGapValue = document.getElementById(
    "tune-text-logo-gap-value"
  );
  const tuneLogoWidthValue = document.getElementById("tune-logo-width-value");

  let currentPerson = null;

  function logoUrl() {
    return new URL("assets/fondation-logo.png", window.location.href).href;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getSettings() {
    const fontSize = Number(tuneFontSize.value);
    const nameTitleGap = Number(tuneNameTitleGap.value);
    const textToLogoGap = Number(tuneTextLogoGap.value);
    const logoWidth = Number(tuneLogoWidth.value);
    const logoHeight = Math.round(
      (logoWidth * LOGO_NATURAL_HEIGHT) / LOGO_NATURAL_WIDTH
    );
    const lineHeight = fontSize + 3;

    return {
      fontSize,
      lineHeight,
      nameTitleGap,
      textToLogoGap,
      logoWidth,
      logoHeight,
    };
  }

  function syncTunerOutputs() {
    const settings = getSettings();
    tuneFontSizeValue.textContent = String(settings.fontSize);
    tuneNameTitleGapValue.textContent = String(settings.nameTitleGap);
    tuneTextLogoGapValue.textContent = String(settings.textToLogoGap);
    tuneLogoWidthValue.textContent = String(settings.logoWidth);
  }

  /**
   * Table-based HTML signature for Apple Mail / Outlook / Gmail.
   * Absolute image URL so pasted signatures keep loading the logo from GitHub Pages.
   */
  function buildSignatureHtml(person) {
    const name = escapeHtml(person.name);
    const title = escapeHtml(person.title);
    const src = escapeHtml(logoUrl());
    const {
      fontSize,
      lineHeight,
      nameTitleGap,
      textToLogoGap,
      logoWidth,
      logoHeight,
    } = getSettings();

    return [
      "<!-- Fondation Charles-Albert Frère — signature e-mail -->",
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;">',
      "  <tr>",
      `    <td align="left" style="padding:0;margin:0;font-family:Helvetica,Arial,sans-serif;font-size:${fontSize}px;line-height:${lineHeight}px;font-weight:bold;color:#000000;">`,
      `      ${name}`,
      "    </td>",
      "  </tr>",
      "  <tr>",
      `    <td align="left" style="padding:${nameTitleGap}px 0 0 0;margin:0;font-family:Helvetica,Arial,sans-serif;font-size:${fontSize}px;line-height:${lineHeight}px;font-style:italic;font-weight:normal;color:#000000;">`,
      `      ${title}`,
      "    </td>",
      "  </tr>",
      "  <tr>",
      `    <td align="left" style="padding:0;margin:0;font-size:0;line-height:0;height:${textToLogoGap}px;">&nbsp;</td>`,
      "  </tr>",
      "  <tr>",
      '    <td align="left" style="padding:0;margin:0;">',
      `      <img src="${src}" width="${logoWidth}" height="${logoHeight}" alt="Fondation Charles-Albert Frère — Rue de la Blanche Borne 12, 6280 Gerpinnes, Belgique" style="display:block;border:0;outline:none;text-decoration:none;width:${logoWidth}px;max-width:100%;height:auto;background-color:#ffffff;" />`,
      "    </td>",
      "  </tr>",
      "</table>",
    ].join("");
  }

  function populateSelect() {
    const sorted = [...PEOPLE].sort((a, b) =>
      a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
    );

    for (const person of sorted) {
      const option = document.createElement("option");
      option.value = person.id;
      option.textContent = `${person.name} — ${person.title}`;
      selectEl.appendChild(option);
    }
  }

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.toggle("status--error", isError);
  }

  function renderPreview(person) {
    currentPerson = person;

    if (!person) {
      previewEl.classList.add("signature-preview--empty");
      previewEl.innerHTML =
        '<p class="signature-preview__placeholder">Sélectionnez votre nom pour afficher votre signature.</p>';
      copyBtn.disabled = true;
      selectBtn.disabled = true;
      setStatus("");
      return;
    }

    previewEl.classList.remove("signature-preview--empty");
    previewEl.innerHTML = buildSignatureHtml(person);
    copyBtn.disabled = false;
    selectBtn.disabled = false;
    setStatus("");
  }

  function selectPreviewContents() {
    const range = document.createRange();
    range.selectNodeContents(previewEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    previewEl.focus({ preventScroll: true });
  }

  async function copySignature() {
    if (!currentPerson) return;

    const html = buildSignatureHtml(currentPerson);
    const plain = `${currentPerson.name}\n${currentPerson.title}\n\nFondation Charles-Albert Frère\nRue de la Blanche Borne 12, 6280 Gerpinnes, Belgique`;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
        setStatus(
          "Signature copiée. Vous pouvez maintenant la coller dans votre client e-mail."
        );
        return;
      }
    } catch (_) {
      // Fall through to legacy path.
    }

    try {
      selectPreviewContents();
      const ok = document.execCommand("copy");
      if (!ok) throw new Error("execCommand failed");
      setStatus(
        "Signature copiée. Vous pouvez maintenant la coller dans votre client e-mail."
      );
    } catch (_) {
      selectPreviewContents();
      setStatus(
        "La copie automatique n’a pas fonctionné. Utilisez Ctrl+C (ou ⌘+C) après sélection.",
        true
      );
    }
  }

  selectEl.addEventListener("change", () => {
    const person = PEOPLE.find((p) => p.id === selectEl.value) || null;
    renderPreview(person);

    if (person) {
      const url = new URL(window.location.href);
      url.searchParams.set("person", person.id);
      window.history.replaceState({}, "", url);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("person");
      window.history.replaceState({}, "", url);
    }
  });

  copyBtn.addEventListener("click", () => {
    copySignature();
  });

  selectBtn.addEventListener("click", () => {
    if (!currentPerson) return;
    selectPreviewContents();
    setStatus("Aperçu sélectionné. Appuyez sur Ctrl+C (ou ⌘+C) pour copier.");
  });

  for (const input of [
    tuneFontSize,
    tuneNameTitleGap,
    tuneTextLogoGap,
    tuneLogoWidth,
  ]) {
    input.addEventListener("input", () => {
      syncTunerOutputs();
      if (currentPerson) renderPreview(currentPerson);
    });
  }

  populateSelect();
  syncTunerOutputs();

  const initialId = new URLSearchParams(window.location.search).get("person");
  if (initialId && PEOPLE.some((p) => p.id === initialId)) {
    selectEl.value = initialId;
    renderPreview(PEOPLE.find((p) => p.id === initialId));
  } else {
    renderPreview(null);
  }
})();
