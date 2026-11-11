# COBIT Atölyesi

**COBIT 2019 kontrol kataloğu ve IT denetimi — Türkçe.**

IT denetçileri ve yeni başlayanlar için bağımsız, **Türkçe ve İngilizce** bir kaynak. Merkezinde, ISO 27002'deki gibi açıklamalı bir **COBIT 2019 kontrol kataloğu** yer alır: 40 hedef ve 231 yönetim uygulamasının her biri için denetçinin beklentisi, tasarım ve işleyiş testi, istenecek kanıtlar, tipik bulgular ve ISO 27001/27002 eşleştirmesi. Konuya yeni başlayanlar için sıfırdan dersler de bulunur.

**Dil seçimi:** Başlıktaki **TR | EN** düğmesi tüm siteyi, katalog içeriğini ve Excel çıktısını değiştirir. Seçim tarayıcıda hatırlanır. `?lang=en` veya `?lang=tr` ile belirli dilde paylaşılabilir; örneğin `https://KULLANICI_ADI.github.io/cobit-atolyesi/?lang=en#kontroller`. İlk ziyarette tarayıcı dili Türkçe ise Türkçe, değilse İngilizce açılır.

> Yayın durumu: Yerel olarak hazırlanmıştır. Bir GitHub deposuna yüklenmiş veya internette yayımlanmış sayılmaz.
>
> Planlanan yayın: `turhansolmaz/turhansolmaz.github.io` deposundaki `cobit/` klasörü → `https://turhansolmaz.github.io/cobit/` (İngilizce: `https://turhansolmaz.github.io/cobit/?lang=en`). Bu yerleşimde ayrı depo veya ek GitHub Pages ayarı gerekmez.

## Neler var?

