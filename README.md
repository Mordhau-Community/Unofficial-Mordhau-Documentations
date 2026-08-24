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
cd Unofficial-Mordhau-Documentations
```

#### 2. Install Dependencies

Ensure you have Node.js 18 or newer installed. Then, install the required dependencies:

```bash
npm install
```

#### 3. Start the Development Server

Run the following command to start a local development server:

```bash
npm run docs:dev
```

The command prints the address it is serving on, usually `http://localhost:5173`. Open that in your browser to view the documentation locally. The page reloads on its own every time you save a file.

## 🛠️ Build for Production

To build the documentation for production, use the following command:

```bash
npm run docs:build
```

The static files are generated in `.vitepress/dist/docs`. That folder is not committed — Netlify runs the build itself on every push to `main`. To check the built output before you push:

```bash
npm run docs:preview
```

## 📁 Project Structure

```
.vitepress/
  config.mts        site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
netlify.toml        build settings and redirects
```

## 🤝 How to Contribute

We welcome contributions to enhance the documentation. Here's how you can help:

#### 1. Fork the Repository

Click the Fork button on the top-right of this page to create a copy of this repository under your account.

#### 2. Create a New Branch

Create a new branch for your changes, named after what you are doing:

```bash
git checkout -b fix-rcon-ports
```

#### 3. Add or Update Documentation

Navigate to the `docs/` directory.
Add or edit `.md` files for the documentation.
For example, to add a new page, create a file like `new-page.md` inside `docs/en/`.

If you add a page, link it in the navigation by updating `.vitepress/config.mts`. A page nothing links to will not be found by anyone.

#### 4. Test Locally

Run the development server to ensure your changes appear correctly:

```bash
npm run docs:dev
```

Then run a production build before you push. It fails on broken internal links, so it catches a mistake that is easy to miss in the dev server:

```bash
npm run docs:build
```

#### 5. Commit and Push Changes

Commit your changes and push them to your forked repository:

```bash
git add .
git commit -m "Describe your changes"
git push origin fix-rcon-ports
```

#### 6. Submit a Pull Request

Go to the original repository on GitHub.
Click on Pull Requests and submit your changes for review.

## ❓ Contribution Guidelines

- Ensure your changes are clear and concise.
- Follow the structure of existing documentation.
- Add examples or images where applicable to enhance clarity.
- If adding new files, link them in the sidebar by updating the `.vitepress/config.mts` file.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for more detailed guidelines.

## 🌍 Multilingual Support

We aim to provide documentation in multiple languages. If you’d like to contribute a translation:

1- Create a new folder for the language under `docs/`.
Example: `docs/fr` for French, `docs/ar` for Arabic.

2- Translate the relevant Markdown files.

3- Update the configuration in `.vitepress/config.mts` to include the new language.

Please do not submit machine translated pages — we have no way to review a language none of us read.

## 📬 Questions or Suggestions?

If you have any questions or suggestions, feel free to open an Issue on GitHub. We'd love to hear your feedback!

You can also find us on [Discord](https://discord.gg/zuX58yRV84).

## ❤️ Acknowledgements

Special thanks to all contributors who help make this documentation better for everyone.

## 📜 License

The documentation is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Share it and build on it freely, as long as you credit this project and license
what you make under the same terms.

Mordhau itself, and everything that ships with it, belongs to
[Triternion](https://triternion.com/) and is not covered. See [LICENSE.md](./LICENSE.md).
