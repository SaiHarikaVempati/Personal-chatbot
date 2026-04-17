const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const COUNTER_FILE = 'visitors.json';

app.use(express.json());
app.use(express.static('public'));

function getVisitorCount() {
  if (!fs.existsSync(COUNTER_FILE)) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
  }
  const data = fs.readFileSync(COUNTER_FILE);
  return JSON.parse(data).count;
}

function incrementVisitor() {
  const count = getVisitorCount() + 1;
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
  return count;
}

app.get('/visit', (req, res) => {
  const count = incrementVisitor();
  res.json({ count });
});

app.get('/visitors', (req, res) => {
  res.json({ count: getVisitorCount() });
});

const responses = {
  // Greetings
  "hello": "Hi there! I'm Harika's personal assistant. Ask me about her skills, experience, education, projects, or contact info!",
  "hi": "Hello! How can I help you today? Ask me about Harika's background, projects, or skills!",
  "hey": "Hey! Ask me anything about Harika.",
  "good morning": "Good morning! How can I assist you today?",
  "good afternoon": "Good afternoon! What would you like to know about Harika?",
  "good evening": "Good evening! Feel free to ask me about Harika's background.",
  // Summary
  "summary": "Harika is a results-driven Full Stack & Frontend Software Engineer with 2.5+ years of enterprise-scale experience at Infosys (Client: Intel). She delivered a 30% reduction in release errors, 100% pre-merge vulnerability detection, and zero post-release regressions across applications serving 10,000+ internal users.",
  "about harika": "Harika is a Full Stack & Frontend Engineer specializing in CI/CD, DevOps, and AI/ML Integration. She has 2.5+ years at Infosys working with Intel, and is currently pursuing her Master's in Information Technology at FSU with a 3.97 GPA.",
  "who is harika": "Sai Harika Vempati is a Full Stack & Frontend Software Engineer and Master's student at Florida State University with a 3.97 GPA and 2.5+ years of enterprise experience at Infosys (Client: Intel).",
  "tell me about yourself": "I'm Harika's chatbot assistant! Harika is a Full Stack Engineer with expertise in React, Python, JavaScript, Jenkins CI/CD, and AI/ML integration. She studied at FSU and worked at Infosys with Intel as her client.",
  "about": "This chatbot portfolio belongs to Sai Harika Vempati — a Full Stack Engineer, FSU Master's student, and former Systems Engineer at Infosys.",
  // Skills
  "skills": "Harika's skills include: Languages (Python, JavaScript ES6+, Java, C#, SQL), Frontend (React, HTML5, CSS3, Figma), CI/CD & DevOps (Jenkins, Docker, GitHub Actions, JFrog Artifactory), AI/ML (LLM Integration, Prompt Engineering, RAG, NLP), Security (SAST/SCA, NIST Framework, Synopsys Coverity, Black Duck), and Databases (MySQL, Oracle, MongoDB, Power BI).",
  "technical skills": "Technical skills: Python, JavaScript, Java, C#, SQL, React, HTML5, CSS3, Jenkins, Docker, GitHub Actions, OpenAI/Anthropic APIs, NLP, MySQL, Oracle, MongoDB, Power BI, Jira, ServiceNow.",
  "programming languages": "Harika is proficient in Python, JavaScript (ES6+), Java, C#, and SQL.",
  "frontend": "Harika's frontend skills include React, HTML5, CSS3, Responsive Design, and Figma — she translates design systems into pixel-perfect production components.",
  "devops": "Harika has strong DevOps skills including Jenkins CI/CD pipelines, JFrog Artifactory, Docker, and GitHub Actions.",
  "ci/cd": "Harika architected and maintained Jenkins CI/CD pipelines and JFrog Artifactory versioning across 5+ concurrent release branches, slashing release error rates by 30%.",
  "cicd": "Harika architected and maintained Jenkins CI/CD pipelines and JFrog Artifactory versioning across 5+ concurrent release branches, slashing release error rates by 30%.",
  "artificial intelligence": "Harika bridges frontend engineering and AI/ML by integrating LLM-powered features using OpenAI and Anthropic APIs, prompt engineering, RAG pipelines, and AI-assisted code review tooling into production workflows.",
  "machine learning": "Harika's AI/ML expertise includes Prompt Engineering, LLM Integration (OpenAI/Anthropic APIs), NLP pipelines, Salesforce Einstein AI, and Retrieval-Augmented Generation (RAG).",
  "security": "Harika implemented automated SAST/SCA scanning using Synopsys Coverity, Black Duck, and Protex — eliminating 100% of critical security vulnerabilities pre-merge. She is also experienced with the NIST Cybersecurity Framework.",
  // Experience
  "experience": "Harika worked as a Systems Engineer at Infosys (Client: Intel) from February 2022 to July 2024 in Hyderabad, India. She engineered production frontend components for 10,000+ users, implemented CI/CD pipelines, and integrated AI-assisted code review tooling.",
  "work experience": "At Infosys (Client: Intel), Harika: built frontend components serving 10,000+ users, eliminated 100% of critical security vulnerabilities pre-merge, slashed release errors by 30%, resolved 70-90 tickets/day, and mentored 3-4 junior engineers.",
  "infosys": "Harika worked at Infosys as a Systems Engineer with Intel as her client from Feb 2022 to Jul 2024. Key achievements: 30% reduction in release errors, 100% pre-merge vulnerability detection, zero post-release regressions, and 25% faster onboarding for new hires.",
  "intel": "Harika's client at Infosys was Intel. She built enterprise-scale applications serving 10,000+ internal users and integrated security scanning and CI/CD pipelines for Intel's internal teams.",
  "achievements": "Key achievements at Infosys: 30% reduction in release errors, 100% pre-merge vulnerability detection, zero post-release regressions, 15% reduction in support tickets, resolved 70-90 tickets/day above-target CSAT, and reduced onboarding ramp-up by 25%.",
  "job": "Harika's most recent role was Systems Engineer at Infosys (Client: Intel) from Feb 2022 to Jul 2024, where she worked on full-stack development, CI/CD, security compliance, and AI integration.",
  // Education
  "education": "Harika is pursuing a Master's in Information Technology at Florida State University (GPA: 3.97/4), expected May 2026. Her coursework includes Advanced Data Science, Natural Language Processing, and Information Architecture.",
  "masters": "Harika is pursuing her Master's in Information Technology at FSU with a stellar 3.97/4.0 GPA, graduating May 2026.",
  "gpa": "Harika has a 3.97/4.0 GPA in her Master's program at Florida State University — outstanding!",
  "fsu": "Harika attends Florida State University in Tallahassee, FL, pursuing her Master's in Information Technology (Aug 2024 – May 2026).",
  "university": "Florida State University, Tallahassee, FL — Go Noles! 🍢 Harika is completing her Master's in IT there with a 3.97 GPA.",
  "coursework": "Harika's graduate coursework at FSU includes Advanced Data Science, Natural Language Processing, and Information Architecture.",
  "degree": "Harika is pursuing a Master's in Information Technology at Florida State University, expected to graduate May 2026.",
  "major": "Harika's major is Information Technology (Master's level) at Florida State University.",
  // Projects
  "projects": "Harika's key projects include: (1) This Personal Chatbot Website hosted on Linux/Ubuntu, (2) COVID-19 Test Booking Platform (Python, MySQL, Flask), and (3) Live Weather Dashboard (HTML, CSS, JavaScript, REST API, GitHub Actions).",
  "covid": "Harika built a COVID-19 Test Booking Platform as Project Lead using Python, MySQL, and Flask. It featured multi-role access (admin, patient, lab), zero data leakage between roles, NLP-based form validation, and was validated through 3 stakeholder iteration cycles.",
  "weather": "Harika built a Live Weather Dashboard using HTML, CSS, JavaScript, REST API, and GitHub Actions. It achieved sub-2s load time, browser geolocation, multi-city search, dynamic °F/°C toggling, and was deployed via automated GitHub Actions pipelines.",
  "chatbot project": "This chatbot website is one of Harika's projects — built with Node.js, Express, and hosted on Ubuntu Linux inside a UTM virtual machine, demonstrating full-stack development and Linux server management skills.",
  "what are harika's projects": "Harika's projects: (1) Personal Chatbot Website on Linux, (2) COVID-19 Test Booking Platform (Python/Flask/MySQL), (3) Live Weather Dashboard (JS/REST API/GitHub Actions).",
  // Contact
  "contact": "You can reach Harika at: Email: saiharikachowdary00@gmail.com | Phone: +1 (850)-284-4898 | LinkedIn: search Sai Harika Vempati | GitHub: search Sai Harika Vempati",
  "email": "Harika's email is saiharikachowdary00@gmail.com",
  "phone": "Harika's phone number is +1 (850)-284-4898.",
  "linkedin": "Connect with Harika on LinkedIn — search for Sai Harika Vempati!",
  "github": "Check out Harika's GitHub — search for Sai Harika Vempati to find her repositories!",
  "portfolio": "Harika has a portfolio website — you can find the link on her LinkedIn or GitHub profile!",
  // Misc
  "name": "Her full name is Sai Harika Vempati.",
  "location": "Harika is currently based in Tallahassee, FL, attending Florida State University.",
  "help": "You can ask me about: skills, experience, education, projects, contact, achievements, or specific topics like 'AI skills', 'DevOps', 'Infosys', 'FSU', or 'COVID project'.",
  "what can i ask": "Try asking: skills, experience, education, projects, contact, GPA, Infosys, AI, DevOps, or specific project names!",
  "hire": "Harika is a strong candidate — 2.5+ years enterprise experience, FSU Master's student with 3.97 GPA, skilled in Full Stack, CI/CD, and AI/ML. Reach her at saiharikachowdary00@gmail.com!",
  "bye": "Goodbye! Thanks for visiting Harika's chatbot portfolio. 👋",
  "goodbye": "See you later! Feel free to come back anytime.",
  "thank you": "You're welcome! Is there anything else you'd like to know about Harika?",
  "thanks": "Happy to help! Let me know if you have more questions.",
};

function getResponse(userMessage) {
  // Normalize input: lowercase, trim, and collapse extra spaces
  const msg = userMessage.toLowerCase().trim().replace(/\s+/g, ' ');

  if (msg.includes('visitor') || msg.includes('how many people')) {
    const count = getVisitorCount();
    return `This chatbot has been visited ${count} time${count !== 1 ? 's' : ''} so far! 👥`;
  }

  // Sort keys by length (longest first) so specific keys match before short/generic ones
  const sortedKeys = Object.keys(responses).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    // Escape special regex characters in the key
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Use word boundaries to avoid partial word matches (e.g. "hi" inside "this")
    const regex = new RegExp(`\\b${escapedKey}\\b`);
    if (regex.test(msg)) return responses[key];
  }

  return "I'm not sure about that! Try asking about Harika's skills, experience, education, projects, or contact info. Type 'help' for suggestions.";
}

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.json({ reply: "Please send a message!" });
  res.json({ reply: getResponse(userMessage) });
});

app.listen(PORT, () => {
  console.log(`✅ Chatbot server running at http://localhost:${PORT}`);
});