- **Kontrol kataloğu — 40 hedef, 231 uygulama:** Her hedefin iş önemi, denetim odağı ve temel riskleri. Her uygulamada Türkçe başlık, İngilizce referans adı, denetçi beklentisi, tasarım testi (TOD), işleyiş testi (TOE), kanıt listesi, tipik bulgular, ISO eşleştirmesi ve ITGC etiketi.
- **Arama ve filtreler:** Kod, konu veya ISO numarasıyla arama; alan filtresi ve erişim, değişiklik, operasyon, SDLC ITGC görünümleri.
- **Excel'e aktarma:** Filtrelenen uygulamaları veya tek bir hedefi; test sonucu, çalışma kâğıdı referansı ve denetçi notu sütunlarıyla CSV olarak indirme. UTF-8 BOM ve noktalı virgül ayırıcı, Türkçe Excel'de doğrudan açılır.
- **ISO 27001 ve ISO 27002 sayfaları:** İki standart ayrı sayfalarda. ISO/IEC 27001:2022'nin 23 maddesi (4–10) ve ISO/IEC 27002:2022'nin 4 temadaki 93 kontrolü; her madde/kontrol için ayrı sayfa, ilgili COBIT uygulamaları ve resmî ISO kaynak bağlantısı ([27001](https://www.iso.org/standard/27001), [27002](https://www.iso.org/standard/75652.html)). Ek A–ISO 27002 ilişkisi ve SoA açıklanır.
- **Sınav simülatörü:** COBIT 2019 Foundation ve CISA tarzında 100 özgün, iki dilli soru; dört seçenek, tek en iyi cevap ve gerekçeli açıklama. Konu ve soru sayısı seçimi, süreli sınav modu (soru başına 90 sn), işaretleme ve soru paleti, anında geri bildirimli alıştırma modu, konu bazında sonuç, cevap incelemesi ve yanlışları yeniden çözme. %65 sitenin hedefidir; resmî geçme notu değildir.
- **12 ders:** Sade anlatım, çözülmüş örnek, denetçi notu ve cevaplı alıştırma.
- **8 denetim rehberi:** Erişim; değişiklik; işletim/olay/problem; süreklilik; uygulama/veri; tedarikçi/bulut; güvenlik; güvence.
- **3 vaka ve 40 terimlik sözlük.**
- Tarayıcıda yerel ilerleme/alıştırma kaydı; dar ekran ve klavye desteği; yazdırma stili.

Katalog, resmî kitapların uygulama açıklamalarını, aktivite listelerini veya yetkinlik seviyelerini yeniden yayımlamaz. Türkçe denetim notları özgündür; eşleştirmeler gösterge niteliğindedir. Bu proje resmî yayınların, mesleki standartların, sertifika eğitiminin veya hukuki görüşün yerine geçmez.

## Yerelde aç

`index.html` dosyasını güncel bir tarayıcıda aç. Paket kurulumu, derleme, hesap, API anahtarı veya veritabanı gerekmez.

`file:` adreslerinde tarayıcıların yerel depolama davranışı değişebilir. Kalıcı ilerlemeyi aynı HTTP(S) adresinde kullanmak daha öngörülebilirdir. Depolama engellenirse site görünür uyarı verir; dersler okunmaya devam eder.

### Dosya düzeni

```text
index.html        Giriş belgesi ve erişilebilir gezinme
style.css         Tasarım, dar ekran ve yazdırma stilleri
content.js        Dersler, 40 hedef, sözlük, vakalar, test (TR)
content.en.js     Aynı içeriğin İngilizce sürümü
audit-data.js     8 denetim programı (TR)
audit-data.en.js  8 denetim programı (EN)
controls-*.js     Kontrol kataloğu: 40 hedef, 231 uygulama (6 dosya, TR)
controls-*.en.js  Kontrol kataloğunun İngilizce sürümü (6 dosya)
iso-reference.js  ISO/IEC 27002:2022 kontrol ve 27001:2022 madde başlıkları (TR/EN)
exam-1..5.js      100 soruluk iki dilli sınav bankası (her dosyada 20 soru)
app.js            İki dilli arayüz, gezinme, katalog, filtreler, dışa aktarma, alıştırma ve test
favicon.svg       Yerel simge
README.md         Kullanım ve yayınlama
ATTRIBUTION.md    Kaynak ve içerik sınırları
.nojekyll         GitHub Pages için doğrudan statik sunum
```

Site göreli dosya yolları ve `#ders/...` biçiminde bağlantılar kullanır. GitHub Pages'in `/depo-adi/` alt yolunda da çalışacak şekilde tasarlanmıştır; sunucuda özel yönlendirme kuralı gerekmez.

## GitHub Pages ile yayınlama

Yayınlamadan önce aşağıdaki kontrol listesini tamamla. Mevcut portfolyo deposunu değiştirmek gerekmez.

1. Kendi hesabında ayrı, herkese açık bir depo oluştur. Örnek ad: `cobit-atolyesi`. Bir isim/URL'nin alınmış olduğu burada varsayılmıyor.
2. Bu klasörün dosyalarını deponun **köküne** yükle. Özellikle `index.html` kökte olsun. Önceki çalışma klasörünü, özel şirket verisini, orijinal PDF veya SQL dökümünü ekleme.
3. GitHub'da **Settings → Pages → Build and deployment → Deploy from a branch** seç.
4. Dosyaların bulunduğu dalı (genellikle `main`) ve **/(root)** klasörünü seç, kaydet.
5. GitHub'ın gösterdiği yayın adresini aç. Örnek biçim: `https://KULLANICI_ADI.github.io/cobit-atolyesi/`. Bu bir yer tutucudur; gerçek adres depo ayarlarında görünür.
6. Telefonda ve masaüstünde ilk dersi, bir hedef filtresini, bir denetim rehberini ve testi kontrol et.
7. Oluşan gerçek adresi portfolyondaki proje kartına ekle. Canlı site ile kaynak depo için ayrı bağlantı ver.

GitHub Pages menüleri zamanla değişebilir. [Güncel resmî yayınlama adımlarını](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) kontrol et.

### Yayından önce kontrol listesi

- [ ] Eğitim içeriğini okuyup yayımlayan kişi olarak doğruladım; özellikle hedef kodlarını, mesleki sınırları ve kaynakları kontrol ettim.
- [ ] Şirket/çalışan verisi, işveren adı, kurum içi belge, parola veya gerçek denetim bulgusu yok.
- [ ] Üçüncü taraf PDF/SQL dosyaları depoya eklenmedi; özgün anlatımlar ve kaynak bağlantıları kullanılıyor.
- [ ] Resmî ISACA onayı, sertifika, gerçek müşteri denetimi veya mesleki başarı iddiası yok.
- [ ] Telif/atıf notlarını korudum. Kendi katkılarımın yeniden kullanımı için uygun lisansı seçtim.
- [ ] Örnek URL'leri gerçek yayın URL'siyle değiştirdim; hayali bir “canlı site” bağlantısı kullanmıyorum.
- [ ] Masaüstü/dar ekran, not kaydı/silme, quiz, bilinmeyen bağlantı ve yazdırma görünümünü kontrol ettim.

## Portfolyo açıklaması örneği

> **COBIT Atölyesi — COBIT 2019 kontrol kataloğu ve IT denetimi rehberi**
>
> COBIT 2019'un 40 hedefini ve 231 yönetim uygulamasını IT denetçisi gözüyle açıklayan bağımsız, Türkçe ve İngilizce kaynak. Her uygulama için denetçi beklentisi, tasarım ve işleyiş testi, kanıt listesi, tipik bulgular ve ISO 27001/27002 eşleştirmesi içerir. ITGC filtreleri ve Excel'e aktarılabilen denetim programı sunar. Yeni başlayanlar için 12 ders, 8 denetim rehberi ve vakalar da bulunur. Vanilla HTML/CSS/JavaScript ile geliştirilmiş; haricî bağımlılık ve hesap gerektirmez. İçerik ve geliştirme sürecinde yapay zekâ desteği kullanılmıştır; yayınlayan kişinin inceleme ve doğrulama sorumluluğu devam eder.
>
> **English:** An independent Turkish/English resource that explains all 40 COBIT 2019 objectives and 231 management practices from an IT auditor's perspective: auditor expectation, test of design and operating effectiveness, evidence, typical findings and ISO 27001/27002 mapping, with ITGC filters and an Excel-ready audit program. Built with vanilla HTML/CSS/JavaScript. AI assistance was used in content and development; the publisher remains responsible for review and validation.

Portfolyoda gerçekten yaptığın katkıları açıkça belirt. Bu projeyi gerçek bir kurumun denetimi, ISACA sertifikası veya tüm içeriğin kişisel uzmanlık doğrulaması gibi sunma.

## Gizlilik

Uygulama analiz/reklam servisi, haricî yazı tipi veya uzak API kullanmaz. İlerleme ve alıştırma notları yalnızca `cobit-atolyesi-v1` yerel depolama anahtarında saklanır. Test şıkları kalıcı kaydedilmez. “Kaynaklar” sayfasındaki onaylı silme işlemi yalnızca bu uygulamanın anahtarını kaldırır.

Notlar cihazlar arasında taşınmaz ve ortak tarayıcı profiline erişen başka kişilerce görülebilir. Hassas bilgi yazılmamalıdır. Barındırma sağlayıcısının erişim kaydı/IP işlemesi kendi politikasına tabidir.

## Doğrulama

Bağımlılık veya test paketi eklenmemiştir. Etkileşimli davranışlar tarayıcı üzerinden doğrulanabilir:

1. Tüm 12 derste anlatım, örnek ve cevap açılır.
2. 40 hedef sayısı ve alan sayıları 5/14/11/6/4'tür; kod bağlantısı ve Türkçe arama çalışır.
3. 8 rehber ve 3 vakanın kendi içerikleri açılır.
4. Not yazıp yenileyince aynı not görünür; tamamlanan ders de korunur.
5. Boş test gönderimi uyarır; doğru/yanlış cevaplarda gerekçe görünür.
6. Yerel kayıt silme işlemi onay ister; iptal veriyi korur, onay not/ilerlemeyi siler.
7. Dar ekranda yatay taşma yoktur; menü ve klavye odağı çalışır.
8. Bilinmeyen `#ders/...` yolu anlaşılır hata ve geri dönüş gösterir.

İlk sürüm tarayıcı doğrulaması: 23 ders/rehber/vaka ayrıntı yolu; 40 hedefin alan dağılımı; Türkçe arama ve kod bağlantıları; not/ilerlemenin yenileme sonrası korunması; kayıt silme/iptal; 20/20 ve 19/20 test sonuçları; depolama hatasının görünür uyarısı; 375 piksel genişlikte dokuz ana görünüm ve mobil menü kontrol edildi. Kaynak dosyaları HTTP üzerinden `/cobit-akademi/` alt yolunda 200 yanıtıyla sunuldu. Bu doğrulama gerçek bir GitHub Pages dağıtımının yapıldığı anlamına gelmez.

Kontrol kataloğu doğrulaması: 231 uygulama kodu ve İngilizce adı, incelenen SQL kaynağıyla birebir karşılaştırıldı; eksik/fazla kayıt yok. Tüm ISO numaraları `iso-reference.js` listesinde mevcut. Alan ve ITGC filtreleri, kod/konu/ISO numarası araması, `#kontrol/DSS05/DSS05.04` gibi doğrudan uygulama bağlantıları, ISO 27001 madde ile 27002 kontrol numarası çakışmasının ayrılması, tümünü aç/kapat, CSV dışa aktarma (UTF-8 BOM, 231 satır + başlık), bilinmeyen ve bozuk bağlantılar ile 375–1366 piksel arasında yedi genişlikte yatay taşma kontrol edildi.

İki dil doğrulaması: Türkçe ve İngilizce veri dosyalarının yapısal eşliği (12 ders, 40 hedef, 231 uygulama kodu/adı/ISO/ITGC değeri, 8 rehber, 3 vaka, 40 terim, 20 sorunun doğru cevap indeksleri) tarayıcıda karşılaştırıldı; İngilizce içerikte Türkçe metin kalmadı. 18 yol iki dilde açıldı; dil düğmesi, `?lang=` parametresi, tercihin hatırlanması, dil değişince açık uygulamanın korunması, notların iki dilde ortak kalması, İngilizce arama/filtre, İngilizce CSV başlıkları ve 20/20 test sonucu ile 320–1366 piksel arasında başlık/taşma kontrol edildi.

## Kaynaklar ve kullanım hakları

[ATTRIBUTION.md](ATTRIBUTION.md) dosyasını ve site içindeki “Kaynaklar” sayfasını oku. COBIT ve ISACA yayınlarının hakları sahiplerine aittir. Bu proje resmî ISACA yayını değildir.

Bu sürümde proje için genel bir açık kaynak/içerik lisansı seçilmemiştir. Herkese açık yayın yapmak, üçüncü tarafların sınırsız yeniden kullanımına kendiliğinden izin vermek değildir. Kod ve özgün eğitim metinleri için seçilecek lisanslar ayrı değerlendirilebilir; üçüncü taraf hakları bu seçimden etkilenmez.
