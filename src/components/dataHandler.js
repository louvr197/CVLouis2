export function createAndAppendElement(parent, tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  parent.appendChild(el);
}

export function renderDataToDOM(data) {
  const container = document.getElementById('cv');

  const section = (title) => {
    const sec = document.createElement('section');
    createAndAppendElement(sec, 'h2', title);
    return sec;
  };

  // --- Infos personnelles ---
  const personal = data.personal_info;
  const personalSection = section("Informations personnelles");
  createAndAppendElement(personalSection, "p", `Nom : ${personal.name}`);
  createAndAppendElement(personalSection, "p", `Date de naissance : ${personal.birth_date}`);
  createAndAppendElement(personalSection, "p", `Adresse : ${personal.address.street}, ${personal.address.postal_code} ${personal.address.city}, ${personal.address.country}`);
  createAndAppendElement(personalSection, "p", `Téléphone : ${personal.phone}`);
  createAndAppendElement(personalSection, "p", `Email : ${personal.email}`);
  container.appendChild(personalSection);

  // --- Expériences professionnelles ---
  const expSection = section("Expériences professionnelles");
  data.experiences.professional.forEach(exp => {
    createAndAppendElement(expSection, "p", `${exp.title} chez ${exp.company} (${exp.start_date})`);
  });
  container.appendChild(expSection);

  // --- Stages et jobs étudiants ---
  const jobsSection = section("Stages et jobs étudiants");
  data.experiences.internships_and_student_jobs.forEach(job => {
    const text = job.start_date
      ? `${job.title} (${job.start_date} - ${job.end_date || "présent"})`
      : `${job.title} (${job.occurrences.map(o => o.year).join(", ")})`;
    createAndAppendElement(jobsSection, "p", text);
  });
  container.appendChild(jobsSection);

  // --- Éducation ---
  const eduSection = section("Formation");
  data.education.forEach(edu => {
    let text = `${edu.degree} à ${edu.institution} (${edu.years})`;
    if (edu.ects) text += ` - ${edu.ects} ECTS`;
    createAndAppendElement(eduSection, "p", text);
  });
  container.appendChild(eduSection);

  // --- Compétences ---
  const skillsSection = section("Compétences");
  data.skills.languages.forEach(lang => {
    createAndAppendElement(skillsSection, "p", `${lang.language} : ${lang.level}`);
  });

  createAndAppendElement(skillsSection, "h3", "Certifications");
  data.skills.certifications.forEach(cert => {
    createAndAppendElement(skillsSection, "p", `${cert.title} - ${cert.organization}`);
  });

  container.appendChild(skillsSection);
}
