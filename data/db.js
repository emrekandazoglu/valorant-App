const mysql = require('mysql2');

// Bağlantı bilgileri
const connection = mysql.createConnection({
    port: 3307,
    host: 'localhost',      // MySQL sunucu adresi (genellikle localhost)
    user: 'root',           // MySQL kullanıcı adı
    password: '',           // MySQL şifresi (boş olabilir)
    database: 'valorant' // Bağlanmak istediğiniz veritabanı adı
});

// Bağlantıyı başlat
connection.connect((err) => {
    if (err) {
        console.error('Bağlantı hatası:', err);
        return;
    }
    console.log('MySQL bağlantısı başarılı!');
});

module.exports = connection.promise();

