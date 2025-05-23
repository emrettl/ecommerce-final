# ecommerce-final

## Projeyi localde çalıştırabilmek için yüklenmesi gerekenler

  Node.Js, json-server, npm.

  İlk başta https://nodejs.org/en/download sitesinden Node.Js indirip bilgisayarınıza kurunuz.

  Sonrasında sırasıyla aşağıda yazan komutları projenin kök dizinine terminal kullanarak yazınız.
  
```bash
npm install -g json-server
npm install
```

  Bunlarla birlikte projenin çalışması için gerekli bağımlılıklar kuruldu. Projeyi localde ayağa kaldırmak için aşağadaki komutları yine projenin kök dizinindeki terminale yazınız.

```bash
json-server --watch db.json --port 4000
npm run dev
```

Proje lokalde ayağa kalktığında [http://localhost:5173](http://localhost:5173) tarayıcınızda bu adresi açınız.
