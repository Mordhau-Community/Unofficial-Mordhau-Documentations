# Unofficial Mordhau Documentations Repository

Welcome to the **Mordhau Documentation Repository**!  
This repository uses **VitePress** to create clear and easy-to-read documentation for the game **Mordhau**.  
Our goal is to provide a comprehensive and multilingual resource for players and developers alike.

---

## 🚀 Getting Started

#### Before dive..

- You should have knowledge about **Github** and **Vscode** and **Markdown**
- You should have Github Account.
- You should have install **[Nodejs LTS](https://nodejs.org/en)** and **[Git](https://git-scm.com/downloads)**

<br>

Follow these steps to set up the project locally and start contributing:

#### 1. Clone the Repository

```bash
git clone https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations.git
cd unofficial-mordhau-documentations
```

#### 2. Install Dependencies

Ensure you have Node.js installed. Then, install the required dependencies:

```bash
npm install
```

#### 3. Start the Development Server

Run the following command to start a local development server:

```bash
npm run docs:dev
```

then Visit localhost:3000 in your browser to view the documentation locally.

## 🛠️ Build for Production

To build the documentation for production, use the following command:

```bash
npm run docs:build
```

The static files will be generated in the unofficial-mordhau-documentations/public directory.

## 🤝 How to Contribute

We welcome contributions to enhance the documentation. Here's how you can help:

#### 1. Fork the Repository

Click the Fork button on the top-right of this page to create a copy of this repository under your account.

#### 2. Create a New Branch

Create a new branch for your changes:

```bash
git checkout -b unofficial-mordhau-documentations
```

#### 3. Add or Update Documentation

Navigate to the docs/ directory.
Add or edit .md files for the documentation.
For example, to add a new page, create a file like new-page.md inside docs/.

#### 4. Test Locally

Run the development server to ensure your changes appear correctly:

```bash
npm run docs:dev
```

#### 5. Commit and Push Changes

Commit your changes and push them to your forked repository:

```bash
git add .
git commit -m "Describe your changes"
git push origin unofficial-mordhau-documentations
```

#### 6. Submit a Pull Request

Go to the original repository on GitHub.
Click on Pull Requests and submit your changes for review.

## 📜 Contribution Guidelines

- Ensure your changes are clear and concise.
- Follow the structure of existing documentation.
- Add examples or images where applicable to enhance clarity.
- If adding new files, link them in the sidebar by updating the .vitepress/config.ts file.

## 🌍 Multilingual Support

We aim to provide documentation in multiple languages. If you’d like to contribute a translation:

1- Create a new folder for the language under docs/.
Example: docs/fr for French, docs/ar for Arabic.

2- Translate the relevant Markdown files.

3- Update the configuration in .vitepress/config.ts to include the new language.

## 📬 Questions or Suggestions?

If you have any questions or suggestions, feel free to open an Issue on GitHub. We'd love to hear your feedback!

## ❤️ Acknowledgements

Special thanks to all contributors who help make this documentation better for everyone.
