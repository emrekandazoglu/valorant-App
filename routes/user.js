const express = require('express');
const router = express.Router();

const db = require('../data/db');

router.use("/karakter/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [karakter] = await db.execute("SELECT * FROM karakter k join kategori ka on k.kategoriID=ka.kategoriID where karakterID=?", [id]);


        res.render("detailsPage", { karakter: karakter[0] });

    } catch (error) {
        console.log(error);
    }
})

router.use("/:kategoriID", async (req, res) => {
    const kategoriID = req.params.kategoriID;
    try {
        const kategori = await db.execute("Select * from kategori");
        const karakter = await db.execute("SELECT * FROM karakter where kategoriID=?", [kategoriID]);

        res.render("mainPage", { karakter: karakter[0], kategori: kategori[0] });

    } catch (error) {
        console.log(error);
    }

});

router.use("/", async (req, res) => {

    try {
        const kategori = await db.execute("Select * from kategori");
        const karakter = await db.execute("SELECT * FROM karakter");

        res.render("mainPage", { karakter: karakter[0], kategori: kategori[0] });

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;