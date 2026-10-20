const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public/products');
const assetsDir = path.resolve(__dirname, '../src/assets/images/products');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'FreshoraBotanicalCatalog/1.0 (contact@freshora.id; Mozilla/5.0)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const out = fs.createWriteStream(destPath);
      res.pipe(out);
      out.on('finish', () => {
        out.close(() => {
          const sz = fs.statSync(destPath).size;
          resolve(sz);
        });
      });
      out.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

// Download list for missing items and new 40 products
const itemsToDownload = [
  // Missing from 1-40:
  {
    id: 'prod-5', // Bayam Hijau
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-6', // Kangkung Air
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/N_Ipoa_D1600.JPG/960px-N_Ipoa_D1600.JPG'
  },
  {
    id: 'prod-7', // Brokoli
    url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-8', // Tomat Cherry
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-9', // Wortel
    url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-36', // Buncis Baby
    url: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-37', // Jagung Manis
    url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-38', // Cabai Rawit Merah
    url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-39', // Bawang Merah Brebes
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-40', // Bawang Putih Kating
    url: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=700&q=80'
  },

  // 20 NEW FRUITS (prod-41 to prod-60):
  {
    id: 'prod-41', // Rambutan Binjai
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Rambutan_white_background_alt.jpg/960px-Rambutan_white_background_alt.jpg'
  },
  {
    id: 'prod-42', // Duku Palembang
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Duku_Lansium_domesticum_Ripe.jpg/960px-Duku_Lansium_domesticum_Ripe.jpg'
  },
  {
    id: 'prod-43', // Jambu Air Citra Delima
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Syzygium_samarangense_%28jamalac_ou_jambose%29.jpg/960px-Syzygium_samarangense_%28jamalac_ou_jambose%29.jpg'
  },
  {
    id: 'prod-44', // Kedondong Manis Madu
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Spondias_dulcis3.jpg/960px-Spondias_dulcis3.jpg'
  },
  {
    id: 'prod-45', // Sawo Manila Legit
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg/960px-%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg'
  },
  {
    id: 'prod-46', // Markisa Ungu
    url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-47', // Cempedak Madu
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Berthe_Hoola_van_Nooten38.jpg/960px-Berthe_Hoola_van_Nooten38.jpg'
  },
  {
    id: 'prod-48', // Nangka Madu Kuning
    url: 'https://images.unsplash.com/photo-1596724895593-362cac3ef841?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-49', // Bengkuang Prembun
    url: 'https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-50', // Kiwi Segar Hijau
    url: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-51', // Jeruk Nipis Peras
    url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-52', // Jeruk Purut
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Citrus_hystrix_fruit.jpg/960px-Citrus_hystrix_fruit.jpg'
  },
  {
    id: 'prod-53', // Pir Madu Xiang Li
    url: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-54', // Plum Merah Manis
    url: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-55', // Blueberry Segar
    url: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-56', // Delima Merah Super
    url: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-57', // Kesemek Manis
    url: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-58', // Melon Rock Cantaloupe
    url: 'https://images.unsplash.com/photo-1571575179703-4bde44fb408c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-59', // Srikaya Manis Legit
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Sugar_apple_on_tree.jpg/960px-Sugar_apple_on_tree.jpg'
  },
  {
    id: 'prod-60', // Jeruk Limau Sambal
    url: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?auto=format&fit=crop&w=700&q=80'
  },

  // 20 NEW VEGETABLES (prod-61 to prod-80):
  {
    id: 'prod-61', // Labu Siam Muda
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Chayote_BNC.jpg/960px-Chayote_BNC.jpg'
  },
  {
    id: 'prod-62', // Pare Hijau Peria
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Momordica_charantia_Blanco2.357.png/960px-Momordica_charantia_Blanco2.357.png'
  },
  {
    id: 'prod-63', // Daun Bawang
    url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-64', // Seledri Segar
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-65', // Oyong / Gambas
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Luffa_acutangula_Chinese_okra.jpg/960px-Luffa_acutangula_Chinese_okra.jpg'
  },
  {
    id: 'prod-66', // Kacang Panjang
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Snake_Bean_BNC.jpg/960px-Snake_Bean_BNC.jpg'
  },
  {
    id: 'prod-67', // Jamur Tiram Putih
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-68', // Jamur Kuping
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Jelly_Ear%2C_Auricularia_auricula-judae%2C_UK_2.jpg/960px-Jelly_Ear%2C_Auricularia_auricula-judae%2C_UK_2.jpg'
  },
  {
    id: 'prod-69', // Jamur Kancing Champignon
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-70', // Paprika Merah
    url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-71', // Paprika Hijau
    url: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-72', // Paprika Kuning
    url: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-73', // Buncis Perancis Haricot
    url: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-74', // Labu Kuning Pumpkin
    url: 'https://images.unsplash.com/photo-1506917728037-b9bf01ac4776?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-75', // Zucchini Hijau
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-76', // Lobak Putih Daikon
    url: 'https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-77', // Kailan Hijau
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Gailan.jpg'
  },
  {
    id: 'prod-78', // Jahe Gajah
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-79', // Kunyit Organik
    url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'prod-80', // Lengkuas Pilihan
    url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80'
  }
];

async function main() {
  console.log(`Starting download of ${itemsToDownload.length} produce images...`);
  let successCount = 0;
  for (const item of itemsToDownload) {
    const pubDest = path.join(publicDir, `${item.id}.jpg`);
    const assetDest = path.join(assetsDir, `${item.id}.jpg`);
    try {
      const sz = await downloadFile(item.url, pubDest);
      fs.copyFileSync(pubDest, assetDest);
      console.log(`[OK] ${item.id} -> ${sz} bytes`);
      successCount++;
    } catch (err) {
      console.error(`[ERR] ${item.id}:`, err.message);
    }
  }
  console.log(`Finished: ${successCount}/${itemsToDownload.length} downloaded successfully.`);
}

main();
