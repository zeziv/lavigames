import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const gamesDir = path.join(imagesDir, "games");
const assetsDir = path.join(root, "assets");

await mkdir(gamesDir, { recursive: true });

async function requireSource(name) {
  const local = path.join(assetsDir, name);
  await sharp(local).metadata();
  return local;
}

const lionSource = await requireSource("lion-bg-source.jpg");

await sharp(lionSource)
  .resize(2560, 1440, { fit: "cover", position: "right" })
  .png({ compressionLevel: 9, quality: 70, effort: 10 })
  .toFile(path.join(imagesDir, "lion-bg.png"));

await sharp(lionSource)
  .resize(2560, 1440, { fit: "cover", position: "right" })
  .webp({ quality: 78 })
  .toFile(path.join(imagesDir, "lion-bg.webp"));

async function prepareThumb(id) {
  const source = await requireSource(`${id}-source.jpg`);
  await sharp(source)
    .resize(1280, 720, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(path.join(gamesDir, `${id}.webp`));
}

await prepareThumb("poll-warrior");
await prepareThumb("territory-conquest");

console.log("Images prepared.");
