export interface Subcategory {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface Category {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  image: string;
  subcategories: Subcategory[];
  featured?: boolean;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "fruits-vegetables",
    slug: "fruits-and-vegetables",
    nameAr: "الفواكه والخضراوات",
    nameEn: "Fruits & Vegetables",
    descriptionAr: "خضار وفواكه طازجة يومياً منتقاة بعناية فائقة لتصلك بأعلى جودة",
    descriptionEn: "Fresh daily handpicked fruits and vegetables of the highest quality",
    iconName: "Apple",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 48,
    subcategories: [
      { id: "fresh-fruits", nameAr: "فواكه طازجة", nameEn: "Fresh Fruits" },
      { id: "fresh-vegetables", nameAr: "خضراوات طازجة", nameEn: "Fresh Vegetables" },
      { id: "leafy-greens", nameAr: "ورقيات وأعشاب", nameEn: "Leafy Greens & Herbs" }
    ]
  },
  {
    id: "dairy-eggs",
    slug: "dairy-and-eggs",
    nameAr: "منتجات الألبان والبيض",
    nameEn: "Dairy & Eggs",
    descriptionAr: "حليب، أجبان، لبنة بلدية وبيض طازج من أفضل المزارع الأردنية والإقليمية",
    descriptionEn: "Milk, cheese, labneh and fresh farm eggs from trusted local producers",
    iconName: "Milk",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 62,
    subcategories: [
      { id: "eggs", nameAr: "البيض", nameEn: "Eggs" },
      { id: "cheese", nameAr: "الأجبان", nameEn: "Cheese" },
      { id: "labneh-dairy", nameAr: "اللبنة والألبان", nameEn: "Labneh & Dairy" },
      { id: "butter-cream", nameAr: "الزبدة وكريمة الطبخ", nameEn: "Butter & Cooking Cream" },
      { id: "dessert-cream", nameAr: "كريمة الحلويات", nameEn: "Dessert Cream" }
    ]
  },
  {
    id: "beverages",
    slug: "beverages",
    nameAr: "المشروبات",
    nameEn: "Beverages",
    descriptionAr: "عصائر طبيعية، مياه نقية، مشروبات غازية ومشروبات منعشة لجميع الأوقات",
    descriptionEn: "Fresh juices, pure water, soft drinks and refreshing beverages",
    iconName: "GlassWater",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 84,
    subcategories: [
      { id: "drinking-water", nameAr: "مياه الشرب", nameEn: "Drinking Water" },
      { id: "fresh-juice", nameAr: "العصير الطازج", nameEn: "Fresh Juice" },
      { id: "soft-drinks", nameAr: "المشروبات والعصير", nameEn: "Soft Drinks & Juices" },
      { id: "energy-drinks", nameAr: "مشروبات الطاقة والرياضة", nameEn: "Energy & Sports Drinks" },
      { id: "powdered-juice", nameAr: "عصير البودرة", nameEn: "Powdered Juice" },
      { id: "milk-drinks", nameAr: "الحليب والمشروبات الحليبية", nameEn: "Milk" }
    ]
  },
  {
    id: "bakery",
    slug: "bakery",
    nameAr: "المخبوزات",
    nameEn: "Bakery",
    descriptionAr: "خبز ساخن وطازج يومياً، توست، معجنات وحلويات شهية",
    descriptionEn: "Freshly baked bread, artisan toast, pastries and gluten-free items",
    iconName: "Wheat",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 36,
    subcategories: [
      { id: "bread-bakery", nameAr: "الخبز والمخبوزات", nameEn: "Bread & Bakery" },
      { id: "gluten-free", nameAr: "خالي من الغلوتين", nameEn: "Gluten-Free Products" }
    ]
  },
  {
    id: "meat-poultry",
    slug: "meat-and-poultry",
    nameAr: "اللحوم والدواجن",
    nameEn: "Meat & Poultry",
    descriptionAr: "لحوم طازجة بلدية ودواجن معقمة ومجهزة بأعلى معايير السلامة",
    descriptionEn: "Fresh local meat and poultry prepared with the highest hygiene standards",
    iconName: "Beef",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 29,
    subcategories: [
      { id: "chicken-poultry", nameAr: "الدجاج والدواجن", nameEn: "Chicken & Poultry" },
      { id: "beef-veal", nameAr: "لحم البقر والعجل", nameEn: "Beef & Veal" }
    ]
  },
  {
    id: "snacks-chocolate",
    slug: "snacks-and-chocolate",
    nameAr: "الوجبات الخفيفة والشوكولاتة",
    nameEn: "Snacks & Chocolate",
    descriptionAr: "أفخر أنواع الشوكولاتة، البسكويت، رقائق البطاطس والمكسرات المقرمشة",
    descriptionEn: "Chocolates, biscuits, potato chips, dips and candies",
    iconName: "Cookie",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 95,
    subcategories: [
      { id: "chocolate-biscuits", nameAr: "الشوكولاتة والبسكويت", nameEn: "Chocolate & Biscuits" },
      { id: "candy-gum", nameAr: "حلوى وعلكة", nameEn: "Candy & Gum" },
      { id: "chips-dips", nameAr: "الشيبس والصلصات", nameEn: "Chips & Dips" }
    ]
  },
  {
    id: "cooking",
    slug: "cooking",
    nameAr: "الطهي ومستلزماته",
    nameEn: "Cooking & Oils",
    descriptionAr: "أرز عالي الجودة، زيوت طهي نقية، زيت زيتون بلدي وسمن أصيل",
    descriptionEn: "Rice, cooking oils, pure olive oil, and ghee for your culinary delights",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 54,
    subcategories: [
      { id: "rice", nameAr: "الأرز", nameEn: "Rice" },
      { id: "cooking-oil", nameAr: "زيت الطهي", nameEn: "Cooking Oil" },
      { id: "olive-oil", nameAr: "زيت الزيتون", nameEn: "Olive Oil" },
      { id: "ghee", nameAr: "السمنة", nameEn: "Ghee" }
    ]
  },
  {
    id: "cleaning-laundry",
    slug: "cleaning-and-laundry",
    nameAr: "التنظيف والغسيل",
    nameEn: "Cleaning & Laundry",
    descriptionAr: "منظفات منزلية قوية، مساحيق غسيل ومعقمات لبيت نظيف وصحي",
    descriptionEn: "Home detergents, laundry essentials, and disinfectants for a hygienic home",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 72,
    subcategories: [
      { id: "cleaning-products", nameAr: "مواد التنظيف", nameEn: "Cleaning Products" },
      { id: "laundry-products", nameAr: "غسيل الملابس", nameEn: "Laundry Products" }
    ]
  },
  {
    id: "appetizers",
    slug: "appetizers",
    nameAr: "المقبلات والصلصات",
    nameEn: "Appetizers & Sauces",
    descriptionAr: "صلصات البيتزا والمعكرونة الإيطالية، التوابل، والخل والمخللات اللذيذة",
    descriptionEn: "Pizza and pasta sauces, spices, condiments, vinegar and pickles",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80",
    itemCount: 42,
    subcategories: [
      { id: "pizza-pasta-sauces", nameAr: "صلصة البيتزا والمعكرونة", nameEn: "Pizza & Pasta Sauces" },
      { id: "spices-sauces", nameAr: "التوابل والصلصات", nameEn: "Spices & Sauces" },
      { id: "vinegar-pickles", nameAr: "الخل والمخللات", nameEn: "Vinegar & Pickles" }
    ]
  },
  {
    id: "baby-needs",
    slug: "baby-needs",
    nameAr: "احتياجات الطفل",
    nameEn: "Baby Needs",
    descriptionAr: "حفاضات ناعمة، حليب أطفال موثوق، ومنتجات عناية فائقة لبشرة طفلك الحساسة",
    descriptionEn: "Diapers, baby formula, wipes and gentle baby care essentials",
    iconName: "Baby",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    featured: true,
    itemCount: 38,
    subcategories: [
      { id: "diapers", nameAr: "حفاضات الأطفال", nameEn: "Diapers" },
      { id: "baby-milk", nameAr: "حليب الأطفال", nameEn: "Baby Milk" },
      { id: "baby-care", nameAr: "العناية بالأطفال", nameEn: "Baby Care" }
    ]
  },
  {
    id: "breakfast",
    slug: "breakfast",
    nameAr: "طعام الإفطار",
    nameEn: "Breakfast",
    descriptionAr: "حبوب الإفطار اللذيذة، عسل طبيعي، مربيات شهية وشوكولاتة دهن",
    descriptionEn: "Breakfast cereals, spreads, natural honey and fruit jams",
    iconName: "Coffee",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    itemCount: 46,
    subcategories: [
      { id: "cereals", nameAr: "رقائق الإفطار", nameEn: "Breakfast Cereals" },
      { id: "spreads", nameAr: "أغذية قابلة للدهن", nameEn: "Spreads" },
      { id: "honey-jam", nameAr: "العسل والمربى", nameEn: "Honey & Jam" }
    ]
  },
  {
    id: "canned-food",
    slug: "canned-food",
    nameAr: "المعلبات",
    nameEn: "Canned Food",
    descriptionAr: "تونة وسردين، ذرة وفول، خضروات وفواكه معلبة جاهزة للتقديم",
    descriptionEn: "Canned seafood, meats, canned vegetables and fruits",
    iconName: "Container",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    itemCount: 50,
    subcategories: [
      { id: "canned-meat-seafood", nameAr: "مأكولات بحرية ولحوم معلبة", nameEn: "Canned Seafood & Meat" },
      { id: "canned-veg-fruit", nameAr: "خضار وفواكه معلبة", nameEn: "Canned Vegetables & Fruits" }
    ]
  },
  {
    id: "fresh-food",
    slug: "fresh-food",
    nameAr: "الأطعمة الطازجة والأجبان",
    nameEn: "Fresh Food & Deli",
    descriptionAr: "قسم الأجبان الطازجة، الزيتون البلدي، المرتديلا والمقبلات الباردة",
    descriptionEn: "Artisanal cheeses, fresh olives, pickles and quality mortadella",
    iconName: "Sandwich",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    itemCount: 41,
    subcategories: [
      { id: "fresh-cheese", nameAr: "الأجبان والألبان", nameEn: "Cheese & Dairy" },
      { id: "olives-pickles", nameAr: "الزيتون والمخللات", nameEn: "Olives & Pickles" },
      { id: "mortadella", nameAr: "مرتديلا", nameEn: "Mortadella" }
    ]
  },
  {
    id: "disposable-products",
    slug: "disposable-products",
    nameAr: "للاستخدام الواحد",
    nameEn: "Disposable Products",
    descriptionAr: "محارم ورقية، أطباق وأكواب سفري، أكياس حفظ الطعام وقفازات",
    descriptionEn: "Tissues, paper rolls, disposable tableware, food storage and gloves",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    itemCount: 35,
    subcategories: [
      { id: "tissues-paper", nameAr: "المناديل ولفائف الورق", nameEn: "Tissues & Paper Rolls" },
      { id: "tableware", nameAr: "أدوات المائدة", nameEn: "Tableware" },
      { id: "storage-packaging", nameAr: "تخزين وتغليف الطعام", nameEn: "Food Storage & Packaging" },
      { id: "gloves", nameAr: "كفوف", nameEn: "Gloves" }
    ]
  },
  {
    id: "frozen-food",
    slug: "frozen-food",
    nameAr: "الأطعمة المجمدة",
    nameEn: "Frozen Food",
    descriptionAr: "بطاطا مقلية، خضروات مجمدة، دجاج ولحوم مجمدة ومعجنات سريعة التحضير",
    descriptionEn: "French fries, frozen veggies, poultry, meat, and frozen pastries",
    iconName: "Snowflake",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    itemCount: 58,
    subcategories: [
      { id: "french-fries", nameAr: "البطاطس المقلية", nameEn: "French Fries" },
      { id: "frozen-desserts", nameAr: "المخبوزات والحلويات المجمدة", nameEn: "Frozen Bakery & Desserts" },
      { id: "frozen-seafood", nameAr: "المأكولات البحرية المجمدة", nameEn: "Frozen Seafood" },
      { id: "frozen-meat", nameAr: "الدجاج واللحوم المجمدة", nameEn: "Frozen Chicken & Meat" },
      { id: "frozen-fruits-veg", nameAr: "الفواكه والخضراوات المجمدة", nameEn: "Frozen Fruits & Vegetables" }
    ]
  },
  {
    id: "hot-drinks",
    slug: "hot-drinks",
    nameAr: "المشروبات الساخنة",
    nameEn: "Hot Drinks",
    descriptionAr: "بن تركي أصيل، قهوة سريعة التحضير، شاي فاخر وحليب بودرة ومبخر",
    descriptionEn: "Rich coffee, premium tea blends, coffee creamers and condensed milk",
    iconName: "CupSoda",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    itemCount: 47,
    subcategories: [
      { id: "coffee", nameAr: "القهوة", nameEn: "Coffee" },
      { id: "tea", nameAr: "الشاي", nameEn: "Tea" },
      { id: "coffee-creamer", nameAr: "مبيض القهوة", nameEn: "Coffee Creamer" },
      { id: "powdered-milk", nameAr: "الحليب البودرة", nameEn: "Powdered Milk" },
      { id: "evaporated-milk", nameAr: "الحليب المبخر والمكثف", nameEn: "Evaporated & Condensed Milk" }
    ]
  },
  {
    id: "household-supplies",
    slug: "household-supplies",
    nameAr: "المستلزمات المنزلية",
    nameEn: "Household Supplies",
    descriptionAr: "لوازم صيانة المنزل، أدوات المطبخ والرحلات والتخييم",
    descriptionEn: "Home maintenance items, kitchenware, camping and travel gear",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    itemCount: 31,
    subcategories: [
      { id: "home-maintenance", nameAr: "الصيانة المنزلية", nameEn: "Home Maintenance" },
      { id: "travel-camping", nameAr: "أدوات السفر والرحلات", nameEn: "Travel & Camping Supplies" }
    ]
  },
  {
    id: "ice-cream",
    slug: "ice-cream",
    nameAr: "آيس كريم ومثلجات",
    nameEn: "Ice Cream",
    descriptionAr: "مثلجات بنكهات منعشة، أيس كريم عائلي وأعواد البوظة المميزة",
    descriptionEn: "Refreshing ice creams, family tubs, popsicles and frozen delights",
    iconName: "IceCream",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
    itemCount: 26,
    subcategories: [
      { id: "frozen-desserts", nameAr: "المثلجات", nameEn: "Frozen Desserts" }
    ]
  },
  {
    id: "personal-care",
    slug: "personal-care",
    nameAr: "العناية الشخصية",
    nameEn: "Personal Care",
    descriptionAr: "شامبو، صابون، معجون أسنان، مزيلات عرق ومنتجات العناية بالبشرة والشعر",
    descriptionEn: "Skin care, hair care, oral hygiene, deodorants and personal grooming",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    itemCount: 66,
    subcategories: [
      { id: "face-body-care", nameAr: "العناية بالوجه والجسم", nameEn: "Face & Body Care" },
      { id: "hair-care", nameAr: "العناية بالشعر", nameEn: "Hair Care" },
      { id: "oral-care", nameAr: "العناية بالفم والأسنان", nameEn: "Oral Care" },
      { id: "feminine-care", nameAr: "العناية النسائية", nameEn: "Feminine Care" },
      { id: "deodorants", nameAr: "مزيل العرق", nameEn: "Deodorants" },
      { id: "shaving", nameAr: "الحلاقة وإزالة الشعر", nameEn: "Shaving & Hair Removal" }
    ]
  },
  {
    id: "pet-care",
    slug: "pet-care",
    nameAr: "العناية بالحيوانات الأليفة",
    nameEn: "Pet Care",
    descriptionAr: "طعام جاف ورطب للقطط والكلاب، ومستلزمات رعاية أليفك المدلل",
    descriptionEn: "Dry and wet food for cats and dogs, plus pet hygiene supplies",
    iconName: "Cat",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    itemCount: 22,
    subcategories: [
      { id: "cat-food", nameAr: "طعام ومستلزمات القطط", nameEn: "Cat Food & Supplies" },
      { id: "dog-food", nameAr: "طعام ومستلزمات الكلاب", nameEn: "Dog Food & Supplies" }
    ]
  },
  {
    id: "protein-special-diet",
    slug: "protein-and-special-diet",
    nameAr: "البروتين والنظام الغذائي الخاص",
    nameEn: "Protein & Special Diet",
    descriptionAr: "ألواح بروتين، سناك صحي، منتجات كيتو وخالية من السكر لنمط حياة متوازن",
    descriptionEn: "Protein bars, healthy snacks, keto and sugar-free options for fitness goals",
    iconName: "Dumbbell",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    itemCount: 28,
    subcategories: [
      { id: "protein-supplements", nameAr: "البروتين والمكملات", nameEn: "Protein Products" },
      { id: "healthy-snacks", nameAr: "الوجبات الخفيفة الصحية", nameEn: "Healthy Snacks" }
    ]
  },
  {
    id: "roasted-products",
    slug: "roasted-products",
    nameAr: "المحمص والمكسرات",
    nameEn: "Roastery & Nuts",
    descriptionAr: "مكسرات مشكلة محمصة طازجة، بذور، فواكه مجففة وحبوب فاخرة",
    descriptionEn: "Freshly roasted nuts, seeds, dried fruits and premium kernels",
    iconName: "Nut",
    image: "https://images.unsplash.com/photo-1536591375315-1b836814d45d?auto=format&fit=crop&w=800&q=80",
    itemCount: 33,
    subcategories: [
      { id: "nuts-seeds", nameAr: "المكسرات والبذور", nameEn: "Nuts & Seeds" },
      { id: "dried-fruits", nameAr: "الفواكه المجففة", nameEn: "Dried Fruits" }
    ]
  },
  {
    id: "soups-spices",
    slug: "soups-and-spices",
    nameAr: "الحساء والتوابل",
    nameEn: "Soups & Spices",
    descriptionAr: "بهارات مشكلة أردنية، شوربات فورية شهية، نودلز وملح مكرر",
    descriptionEn: "Aromatic cooking spices, instant soups, noodles and pure salts",
    iconName: "Soup",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    itemCount: 44,
    subcategories: [
      { id: "spices", nameAr: "توابل وبهارات", nameEn: "Spices" },
      { id: "soups", nameAr: "الحساء", nameEn: "Soups" },
      { id: "noodles", nameAr: "نودلز", nameEn: "Noodles" },
      { id: "salt", nameAr: "الملح", nameEn: "Salt" }
    ]
  }
];
