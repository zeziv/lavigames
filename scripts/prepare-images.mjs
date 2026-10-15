import sharp from "sharp";
import { mkdir, copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const gamesDir = path.join(imagesDir, "games");
const assetsDir = path.join(root, "assets");

await mkdir(gamesDir, { recursive: true });
await mkdir(assetsDir, { recursive: true });

const cursorAssets = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-cursor-projects-lavigames",
  "assets",
);

async function resolveSource(localName, cursorName) {
  const local = path.join(assetsDir, localName);
  try {
    await sharp(local).metadata();
    return local;
  } catch {
    const fallback = path.join(cursorAssets, cursorName);
    await copyFile(fallback, local);
    return local;
  }
}

const lionSource = await resolveSource(
  "lion-bg-source.jpg",
  "lion-bg-cartoon.jpg",
);

await sharp(lionSource)
  .resize(2560, 1440, { fit: "cover", position: "right" })
  .png({ compressionLevel: 9, quality: 70, effort: 10 })
  .toFile(path.join(imagesDir, "lion-bg.png"));

await sharp(lionSource)
  .resize(2560, 1440, { fit: "cover", position: "right" })
  .webp({ quality: 78 })
  .toFile(path.join(imagesDir, "lion-bg.webp"));

async function prepareThumb(id, cursorFile) {
  const source = await resolveSource(`${id}-source.jpg`, cursorFile);
  const outBase = path.join(gamesDir, id);

  await sharp(source)
    .resize(1280, 720, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(`${outBase}.webp`);

  await sharp(source)
    .resize(1280, 720, { fit: "cover" })
    .png({ compressionLevel: 9, quality: 70, effort: 10 })
    .toFile(`${outBase}.png`);
}

await prepareThumb("poll-warrior", "poll-warrior-thumb.jpg");
await prepareThumb("territory-conquest", "territory-conquest-thumb.jpg");

console.log("Images prepared.");
