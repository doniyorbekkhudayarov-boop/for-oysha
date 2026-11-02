# С днём рождения, Ойша

Личная адаптивная страница-поздравление. Галерея содержит ровно 24 фотографии из исходной папки `фотки`. Сторонние изображения и видео в сайт не включены.

## Запуск локально

Требуется Node.js 22 или новее.

```powershell
cd 'D:\др ойши'
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173`). Для production-сборки выполните `npm run build`; локально посмотреть её можно через `npm run preview`.

## Фотографии

Оригиналы сохранены в `фотки`. Для сайта созданы сжатые копии WebP в `public/images/oisha/photo-01.webp` … `photo-24.webp`. Порядок и исходные имена находятся в `src/data/photos.ts`. Чтобы заменить снимок, замените соответствующий файл `photo-NN.webp`, сохранив его имя.

## GitHub

1. Создайте на GitHub новый пустой репозиторий, например `oisha-birthday` (без README и других стартовых файлов).
2. Выполните в PowerShell из папки проекта, подставив свой логин и имя репозитория:

```powershell
cd 'D:\др ойши'
git init
git add .
git commit -m "Create Oisha birthday website"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/oisha-birthday.git
git push -u origin main
```

## Netlify

В Netlify выберите **Add new site → Import an existing project → GitHub**, разрешите доступ к репозиторию и выберите `oisha-birthday`. Настройки уже записаны в `netlify.toml`: команда сборки `npm run build`, папка публикации `dist`. После первого Deploy Netlify будет автоматически обновлять сайт после каждого `git push`.

