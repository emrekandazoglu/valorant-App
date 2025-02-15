const express = require('express');
const router = express.Router();

const db = require('../data/db');

router.post("/update/:karakterID", async (req, res) => {
    const karakterID = req.params.karakterID;
    const { karakterAdı, açıklama, kategori, onay, image } = req.body;

    try {
        // Gelen kategori ID'sinin geçerli olup olmadığını kontrol et
        const [kategoriRow] = await db.execute("SELECT * FROM kategori WHERE kategoriID=?", [kategori]);
        if (kategoriRow.length === 0) {
            return res.status(400).send("Geçersiz kategori.");
        }

        // Karakteri güncelle
        await db.execute(
            "UPDATE karakter SET karakterAdı=?, açıklama=?, kategoriID=?, onay=?, image=? WHERE karakterID=?",
            [karakterAdı, açıklama, kategori, onay ? 1 : 0, image, karakterID]
        );

        res.redirect("/"); // Güncelleme sonrası ana sayfaya yönlendirme
    } catch (error) {
        console.log(error);
        res.status(500).send("Bir hata oluştu.");
    }
});


router.get("/update/:karakterID", async (req, res) => {
    const karakterID = req.params.karakterID;
    try {
        const [data] = await db.execute("SELECT * FROM karakter WHERE karakterID=?", [karakterID]);
        const [kategori] = await db.execute("SELECT * FROM kategori");

        res.render("updatePage", { karakter: data[0], kategori: kategori });

    } catch (error) {
        console.log(error);
        res.status(500).send("Bir hata oluştu.");
    }
});


router.get("/show", async (req, res) => {

    try {


        const kategori = await db.execute("Select * from kategori");
        const karakter = await db.execute("SELECT * FROM karakter");

        res.render("tablePage", { karakter: karakter[0], kategori: kategori[0] });

    } catch (error) {
        console.log(error);
    }

});



router.post("/create", async (req, res) => {
    const karakterAdı = req.body.karakterAdı;
    const image = req.body.image;
    const açıklama = req.body.açıklama;
    const onay = req.body.onay ? 1 : 0;
    const kategori = req.body.kategori;

    try {
        const [rows] = await db.execute("SELECT kategoriID FROM kategori WHERE Tipi=?", [kategori]);
        if (rows.length === 0) {
            return res.status(400).send("Geçersiz kategori.");
        }
        const kategoriID = rows[0].kategoriID;

        await db.execute(
            "INSERT INTO karakter (karakterAdı, açıklama, kategoriID, onay, image) VALUES (?, ?, ?, ?, ?)",
            [karakterAdı, açıklama, kategoriID, onay, image]
        );

        res.redirect("/"); // Başarılı ekleme sonrası yönlendirme
    } catch (error) {
        console.log(error);
        res.status(500).send("Bir hata oluştu.");
    }
});

router.get("/create", async (req, res) => {

    try {


        const kategori = await db.execute("Select * from kategori");
        const karakter = await db.execute("SELECT * FROM karakter");

        res.render("inputPage", { karakter: karakter[0], kategori: kategori[0] });

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;