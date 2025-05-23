const fs = require('fs');
const path = require('path');

// List of supported file extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.mp4'];

// List of brand names (Instagram handles)
const brands = [
  "friedrice_nyc",
  "eternal_artwear",
  "profitminded.clo",
  "nihil.ny",
  "emptyspaces",
  "chxmicalover",
  "fnkstudios",
  "concrete_orchids",
  "kinejkt",
  "liquidlagoon",
  "sixshooter.us",
  "cozy.worldwidee",
  "aliasonline.us",
  "allure.newyork",
  "misanthropestudios",
  "fine.culture",
  "corporateworld",
  "omneeworld",
  "awaitedmilitia",
  "vengeance_studios",
  "menacelosangeles",
  "ditch",
  "vega9602k",
  "peaceandwar89",
  "idle____time",
  "oedemaa",
  "sensorydept",
  "ArtificialFever",
  "demiknj",
  "berlinc.co",
  "ssstufff.official",
  "22kilogram",
  "chinatowncountryclub",
  "bomiworks",
  "forevakaash",
  "fortytwoco",
  "winterhouse__",
  "Mutimer.co",
  "shineluxurystudios",
  "personalfears",
  "attachmentsonline",
  "__heavencanwait__",
  "pdf.channel",
  "rangercartel",
  "lildenimjean",
  "shmuie",
  "vicinity_de",
  "lantiki_official",
  "youngchickenpox",
  "maharishi",
  "fourfour.jpg",
  "bykodyphillips",
  "heavenonearthstudios",
  "eternalloveworld",
  "kontend__",
  "hypedept.co",
  "roypubliclabel",
  "hidden.season",
  "stolenarts_",
  "qbsay",
  "iconaclub",
  "saeminium",
  "srrysora",
  "alreadywritten",
  "insain.worldwide",
  "rdvstudios",
  "cyvist",
  "slovakiandreams",
  "deadatlantic",
  "emestudios_",
  "angel333online",
  "byjeshal",
  "paradoxeparis",
  "kyonijr",
  "sundae.school",
  "astonecoldstudiosproduction",
  "somar.us",
  "2001odysey",
  "ihp.ihp.ihp",
  "forcesunseen",
  "blanksbythirteen",
  "throneroomx",
  "septemberseventhstudios",
  "badson.us",
  "brotherlylove",
  "california.arts",
  "derschutze_clo",
  "drolandmiller",
  "eraworldwideclub",
  "haveyoudiedbefore",
  "nomaintenance",
  "outlw.usa",
  "poolhousenewyork",
  "thegvgallery",
  // ... (add the rest of your 200+ brands here)
];

const baseDir = path.join(__dirname, 'public', 'brand_content');

brands.forEach((brand) => {
  const brandDir = path.join(baseDir, brand);
  if (!fs.existsSync(brandDir) || !fs.lstatSync(brandDir).isDirectory()) {
    console.warn(`Brand folder not found: ${brand}`);
    return;
  }
  const files = fs.readdirSync(brandDir)
    .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort();
  const indexPath = path.join(brandDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify({ files }, null, 2));
  console.log(`Wrote index.json for ${brand} (${files.length} files)`);
});

console.log('Done!'); 