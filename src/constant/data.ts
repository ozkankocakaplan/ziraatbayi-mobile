export interface FaqItem {
  title: string;
  contentList: string[];
}

export const faqItems: FaqItem[] = [
  {
    title: 'Ziraat Bayi nedir?',
    contentList: [
      'Ziraat Bayi, kullanıcıların ürün ilanlarını kolayca listeleyebildiği ve diğer kullanıcılarla iletişim kurabildiği bir platformdur.',
      'Kullanıcılar, ellerinde bulunan ve son kullanma tarihleri yaklaşan ürünleri ilan oluşturarak platformda paylaşabilir.',
      'İlanlar, yöneticiler tarafından belirlenen süre ve ilan sayısı limitlerine göre kontrol edilir.',
    ],
  },
  {
    title: 'Abonelik planları nelerdir?',
    contentList: [
      'Abonelik planları aylık ve yıllık olarak iki şekilde sunulmaktadır.',
      'Abonelik planları www.ziraatbayi.com adresinden incelenebilir ve seçilebilir.',
      'Abonelikler otomatik olarak yenilenir, iptal edilmediği sürece devam eder.',
    ],
  },
  {
    title: 'Aboneliğimi nasıl iptal ederim?',
    contentList: [
      'Abonelik iptali yalnızca www.ziraatbayi.com web sitesi üzerinden yapılabilir.',
      "Aboneliklerinizi iptal etmek için profilinizdeki 'Abonelik İşlemleri' bölümüne giderek iptal işlemini gerçekleştirebilirsiniz.",
    ],
  },
  {
    title: 'Aboneliğimi nasıl yenilerim ve satın alırım?',
    contentList: [
      'Abonelikler web sitesi üzerinden yenilenir veya satın alınır.',
      'Bir kez abone olduğunuzda, iptal edilene kadar aboneliğiniz otomatik olarak yenilenir.',
    ],
  },
  {
    title: 'İlan limiti nedir?',
    contentList: [
      'İlan limiti, yöneticiler tarafından belirlenen ve aynı anda yayınlanabilecek maksimum ilan sayısını ifade eder.',
      'Kullanıcılar, belirlenen bu limit dahilinde ilan oluşturabilir.',
      'İlan limitinizi aşmamak için mevcut ilanlarınızı kontrol edebilirsiniz.',
    ],
  },
  {
    title: 'Her ay ilanlar neden pasif hale geliyor?',
    contentList: [
      'İlanlar, platform düzeni ve güncelliği sağlamak amacıyla yöneticiler tarafından belirlenen süre sonunda otomatik olarak pasif hale gelir.',
      'İlanlarınızı yeniden aktif hale getirmek için ilan düzenleme ekranından gerekli işlemleri yapabilirsiniz.',
    ],
  },
];
