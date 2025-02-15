const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user");
const adminRouter = require("./routes/admin");

const app = express();

// EJS Template Engine Ayarı
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views klasörünü belirt

// Middleware'ler
app.use(express.static(path.join(__dirname, "public"))); // Public klasörünü statik hale getir
app.use(express.urlencoded({ extended: true })); // Form verilerini alabilmek için
app.use(express.json()); // JSON verileri alabilmek için

// Rotalar
app.use("/admin", adminRouter);
app.use("/", userRoutes); // Varsayılan olarak user rotalarını bağla

// Sunucuyu başlat
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
