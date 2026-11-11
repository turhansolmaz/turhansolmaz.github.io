window.COBIT_CONTENT = {
  lessons: [
    {
      id:"risk-kontrol-kanit", title:"Önce üç kelime: risk, kontrol, kanıt", time:12, level:"Sıfırdan", summary:"Bir çalışan ayrılıyor ama hesabı açık kalıyor. Denetimin mantığını tek bir olayla öğren.",
      intro:"Teknik kelimelerden önce günlük bir soruyla başlayalım: Bir işte ne ters gidebilir ve buna karşı ne yapıyoruz? IT denetiminin temeli budur. IT, bilgi teknolojileridir; şirketin uygulamalarını, bilgisayarlarını, ağını ve verisini düşün.",
      sections:[
        {title:"Risk: Ne ters gidebilir?",text:"Bir çalışan şirketten ayrıldıktan sonra hesabı açık kalırsa şirket verilerine erişebilir. Bu, mutlaka eriştiği veya veri çaldığı anlamına gelmez. Risk, istenmeyen bir olayın olasılığı ve etkisiyle ilgilidir.",bullets:["Olay: Eski çalışanın yetkisiz erişimi.","Olası etki: Gizli verinin görülmesi veya siparişlerin değiştirilmesi.","Soru: Bu durum hangi iş sonucuna zarar verebilir?"]},
        {title:"Kontrol: Riski azaltmak için ne yapıyoruz?",text:"İK ayrılan kişiyi bildirir; yetkili ekip hesaplarını kapatır; kapatma kontrol edilir. Bu adımlar riskin gerçekleşmesini önlemeye veya tespit etmeye yardım eder. Kontrol bir araç, insanın yaptığı inceleme veya ikisinin birleşimi olabilir.",bullets:["Önleyici kontrol: Yetkisiz hesabın girişini engellemek.","Tespit edici kontrol: Açık kalan eski çalışan hesaplarını düzenli aramak.","Bir kontrolün sahibi, zamanı, kapsamı ve istisna yolu belli olmalı."]},
        {title:"Kanıt: Yapıldığını nereden biliyoruz?",text:"“Biz hesapları kapatıyoruz” bir açıklamadır. Hesabın kapatma zamanını gösteren sistem kaydı, bunu destekleyen bir kanıttır. Bir liste, log yani olay günlüğü, onay veya test sonucu kanıt olabilir. Kaynağı ve kapsamı bilinmeyen kayıt, göründüğü kadar güçlü olmayabilir."}
      ],
      example:{title:"Çözülmüş örnek: Deniz'in hesabı",story:"Kurgusal kurumun kuralı, erişimin ayrılış yürürlüğe girdiğinde kapatılması. Deniz pazartesi 18.00'de ayrılıyor; ERP hesabı perşembe 10.00'da kapanıyor. ERP, sipariş ve stok gibi işlerin tutulduğu kurumsal yazılımdır.",steps:["Kriter: Kurumun belirlediği kapatma kuralı. Bu saat kuralını COBIT'in evrensel şartı sanma.","Gözlem: ERP erişiminin kapatma kaydı yaklaşık üç gün gecikmiş.","Araştırma: Hesap başka bir katmanda engellenmiş mi, hangi yetkiler var, kayıt saatleri doğru mu?","Sonuç: Kanıt uygunsa zamanında kapatma eksikliği raporlanır. Veri çalındığı kanıtlanmadan böyle bir iddia yazılmaz."]},
      takeaway:"Ne ters gidebilir? → Bunu azaltmak için ne yapılıyor? → Yapıldığını hangi kanıtla anlayabilirim?",
      audit:"Yönetimin açıklamasını dinle; ama sonucu açıklamaya değil uygun ve güvenilir kanıta dayandır. Kanıt toplarken kişisel veri ve sırları gereksiz yere kopyalama.",
      exercise:{question:"Bir şirket her gece yedek alıyor ama hiç geri yükleme denememiş. Riski, mevcut kontrolü ve isteyeceğin kanıtı ayrı ayrı yaz.",answer:"Risk: Kesintiden sonra verinin veya hizmetin geri getirilememesi. Mevcut kontrol: Yedekleme işi; tek başına yeterli olduğu gösterilmemiş. Kanıt: Yedekleme kayıtlarına ek olarak geri yükleme testi, açılabilen verinin bütünlük kontrolü, ölçülen toparlanma süresi ve başarısızlıkların takibi."},
      source:"Giriş, Bölüm 1 ve 4; örnek ve temel denetim açıklamaları özgün eğitim içeriğidir."
    },
    {
      id:"cobit-nedir",title:"COBIT nedir, ne değildir?",time:12,level:"Temel",summary:"Teknik kontrol listesi değil: teknolojiyle ilgili kararları işin ihtiyacına bağlayan bir rehber.",
      intro:"COBIT 2019, kurumun bilgi ve teknolojisini iş amaçlarına katkı verecek şekilde yönlendirmesine ve yönetmesine yardımcı olan bir çerçevedir. Çerçeve, bütün ayrıntıları senin yerine belirleyen bir reçete değil; doğru soruları ve bağlantıları kuran bir modeldir.",
      sections:[
        {title:"Bir şirket neden buna ihtiyaç duyar?",text:"Bir fabrika yeni üretim yazılımı alıyor. BT çalıştırabilir; ama yatırımın neden yapıldığı, hangi faydanın beklendiği, hangi risklerin kabul edileceği ve sonuçtan kimin sorumlu olduğu belirsizse teknoloji tek başına başarı getirmez.",bullets:["İş amacı: Teslimatları daha güvenilir yapmak.","Teknoloji katkısı: Planlama bilgisini doğru ve zamanında sunmak.","Yönetim düzeni: Yetki, süreç, insan, bilgi ve ölçümün birlikte çalışması."]},
        {title:"Değer = sadece ucuz olmak değil",text:"Değer üretirken fayda, risk ve kaynakları birlikte düşünürüz. En ucuz yedekleme çözümü üretimi iki gün durduruyorsa pahalıya mal olabilir. En pahalı ürün de iş ihtiyacını karşılamıyorsa iyi yatırım değildir.",bullets:["Fayda: İşte hangi sonuç iyileşecek?","Risk: Neyi kaybedebiliriz; hangi belirsizlikleri yönetmeliyiz?","Kaynak: Para, insan, zaman ve altyapıyı nasıl kullanıyoruz?"]},
        {title:"COBIT ne yapmaz?",text:"Hangi marka güvenlik ürünü alınacağını, kaç sunucu kurulacağını veya her şirkette aynı kontrol süresini söylemez. ISO/IEC 27001 gibi standartların, ITIL gibi hizmet yönetimi kaynaklarının veya teknik yapılandırma rehberlerinin yerine geçmez. Bunlarla birlikte kullanılabilir. Yalnızca BT bölümünü değil, şirketin her yerindeki bilgi ve teknoloji kullanımını kapsar."}
      ],
      example:{title:"Çözülmüş örnek: Araç satın almak başarı mı?",story:"Şirket bir izleme aracı aldı. Yönetici “proje başarılı” diyor ama kesintiler aynı düzeyde.",steps:["Satın alma bir teslimattır; iş faydası değildir.","Beklenen faydayı tanımla: Daha erken alarm ve daha kısa kesinti.","Sahibi ve metriği belirle: Örneğin kritik olaylarda müdahaleye kadar geçen süre.","Aracın yanında nöbet, eskalasyon ve eğitim düzenini de değerlendir."]},
      takeaway:"COBIT, teknolojiyi işin amacına bağlar. Ürün seçmez; hangi kararların nasıl ve kim tarafından alınacağını düşünmene yardım eder.",
      audit:"“COBIT var mı?” yerine “Bu iş riski için yeterli kontrol ve hesap verebilirlik var mı?” sorusunu sor. Çerçevenin adı tek başına etkinlik kanıtı değildir.",
      exercise:{question:"Bir şirketin BT başarısını yalnızca “bu yıl 50 bilgisayar aldık” diye ölçmesinde ne eksik?",answer:"Satın alınan sayı kaynak/faaliyet göstergesidir. Kullanıcının işini daha iyi yapıp yapmadığı, hizmet kalitesi, risk, toplam maliyet ve beklenen iş faydası bilinmiyor. İş amacıyla bağlantılı sonuçlar ve sahiplik gerekir."},
      source:"Giriş, Bölüm 1.3, 3.2 ve 4."
    },
    {
      id:"yonetisim-yonetim",title:"Yönetişim ve yönetim: yönü kim verir?",time:15,level:"Temel",summary:"Kurulun risk sınırı koymasıyla ekibin hesabı kapatması neden farklı işler?",
      intro:"Yönetişim, hangi yönde gidileceği ve sonuçların gözetimiyle ilgilidir. Yönetim, bu yön doğrultusunda işleri planlar ve yürütür. İkisi de gereklidir; aynı kavram değildir.",
      sections:[
        {title:"Yönetişim: değerlendir, yön ver, gözet",text:"Kurumun yönetişim organı; paydaş ihtiyaçlarını, seçenekleri ve koşulları değerlendirir. Öncelik ve kararlarla yön verir. Sonuçların ve uyumun verilen yönle tutarlılığını gözetir. Çoğu şirkette üst sorumluluk yönetim kurulundadır; bazı yetkiler uygun yapılara devredilebilir."},
        {title:"Yönetim: planla, kur, işlet, izle",text:"Yönetim; stratejiyi planlara, bütçelere, projelere ve günlük hizmetlere dönüştürür. Yönetici de sonuçları izler. Bu nedenle “izleme” kelimesini görmek otomatik olarak yönetişim demek değildir.",bullets:["Kurul: Kritik hizmet riskine ilişkin kabul sınırını belirler.","Yönetim: İş etki analizini yapar, çözüm planını ve kaynak ihtiyacını hazırlar.","Ekip: Planı uygular, test eder, sonucu kaydeder."]},
        {title:"Hesap verebilirlik ve denetçinin sınırı",text:"Hesap vermek, bir sonucun sorumluluğunu taşımaktır. İşi yapanla sonuç için hesap veren aynı kişi olabilir; ama yetki açık olmalıdır. Bağımsız denetçi kontrolü değerlendirir. İşletme kararlarını yönetim yerine alırsa daha sonra kendi kararını denetleme sorunu doğabilir."}
      ],
      example:{title:"Çözülmüş örnek: Kesinti toleransı",story:"Bir lojistik şirketinde kritik planlama hizmeti için kesinti riski artıyor.",steps:["Yönetişim: İş etkisini ve seçenekleri değerlendirip risk yaklaşımına yön verir.","Yönetim: Hedefler doğrultusunda süreklilik planı ve sağlayıcı anlaşması hazırlar.","Operasyon: Geri dönüş testini çalıştırır ve sonucu raporlar.","Denetim: Yetkiyi, planın tasarımını ve gerçek test kanıtını değerlendirir."]},
      takeaway:"Yönetişim yönü ve gözetimi; yönetim uygulamayı düzenler. Denetim, uygun bağımsızlıkla güvence verir.",
      audit:"Risk kabulünü kimin onayladığını ve yetkisinin sınırını kontrol et. Denetçi şirket adına riski kabul etmez; eksikliği ve etkisini bildirir.",
      exercise:{question:"Hizmet yöneticisi aylık SLA raporuna bakıp iyileştirme işi açıyor. Bu yönetişim mi, yönetim mi? SLA ne demek?",answer:"Yönetimdir: Hizmet düzeyini izleyip günlük/operasyonel iyileştirmeyi yönetiyor. SLA, hizmet seviyesi anlaşmasıdır; sunulacak hizmetin ölçülebilir beklentilerini ve tarafların yükümlülüklerini tanımlar."},
      source:"Giriş, Bölüm 1.3 ve 4.2."
    },
    {
      id:"bes-alan",title:"Beş alanı bir hikâyede gör",time:15,level:"Temel",summary:"EDM, APO, BAI, DSS ve MEA kodlarını ezberlemeden anlamlandır.",
      intro:"COBIT'in çekirdek modelindeki 40 hedef beş gruba ayrılır. Bunlara alan denir. Bir hedef, elde edilmek istenen yönetişim veya yönetim sonucunu ve bunu destekleyen bileşenleri ele alır. Her hedefin ilişkili bir süreci vardır, fakat hedef sadece süreç değildir.",
      sections:[
        {title:"EDM: Doğru yönde miyiz? — 5 hedef",text:"Evaluate, Direct and Monitor: değerlendir, yön ver ve gözet. Yönetişim alanıdır. Fayda, risk, kaynaklar, paydaş ilişkileri ve yönetişim düzeni burada ele alınır."},
        {title:"APO: Nasıl hazırlanacağız? — 14 hedef",text:"Align, Plan and Organize: hizala, planla ve organize et. Strateji, mimari, bütçe, insan, tedarikçi, risk, güvenlik ve veri gibi yönetim düzenini kurar."},
        {title:"BAI: Nasıl hayata geçireceğiz? — 11 hedef",text:"Build, Acquire and Implement: oluştur, edin ve uygula. İhtiyaçların tanımı, çözüm geliştirme, değişiklik, kabul/geçiş, projeler, varlıklar ve yapılandırma gibi konular bulunur."},
        {title:"DSS: Nasıl çalışır tutacağız? — 6 hedef",text:"Deliver, Service and Support: hizmeti sun, işlet ve destekle. Günlük operasyon, olay/talep, problemler, süreklilik, güvenlik hizmetleri ve iş süreci kontrolleri burada yer alır."},
        {title:"MEA: Nasıl anlayıp değerlendireceğiz? — 4 hedef",text:"Monitor, Evaluate and Assess: izle, değerlendir ve incele. Performans, iç kontrol sistemi, dış gerekliliklere uyum ve güvenceyi kapsar. MEA da bir yönetim alanıdır; “izle” kelimesi onu EDM yapmaz."}
      ],
      example:{title:"Çözülmüş örnek: Yeni sipariş sistemi",story:"Şirket müşterilere daha hızlı sipariş hizmeti vermek istiyor.",steps:["EDM: Beklenen fayda ve kabul edilecek risk için yön belirlenir.","APO: Strateji, kaynak ve tedarikçi planı hazırlanır.","BAI: Sistem geliştirilir/edinilir, test edilir ve kontrollü geçilir.","DSS: Sistem işletilir; talepler ve kesintiler yönetilir.","MEA: Performans ve kontroller değerlendirilir; sapmalar takip edilir. Alanlar bu örnekte sırayla anlatılsa da gerçek hayatta eşzamanlı çalışır."]},
      takeaway:"5 yönetişim hedefi + 35 yönetim hedefi = 40. Alanlar departman veya tek seferlik proje aşaması değildir.",
      audit:"Başlangıçta DSS05 erişim/güvenlik, BAI06 değişiklik, DSS01 işletim, DSS04 süreklilik ve DSS06 uygulama kontrollerine bak. Ancak gerçek kapsamı iş riski belirlemeli.",
      exercise:{question:"Canlı değişiklik onayı, kullanıcı olayı ve dış mevzuat uyumu için hangi üç hedef adaydır?",answer:"BAI06 değişiklik yönetimi; DSS02 hizmet talepleri ve olaylar; MEA03 dış gerekliliklere uyum. Gerçek test kriteri ayrıca kurum kuralı veya uygulanabilir dış yükümlülükle netleştirilir."},
      source:"Giriş, Bölüm 4.2 ve 5; hedefler kataloğu."
    },
    {
      id:"ilkeler-bilesenler",title:"Prosedür yazmak neden yetmez?",time:20,level:"Temel",summary:"Altı sistem ilkesi, üç çerçeve ilkesi ve yedi bileşeni günlük örneklerle öğren.",
      intro:"Bir şirketin yedekleme prosedürü var. Ama tek uzman izinliyken kimse geri yükleme yapamıyor. Yazılı süreç olması, çalışan bir yönetişim sistemi olduğu anlamına gelmiyor.",
      sections:[
        {title:"Altı sistem ilkesi: kurduğun düzen nasıl olmalı?",bullets:["Paydaşlara değer: Yalnız cihaz sayısına değil iş faydası, risk ve kaynağa bak.","Bütüncül yaklaşım: Süreç, insan, bilgi ve araç birlikte çalışmalı.","Dinamik sistem: Buluta geçiş gibi değişimlerde düzeni tekrar değerlendir.","Yönetişim/yönetim ayrımı: Yön verme ile uygulamayı ayır.","Kuruma uyarlama: Küçük işletme ile banka aynı tasarıma sahip olmak zorunda değil.","Uçtan uca kapsam: İş biriminin kendi aldığı yazılım da kapsamın parçası."]},
        {title:"Üç çerçeve ilkesi: kullandığın model nasıl olmalı?",bullets:["Kavramsal model: Parçalar ve aralarındaki ilişkiler tutarlı olmalı.","Açık ve esnek: Yeni konulara uyarlanabilmeli.","İlgili standartlarla uyumlu: Diğer önemli çerçeve, standart ve düzenlemelerle birlikte kullanılabilmeli."]},
        {title:"Yedi bileşen: neleri birlikte tasarlıyoruz?",bullets:["Süreçler: Geri yükleme testi hangi adımlarla yapılır?","Organizasyonel yapılar: Sahibi, yetkilisi ve gözetim yapısı kim?","İlkeler, politikalar ve prosedürler: Yazılı kurallar ve çalışma yöntemi ne?","Bilgi: Test sonucu, zaman ölçümü ve hata raporu nerede?","Kültür, etik ve davranış: Sorunlar gizleniyor mu, bildirmek teşvik ediliyor mu?","İnsanlar, beceriler ve yetkinlikler: İşi yapabilecek eğitimli yedek kişi var mı?","Hizmetler, altyapı ve uygulamalar: Gerekli araç ve ortam çalışıyor mu?"]}
      ],
      example:{title:"Çözülmüş örnek: Prosedür var, test yok",story:"Ekip bir yıldır geri yükleme testi yapmamış. Yönetici sadece prosedürü gösteriyor.",steps:["Süreç: Risk ve iş ihtiyacına uygun test takvimi oluştur.","Yapı: Testin sahibi ve sonuçları inceleyecek rolü belirle.","İnsan: Birden fazla kişinin uygulamalı yetkinliğini geliştir.","Bilgi: Gerçek süre, veri doğrulaması ve eksik aksiyonları kaydet.","Davranış: Başarısız testi gizlemek yerine düzeltme fırsatı olarak ele al."]},
      takeaway:"Süreç tek başına yetmez. Sistem ilkeleri kurumdaki düzeni; çerçeve ilkeleri kullanılan modeli anlatır.",
      audit:"Sadece prosedür isteme. Onu destekleyen yetki, eğitim, gerçek işlem kaydı, bilgi kalitesi ve araç ayarlarına da bak.",
      exercise:{question:"“Yeni izleme aracı aldık ama alarm gelince kimin müdahale edeceği belli değil.” Hangi bileşenler eksik olabilir?",answer:"Organizasyonel yapılar ve sorumluluklar; olay/eskalasyon süreci; politika/prosedür; personel yetkinliği ve nöbet düzeni. Araç, yedi bileşenden yalnızca bir bölümünü karşılıyor."},
      source:"Giriş, Bölüm 3 ve 4.3."
    },
    {
      id:"hedef-zinciri",title:"İş ihtiyacını kontrolle bağla",time:18,level:"Bağlantı kur",summary:"“Hesap kapatalım” demeden önce hangi iş amacını koruduğunu bul.",
      intro:"Bir kontrolün neden yapıldığını açıklayamıyorsan sadece kutu işaretliyor olabilirsin. Hedef zinciri, paydaşın ihtiyacını kurumsal hedefe, teknoloji katkısına ve ilgili COBIT hedeflerine bağlamaya yardım eder.",
      sections:[
        {title:"Dört basamak",bullets:["Paydaş ihtiyacı: Müşteri siparişini söz verilen gün almak istiyor.","Kurumsal hedef: Zamanında ve güvenilir teslimat.","Hizalama hedefi: Bilgi ve teknoloji hizmetleri teslimatın ihtiyaç duyduğu sürekliliği ve doğruluğu sağlasın.","Yönetişim/yönetim hedefleri: Süreklilik, kullanılabilirlik, veri, değişiklik veya tedarikçi yönetimi gibi uygun alanlar."]},
        {title:"Hizalama ne demek?",text:"Teknolojinin çabasının işin istediği sonuca hizmet etmesi demektir. Sadece BT'nin kendi iç verimliliği değildir. COBIT 2019'da 13 kurumsal ve 13 hizalama hedefi vardır. Buradaki örnekler sade serbest ifadelerdir; resmî EG/AG kod eşleştirmesi değildir."},
        {title:"Sonuç ile faaliyeti ayır",text:"“Eğitim verdik”, “araç aldık” veya “100 kayıt inceledik” faaliyeti anlatır. “Yetkisiz erişimler azaldı” ya da “BT nedeniyle geciken sevkiyat oranı düştü” sonuçla ilgilidir. İkisi de izlenebilir ama aynı soruyu cevaplamaz."}
      ],
      example:{title:"Çözülmüş örnek: Sevkiyat aksamasın",story:"ERP kesintisi yüzünden sevkiyatlar gecikiyor.",steps:["İş amacı: BT kaynaklı teslimat gecikmelerini azaltmak.","Teknoloji katkısı: Kritik hizmetin iş ihtiyacına uygun çalışması/toparlanması.","Adaylar: DSS04 süreklilik; BAI04 kullanılabilirlik/kapasite; BAI06 değişiklik; APO09 hizmet anlaşmaları.","İş göstergesi: BT kaynaklı geciken sevkiyat / toplam sevkiyat.","Destekleyici ölçüm: Kapsamı tanımlı kritik hizmet kullanılabilirliği. Her gecikmeyi otomatik olarak BT'ye yükleme."]},
      takeaway:"İş amacı → teknoloji katkısı → uygun hedefler → kontroller → kanıt ve ölçüm. Bağlantılar çoğunlukla çoktan çoğadır.",
      audit:"Bir otomatik iş kontrolüne güveneceksen ilgili erişim, değişiklik ve işletim kontrollerinin bu güveni destekleyip desteklemediğini değerlendir.",
      exercise:{question:"Bir tedarikçi banka hesabının yetkisiz değiştirilmesini önleyen kontrol hangi iş amacını korur? Kanıt olarak ne istersin?",answer:"Ödemelerin doğru ve yetkili alıcıya yapılmasını, kaybın önlenmesini korur. Ana veri değişiklik evreni, yetki ve onay matrisi, değişiklik günlüğü, bağımsız doğrulama ve gerçek işlem kayıtları istenir. DSS06 ve APO14 aday bağlantılardır; kod tek başına yeterli kriter değildir."},
      source:"Giriş, Bölüm 4.6; Hedefler, eşleştirme ekleri."
    },
    {
      id:"kuruma-uyarlama",title:"Her şirkette aynı kontrol mü?",time:20,level:"Bağlantı kur",summary:"11 tasarım faktörü ve odak alanlarıyla doğru önceliği seç.",
      intro:"Bir bankayla küçük bir tasarım ofisinin teknoloji riskleri aynı değildir. COBIT ortak bir model sunar; ama hedeflerin önceliği, bileşenlerin tasarımı ve hedef yetkinlik seviyesi bağlama göre belirlenir.",
      sections:[
        {title:"11 tasarım faktörü",bullets:["Kurum stratejisi: Büyüme, yenilik, maliyet veya istikrar ağırlığı.","Kurumsal hedefler: İşte neyi başarmak istiyoruz?","Risk profili: Hangi riskler ne kadar önemli?","Mevcut bilgi/teknoloji sorunları: Şu anda neler ters gidiyor?","Tehdit ortamı: Hangi dış/iç tehditlerle karşı karşıyayız?","Uyum gereklilikleri: Mevzuat, sözleşme ve diğer yükümlülükler.","BT'nin rolü: Destekleyici mi, stratejik mi, operasyon için ne kadar kritik?","BT kaynak sağlama modeli: İç ekip, dış kaynak, bulut veya karışık model.","BT uygulama yöntemleri: Çözümleri nasıl geliştirip hayata geçiriyoruz?","Teknoloji benimseme stratejisi: Öncü müyüz, olgunlaşmasını mı bekliyoruz?","Kurum büyüklüğü: Ölçek, karmaşıklık ve kaynaklar."]},
        {title:"Odak alanı ne demek?",text:"Siber güvenlik, DevOps, küçük/orta ölçekli işletmeler veya dijital dönüşüm gibi belirli bir konuya uyarlanmış yönetişim yaklaşımıdır. Yeni bir altıncı alan değildir. İlgili hedefleri ve bileşenleri bir araya getirebilir."},
        {title:"Dört aşamada tasarım",bullets:["1. Kurum bağlamını ve stratejisini anla.","2. İlk kapsamı belirle: Hedef, risk ve mevcut sorunlardan başla.","3. Diğer tasarım faktörleriyle kapsamı ayrıntılandır.","4. Öncelik çatışmalarını çöz ve tasarımı sonuçlandır."]},
        {title:"Öncelik sırası bir ezber değil",text:"DSS04 üretim sürekliliği kritik bir kurumda öne çıkabilir. Başka yerde veri kalitesi veya gizlilik daha baskın olabilir. Risk esaslı seçim, zorunlu dış yükümlülükleri yok sayma izni vermez. Buradaki örnekler resmî Design Toolkit puanlaması değildir."}
      ],
      example:{title:"Çözülmüş örnek: ERP dış sağlayıcıda",story:"ParçaNova'nın kritik üretim planlama sistemi dış sağlayıcıda; sık sürüm geçişi ve uzun kesintiler var.",steps:["Dış kaynak modeli: APO10 tedarikçi yönetimi öne çıkar.","Kritik hizmet: DSS04 süreklilik ve BAI04 kullanılabilirlik önem kazanır.","Değişiklik sorunu: BAI06 ve BAI07 incelenir.","Hız ile güvenliği dengele: Riskine göre farklı değişiklik yolları ve yeterli test/onay düzeni tasarla."]},
      takeaway:"40 hedefi aynı derinlikte uygulamak veya her süreci en yüksek seviyeye çıkarmak zorunlu değildir.",
      audit:"Kapsam seçiminde kritik hizmet, veri, büyük değişimler, ayrıcalıklı yetkiler, geçmiş bulgular ve dış gereklilikleri gerekçelendir.",
      exercise:{question:"Şirket buluta taşındığında mevcut denetim planını hiç değiştirmemek neden sorun olabilir?",answer:"Sorumluluk paylaşımı, erişim modeli, sağlayıcı bağımlılığı, günlük kayıtları, veri konumu ve toparlanma yolları değişmiş olabilir. Dinamik sistem ilkesi ve tasarım faktörleri gereği etki değerlendirilip kapsam güncellenir."},
      source:"Giriş, Bölüm 4.4–4.5 ve 7."
    },
    {
      id:"roller-ve-kontrol",title:"Kontrolü kim yapacak, kim hesap verecek?",time:18,level:"Uygula",summary:"RACI, görevler ayrılığı ve hedef–uygulama–aktivite farkı.",
      intro:"“Değişiklikler düzgün onaylanır” demek belirsizdir. Kim onaylar? Ne zaman? Hangi işlemler? Hangi kayıtla? Bir kontrolü denetlenebilir hâle getirmek için bu soruları cevaplamalısın.",
      sections:[
        {title:"Hedef, uygulama, aktivite",bullets:["Hedef: BT değişikliklerini yönetmek; BAI06.","Uygulama: Talepleri değerlendirmek, önceliklendirmek ve yetkilendirmek; örneğin BAI06.01.","Aktivite: Belirli bir değişikliğin iş etkisini ve test sonucunu inceleyip kararı kaydetmek. Bu somut cümle eğitim örneğidir."]},
        {title:"RACI: Dört farklı rol",bullets:["R — Responsible: İşi yapan.","A — Accountable: Sonuç için hesap veren, yetkisi dâhilinde sorumluluk taşıyan.","C — Consulted: Görüşüne başvurulan.","I — Informed: Bilgilendirilen.","Eğitim tablolarında tek A kullanmak açıklığı artırır. Gerçek tasarım kurumun yetki modeline göre yapılır; bu bir resmî rol matrisi kopyası değildir."]},
        {title:"Görevler ayrılığı neden gerekli?",text:"Bir kişi tedarikçi açıp banka hesabını değiştiriyor ve ödemeyi de onaylıyorsa hatayı veya suistimali tek başına yapıp gizleyebilir. Yetkileri ayırmak riski azaltır. Küçük ekipte ayırmak zor olduğunda bağımsız inceleme gibi telafi kontrollerinin gerçekten çalıştığı gösterilmelidir."},
        {title:"İyi yazılmış kontrolün parçaları",text:"Sahip + kapsam + tetikleyici/sıklık + yapılacak inceleme + karar/istisna + saklanan kanıt. Örnek: Normal ERP değişiklikleri, iş etkisi ve test/geri dönüş hazırlığı yetkili yönetici tarafından canlıya geçişten önce değerlendirilip zaman damgalı olarak onaylanır. Acil durumun ayrıca yetkili ve izlenebilir yolu vardır."}
      ],
      example:{title:"Çözülmüş örnek: Bir değişikliğin rolleri",story:"Canlı sistem değişikliğinde yetkiler kurumca belirlenmiş olsun.",steps:["Hizmet sahibi: İş kabul beklentilerini belirler.","Değişiklik yöneticisi: Yetkisi çerçevesinde değerlendirme/onayı yürütür.","Operasyon: Onaylı değişikliği uygular ve sonucu kaydeder.","Denetçi: Kontrolün tasarımını ve işleyişini bağımsız değerlendirir; normal değişiklik onayını üstlenmez."]},
      takeaway:"Bir kod veya prosedür kontrolü kendiliğinden çalıştırmaz. Sahiplik, yetki ve kanıt açık olmalı.",
      audit:"Yetki incelemesindeki imzayı görmekle yetinme. Tespit edilen uygunsuz yetkinin gerçekten kaldırıldığını ve istisnaların yetkili yönetildiğini doğrula.",
      exercise:{question:"Bir geliştirici kendi yazdığı kodu tek başına onaylayıp canlıya alabiliyor. Hangi risk var ve neyi araştırırsın?",answer:"Bağımsız değerlendirme olmadan hatalı/yetkisiz değişiklik riski. Gerçek yetkileri, onay ve dağıtım günlüklerini, rol birleşimlerini, zorunlu testleri ve varsa bağımsız telafi kontrolünü incelerim. Yetki varlığı tek başına kötüye kullanım kanıtı değildir."},
      source:"Hedefler, Bölüm 3 ve BAI06; Giriş, Bölüm 6.5.1."
    },
    {
      id:"olcum-yetkinlik",title:"İyi çalıştığını nasıl anlarsın?",time:20,level:"Uygula",summary:"Yüzdeler, KPI/KRI, 0–5 yetkinlik ve olgunluk farkı.",
      intro:"Kontrol sayısı çok olabilir ama iş sonucu kötü kalabilir. Ölçüm, neyin iyi gittiğini ve neyin iyileştirilmesi gerektiğini anlamayı sağlar. Ancak yanlış veriyle hesaplanan güzel bir yüzde yanıltıcıdır.",
      sections:[
        {title:"Performans ve risk göstergesi",text:"KPI, bir amaca ne kadar ulaşıldığını izleyen temel performans göstergesidir. KRI, riske maruz kalmayı/değişimi izlemeye yardım eden temel risk göstergesidir. Aynı ölçüm kullanıldığı karara göre iki amaçla da değerlendirilebilir. Her metrikte tanım, birim, kapsam, veri kaynağı, sıklık, sahip ve hedef açık olmalı."},
        {title:"Süreç yetkinliği: 0–5 ne anlatır?",bullets:["0: Temel yetkinlik yok veya yaklaşım eksik.","1: Başlangıçsal, eksik faaliyetlerle amaca kısmen yaklaşım.","2: Temel ama tam faaliyetlerle süreç amacını elde etme.","3: Kurumsal varlıklardan yararlanan, daha düzenli ve tanımlı süreç.","4: Nicel olarak ölçülen süreç performansı.","5: Ölçümle beslenen sürekli iyileştirme.","Bunlar öğretici özetlerdir. Resmî seviye vermek için ilgili aktiviteler, önceki düzey gereklilikleri, kanıtlar ve uygun değerlendirme yöntemi gerekir."]},
        {title:"Olgunluk aynı şey mi?",text:"Hayır. Yetkinlik süreç düzeyinde ele alınırken olgunluk odak alanının daha bütüncül performansını ifade eder. İlgili süreç ve bileşen gereksinimleri birlikte düşünülür. Birkaç sürecin puanını ortalamak veya tek iyi süreçten şirketin olgunluğunu ilan etmek doğru değildir."},
        {title:"Herkesin hedefi 5 mi?",text:"Hayır. Hedef yetkinlik, iş ihtiyacı, risk ve kaynaklarla gerekçelendirilir. Bir prosedür dosyasının varlığı “3”, bir gösterge panosunun varlığı “4” demek için yeterli değildir."}
      ],
      example:{title:"Çözülmüş örnek: İki basit ölçüm",story:"40 değişikliğin 6'sı başarısız. 720 saatlik ölçüm döneminde 3,6 saat hizmet kesintisi var.",steps:["Başarısız değişiklik oranı: 6 / 40 × 100 = %15.","Kullanılabilirlik: (720 − 3,6) / 720 × 100 = %99,5.","Eğitim hedefleri en fazla %10 ve en az %99,8 ise ikisi de karşılanmadı.","Planlı bakım ve sağlayıcı kesintilerinin kapsamı baştan tanımlı olmalı; sonucu güzelleştirmek için sessizce çıkarılamaz."]},
      takeaway:"Metrik iş sonucunu; yetkinlik sürecin uygulanma biçimini; olgunluk odak alanının bütününü anlamaya yardım eder.",
      audit:"Raporu kullanmadan filtre, tarih aralığı, eksik kayıt ve kaynakla mutabakatı kontrol et. Tam olmayan evrenden iyi örneklem çıkmaz.",
      exercise:{question:"100 değişiklikten 8'i hizmet bozulmasına yol açtı. Oran nedir? Bu bilgi tek başına süreç yetkinliği seviyesini gösterir mi?",answer:"8 / 100 × 100 = %8. Hayır; bu bir performans sonucudur. Seviye için ilgili süreç aktiviteleri, sistematik uygulama ve diğer gereksinimlerin kanıtları değerlendirilir."},
      source:"Giriş, Bölüm 6.1–6.5. Sayısal eşikler eğitim örneğidir."
    },
    {
      id:"denetim-nasil-yapilir",title:"Bir IT denetimi adım adım nasıl yapılır?",time:25,level:"Denetçi bakışı",summary:"Kapsamdan örnekleme, bulgudan kapanışa bir çalışma kâğıdının mantığı.",
      intro:"Denetim, yönetimin bir kontrolü anlattığını duyup evet demek değildir. Hangi konuda, hangi dönem için, hangi kritere göre ve hangi kanıta dayanarak sonuca ulaştığını gösterebilmelisin.",
      sections:[
        {title:"1. Amaç, kapsam ve kriter",text:"Amaç, hangi riske güvence istediğini belirtir. Kapsam; sistem, kurum, dönem ve işlem türlerini sınırlar. Kriter; beklenen durumdur: Geçerli mevzuat, sözleşme, onaylı politika veya açıkça kararlaştırılmış kontrol kuralı. COBIT kodu incelemeyi yapılandırır ama her detayın kriterini tek başına vermez."},
        {title:"2. Tasarım ile işleyişi ayır",text:"Tasarım: Kontrol tarif edildiği gibi çalışırsa riski yeterli karşılar mı? İşleyiş: Seçilen dönemde gerçekten çalışmış mı? Politika tasarımın bir unsurudur. Dönemin onay ve sistem kayıtları işleyişe kanıt olabilir. Bir işlemi baştan sona izlemek, yani walkthrough, akışı anlamanı sağlar; tek başına tüm dönem için yeterli değildir."},
        {title:"3. Evren ve örneklem",text:"Evren, inceleme amacına uyan tüm kayıtlardır. Önce evrenin tamlığı/doğruluğunu kontrol et. Sonra risk, sıklık, yöntem, beklenen sapma ve amaca göre örneklem seç. Her koşula uyan sabit bir “COBIT örnek sayısı” yoktur. Risk esaslı seçimi istatistiksel temsil iddiasıyla sunma."},
        {title:"4. Bulgu ve risk",text:"Kriter + gözlenen durum + kanıtla destekli neden + risk/etki + aksiyon. Neden bilinmiyorsa araştırılacak olarak belirt. Gerçek zarar veya suistimal kanıtlanmadan olmuş gibi yazma. Önem derecesini olasılık, etki, yaygınlık ve telafi kontrolleriyle gerekçelendir."},
        {title:"5. Kapanış ve bağımsızlık",text:"Aksiyonun sahibi ve hedef tarihi belli olmalı. “Eğitim verdik” veya yeni prosedür tek başına kapanış değildir; düzeltmenin işlediğini yeniden test et. Yönetimin kontrolü izlemesiyle bağımsız güvenceyi birbirine karıştırma."}
      ],
      example:{title:"Çözülmüş örnek: Geç onay",story:"Kurum politikası normal değişiklikte ön onay istiyor. Ekim'deki 80 kayıttan risk esaslı seçilen 20'nin 4'ünde onay, geçişten sonra.",steps:["Örneklemde gözlenen oran %20. Evrenin %20'si kesin sorunlu diyemeyiz.","Saat dilimi, kayıt bütünlüğü, onay yetkisi ve normal/acil sınıfını doğrula.","Risk: İş etkisi incelenmeden canlıya değişiklik geçebilmesi; gerçek kesinti olduğunu varsayma.","Aksiyon: Onay yolunu düzelt; sonraki dönem gerçek kayıtlarında ve yetkili kontrollü testte doğrula."]},
      takeaway:"Sonucun gücü, testin ve kanıtın gücü kadardır. Kapsamın dışına taşan kesin hükümler verme.",
      audit:"İnceleme, gözlem, yeniden uygulama ve uygun veri analizini kullanabilirsin. Üretimde işlem veya aktif teknik test için ayrıca açık yetki ve güvenli plan gerekir.",
      exercise:{question:"Kurum “erişim incelemesi yapıyoruz” diyor ve imzalı bir liste veriyor. İşleyiş için başka ne sorarsın?",answer:"Liste tüm ilgili hesap ve yetkileri kapsıyor mu? İnceleyen yetkili ve yeterli bilgiye sahip mi? Hangi ölçüte göre incelemiş? Uygunsuzluk bulmuş mu? Kaldırma/onaylı istisna aksiyonları tamamlanmış mı? Sistem kayıtları ve düzeltme sonrası yetkilerle doğrularım."},
      source:"Giriş, Bölüm 6; Hedefler MEA02/MEA04 ve ilgili hedefler. Denetim adımları özgün genel eğitim notlarıdır."
    },
    {
      id:"itgc-uygulama",title:"ITGC ve uygulama kontrolünü ayır",time:20,level:"Denetçi bakışı",summary:"Bir fatura kuralı ile sistem erişim kontrolünün bağlantısını anla.",
      intro:"ITGC, BT genel kontrolleridir. Birçok uygulamanın güvenilir çalışmasına zemin hazırlayan erişim, değişiklik ve işletim kontrollerini düşün. Uygulama kontrolü ise belirli bir iş işleminin doğru, tam, geçerli ve yetkili olmasına yardım eder.",
      sections:[
        {title:"ITGC örnekleri",bullets:["İşten ayrılan kişinin erişimini kapatma.","Canlı kod değişikliğini yetkili onay/test ile geçirme.","Başarısız kritik işleri izleme ve hatayı takip etme.","İş ihtiyacına göre yedekleme ve toparlanma düzeni."]},
        {title:"Uygulama kontrolü örnekleri",bullets:["Aynı tedarikçi/fatura numarasıyla ikinci faturayı engelleme.","Belirli tutarın üzerindeki siparişe yetkili onay isteme.","Kaynak–hedef arayüz kayıt sayısını ve tutarını uzlaştırma.","Tedarikçi banka hesabı değişikliğini bağımsız doğrulama."]},
        {title:"Neden birlikte inceliyoruz?",text:"Mükerrer fatura kontrolü bugün çalışıyor olabilir. Fakat yetkisiz biri kuralı değiştirebiliyorsa dönem boyunca çalıştığına güven azalır. İlgili erişim ve değişiklik kontrollerini incelersin. Bir ITGC zafiyeti tüm uygulama kontrollerini otomatik olarak geçersiz yapmaz; etkilenen katmanı, kontrolü, dönemi ve alternatif kanıtları değerlendirirsin."},
        {title:"Rapor, arayüz ve Excel dosyaları",text:"Bir insan bir rapora bakarak kontrol yapıyorsa raporun tamlığı/doğruluğu da önemlidir. Arayüzde veri kaybolabilir veya iki kez işlenebilir. Excel gibi kullanıcı araçlarında formül, sürüm, erişim, kaynak veri ve gözden geçirme riskini düşün."}
      ],
      example:{title:"Çözülmüş örnek: İki kez ödeme",story:"Finans ekibi sistemin mükerrer faturayı engellediğini söylüyor.",steps:["Kuralı netleştir: Hangi alan birleşimi, hangi istisnalar?","Yetkili test ortamında beklenen engellemeyi ve izinli istisnayı doğrula.","Kuralı kim değiştirebiliyor ve dönemde değişmiş mi kontrol et.","Gerçek veride tekrarları, engellenen/istisnalı işlemleri ve takip kanıtını incele.","Sonucu sadece bu kontrolün kapsamı ve incelenen dönemle sınırla."]},
      takeaway:"ITGC ortamı destekler; uygulama kontrolü iş işlemini korur. İkisi arasındaki bağı açıkla.",
      audit:"DSS06 ve APO14 iş/veri kontrolleri için; DSS05, BAI06 ve DSS01 destekleyen genel kontroller için başlangıç bağlantılarıdır.",
      exercise:{question:"“Aylık rapor üretildi” ile “raporla kontrol yapıldı” neden farklıdır?",answer:"Rapor üretmek bilgi oluşturur. Kontrol için yetkili kişinin doğru/tam raporu belirli kriterle incelemesi, istisnaları araştırması ve aksiyonları takip etmesi gerekir. Bu inceleme ve takibin kanıtı da aranır."},
      source:"Hedefler DSS06, APO14, DSS05, BAI06 ve DSS01; örnekler özgündür."
    },
    {
      id:"uygulama-yol-haritasi",title:"Öğrendiklerini kalıcı bir düzene çevir",time:20,level:"Birleştir",summary:"Yedi uygulama aşaması, 90 günlük örnek ve mesleki öğrenme planı.",
      intro:"COBIT uygulamak bir PDF doldurmak veya araç satın almak değildir. Gerçek ihtiyaca göre tasarlanan düzenin, günlük işin parçası olması ve ölçülebilir fayda sağlaması gerekir.",
      sections:[
        {title:"Yedi uygulama sorusu",bullets:["1. Değişimi ne tetikliyor? Sorun, risk veya fırsat ne?","2. Şimdi neredeyiz? Mevcut durum ve kanıtlar ne gösteriyor?","3. Nerede olmak istiyoruz? Gerçekçi hedef ne?","4. Ne yapılmalı? Aradaki farkı kapatacak işler hangileri?","5. Oraya nasıl ulaşacağız? Plan, insan, kaynak ve sahiplik ne?","6. Hedefe ulaştık mı? Sonuç ve fayda ne gösteriyor?","7. İvmeyi nasıl koruyacağız? Düzenli inceleme ve sahiplik nasıl sürecek?"]},
        {title:"Tasarım ile uygulamayı karıştırma",text:"Dört aşamalı tasarım akışı, nasıl bir yönetişim sistemi gerektiğini belirlemeye yardım eder. Yedi aşamalı uygulama yaklaşımı, değişimi hayata geçirip sürdürmeyi ele alır. Birbirini destekler; aynı liste değildir. Değişim yönetimi ve program yönetimi de önemlidir."},
        {title:"Sonra ne çalışmalısın?",text:"Önce bir hizmet veya kontrol ailesi seç. İş akışını çiz, riskleri yaz, COBIT bağlantılarını kur, kriteri belirle ve örnek çalışma kâğıdı oluştur. Sonra ilgili teknik kaynağa veya standarda derinleş. Bu site 40 hedefin yönünü anlatır; tüm resmî uygulama/aktiviteleri veya mesleki standardı yeniden üretmez."}
      ],
      example:{title:"Çözülmüş örnek: 90 günlük başlangıç",story:"Kritik ERP hizmetinde değişiklik ve geri yükleme sorunları var. Süreler kurgusal eğitim planıdır.",steps:["0–30 gün: İş etkisi ve kayıtları doğrula; sahipleri ve başlangıç göstergelerini belirle.","31–60 gün: Değişiklik yetkilerini/akışını düzelt; bağımlılıkları içeren toparlanma testi yap; ikinci kişiyi eğit.","61–90 gün: Yeni dönem işleyişini değerlendir; eksik aksiyonları kapat; sonuçları iş sahibiyle gözden geçir.","Sürdür: Test takvimi, metrik sahibi ve düzenli yönetişim incelemesini günlük işe yerleştir."]},
      takeaway:"İyileştirme, sorumlu kişi + uygulanmış kontrol + gerçek kanıt + izlenen iş sonucuyla kalıcı olur.",
      audit:"Denetim önerisi uygulanabilir olmalı; ama çözümün sahibi yönetimdir. Kapanışta belgeyi değil düzeltmenin yeterliliğini ve işleyişini değerlendir.",
      exercise:{question:"“Yeni güvenlik aracı alındı, bulgu kapandı” sonucunu neden hemen kabul etmezsin?",answer:"Aracın riski gerçekten karşılayıp karşılamadığı, doğru kapsam ve ayarlarla çalışması, sorumluların müdahalesi, gerçek dönem kanıtı ve iş etkisi bilinmiyor. Uygun kapanış testi ve kalan risk değerlendirmesi gerekir."},
      source:"Giriş, Bölüm 7–8; sonraki mesleki uygulama için güncel resmî kaynaklar ayrıca kullanılmalı."
    }
  ],
  domains:{
    EDM:{name:"Yön ver ve gözet",full:"Evaluate, Direct and Monitor",kind:"Yönetişim",description:"Kurumun yönü, fayda, risk, kaynak ve paydaş gözetimi."},
    APO:{name:"Planla ve organize et",full:"Align, Plan and Organize",kind:"Yönetim",description:"Strateji, kaynaklar ve yönetim düzeni."},
    BAI:{name:"Hayata geçir",full:"Build, Acquire and Implement",kind:"Yönetim",description:"Çözümler, projeler ve değişiklikler."},
    DSS:{name:"İşlet ve destekle",full:"Deliver, Service and Support",kind:"Yönetim",description:"Günlük hizmetler, süreklilik ve operasyonel kontroller."},
    MEA:{name:"İzle ve değerlendir",full:"Monitor, Evaluate and Assess",kind:"Yönetim",description:"Performans, iç kontrol, uyum ve güvence."}
  },
  objectives:[
    ["EDM01","Yönetişim düzeni","Ensured Governance Framework Setting and Maintenance","Kararların, yetkilerin ve gözetimin nasıl düzenlendiğini ele alır.","Hangi kararın sahibi kim ve bu düzen güncel mi?","Kurul/komite yetkileri, yönetişim politikası, karar ve gözden geçirme kayıtları."],
    ["EDM02","Faydanın gerçekleşmesi","Ensured Benefits Delivery","Teknoloji yatırımının beklenen iş faydasına dönüşmesini gözetir.","Yatırım neden yapıldı; faydayı kim izliyor?","İş gerekçesi, fayda sahipleri, gerçekleşen sonuçlar ve kurul incelemeleri."],
    ["EDM03","Riskin dengelenmesi","Ensured Risk Optimization","Teknoloji kaynaklı riskin kurumun kabul yaklaşımıyla tutarlı olmasını gözetir.","Risk sınırlarına kim yön veriyor; sapmalar nasıl ele alınıyor?","Risk yaklaşımı, yetkili risk kararları ve üst düzey risk raporları."],
    ["EDM04","Kaynakların dengelenmesi","Ensured Resource Optimization","İnsan, teknoloji ve para gibi kaynakların iş ihtiyacına uygun kullanımını gözetir.","Kaynak açığı veya gereksiz tekrar iş amaçlarını etkiliyor mu?","Kaynak kapasitesi, yatırım/insan planı ve gözetim kararları."],
    ["EDM05","Paydaş katılımı","Ensured Stakeholder Engagement","Paydaş iletişimi ve raporlamanın ihtiyaçları karşılamasını gözetir.","Doğru paydaş doğru bilgiyi zamanında alıyor mu?","Paydaş haritası, raporlama beklentileri ve iletişim kayıtları."],
    ["APO01","Yönetim çerçevesi","Managed I&T Management Framework","Teknoloji yönetiminin rollerini, kurallarını ve çalışma düzenini kurar.","Politika, sahiplik ve süreçler birbiriyle tutarlı mı?","Yönetim politikaları, süreç sahipleri, rol ve gözden geçirme kayıtları."],
    ["APO02","Strateji","Managed Strategy","İş yönünü teknoloji hedeflerine ve yol haritasına dönüştürür.","Teknoloji planı hangi iş hedefine katkı sağlıyor?","İş/BT stratejisi, boşluk analizi, yol haritası ve izleme."],
    ["APO03","Kurumsal mimari","Managed Enterprise Architecture","İş, veri, uygulama ve teknoloji yapılarının birlikte tasarımını ele alır.","Yeni çözüm mevcut yapı ve hedef tasarımla uyumlu mu?","Mimari modeller, standartlar ve mimari kararlar."],
    ["APO04","Yenilik","Managed Innovation","Yeni fikir ve teknolojilerin değerini, uygunluğunu ve riskini değerlendirir.","Yeni teknoloji gerçekten bir iş ihtiyacını çözüyor mu?","Fikir değerlendirmeleri, deneme sonuçları ve risk/fayda analizleri."],
    ["APO05","Portföy","Managed Portfolio","Yatırım, hizmet ve varlık kümelerini iş öncelikleriyle birlikte yönetir.","Doğru girişimlere kaynak ayırıyor muyuz?","Portföy kararları, öncelik/kaynak ve fayda izleme kayıtları."],
    ["APO06","Bütçe ve maliyet","Managed Budget and Costs","Teknoloji harcamalarını planlama, izleme ve şeffaflaştırmayı ele alır.","Maliyetin sahibi ve iş gerekçesi belli mi?","Bütçe, gerçekleşen harcama, maliyet modeli ve sapma incelemeleri."],
    ["APO07","İnsan kaynağı","Managed Human Resources","Gerekli insan kapasitesi, beceri ve sorumlulukları yönetir.","Kritik işi yapacak yetkin yedek kişi var mı?","Yetkinlik/kadro planı, eğitim ve rol atamaları."],
    ["APO08","İlişkiler","Managed Relationships","İş ve teknoloji paydaşlarının beklentilerini ve iş birliğini yönetir.","İş biriminin ihtiyacı ve memnuniyetsizliği nasıl anlaşılır?","İlişki toplantıları, beklentiler, sorun ve aksiyon kayıtları."],
    ["APO09","Hizmet anlaşmaları","Managed Service Agreements","Hizmet beklentilerini tanımlar, anlaşır ve sonuçları takip eder.","SLA iş ihtiyacını yansıtıyor ve doğru ölçülüyor mu?","Hizmet kataloğu, SLA, hizmet raporu ve sapma aksiyonları."],
    ["APO10","Tedarikçiler","Managed Vendors","Dış sağlayıcı seçimini, yükümlülüklerini, risk ve performansını yönetir.","Dışarı verilen işte kontrol sorumlulukları açık mı?","Sözleşme, sorumluluk matrisi, sağlayıcı değerlendirmeleri."],
    ["APO11","Kalite","Managed Quality","Çözümlerin ve hizmetlerin kalite beklentilerini karşılamasını yönetir.","Kalite kriteri ve hata iyileştirme yolu tanımlı mı?","Kalite planı, kabul kriterleri, incelemeler ve iyileştirme kayıtları."],
    ["APO12","Risk yönetimi","Managed Risk","Risk verilerini toplar, analiz eder, risk profilini ve yanıtlarını yönetir.","Risk senaryosu, sahibi ve yanıtı güncel mi?","Risk kayıtları, analizler, yanıt ve izleme kayıtları."],
    ["APO13","Güvenlik yönetimi","Managed Security","Bilgi güvenliğinin yönetim düzenini ve risk temelli planını kurar.","Güvenlik hedefleri ve sorumluları belli mi?","Güvenlik politikası, kapsam, risk planı ve yönetim incelemeleri."],
    ["APO14","Veri yönetimi","Managed Data","Verinin yaşam döngüsü, kalitesi, sahipliği ve yönetimini ele alır.","Veri doğru, anlamlı ve sorumlusu belli mi?","Veri sahipleri, tanımlar, kalite kuralları ve yaşam döngüsü kayıtları."],
    ["BAI01","Programlar","Managed Programs","Birden fazla ilgili değişimi beklenen faydaya ulaşacak biçimde koordine eder.","Projeler birlikte hedeflenen iş sonucunu sağlıyor mu?","Program gerekçesi, bağımlılıklar, fayda ve gözetim kayıtları."],
    ["BAI02","Gereksinimler","Managed Requirements Definition","İşin ihtiyaç duyduğu çözüm gereksinimlerini netleştirir.","İstenen çözümün kabul koşulları doğru ve onaylı mı?","Gereksinimler, izlenebilirlik, fizibilite ve kabul onayları."],
    ["BAI03","Çözüm oluşturma","Managed Solutions Identification and Build","Çözümlerin seçimi, geliştirilmesi ve yeterli kaliteyle oluşturulmasını yönetir.","Çözüm iş ve güvenlik gereksinimlerini karşılıyor mu?","Tasarım, geliştirme, kalite/test kayıtları ve çözüm bileşenleri."],
    ["BAI04","Kullanılabilirlik ve kapasite","Managed Availability and Capacity","Hizmetin ihtiyaç duyulan zamanda ve yeterli kapasiteyle çalışmasını yönetir.","Yoğunluk ve arıza hizmeti nasıl etkiliyor?","Kapasite planı, kullanılabilirlik ölçümleri ve iyileştirme kayıtları."],
    ["BAI05","Organizasyonel değişim","Managed Organizational Change","İnsanların yeni çalışma biçimini benimsemesini ve değişimin yerleşmesini destekler.","Yeni çözüm insanlar tarafından gerçekten kullanılabiliyor mu?","Değişim/iletişim planı, eğitim, hazırlık ve benimseme ölçümleri."],
    ["BAI06","BT değişiklikleri","Managed IT Changes","Sistem değişikliklerinin uygun değerlendirme, yetki ve izlenebilirlikle yapılmasını yönetir.","Canlı değişiklik testli, yetkili ve geri dönüşe hazır mı?","Değişiklik evreni, onay/test, dağıtım ve acil değişiklik kayıtları."],
    ["BAI07","Kabul ve geçiş","Managed IT Change Acceptance and Transitioning","Yeni veya değişen çözümün kabulünü ve işletime güvenli geçişini ele alır.","İş ve operasyon çözümü almaya hazır mı?","Kabul testleri, geçiş planı, operasyonel hazırlık ve geçiş sonrası inceleme."],
    ["BAI08","Bilgi birikimi","Managed Knowledge","İş için gerekli bilgi ve deneyimin bulunabilir, güncel ve kullanılabilir olmasını sağlar.","Kritik bilgi tek kişinin zihninde mi?","Bilgi bankası, sahiplik, güncellik ve kullanım incelemeleri."],
    ["BAI09","Varlıklar","Managed Assets","Teknoloji varlıklarını yaşam döngüsü boyunca yönetir.","Hangi varlık kimin, hangi durumda ve hangi yükümlülükle kullanılıyor?","Envanter, sahiplik, lisans ve edinim/elden çıkarma kayıtları."],
    ["BAI10","Yapılandırma","Managed Configuration","Hizmet bileşenlerinin yapısını ve ilişkilerini doğru biçimde izler.","Hangi bileşen değişirse hangi hizmet etkilenir?","Yapılandırma kayıtları, ilişkiler ve doğrulama sonuçları."],
    ["BAI11","Projeler","Managed Projects","Tekil projelerin kapsam, zaman, kaynak ve kalite açısından yönetimini ele alır.","Teslimat, iş beklentisi ve kabul koşullarıyla uyumlu mu?","Proje planı, risk/konu listesi, ilerleme ve kabul kayıtları."],
    ["DSS01","Operasyon","Managed Operations","Günlük teknoloji hizmetlerinin planlı ve güvenilir işletimini ele alır.","Başarısız kritik işler ve alarmlar takip ediliyor mu?","İş zamanlayıcı, işletim prosedürü, alarm ve müdahale kayıtları."],
    ["DSS02","Talep ve olaylar","Managed Service Requests and Incidents","Kullanıcı taleplerini ve kesintileri kaydeder, çözer ve hizmeti geri getirir.","Olayın iş etkisi, önceliği ve çözümü doğru mu?","Bilet evreni, öncelik/eskalasyon, süre ve çözüm kayıtları."],
    ["DSS03","Problemler","Managed Problems","Tekrarlayan olayların nedenlerini ve kalıcı çözümleri ele alır.","Aynı sorun neden tekrar ediyor?","Problem/kök neden kayıtları, bilinen hatalar ve kalıcı aksiyonlar."],
    ["DSS04","Süreklilik","Managed Continuity","Kesintide kritik iş/hizmetin sürdürülmesi ve toparlanmasını yönetir.","Test edilmiş toparlanma iş ihtiyacını karşılıyor mu?","İş etki analizi, süreklilik planı, geri yükleme/test ve aksiyonlar."],
    ["DSS05","Güvenlik hizmetleri","Managed Security Services","Erişim, uç nokta, ağ ve güvenlik izlemesi gibi operasyonel korumaları ele alır.","Yetkisiz erişim ve güvenlik olayları önleniyor/tespit ediliyor mu?","Hesap/yetki, güvenlik yapılandırması, günlük ve olay incelemeleri."],
    ["DSS06","İş süreci kontrolleri","Managed Business Process Controls","İş işlemlerinin yetkili, tam, doğru ve güvenilir yürütülmesini destekler.","İşlem hatası veya uygunsuz işlem nasıl önlenip tespit ediliyor?","İş kuralları, yetki/SoD, mutabakat, istisna ve takip kanıtları."],
    ["MEA01","Performans ve uygunluk izleme","Managed Performance and Conformance Monitoring","Sonuçları ve kurallara uygunluğu ölçer, raporlar ve sapmaları takip eder.","Metrik doğru ve sapmanın aksiyonu var mı?","Gösterge tanımları, kaynak veri, rapor ve aksiyon takibi."],
    ["MEA02","İç kontrol sistemi","Managed System of Internal Control","Kontrol sisteminin yeterliliğini izler ve eksikleri ele alır.","Kontrol tasarımı ve işleyişi düzenli değerlendiriliyor mu?","Kontrol değerlendirmeleri, eksiklikler, sorumlular ve düzeltmeler."],
    ["MEA03","Dış gerekliliklere uyum","Managed Compliance With External Requirements","Geçerli dış yükümlülükleri tanımlar, uyumu değerlendirir ve takip eder.","Hangi yükümlülük hangi kontrolle karşılanıyor?","Yükümlülük envanteri, uyum değerlendirmesi ve aksiyonlar."],
    ["MEA04","Güvence","Managed Assurance","Güvence çalışmalarını risk ve ihtiyaçlara göre planlama ve yürütmeyi ele alır.","Güvence kapsamı yeterli, yöntem uygun ve sonuç takipli mi?","Güvence planı, çalışma kâğıtları, raporlar ve bulgu takibi."]
  ],
  glossary:[
    ["Risk","İstenmeyen bir olayın olasılığı ve etkisiyle ilgili belirsizlik. Hesabın açık olması risk yaratır; kötüye kullanımı tek başına ispatlamaz."],
    ["Kontrol","Bir riski azaltmak veya hedefe ulaşmaya yardım etmek için yapılan işlem/düzen. Örneğin yetki onayı."],
    ["Kanıt","Bir değerlendirmeyi destekleyen güvenilir bilgi veya kayıt. Kaynağı, dönemi ve kapsamı önemlidir."],
    ["Kriter","Olması beklenen durumu tanımlayan ölçüt: uygulanabilir politika, sözleşme veya mevzuat gibi."],
    ["Yönetişim","İhtiyaçları değerlendirme, yön verme ve sonuçları gözetme düzeni."],
    ["Yönetim","Verilen yön doğrultusunda planlama, kurma, işletme ve izleme."],
    ["Paydaş","Karardan etkilenen veya kararı etkileyen taraf: müşteri, çalışan, kurul, düzenleyici gibi."],
    ["Hizalama","Bilgi ve teknoloji çabalarının iş amaçlarına hizmet etmesi."],
    ["Süreç","Bir sonuca ulaşmak için birbiriyle ilişkili faaliyetlerin düzeni."],
    ["Uygulama / practice","Bu bağlamda süreç içindeki yönetim/yönetişim pratiği. Her zaman yazılım uygulaması anlamına gelmez."],
    ["Aktivite","Bir pratiği yerine getiren daha somut iş veya adım."],
    ["Bileşen","Yönetişim sisteminin süreç, insan, yapı, bilgi veya araç gibi parçalarından biri."],
    ["Odak alanı","Siber güvenlik veya DevOps gibi bir konu için ilgili hedef ve bileşenlerin bir araya geldiği yaklaşım."],
    ["ITGC","BT genel kontrolleri. Birçok uygulamayı destekleyen erişim, değişiklik ve işletim kontrolleri."],
    ["Uygulama kontrolü","Belirli iş işlemlerinin doğruluk, tamlık, yetki ve geçerliliğine yönelik kontrol."],
    ["SoD / görevler ayrılığı","Hata veya uygunsuz işlemin tek kişi tarafından yapılıp gizlenmesine yol açan yetki birleşimlerini önleme/tespit yaklaşımı."],
    ["RACI","R: işi yapan; A: hesap veren; C: görüşü alınan; I: bilgilendirilen."],
    ["SLA","Hizmet seviyesi anlaşması: ölçülebilir hizmet beklentileri ve tarafların yükümlülükleri."],
    ["ERP","Sipariş, stok, üretim ve finans gibi iş süreçlerini bir arada destekleyen kurumsal kaynak planlama yazılımı."],
    ["Log / günlük","Sistem olaylarının ve işlemlerinin zaman gibi bilgilerle kaydı. Değiştirilebilirliği ve kapsamı değerlendirilir."],
    ["MFA","Çok faktörlü kimlik doğrulama: farklı türden birden fazla doğrulama faktörü kullanımı."],
    ["Ayrıcalıklı hesap","Sistemi veya önemli ayarları yönetebilen yüksek yetkili hesap."],
    ["Servis hesabı","Bir uygulama veya otomatik iş tarafından kullanılan hesap; insan hesabıyla aynı kullanım biçimine sahip olmayabilir."],
    ["RTO","Hedef toparlanma süresi. Hizmetin iş ihtiyacına göre ne kadar sürede geri gelmesi gerektiği."],
    ["RPO","Kabul edilebilir veri kaybının zaman cinsinden hedefi. Örneğin son bir saatlik veriyi kaybetme toleransı."],
    ["İş etki analizi / BIA","Kesintinin işi nasıl etkilediğini ve kritik ihtiyaçları anlamaya yönelik analiz."],
    ["KPI","Temel performans göstergesi; bir amaca ulaşma durumunu ölçmeye yardım eder."],
    ["KRI","Temel risk göstergesi; riske maruz kalmayı/değişimini izlemeye yardım eder."],
    ["Yetkinlik / capability","Bu bağlamda sürecin nasıl uygulandığı ve işlediğiyle ilgili performans düzeyi."],
    ["Olgunluk / maturity","Odak alanı düzeyindeki daha bütüncül performans kavramı; süreç puanlarının basit ortalaması değildir."],
    ["Evren","Belirlenen amaç, dönem ve kapsama uyan tüm kayıtlar."],
    ["Örneklem","Evrenin değerlendirme için seçilen kısmı. Seçim yöntemi sonuçların nasıl yorumlanabileceğini etkiler."],
    ["Walkthrough","Bir işlemi baştan sona izleyerek akışı ve kontrol noktalarını anlamak."],
    ["Tasarım yeterliliği","Kontrol planlandığı gibi işletilirse ilgili riski makul ölçüde karşılıyor mu sorusu."],
    ["İşleyiş etkinliği","Kontrolün incelenen dönemde tasarlandığı gibi uygulanıp uygulanmadığı."],
    ["Bulgu","Beklenen kriterle gözlenen durum arasındaki kanıtlanmış fark ve bunun risk/etki açıklaması."],
    ["Telafi edici kontrol","Asıl kontrolün eksikliğinden doğan riski alternatif yoldan karşılamaya yardım eden kontrol."],
    ["SOC raporu","Bir hizmet kuruluşuna ilişkin bağımsız güvence raporu ailesi. Kapsamı, türü, dönemi ve istisnaları okunmadan genel güvence sayılmaz."],
    ["UAT","Kullanıcı kabul testi: çözümün iş beklentilerini karşılayıp karşılamadığının değerlendirilmesi."],
    ["CI/CD","Kodun entegrasyon ve teslim/dağıtım adımlarını otomasyonla destekleyen yaklaşım. Otomasyon kontrol yeterliliğini tek başına ispatlamaz."]
  ],
  cases:[
    {id:"acik-hesap",title:"Açık kalan hesap",tag:"Başlangıç",time:15,story:"Kurgusal MaviLojistik'te haziranda 12 kişi ayrılıyor. İK listesinde ayrılışlar var. ERP hesaplarının 3'ü beş gün sonra kapatılmış görünüyor. Yönetici “zaten giriş yapmadılar” diyor. Erişim politikasında kapatma zamanının ayrılışın yürürlüğe girdiği an olduğu yazılı.",
      tasks:["İş riskini ve kriteri yaz.","İstenecek en az dört kanıtı belirle.","Gecikmiş kayıt ile gerçekleşmiş veri hırsızlığını ayır.","Bir test ve kapanış koşulu öner."],
      solution:["Risk: Yetkisiz veri erişimi veya işlem. Kriter kurumun zamanında kapatma politikasıdır.","Kanıt: Tam İK evreni, ERP/dizin hesapları, kapatma zamanları, gerçek yetkiler, erişim günlükleri ve varsa alternatif engelleme.","Ayrılış/kapatma saatini doğrula; diğer katmandaki engelleme ve istisnaları araştır. Günlükte işlem görünmemesi riski yok etmez; eksik günlük ihtimalini de düşün.","Bulgu, doğrulanmış gecikmeye ve riskine dayanır; hırsızlık iddiası için ek kanıt gerekir.","Kapanış: Bildirim/kapatma akışının düzeltildiğini ve sonraki gerçek ayrılışlarda işlediğini yeniden test et."],
      links:["DSS05","APO13"],rubric:["Risk ve açık kriter","Güvenilir/tam evren ve kanıt","Yetki ve zaman testinin mantığı","Sonucun sınırları ve kapanış"]},
    {id:"uretim-kesintisi",title:"Üretim neden durdu?",tag:"Bütünleşik",time:30,story:"ParçaNova'da ERP değişikliği altı saat üretim planlama kesintisi yaratıyor. Son 30 değişikliğin 8'inde ön onay kanıtı yok. Yedekleme başarılı görünüyor; 12 aydır geri yükleme testi yok. Sağlayıcı anlaşmasında toparlanma süresi belirsiz. Yeni araç için bütçe isteniyor.",
      tasks:["Bir iş amacı, bir yönetişim kararı ve iki yönetim işi yaz.","Bir EDM ve en az üç yönetim alanından hedeflerle çözüm zinciri kur.","İki metrik tanımla; kaynak, sahip ve sıklığını belirt.","90 günlük planında en az iki süreç dışı bileşeni kullan."],
      solution:["İş amacı: Üretim/teslimat güvenilirliği. Yönetişim: İş etkisine göre risk yaklaşımına ve kaynak önceliğine yön vermek.","EDM03 → APO10 → BAI06 → DSS04 → MEA01 aday zincirdir; gerekçeli alternatifler mümkündür.","8/30 yaklaşık %26,7 ön onay kanıtı eksikliğidir; bu, hiç onay alınmadığının veya hepsinin başarısız olduğunun kesin kanıtı değildir.","Ölçümler: BT kaynaklı geciken sevkiyat oranı (aylık, lojistik sahibi); gelecek normal değişikliklerde eksik hazırlık oranı (haftalık, değişiklik yöneticisi). Hedefler başlangıç verisi ve iş ihtiyacıyla kararlaştırılır.","0–30 gün: Bağlam, evren ve sahipler. 31–60: İş akışı, sağlayıcı koşulları, bağımlılıkları içeren toparlanma testi ve ikinci kişinin eğitimi. 61–90: İşleyişi yeniden değerlendir, aksiyonları ve iş faydasını takip et.","RTO/RPO değerleri vakada verilmediği için uydurma; iş etki analiziyle belirlenmesi gereken bilgi olarak yaz."],
      links:["EDM03","APO10","BAI06","DSS04","MEA01"],rubric:["İş amacı ve karar ayrımı","Gerekçeli hedef zinciri","Kontrol, kanıt ve sahip","Metrik ve sürdürülebilir plan"]},
    {id:"mukerrer-fatura",title:"Aynı faturaya iki ödeme",tag:"Uygulama kontrolü",time:25,story:"Kurgusal AdaTicaret'te aynı tedarikçiye benzer tutarda iki ödeme var. Finans, mükerrer faturayı engelleyen kontrol olduğunu söylüyor. Kontrol raporu bir Excel dosyasına aktarılıyor. Bazı kullanıcılar tedarikçi ana verisini de değiştirebiliyor. İki ödemenin aynı faturaya ait olduğu henüz doğrulanmamış.",
      tasks:["Varsayım yapmadan olası riskleri ayır.","Uygulama kontrolü ile destekleyen ITGC'leri yaz.","Rapor ve arayüz tamlığını nasıl doğrulayacağını anlat.","Güvenli bir test ve sonuç sınırı tanımla."],
      solution:["İki benzer ödeme tek başına mükerrer ödeme veya suistimal kanıtı değildir. Fatura/sipariş/ödeme kimliklerini ve iş gerekçelerini doğrula.","Uygulama kontrolü: Mükerrer fatura kuralı, ödeme yetkisi ve ana veri doğrulaması. ITGC: Kuralı değiştirebilen erişimler ve değişiklik kontrolü.","Kaynak sistem ile raporun kayıt ve uygun tutar toplamlarını, dönem/filtrelerini ve Excel dönüşümlerini karşılaştır. Kontrol inceleme/istisna takip kanıtını iste.","Açık yetkiyle uygun test ortamında beklenen engellemeyi, istisna yolunu ve kural değişikliklerini değerlendir. Üretimde deneme faturası oluşturma.","DSS06/APO14 iş/veri kontrolünü; DSS05 ve BAI06 destekleyici kontrolleri ele alır. Sonucu doğrulanan kontrol, dönem ve kanıt kapsamıyla sınırla."],
      links:["DSS06","APO14","DSS05","BAI06"],rubric:["Risk ile gerçekleşmiş olayı ayırma","ITGC/uygulama kontrolü bağlantısı","Rapor güvenilirliği ve test","Güvenli yaklaşım ve kanıtlı sonuç"]}
  ]
};
