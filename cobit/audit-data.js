// Öğrenme amaçlı örneklerdir; bir uygunluk belgesi veya zorunlu kontrol listesi değildir.
window.AUDIT_PROGRAMS = [
  {
    id: "erisim-yasam-dongusu",
    title: "Erişim yaşam döngüsü ve ayrıcalıklı hesaplar",
    subtitle: "İşe giriş, görev değişikliği ve ayrılışta erişimin izini sürün.",
    objectives: ["APO13", "DSS05", "DSS06"],
    story: "Kurgusal bir kitapçıda kasiyer olan Deniz depoya geçer. Depo erişimi açılır; eski iade onay yetkisinin kaldırılıp kaldırılmadığı bilinmez. Ayrıcalıklı hesap ise kullanıcı veya sistem ayarlarını değiştirebilen güçlü bir hesaptır.",
    risk: "Görevi için gerekenden fazla yetki kalan veya sahibi belirsiz hesaplar, yetkisiz işlem yapılmasına ve işlemin sorumlusunun belirlenememesine yol açabilir.",
    control: "Örnek uygulama: Kitapçı, rol değişikliklerini yönetici onayına bağlar, önceki yetkileri gözden geçirir ve güçlü hesapların kullanım kayıtlarını inceler. Bu tasarım evrensel bir COBIT kuralı değildir; kapsam ve sıklık riske göre belirlenir.",
    evidence: [
      "Kimlik bilgileri maskelenmiş işe giriş, görev değişikliği ve ayrılış listesi; dönem ve kaynak bilgisiyle.",
      "Aynı döneme ait hesap ve yetki dökümü; servis hesapları ve ayrıcalıklı hesaplar ayrıca işaretlenmiş olarak.",
      "Seçilen işlemlerin erişim talepleri, onayları ve açma, değiştirme veya kapatma zaman kayıtları.",
      "Yetki gözden geçirme sonuçları ve sır içermeyen, ilgili hesap kullanım kayıtları."
    ],
    steps: [
      "Yazılı kapsamı ve salt okunur erişim iznini doğrulayın; gerçek parola, erişim anahtarı veya kişisel çalışan verisi toplamadan maskelenmiş kayıt isteyin.",
      "Evreni, yani dönemde incelenebilecek tüm erişim olaylarını tanımlayın; personel hareket listesi ile hesap dökümünün tarihlerini ve toplamlarını uzlaştırarak tamlığı sınayın.",
      "Ayrılış, rol değişikliği ve güçlü hesapları riske göre seçin; örneklem gerekçesini kaydedin, sabit bir adet varsaymayın.",
      "Seçilen olaylarda talep, yetkili onayı ve gerçekleşme kaydını karşılaştırın; kurumun belirlediği süre ve rol ölçütlerine göre istisnaları not edin. Hesap açmayın veya kapatmayın.",
      "Beyanları kaynak sistemden gelen tarihli kayıtlarla destekleyin; kanıtın yeterliliğini ve güvenilirliğini değerlendirin, açıklanamayan eksikleri raporlayın."
    ],
    redFlags: [
      "Ayrılan kişiye ait hesabın durumu ile kapanış kaydının çelişmesi.",
      "Güçlü hesabın sorumlusunun veya kullanım gerekçesinin tanımlanmaması.",
      "Görev değişikliğinde yalnızca yeni yetki eklenmesi, eski yetkilerin değerlendirilmemesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun onaylı erişim prosedürü, görev değişikliğinde önceki yetkilerin incelenmesini ister. Durum: İncelenen kurgusal kayıtta yeni rol onayı vardır ancak eski yetkilerin incelendiğini gösteren kanıt bulunamamıştır. Risk: Gereksiz yetki korunabilir; yetkinin kötüye kullanıldığı veya zarar oluştuğu sonucuna varılmaz.",
    limits: "Bir ekran görüntüsü tüm hesap evrenini veya dönem boyunca işleyişi kanıtlamaz. Paylaşımlı ve servis hesaplarını insan hesabıyla aynı biçimde yorumlamayın. Canlı erişim denemesi yapmayın; her ek test için açık yetkilendirme alın.",
    exercise: {
      question: "Yönetici 'tüm ayrılan hesaplar kapanır' diyor. Bu beyan tek başına yeterli mi?",
      answer: "Hayır. Önce ayrılış evreninin tamlığını doğrulayın; riskle gerekçelendirilmiş seçimlerde ayrılış tarihi, hesap durumu ve kapanış kaydını karşılaştırın. Beyan açıklama sağlar, tek başına işleyiş kanıtı değildir."
    }
  },
  {
    id: "degisiklik-sdlc",
    title: "Değişiklik yönetimi ve yazılım yaşam döngüsü",
    subtitle: "Bir ihtiyacın güvenli biçimde canlıya alınmasına kadar olan yolu izleyin.",
    objectives: ["BAI03", "BAI06", "BAI07"],
    story: "Kurgusal bir kurs sitesi indirim hesaplamasını yeniler. Yazılım yaşam döngüsü (SDLC), ihtiyacın tanımlanması, tasarım, geliştirme, test ve kullanıma geçiş aşamalarıdır. Küçük görünen değişiklik de ücret hesabını etkileyebilir.",
    risk: "Yeterince test edilmemiş veya yetkisiz değişiklik, yanlış hesaplamaya, hizmet kesintisine ya da güvenlik zafiyetine yol açabilir.",
    control: "Örnek uygulama: Kurs sitesi, değişiklik kaydında etki değerlendirmesi, test sonucu, canlıya geçiş onayı ve geri dönüş planı tutar. Acil değişiklikler için kimin hangi koşullarda uygulama öncesi hızlandırılmış onay vereceğini, kararın kaydını ve sonradan incelemeyi tanımlar; sonradan inceleme yetkilendirmenin yerine geçmez. Bunlar evrensel COBIT zorunlulukları değil, kuruma uyarlanmış kontrol örnekleridir.",
    evidence: [
      "Dönemsel değişiklik listesi ile aynı kapsamdaki canlıya alma kayıtları; kaynak ve filtre bilgileriyle.",
      "Seçilen değişikliklerin iş ihtiyacı, etki değerlendirmesi ve yetkili onay kayıtları.",
      "Sürümle ilişkilendirilmiş test sonuçları ve kullanıcı kabul kayıtları; test verileri anonim veya sentetik olarak.",
      "Canlıya geçiş zamanı, geri dönüş planı ve acil değişikliklerde tanımlı yetkilendirme yoluna ait karar ile sonradan inceleme kayıtları."
    ],
    steps: [
      "Dönemi, uygulamaları, normal ve acil değişiklik tanımlarını yazılı olarak netleştirin; yalnızca izinli, salt okunur kayıtları kullanın.",
      "Değişiklik listesi ile dağıtım, yani canlıya alma kayıtlarını karşılaştırın; kayıtsız dağıtım veya dağıtımsız kayıt farklarını araştırarak evrenin tamlığını değerlendirin.",
      "İş etkisi yüksek, acil ve başarısız değişikliklerden risk temelli seçim yapın; seçim mantığını ve kapsam dışında kalanları belgeleyin.",
      "Her seçimde sürüm, test sonucu, onay ve dağıtım zamanını izleyin; görev ayrılığını kurumun ölçütlerine göre inceleyin. Kod veya canlı yapılandırma değiştirmeyin.",
      "Geri dönüş hazırlığını inceleyin; acil değişikliklerde tanımlı yetkilendirme yoluna uyulduğunu, yetkili kararı ve sonradan incelemeyi kayıt üzerinden doğrulayın. Çelişkileri ikinci bir kaynakla araştırın ve kanıtın yeterlilik sınırını yazın."
    ],
    redFlags: [
      "Canlıya alınan sürüm ile test edilen sürümün eşleştirilememesi.",
      "Uygulama öncesi yetkilendirmenin gösterilememesi veya sonradan incelemenin yetki yerine kullanılması.",
      "Başarısız dağıtımın sonucu veya geri dönüş kararının kaydedilmemesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun sürüm prosedürü, canlıya alınacak sürüm için kullanıcı kabul kaydı arar. Durum: İncelenen kurgusal sürümün dağıtım kaydı bulunmuş, aynı sürüme ait kabul kanıtı sunulamamıştır. Risk: İş ihtiyacını karşılamayan değişiklik canlıya alınabilir; gerçekten yanlış ücret hesaplandığı iddia edilmez.",
    limits: "Belge bulunamaması testin kesinlikle yapılmadığı anlamına gelmez; kanıt eksikliği olarak ifade edin. Onaylı test planı ve ortamı olmadan dağıtım, geri dönüş veya yük testi yapmayın. Örneklem sonucu tüm değişikliklerin hatasız olduğunu göstermez.",
    exercise: {
      question: "Test sonucu mevcut ama sürüm numarası yok. Kontrolün çalıştığını söyleyebilir misiniz?",
      answer: "Henüz değil. Testin incelenen dağıtımla ilişkisini güvenilir bir sürüm, kayıt veya zaman bağlantısıyla doğrulamak gerekir. Bağlantı kurulamıyorsa bu kanıt sınırlılığını belirtin."
    }
  },
  {
    id: "operasyon-olay-problem",
    title: "Operasyon, olay ve problem yönetimi",
    subtitle: "Hizmeti geri getirmek ile tekrarın nedenini çözmek farklıdır.",
    objectives: ["DSS01", "DSS02", "DSS03"],
    story: "Kurgusal bir kütüphanenin ödünç ekranı haftada birkaç kez açılmaz. Olay yönetimi kesintiyi giderip hizmeti geri getirir. Problem yönetimi ise tekrarlayan olayların altında yatan nedeni araştırır; günlük operasyon da işleri ve uyarıları izler.",
    risk: "Eksik kayıt veya yanlış önceliklendirme, kesintilerin geç ele alınmasına ve aynı sorunun tekrar etmesine neden olabilir.",
    control: "Örnek uygulama: Kütüphane olayları iş etkisine göre sınıflar, sorumlu atar, kapanışı doğrular ve tekrar eden olayları problem kaydına bağlar. Eşikler ve hedef süreler kuruma özgüdür; bu örnek evrensel bir COBIT kuralı değildir.",
    evidence: [
      "Dönemsel olay ve hizmet talebi dökümü; sınıflandırma, zaman damgası ve filtre açıklamasıyla.",
      "İzleme uyarıları, başarısız zamanlanmış iş kayıtları ve bunlarla ilişkilendirilmiş olay numaraları.",
      "Seçilen olayların öncelik, atama, müdahale, çözüm ve kapanış kayıtları.",
      "Tekrarlayan olaylara ilişkin problem kayıtları, kök neden incelemesi ve aksiyon takibi."
    ],
    steps: [
      "Olay, hizmet talebi ve problem tanımlarını kurumun sözlüğünden okuyun; kapsam ve veri maskeleme kurallarını netleştirin.",
      "Olay dökümünün filtrelerini ve toplamlarını inceleyin; izinli izleme uyarıları ve başarısız iş kayıtlarıyla karşılaştırarak evren dışında kalan olay olasılığını değerlendirin.",
      "Yüksek etkili, tekrar eden, yeniden açılan ve uzun süre açık kalan kayıtları risk temelli seçin; sabit örneklem adedi kullanmayın.",
      "Seçilen kayıtların zaman çizelgesini yeniden kurun; öncelik, atama ve kapanışın kurum ölçütleriyle uyumunu salt okunur kayıtlarla test edin.",
      "Tekrarlayan olayların problem ve düzeltici aksiyon bağlantısını izleyin; kapanış beyanını uygulama kanıtıyla destekleyin. Kesinti üretmeyin veya canlı işi yeniden başlatmayın."
    ],
    redFlags: [
      "İzleme uyarısının bulunması fakat ele alındığını gösteren iz bırakılmaması.",
      "Tekrarlayan olayların neden araştırması olmadan sürekli kapatılması.",
      "Hedef süreyi sağlamak için öncelik veya kapanış zamanının açıklamasız değiştirilmesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun problem prosedürü, tanımlı tekrar eşiğini aşan olaylar için neden incelemesi ister. Durum: Kurgusal seçkide bu eşiği aşan bağlantılı olaylar görülmüş, problem kaydı veya gerekçeli istisna sunulamamıştır. Risk: Aynı kesinti tekrarlanabilir; gerçekleşmiş gelir kaybı varsayılmaz.",
    limits: "Kapanmış kayıt, hizmetin kalıcı olarak düzeldiğini tek başına kanıtlamaz. Saat dilimi ve bekleme sürelerinin hedef hesaplamasına etkisini kontrol edin. Güvenilirlik için kaynak ve değişiklik izini değerlendirin; çok sayıda kaydın bulunması tek başına yeterlilik sağlamaz.",
    exercise: {
      question: "Uygulamayı yeniden başlatmak olayı çözdü. Problem de çözülmüş sayılır mı?",
      answer: "Hayır. Hizmet geri gelmiş olabilir; tekrarın nedeninin araştırılması ve uygun kalıcı aksiyonun doğrulanması ayrı bir değerlendirmedir."
    }
  },
  {
    id: "sureklilik-yedekleme",
    title: "Süreklilik, yedekleme, RTO ve RPO",
    subtitle: "Yedeğin varlığı ile geri dönebilme yeteneğini ayırın.",
    objectives: ["DSS04", "APO12", "BAI04"],
    story: "Kurgusal bir atölye sipariş sistemini kullanamazsa üretim sırasını göremez. RTO, kesintiden sonra hizmeti geri getirmek için hedeflenen süredir. RPO, verinin hangi geçmiş noktaya kadar geri getirilebilmesini hedeflediğimizi ve tolere edilen veri kaybı zaman aralığını anlatır.",
    risk: "Yedeklerin kapsam dışı, okunamaz veya geri yüklenemez olması, kesinti süresinin ve veri kaybının işin kabul ettiği sınırları aşmasına yol açabilir.",
    control: "Örnek uygulama: Atölye, iş etki analizine göre RTO ve RPO hedefleri onaylar; ilgili sistemleri yedekler ve yalıtılmış ortamda planlı geri yükleme kanıtı tutar. Yedekleme sıklığı veya test takvimi evrensel COBIT kuralı değildir.",
    evidence: [
      "İş etki analizi, kritik hizmet listesi ve hizmet bazında onaylı RTO/RPO hedefleri.",
      "Sistem envanteriyle ilişkilendirilmiş yedekleme kapsamı ve iş sonuçları; başarısızlıklar dahil.",
      "Yedek saklama, erişim koruması ve ayrı konum veya ortam tasarımına ilişkin sır içermeyen kayıtlar.",
      "Onaylı geri yükleme veya süreklilik tatbikatı planı, zaman çizelgesi, veri doğrulaması ve aksiyon kayıtları."
    ],
    steps: [
      "İş sahibinden hedeflerin anlamını ve hangi hizmetleri kapsadığını doğrulayın; denetçinin hedefleri kendi başına belirlememesi gerektiğini not edin.",
      "Kritik hizmet ve sistem envanterini yedekleme kapsamıyla eşleştirin; iş listesinin ve başarısız iş raporunun tamlığını kaynak toplamlarıyla kontrol edin.",
      "Farklı risk ve bağımlılıkları temsil eden hizmetleri seçin; yedek sonuçlarını ve istisnaların ele alınmasını kayıt üzerinden inceleyin.",
      "Mevcut onaylı geri yükleme kanıtındaki başlangıç, hizmetin hazır olma zamanı ve kurtarılan veri noktasını ilgili RTO/RPO hedefleriyle karşılaştırın.",
      "Sonuçların veri bütünlüğü ve hizmet bağımlılıklarını kapsayıp kapsamadığını değerlendirin. Yeni test gerekiyorsa açık onay, yalıtılmış ortam ve veri koruma planı isteyin; canlıda geri yükleme veya kesinti başlatmayın."
    ],
    redFlags: [
      "Yedek işi başarılı görünürken geri yükleme kanıtının bulunmaması.",
      "Kritik hizmetin veritabanının kapsanması ancak gerekli yapılandırma veya bağımlılıklarının dışarıda kalması.",
      "Tatbikat sonucunun hedefle karşılaştırılmaması veya açık aksiyonların izlenmemesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun süreklilik planı, kritik hizmetin onaylı RTO hedefinin tatbikatta değerlendirilmesini ister. Durum: Kurgusal tatbikat raporu yedeğin açıldığını belirtir, hizmetin kullanıma hazır olduğu zamanı kaydetmez. Risk: Hedef sürede geri dönüş yeteneği doğrulanamayabilir; hedefin fiilen aşıldığı veya veri kaybolduğu ileri sürülmez.",
    limits: "Başarılı yedek kaydı, RTO veya RPO'nun sağlandığını göstermez. Tek bileşen testi uçtan uca hizmet kurtarmayı kanıtlamayabilir. Test koşulları ile gerçek kesinti koşulları arasındaki farkı ve kanıtın güncelliğini açıklayın.",
    exercise: {
      question: "Son kurtarılabilir yedek 09.00, varsayımsal kesinti 12.00 ve RPO hedefi bir saat. Ne söylenebilir?",
      answer: "Başka kurtarma kaynağı yoksa üç saatlik veri aralığı riske açıktır ve bir saatlik hedef bu senaryoda karşılanmaz. İşlem günlükleri gibi ek kaynakları doğrulamadan kesin gerçek veri kaybı sonucu yazılmaz."
    }
  },
  {
    id: "uygulama-veri-arayuz",
    title: "Uygulama kontrolleri, veri ve arayüzler",
    subtitle: "Verinin girişten çıkışa eksiksiz ve doğru taşınmasını inceleyin.",
    objectives: ["DSS06", "APO14", "BAI03"],
    story: "Kurgusal bir mağazanın internet siparişleri her gece muhasebeye aktarılır. Arayüz, iki sistem arasında veri taşıyan bağlantıdır. Giriş doğrulaması, hesaplama kontrolü ve iki sistemin toplamlarını karşılaştırma farklı hata türlerini yakalayabilir.",
    risk: "Eksik, mükerrer veya yanlış eşleştirilmiş kayıtlar; sipariş, stok ya da muhasebe bilgisinin hatalı görünmesine neden olabilir.",
    control: "Örnek uygulama: Mağaza, aktarım kimliği ve kayıt toplamlarını karşılaştırır, hatalı kayıtları ayrı kuyruğa alır ve yeniden işlemeyi yetkilendirir. Bu, kuruma özgü bir kontrol tasarımıdır; COBIT her arayüz için aynı yöntemi zorunlu tutmaz.",
    evidence: [
      "Veri akış şeması, arayüz envanteri ve alan eşleştirme kuralları; kişisel veri içermeyen örneklerle.",
      "Aynı dönem ve kapsam için kaynak ve hedef kayıt sayıları, tutar toplamları ve aktarım kimlikleri.",
      "Hata kuyruğu, yeniden işleme ve toplam karşılaştırması inceleme kayıtları.",
      "Onaylı iş kuralları ile mevcut sentetik veri testlerinin beklenen ve gerçekleşen sonuçları."
    ],
    steps: [
      "İş sahibinden kritik veri alanlarını, doğruluk kurallarını ve aktarım sınırlarını öğrenin; yalnızca anonimleştirilmiş veya sentetik veriye erişin.",
      "Arayüz envanterini zamanlanmış aktarım kayıtlarıyla karşılaştırın; kaynak ve hedef raporlarında aynı dönem, para birimi ve filtrelerin kullanıldığını doğrulayarak evren tamlığını değerlendirin.",
      "Risk temelli aktarım ve işlem seçimi yapın; kaynak kaydı hedefe, hedef kaydı kaynağa izleyerek eksiklik ve mükerrerlik olasılıklarını inceleyin.",
      "Kayıt sayısı ve tutar toplamlarını izinli dışa aktarımlar üzerinden yeniden hesaplayın; farkları, hata kuyruğunu ve yeniden işleme onayını takip edin.",
      "Mevcut test kanıtlarını iş kurallarıyla karşılaştırın. Yeni test için açıkça onaylanmış test ortamı ve sentetik veri kullanın; canlı sisteme deneme işlemi göndermeyin."
    ],
    redFlags: [
      "Kaynak ve hedef toplamlarının farklı dönem veya filtrelerle karşılaştırılması.",
      "Hata kuyruğundaki kayıtların sorumlu ve sonuç bilgisi olmadan beklemesi.",
      "Yeniden aktarımın mükerrer kaydı nasıl önlediğinin açıklanamaması."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun arayüz prosedürü, aktarım sonrası kayıt sayısı ve tutar toplamlarının uzlaştırılmasını ister. Durum: Kurgusal aktarım için kayıt sayısı karşılaştırılmış, tutar karşılaştırmasının kanıtı bulunamamıştır. Risk: Sayı aynı kalsa da tutar hataları fark edilmeyebilir; mali tablonun yanlış olduğu iddia edilmez.",
    limits: "Eşit toplamlar her satırın doğru olduğunu kanıtlamaz; birbirini dengeleyen hatalar olabilir. Sistemden üretilen raporun sorgu ve filtre güvenilirliğini değerlendirin. Kontrolün tasarımı ile dönem içindeki fiili işleyişini ayrı sonuçlandırın.",
    exercise: {
      question: "Kaynakta ve hedefte 100 kayıt var. Aktarımın doğru olduğunu kanıtladınız mı?",
      answer: "Hayır. Aynı sayıya rağmen farklı veya hatalı kayıtlar olabilir. İşlem kimlikleri, kritik alanlar, tutar toplamları ve hata kayıtları gibi ek kanıtlarla doğruluk ve tamlığı değerlendirin."
    }
  },
  {
    id: "ucuncu-taraf-bulut",
    title: "Üçüncü taraf, bulut ve SOC raporları",
    subtitle: "Hizmet dışarıdan alınsa da sorumlulukları görünür tutun.",
    objectives: ["APO09", "APO10", "MEA04"],
    story: "Kurgusal bir dernek üyelik uygulamasını buluttan alır. Sağlayıcı altyapıyı yönetirken dernek kullanıcı erişimlerini yönetir. SOC raporu, türüne göre belirli bir tarih veya dönem ve tanımlı hizmet kapsamı için kontrollere ilişkin bağımsız güvence sağlar; her hizmeti ve tüm riskleri kapsayan bir garanti değildir.",
    risk: "Sağlayıcının kapsamı, sorumlulukları ve güvencesi yanlış anlaşılırsa hizmet kesintisi, veri koruma veya erişim riskleri yönetilmeden kalabilir.",
    control: "Örnek uygulama: Dernek, kritik sağlayıcıları sınıflar; sözleşme, hizmet hedefleri, uygun güvence raporu ve kendi üstlendiği kontrolleri birlikte inceler. Her sağlayıcıdan aynı raporun istenmesi evrensel COBIT şartı değildir.",
    evidence: [
      "Kritik hizmetlerle eşleştirilmiş sağlayıcı envanteri, risk değerlendirmesi ve sorumluluk paylaşım tablosu.",
      "İlgili sözleşme ve hizmet seviyesi anlaşması bölümleri; gizli ticari veya kişisel ayrıntılar çıkarılmış olarak.",
      "Yetkili paylaşım izni bulunan SOC veya eşdeğer güvence raporunun kapsamı, dönemi, görüşü ve istisnaları.",
      "Müşterinin uygulaması beklenen kontrollerin değerlendirmesi, hizmet performans raporları ve açık aksiyon takibi."
    ],
    steps: [
      "Sağlayıcı listesini satın alma ve kullanılan hizmet kayıtlarıyla izinli biçimde karşılaştırın; evrenin tamlığını ve kritik hizmet eşleşmelerini değerlendirin.",
      "Risk temelli sağlayıcı seçin; veri, erişim, süreklilik, olay bildirimi ve çıkış sorumluluklarını sözleşme ve paylaşım tablosunda izleyin.",
      "SOC raporunun hizmetini, kapsadığı tarihi veya dönemi ve kapsamını okuyun. Tip 1'in belirli tarihte kontrol tasarımının uygunluğunu, Tip 2'nin ise tanımlı dönem boyunca tasarımın uygunluğuna ek olarak kontrollerin etkin işleyişini değerlendirdiğini ayırt edin; SOC 1'i mali raporlamayla ilgili kontroller, SOC 2'yi ilgili güven hizmetleri ölçütleri bağlamında yorumlayın.",
      "Görüşü, varsa işleyiş testlerinin istisnalarını, kapsam dışı bırakılan alt hizmet sağlayıcılarını ve müşterinin uygulaması beklenen tamamlayıcı kontrolleri inceleyin; raporun kapsadığı tarih veya dönem sonu ile denetlenen dönem arasındaki boşluk için ek kanıt gereksinimini değerlendirin.",
      "Sağlayıcı beyanlarını uygun bağımsız rapor ve kurum kayıtlarıyla destekleyin; eksik veya paylaşımı kısıtlı kanıtın sonuç üzerindeki etkisini yazın. Bulut ayarı değiştirmeyin veya sağlayıcıya izinsiz test uygulamayın."
    ],
    redFlags: [
      "Sunulan güvence raporunun kullanılan hizmeti veya ilgili dönemi kapsamaması.",
      "Müşterinin üstlenmesi gereken erişim kontrolünün sağlayıcı yapıyor sanılması.",
      "Rapordaki istisnalar ve alt hizmet sağlayıcı kapsamının değerlendirilmemesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun tedarikçi prosedürü, kritik hizmetin müşteri sorumluluklarının atanmasını ister. Durum: Kurgusal sağlayıcı raporu müşteri erişim incelemesi bekler, ancak kurumda bu iş için sorumlu ve uygulama kanıtı gösterilememiştir. Risk: Uygunsuz erişim fark edilmeyebilir; sağlayıcının ihlale uğradığı sonucu çıkarılmaz.",
    limits: "SOC bir COBIT uygunluk belgesi değildir. Rapor türü ve kapsamı ihtiyaca uygun olmalıdır; olumlu görüş tüm kontrollerin kusursuz olduğu anlamına gelmez. Rapor paylaşım kısıtlarına uyun; gizli raporu eğitim sitesine veya herkese açık bir araca yüklemeyin.",
    exercise: {
      question: "Sağlayıcı SOC 2 Tip 2 raporu verdi. Artık kullanıcı erişimlerini incelemeye gerek kalmadı mı?",
      answer: "Gerek kalmadığı söylenemez. Raporun kapsamı ve müşterinin uygulaması beklenen kontroller incelenir. Kurumun sorumluluğundaki kullanıcı erişimleri için ayrıca yeterli ve güvenilir kanıt gerekir."
    }
  },
  {
    id: "guvenlik-yonetisimi",
    title: "Güvenlik yönetişimi, varlık, yama ve izleme",
    subtitle: "Teknik kayıtları risk sahipliği ve kararlarla ilişkilendirin.",
    objectives: ["EDM03", "APO12", "APO13", "BAI09", "DSS05"],
    story: "Kurgusal bir tasarım stüdyosu hangi cihazların kimde olduğunu ve hangi güncellemelerin ertelendiğini tek yerde göremez. Yama, yazılımdaki hatayı veya açığı gideren güncellemedir. Yönetişim risk kararlarına yön verir ve gözetir; yönetim bu kararları günlük işlere dönüştürür.",
    risk: "Sahipsiz varlıklar, değerlendirilmemiş güncelleme açıkları ve izlenmeyen uyarılar; güvenlik risklerinin fark edilmeden veya yetkisizce kabul edilmesine yol açabilir.",
    control: "Örnek uygulama: Stüdyo varlıklara sorumlu atar; yamaları risk ve uyumluluk etkisine göre değerlendirir, ertelemeyi yetkili risk sahibine onaylatır ve uyarıların ele alınmasını izler. Tek bir yama süresi veya araç evrensel COBIT kuralı değildir.",
    evidence: [
      "Maskelenmiş varlık envanteri, sahiplik ve kritiklik bilgisi; kaynak ve güncelleme tarihiyle.",
      "Güvenlik politikası, risk kayıtları, kabul veya erteleme kararları ve gözetim toplantısı kararları.",
      "Mevcut izinli yama durum raporları, dağıtım sonuçları ve onaylı istisna kayıtları.",
      "İzleme kapsamı, seçilen uyarıların ele alınma kayıtları ve kayıt saklama ayarlarının sır içermeyen dökümü."
    ],
    steps: [
      "Üst yönetimin risk gözetimini, risk sahiplerini ve güvenlik yönetiminin görevlerini belgelerden ayırın; kurumun kendi ölçütlerini belirleyin.",
      "Varlık envanterini mevcut ve izinli cihaz yönetim raporlarıyla karşılaştırın; eksik, yinelenen veya kapsam dışında kalan varlıkları araştırın. Yeni ağ taraması başlatmayın.",
      "Kritiklik ve risk temelinde varlıklar seçin; mevcut yama raporlarını kurumun değerlendirme, test ve uygulama ölçütleriyle karşılaştırın.",
      "Geciken yamaların gerekçesini, yetkili risk kabulünü, geçerlilik süresini ve alternatif önlemlerini kayıt üzerinden inceleyin; yama yüklemeyin veya güvenlik ayarını değiştirmeyin.",
      "Seçilen mevcut uyarıları sorumlu ataması ve sonuç kaydına izleyin; raporların kapsamını, güncelliğini ve kaynak güvenilirliğini değerlendirerek yeterli kanıt olmayan alanları açıkça belirtin."
    ],
    redFlags: [
      "Kritik bir varlığın sahibinin veya güvenlik izleme kapsamının bilinmemesi.",
      "Yama ertelemesinin süresiz ve yetkili risk sahibi kararı olmadan sürmesi.",
      "Uyarıların üretildiğinin bilinmesi ama incelendiğinin gösterilememesi."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun yama politikası, ertelemeler için gerekçeli ve süreli risk onayı ister. Durum: İncelenen kurgusal varlığın yaması ertelenmiş; geçerli onay veya alternatif önlem kanıtı sunulamamıştır. Risk: Bilinen güvenlik riski değerlendirilmeden sürebilir; açığın istismar edildiği ya da veri sızdığı iddia edilmez.",
    limits: "Bu program sızma testi değildir. Saldırı, parola denemesi, istismar, zararlı dosya veya aktif tarama adımı içermez. Mevcut raporlardaki 'açık' bilgisi başarılı saldırı kanıtı sayılmaz. Üretim ortamında her ek işlem için açık onay gerekir.",
    exercise: {
      question: "EDM03 ile APO12 ve APO13 neden aynı şey değildir?",
      answer: "EDM03, risk optimizasyonunun yönetişim düzeyinde değerlendirilmesi, yönlendirilmesi ve izlenmesiyle ilgilidir. APO12 riskin, APO13 güvenliğin yönetimine odaklanır. DSS05 ise güvenlik hizmetlerinin operasyonel yönetimiyle ilişkilidir."
    }
  },
  {
    id: "denetim-planlama-raporlama",
    title: "Denetim planlama, kanıt, raporlama ve takip",
    subtitle: "Soruyu, ölçütü, kanıtı ve sonucu birbirine bağlayın.",
    objectives: ["MEA02", "MEA04", "APO12"],
    story: "Kurgusal bir eğitim kooperatifi kayıt sistemindeki riskleri anlamak ister. Denetçi önce neyi, hangi dönemde ve hangi ölçüte göre inceleyeceğini yazar. Kanıt, sonucu destekleyen bilgidir; bulgu ise ölçüt ile gözlenen durum arasındaki gerekçeli farkı anlatır.",
    risk: "Belirsiz kapsam, eksik evren veya zayıf kanıt; desteklenmeyen sonuçlara, önemli risklerin atlanmasına ve etkisiz aksiyonlara yol açabilir.",
    control: "Örnek uygulama: Denetim ekibi risk temelli plan, kanıt kaynağı kontrolü, çalışma kâğıdı gözden geçirmesi ve aksiyon doğrulaması uygular. Bu örnek yöntem evrensel COBIT kuralı veya COBIT uygunluk kontrol listesi değildir.",
    evidence: [
      "Onaylı amaç, kapsam, dönem, yetkilendirme, risk değerlendirmesi ve kullanılacak ölçütler.",
      "İncelenecek evrenin kaynak, filtre ve toplam bilgileri; tamlık kontrolleri ve örneklem seçim gerekçesi.",
      "Kaynağı ve tarihi belli maskelenmiş kanıtlar, test sonuçları, çelişkiler ve gözden geçirme kayıtları.",
      "Ölçüt, durum ve risk içeren taslak bulgular; yönetim yanıtı, aksiyon sahibi, hedef tarih ve takip kanıtı."
    ],
    steps: [
      "Amaç, kapsam, dönem, rapor alıcısı, erişim yetkisi ve ölçütleri yazılı netleştirin; bağımsızlığı etkileyen rolleri açıklayın. Kurum politikası ile COBIT referansını birbirine karıştırmayın.",
      "Her test için evreni tanımlayın; rapor filtresi, tarih aralığı ve kaynak toplamını doğrulayın. Eksik evrenden seçilen örneklerin bütünü temsil ettiği iddiasında bulunmayın.",
      "Riske göre test ve örnek seçin; kontrol tasarımı ile dönem içindeki işleyişini ayrı değerlendirin. Örnek sayısını otomatik bir kurala bağlamayın.",
      "Kanıtın yeterliliğini, yani sonucu destekleyecek kapsam ve miktarı; güvenilirliğini, yani kaynağı, bütünlüğü ve doğrulanabilirliğini ayrı değerlendirin. Çelişkileri araştırın, gerekirse izinli ek kanıt isteyin.",
      "Bulguyu ölçüt, gözlenen durum ve olası riskle yazın; yönetim açıklamasını değerlendirin. Aksiyonun sahibi ve hedef tarihini kaydedin; takipte yalnızca 'tamamlandı' beyanına değil uygulama kanıtına dayanarak kapanışı değerlendirin."
    ],
    redFlags: [
      "Tamlığı kontrol edilmemiş bir rapordan seçilen kayıtlarla tüm dönem için kesin hüküm verilmesi.",
      "Tek bir sözlü açıklama veya bağlamsız ekran görüntüsünün kesin sonuç için kullanılması.",
      "Gerçekleştiği doğrulanmamış zararın bulguya yazılması ya da kanıtsız aksiyon kapatılması."
    ],
    sampleFinding: "Örnek bulgu — Ölçüt: Kurumun aksiyon takip prosedürü, kapanıştan önce uygulama kanıtı incelemesi ister. Durum: Kurgusal takip kaydı yalnızca sorumlunun 'tamamlandı' mesajıyla kapatılmıştır; doğrulama kaydı bulunamamıştır. Risk: Aksiyon uygulanmadan risk giderilmiş sayılabilir; aksiyonun gerçekte yapılmadığı veya zarar oluştuğu kesinleştirilmez.",
    limits: "COBIT hedef kodları düşünmeye yardımcı referanslardır; bu testleri uygulamak COBIT'e uyum veya güvence belgesi sağlamaz. Denetim mutlak garanti değildir. Yetki, kapsam, veri kısıtları ve örnekleme sınırlarını rapora yazın; sırları ve gerçek işverenin kişisel veya gizli verilerini eğitim içeriğine taşımayın.",
    exercise: {
      question: "Kaynağı belirsiz 500 ekran görüntüsü mü, kaynağı doğrulanmış tek kayıt mı daha iyi kanıttır?",
      answer: "Sayı tek başına karar verdirmez. Doğrulanmış kayıt daha güvenilir olabilir ama evrenin veya dönemin tamamı hakkında sonuç için yeterli olmayabilir. Yeterlilik ve güvenilirlik birlikte değerlendirilir; gerektiğinde ek kanıt ve tamlık testi gerekir."
    }
  }
];
