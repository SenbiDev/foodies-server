import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class ProductService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index({ query, limit, page, category, tags }) {
    let allProduct = (
      await this.firebase.firestore
        .collection('product')
        .orderBy('productId')
        .get()
    ).docs.map((val) => val.data());

    const allTag = (
      await this.firebase.firestore.collection('tags').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    const allCategory = (
      await this.firebase.firestore.collection('categories').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    allProduct = allProduct.map((data) => ({
      ...data,
      category: allCategory?.filter(
        (category) => category._id === data?.category?._path?.segments[1],
      )[0],
      tags: data?.tags
        ?.map((tag) => {
          return allTag?.filter(
            (value) => value._id === tag?._path?.segments[1],
          );
        })
        ?.flat(),
    }));

    const queryParam = query ?? '';
    const categoryParam = category;
    const tagsParam = tags;
    const limitParam = parseInt(limit, 10) * 1;
    const offsetParam = (parseInt(page, 10) - 1) * limitParam;
    console.log('OFFSET PARAM:', offsetParam);

    // console.log('LIST:', query, limit, parseInt(page, 10));

    allProduct = allProduct.filter((value) =>
      value?.name?.match(new RegExp(`\w*${queryParam}\w*`, 'i')),
    );
    allProduct = allProduct.filter((value) =>
      value?.category?.name?.match(new RegExp(`\w*${categoryParam}\w*`, 'i')),
    );
    allProduct =
      tagsParam === undefined || tagsParam?.length === 0
        ? allProduct
        : allProduct.filter((value) => {
            // console.log(
            //   `START------------------${value?.name}----------------------START`,
            // );

            const mapResult = value?.tags?.map((productTAG) => {
              const result1 = tagsParam?.map((tag) => productTAG?.name === tag);
              // console.log('RESULT OF TAG1:', result1);

              const result2AfterRemoveDuplicate = new Set(result1);
              // console.log('RESULT OF TAG2:', result2AfterRemoveDuplicate);

              const result3AfterConvertToAray = Array.from([
                ...result2AfterRemoveDuplicate,
              ]);
              // console.log('RESULT OF TAG3:', result3AfterConvertToAray);

              const result4AfterFilterOnlyTrue =
                result3AfterConvertToAray.includes(true);
              // console.log('RESULT OF TAG4:', result4AfterFilterOnlyTrue);

              return result4AfterFilterOnlyTrue;
            });

            // console.log(
            //   `END--------------------${value?.name}------------------------END`,
            // );

            const result1AfterRemoveDuplicate = new Set(mapResult);
            // console.log('YY:', result1AfterRemoveDuplicate);

            const result2AfterConvertToAray = Array.from([
              ...result1AfterRemoveDuplicate,
            ]);
            // console.log('XX:', result2AfterConvertToAray);

            const endResult = result2AfterConvertToAray.includes(true);
            // console.log('FINAL:', endResult);

            return endResult;
          });

    const length = limitParam * parseInt(page, 10) ?? allProduct.length;
    console.log('LENGTH:', length);

    const products = [];

    for (let x = 0; x < length; x++) {
      if (x < offsetParam) {
        continue;
      } else {
        // console.log(allProduct[x]);
        products.push(allProduct[x]);
      }
      // console.log('LOOP: ', x);
    }

    // return (await this.firebase.firestore.collection('product').orderBy('productId').get()).docs;
    console.log('TAGS PARAM:', tagsParam);

    return {
      data: products.filter((product) => product !== undefined),
      totalPages: Math.ceil(allProduct.length / limit),
      currentPage: parseInt(page),
    };
  }

  data = [
    {
      name: 'Sushi Nori',
      description: 'sushi nori',
      price: 186000,
      category: 'Makanan',
      tags: ['Jepang', 'Asam', 'Gurih', 'Asin'],
    },
    {
      name: 'Ramen',
      description: 'ramen',
      price: 75000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Pedas'],
    },
    {
      name: 'Takoyaki',
      description: 'takoyaki',
      price: 95500,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih'],
    },
    {
      name: 'Karaage',
      description: 'karaage',
      price: 117000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Asin'],
    },
    {
      name: 'Okonomiyaki ',
      description: 'okonomiyaki ',
      price: 138000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih'],
    },
    {
      name: 'Gyoza',
      description: 'gyoza',
      price: 106000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih', 'Asin'],
    },
    {
      name: 'Udon',
      description: 'udon',
      price: 100000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Asin'],
    },
    {
      name: 'Sashimi',
      description: 'sashimi',
      price: 170000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Pedas', 'Asin'],
    },
    {
      name: 'Shabu-shabu',
      description: 'shabu-shabu',
      price: 212000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Onigiri',
      description: 'onigiri',
      price: 128000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih'],
    },
    {
      name: 'Tempura',
      description: 'tempura',
      price: 160000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih'],
    },
    {
      name: 'Yakitori',
      description: 'yakitori',
      price: 100000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih'],
    },
    {
      name: 'Oden',
      description: 'oden',
      price: 107000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Asin'],
    },
    {
      name: 'Sup Miso',
      description: 'sup miso',
      price: 90000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih', 'Asin'],
    },
    {
      name: 'Chicken Katsu',
      description: 'chicken katsu',
      price: 160000,
      category: 'Makanan',
      tags: ['Jepang', 'Gurih'],
    },
    {
      name: 'Sukiyaki',
      description: 'sukiyaki',
      price: 280000,
      category: 'Makanan',
      tags: ['Jepang', 'Asam', 'Manis', 'Gurih'],
    },
    {
      name: 'Unagi',
      description: 'unagi',
      price: 215000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih', 'Asin'],
    },
    {
      name: 'Nikujaga',
      description: 'nikujaga',
      price: 130000,
      category: 'Makanan',
      tags: ['Jepang', 'Manis', 'Gurih', 'Asin'],
    },
    {
      name: 'Full English Breakfast',
      description: 'full english breakfast',
      price: 180000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih', 'Asin'],
    },
    {
      name: 'Scotch Egg',
      description: 'scotch egg',
      price: 74000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih'],
    },
    {
      name: 'Cornish Pasty',
      description: 'cornish pasty',
      price: 80000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih'],
    },
    {
      name: "Shepherd's Pie",
      description: "shepherd's pie",
      price: 148000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih', 'Asin'],
    },
    {
      name: 'Fish and Chips',
      description: 'fish and chips',
      price: 100000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih'],
    },
    {
      name: 'Steak and Kidney Pie',
      description: 'steak and kidney pie',
      price: 150000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih', 'Asin'],
    },
    {
      name: 'Bubble and Squeak',
      description: 'bubble and squeak',
      price: 115000,
      category: 'Makanan',
      tags: ['Inggris', 'Gurih'],
    },
    {
      name: 'Sticky Toffe Pudding',
      description: 'sticky toffe pudding',
      price: 110000,
      category: 'Makanan',
      tags: ['Inggris', 'Manis'],
    },
    {
      name: 'Trifle',
      description: 'trifle',
      price: 120000,
      category: 'Makanan',
      tags: ['Inggris', 'Manis'],
    },
    {
      name: 'Victoria Sponge Cake',
      description: 'victoria sponge cake',
      price: 110000,
      category: 'Makanan',
      tags: ['Inggris', 'Manis', 'Gurih'],
    },
    {
      name: 'Kimchi',
      description: 'kimchi',
      price: 50000,
      category: 'Makanan',
      tags: ['Korea', 'Asam', 'Gurih', 'Pedas'],
    },
    {
      name: 'Bibimbap',
      description: 'bibimbap',
      price: 110000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Pedas', 'Asin'],
    },
    {
      name: 'Bulgogi',
      description: 'bulgogi',
      price: 166000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Kimbap',
      description: 'kimbap',
      price: 50000,
      category: 'Makanan',
      tags: ['Korea', 'Asam', 'Gurih'],
    },
    {
      name: 'Jajangmyeon',
      description: 'jajangmyeon',
      price: 100000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih'],
    },
    {
      name: 'Tteokbokki',
      description: 'tteokbokki',
      price: 70000,
      category: 'Makanan',
      tags: ['Korea', 'Asam', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Eomuk Guk',
      description: 'eomuk guk',
      price: 80000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih', 'Asin'],
    },
    {
      name: 'Samgyetang',
      description: 'samgyetang',
      price: 130000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Miyeok Guk',
      description: 'miyeok guk',
      price: 100000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih', 'Asin'],
    },
    {
      name: 'Mandu Guk',
      description: 'mandu guk',
      price: 120000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Juk',
      description: 'juk',
      price: 75000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Bungeo Ppang',
      description: 'bungeo ppang',
      price: 70000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih'],
    },
    {
      name: 'Hotteok',
      description: 'hotteok',
      price: 60000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih'],
    },
    {
      name: 'Pajeon',
      description: 'pajeon',
      price: 120000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Ojingeo Gui',
      description: 'ojingeo gui',
      price: 160000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Dakkochi',
      description: 'dakkochi',
      price: 80000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Twigim',
      description: 'twigim',
      price: 75000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Gyeran Ppang',
      description: 'gyeran ppang',
      price: 65000,
      category: 'Makanan',
      tags: ['Korea', 'Manis', 'Gurih'],
    },
    {
      name: 'Japchae',
      description: 'japchae',
      price: 110000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Cheonggukjang',
      description: 'cheonggukjang',
      price: 100000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Jjamppong',
      description: 'jjamppong',
      price: 100000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih', 'Pedas'],
    },
    {
      name: 'Ramyun',
      description: 'ramyun',
      price: 100000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih', 'Pedas'],
    },
    {
      name: 'Kimchi Jjigae',
      description: 'kimchi jjigae',
      price: 110000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih', 'Pedas'],
    },
    {
      name: 'Jeongol',
      description: 'jeongol',
      price: 130000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Sundubu Jjiagae',
      description: 'sundubu jjiagae',
      price: 130000,
      category: 'Makanan',
      tags: ['Korea', 'Gurih'],
    },
    {
      name: 'Haemultang',
      description: 'haemultang',
      price: 170000,
      category: 'Makanan',
      tags: ['Korea', 'Asam', 'Gurih', 'Pedas'],
    },
    {
      name: 'Rendang',
      description: 'rendang',
      price: 100000,
      category: 'Makanan',
      tags: ['Indonesia', 'Manis', 'Gurih', 'Asin'],
    },
    {
      name: 'Sate',
      description: 'sate',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Manis', 'Gurih'],
    },
    {
      name: 'Nasi Goreng',
      description: 'nasi goreng',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih'],
    },
    {
      name: 'Bakso',
      description: 'bakso',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih'],
    },
    {
      name: 'Soto',
      description: 'soto',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih'],
    },
    {
      name: 'Rawon',
      description: 'rawon',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih', 'Pedas'],
    },
    {
      name: 'Gado-gado',
      description: 'gado-gado',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Manis', 'Gurih', 'Pedas'],
    },
    {
      name: 'Pempek',
      description: 'pempek',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Asam', 'Manis', 'Gurih'],
    },
    {
      name: 'Gudeg',
      description: 'gudeg',
      price: 50000,
      category: 'Makanan',
      tags: ['Indonesia', 'Manis', 'Gurih'],
    },
    {
      name: 'Ayam Rica-rica',
      description: 'ayam rica-rica',
      price: 75000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih', 'Pedas'],
    },
    {
      name: 'Cakalang Rica-rica',
      description: 'cakalang rica-rica',
      price: 70000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih', 'Pedas'],
    },
    {
      name: 'Woku Belanga',
      description: 'woku belanga',
      price: 80000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih', 'Pedas'],
    },
    {
      name: 'Sup Konro',
      description: 'sup konro',
      price: 90000,
      category: 'Makanan',
      tags: ['Indonesia', 'Gurih', 'Pedas'],
    },
    {
      name: 'Espresso',
      description: 'espresso',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Doppio',
      description: 'doppio',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Cappuccino',
      description: 'cappuccino',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Cafe Latte',
      description: 'cafe latte',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Americano',
      description: 'americano',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Flat White',
      description: 'flat white',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Macchiato',
      description: 'macchiato',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Cafe Mocha',
      description: 'cafe mocha',
      price: 20000,
      category: 'Minuman',
      tags: ['Kopi'],
    },
    {
      name: 'Matcha',
      description: 'matcha',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Genmaicha',
      description: 'genmaicha',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Uroncha',
      description: 'uroncha',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Aojiru',
      description: 'aojiru',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Teh Sakura',
      description: 'teh sakura',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Milk tea',
      description: 'milk tea',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Kombucha',
      description: 'kombucha',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
    {
      name: 'Ofukucha',
      description: 'ofukucha',
      price: 15000,
      category: 'Minuman',
      tags: ['Teh'],
    },
  ];

  async create() {
    const allCategory = (
      await this.firebase.firestore.collection('categories').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    const allTag = (
      await this.firebase.firestore.collection('tags').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    const newData = this.data.map((d, index) => {
      const oldTags = d.tags.map((v) => v);

      const tags = oldTags
        .map((t) => {
          const n = allTag.filter((v) => v.name === t);
          return n;
        })
        .flat();

      // console.log(tags);
      return {
        ...d,
        category: `categories/${
          allCategory.find((v) => v.name === d.category)._id
        }`,
        tags: tags.map((t) => `tags/${t._id}`),
        productId: index + 1,
      };
    });
    // console.log(JSON.stringify(newD, null, 2));
    newData.forEach((value, index) => {
      setTimeout(async () => {
        console.log(`DATA KE ${index}:`, value);
        await this.firebase.firestore.collection('product').add(value);
      }, 2000);
    });
    // await this.firebase.firestore.collection('product').add();
    // return tags;
  }
}
