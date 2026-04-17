# Personal Chatbot Website Hosted on Linux
An interactive personal portfolio chatbot built with Node.js and Express, hosted on Ubuntu Linux inside a UTM virtual machine. Visitors can ask questions about skills, experience, education, and projects through a conversational chat interface.

## Features
- Keyword-based chatbot responses powered by resume data
- Persistent visitor counter using server-side JSON file storage
- Dark and Light mode theme toggle
- Animated typing indicator
- Quick-access suggestion chips
- Fully responsive chat UI

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **OS:** Ubuntu 24 LTS on UTM (QEMU) virtual machine
- **Storage:** JSON file via Node.js fs module
  
## Prerequisites
Before running this project, make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) version 18 or higher
- npm (comes bundled with Node.js)

To check if you already have them installed:
```bash
node -v
npm -v
```
## How to Run

**Step 1 — Clone the repository**
```bash
git clone https://github.com/SaiHarikaVempati/Personal-chatbot.git
cd Personal-chatbot
```

**Step 2 — Install dependencies**
```bash
npm install
```

**Step 3 — Start the server**
```bash
node server.js
```

**Step 4 — Open in your browser**
http://localhost:3000

You should see the chatbot website running. Type a question or click one of the suggestion chips to start chatting!


## How to Stop the Server
Press `Ctrl + C` in the terminal to stop the server
