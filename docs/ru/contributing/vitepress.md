# Что такое VitePress? {#what-is-vitepress}

VitePress — это то, что превращает этот репозиторий в веб-сайт.Вы пишете файлы Markdown, а VitePress преобразует их в HTML-страницы с уже прикрепленной навигацией, поиском и темой.

Вам не нужно понимать это, чтобы писать документацию.Эта страница существует, когда вы хотите изменить что-то структурное — добавить страницу на боковую панель, добавить язык или выяснить, почему сервер разработки жалуется.

## Как проект сочетается {#how-the-project-fits-together}

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

Каждый файл `.md` в папке`docs/` становится страницей.URL-адрес следует за путем к файлу, поэтому `docs/en/rcon-guide/index.md` обслуживается по адресу `/docs/en/rcon-guide/`.

## Вы будете использовать три команды: {#the-three-commands}

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev`.Он перезагружает страницу в вашем браузере каждый раз, когда вы сохраняете файл.

::: tip
Сервер разработки печатает адрес, который он прослушивает, при запуске, обычно `http://localhost:5173`.Используйте все, что он печатает, вместо того, чтобы предполагать порт — он выбирает другой, если этот порт занят.
:::

## Конфигурационный файл {#the-config-file}

`.vitepress/config.mts` - единственный файл, с которым нужно быть осторожным, поскольку синтаксическая ошибка в нем останавливает построение всего сайта, а не разрывает одну страницу.

Части, к которым вы, скорее всего, прикасаетесь:

**`themeConfig.nav`** — ссылки на верхней панели.

**`themeConfig.sidebar`** — левая навигация.Он привязан к префиксу пути, поэтому блок `"/en/contributing/"` отображается только на страницах по этому пути.

**`locales`** — одна запись для каждого языка.Каждый из них имеет свои собственные `nav` и `sidebar`, а также `dir` `ltr` или `rtl`.

Добавление страницы на боковую панель выглядит следующим образом:

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

`link` — это URL-адрес, а не путь к файлу.— нет префикса `docs/` и нет `.md` на конце.

::: warning
Сохраните конфигурацию во время работы сервера разработки, и он перезапустится.Если он останавливается с ошибкой, прочитайте последние несколько строк — почти всегда это отсутствующая запятая или незакрытая скобка, и они сообщают вам номер строки.
:::

## Языки с письмом справа налево {#right-to-left-languages}

Арабский языковой стандарт устанавливает `dir: "rtl"`, а `postcss-rtl` автоматически отражает таблицу стилей во время сборки.Вам не нужно писать для этого отдельный CSS.

## Что происходит при объединении изменений {#what-happens-when-your-change-is-merged}

Netlify отслеживает ветку `main`.При слиянии активируется `npm run docs:build`, и созданный сайт публикуется.Это занимает минуту или две.

Выходные данные сборки помещаются в `.vitepress/dist/` и намеренно не фиксируются — они каждый раз регенерируются из Markdown, поэтому их фиксация просто создаст конфликты.

## Узнать больше {#learning-more}

[Документация VitePress](https://vitepress.dev) является подробным и удобочитаемым.На странице [Расширения Markdown](https://vitepress.dev/guide/markdown), в частности, перечислено больше, чем мы здесь используем — если вам нужна функция и вы задаетесь вопросом, существует ли она, вероятно, она есть на этой странице.
