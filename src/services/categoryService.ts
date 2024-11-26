import CategoryResponse from '../payload/response/CategoryResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ServiceResponse<CategoryResponse>, void>({
      query: () => ({
        url: '/category/active-categories',
        method: 'GET',
      }),
    }),
    getCategory: builder.query<ServiceResponse<CategoryResponse>, number>({
      query: id => ({
        url: '',
        method: 'GET',
      }),
    }),
  }),
});

export const CategoryApi = categoryApi;
// Tabii, görseldeki kodu detaylı bir şekilde açıklayayım:

// 1. Kodun Genel Yapısı

// Bu kod, bir API servis tanımlamasıdır ve genelde RTK Query (Redux Toolkit Query) ile yazılmış gibi görünüyor. Bu yapı, API ile iletişim kurmak ve ilgili endpoint’lere istekler göndermek için kullanılır. Aşağıda satır satır inceleyeceğim.

// 2. İmportlar (Satır 1–3)

// import CategoryResponse from '../payload/response/CategoryResponse';
// import ServiceResponse from '../payload/response/ServiceResponse';
// import { baseApi } from '../store/api/BaseApi';

// Açıklamalar:

// 	•	CategoryResponse:
// 	•	../payload/response/CategoryResponse dosyasından içe aktarılmış bir tip ya da class. Bu genelde TypeScript projelerinde, API’den dönen yanıtın yapısını (örneğin kategori verilerini) tanımlamak için kullanılır.
// 	•	ServiceResponse:
// 	•	Aynı şekilde başka bir dosyadan alınmış. Bu da genelde bir servis yanıtının ortak özelliklerini (örneğin status, message, data) tanımlamak için kullanılan bir yapıdır.
// 	•	baseApi:
// 	•	Bu, API istekleri için temel yapı ya da konfigürasyonu içeriyor olabilir. Örneğin, baseUrl (örneğin https://api.site.com) ve diğer ayarların olduğu bir yapı olarak düşünülebilir.

// 3. API Tanımlaması (Satır 5–17)

// export const categoryApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCategories: builder.mutation<ServiceResponse<CategoryResponse>, void>({
//       query: () => ({
//         url: '/category/active-categories',
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// Açıklamalar:

// Burada bir categoryApi objesi tanımlanıyor. Bu, bir endpoint (örneğin /category/active-categories) ile nasıl iletişim kurulacağını belirtiyor. Şimdi detaylı bakalım:

// 3.1 injectEndpoints:

// 	•	baseApi.injectEndpoints:
// 	•	Bu metot, mevcut bir API yapılandırmasına yeni endpoint’ler eklemek için kullanılır. Bu durumda, getCategories adlı bir endpoint eklenmiş.

// 3.2 endpoints Parametresi:

// 	•	Bir fonksiyon olarak tanımlanmış ve bir builder argümanı alıyor. Bu argüman, yeni endpoint’ler tanımlamak için kullanılır.

// 3.3 getCategories Endpoints Tanımı:

// 	•	getCategories:
// 	•	Bu, aktif kategorileri almak için kullanılan bir endpoint’tir. Burada bir mutation olarak tanımlanmış (aslında query de olabilirdi, ama mutation seçilmiş).
// 	•	Mutation: Veri oluşturma, güncelleme, silme gibi işlemler için kullanılır. Ancak burada GET kullanılmış, bu biraz karışıklık yaratabilir.

// 3.3.1 Tipler:

// 	•	ServiceResponse<CategoryResponse>:
// 	•	Bu yapı, API’den gelen yanıtın türünü belirtir. Örneğin:
// 	•	ServiceResponse: Genelde API’nin genel yanıt yapısı (status, message gibi).
// 	•	CategoryResponse: API yanıtındaki spesifik veri (kategori bilgisi).
// 	•	void:
// 	•	Endpoint’in girdi parametresi olmadığını ifade eder. Örneğin, bu isteği yapmak için herhangi bir argüman gerekmez.

// 3.3.2 query:

// 	•	query: () => ({}):
// 	•	Bu fonksiyon, API’ye hangi URL’ye, hangi HTTP metoduyla istek yapılacağını belirtir.
// 	•	url: '/category/active-categories':
// 	•	Bu, endpoint’in adresidir.
// 	•	method: 'GET':
// 	•	HTTP GET metodu kullanılıyor, yani veri çekmek için bir istek yapılır.

// 4. Export (Satır 17)

// export const CategoryApi = categoryApi;

// Açıklamalar:

// 	•	Burada categoryApi dışa aktarılıyor ve farklı bir isimle (CategoryApi) kullanılabilir hale geliyor.
// 	•	Bu, kodun başka yerlerinde CategoryApi adını kullanarak bu endpoint’e erişim sağlanmasını sağlar.

// Özet Akış:

// 	1.	categoryApi adlı bir API objesi tanımlanıyor.
// 	2.	/category/active-categories endpoint’i için bir GET isteği yapılandırılıyor.
// 	3.	Gelen yanıtın türü (ServiceResponse ve CategoryResponse) belirtiliyor.
// 	4.	Bu yapı daha sonra dışa aktarılıyor ve başka yerlerde kullanılabiliyor.

// Eğer ek sorularınız veya başka bir kısımda detaylandırmamı istediğiniz bir şey varsa, çekinmeden sorabilirsiniz!
