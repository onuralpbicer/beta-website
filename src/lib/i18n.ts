const translations = {
	en: {
		item: 'Item',
		items: 'Items',
		subcategory: 'Subcategory',
		subcategories: 'Subcategories',
		brand: 'Brand',
		productCode: 'Product Code',
		tax: 'VAT',
		included: 'Included',
		excluded: 'Excluded',
		keyFeatures: 'Key Features',
		download: 'Download brochure',
		contact: 'Contact Us!',
		related: 'Related Products',
		noProductsFound: 'Could not find any products or categories',
		goToCategory: 'Go to category',
	},
	tr: {
		item: 'Ürün',
		items: 'Ürünler',
		subcategory: 'Alt Kategori',
		subcategories: 'Alt Kategoriler',
		brand: 'Marka',
		productCode: 'Ürün Kodu',
		tax: 'KDV',
		included: 'Dahildir',
		excluded: 'Hariçtir',
		keyFeatures: 'Ürün Açıklaması',
		download: 'Doküman indirin',
		contact: 'Bize Ulaşın!',
		related: 'İlgili diğer ürünler',
		noProductsFound: 'Ürün veya kategori bulamadık',
		goToCategory: 'Kategoriye gidin',
	},
} satisfies Record<string, Record<string, string>>;

export function translate(
	locale: string,
	key: keyof (typeof translations)['en'],
	vars: Record<string, string> = {},
) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	let text = translations[locale as keyof typeof translations][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}
