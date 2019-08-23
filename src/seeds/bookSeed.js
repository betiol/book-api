import { Book } from '../model';
import connectDatabase from '../database';

const books = [
	{
		title: 'Harry Potter and the Philosopher\'s Stone',
		description:
			'The book was released in the United States under the name Harry Potter and the Sorcerer\'s Stone, because the publishers were concerned that most American readers would not be familiar enough with the term Philosopher\'s Stone. However, this decision lead to criticism by the British public who felt it shouldn\'t be changed due to the fact it was an English book',
		image:
			'https://vignette.wikia.nocookie.net/harrypotter/images/c/cb/Philosoper%27s_Stone_New_UK_Cover.jpg/revision/latest/scale-to-width-down/334?cb=20170109041611',
		author: 'J. K. Rowling',
		pages: '223',
		price: 19,
		stars: 5,
		purchaseUrl:
			'https://www.amazon.com.br/Harry-Potter-Philosophers-Stone-Slytherin/dp/1408883759/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=Harry+Potter+and+the+Philosopher%5C%27s+Stone&qid=1566489253&s=books&sr=1-1',
	},
	{
		title: 'Assassin\'s Creed: Renascença',
		description:
			'O livro conta a história de Ezio Auditore, um jovem em busca de vingança pelo precoce assassinato de sua família. Nessa sua missão de vingança ele descobre verdades sobre seu pai e sua história. Guiado pelos Assassinos,a sua habilidade como um Assassino é aperfeiçoada até que ele se torne um deles e parte para a vingança contra sua família',
		image:
			'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3540512&qld=90&l=430&a=-1',
		author: 'Bowden,Oliver, Bowden,Oliver',
		pages: '400',
		price: 59,
		stars: 3,
		purchaseUrl:
			'https://www.amazon.com.br/Assassins-Creed-Renascen%C3%A7a-Oliver-Bowden/dp/8501091332/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=Assassin%5C%27s+Creed%3A+Renascen%C3%A7a&qid=1566489239&s=books&sr=1-1',
	},
	{
		title: 'The Art of God of War',
		description:
			'It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created.',
		image:
			'https://images-na.ssl-images-amazon.com/images/I/51qpkdw1%2B8L._SX377_BO1,204,203,200_.jpg',
		author: 'Dark Horse Books',
		pages: '500',
		price: 90,
		stars: 4,
		purchaseUrl:
			'https://www.amazon.com.br/Art-God-Sony-Interactive-Entertainment/dp/150670574X/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=The+Art+of+God+of+War&qid=1566489224&s=books&sr=1-1',
	},
	{
		title: 'Marvelocity: The Marvel Comics Art of Alex Ross',
		description:
			'Here is the beloved Marvel Universe of comics characters, brought to thrilling life as only Alex Ross can. They’re all here: Spider-Man, Captain America, Iron Man, the Avengers, the Guardians of the Galaxy, the X-Men, the Fantastic Four, Black Panther, and many more—all seeming to leap, blast, and launch off the page.',
		image:
			'https://images-na.ssl-images-amazon.com/images/I/51dTl2ODAGL._SX373_BO1,204,203,200_.jpg',
		author: 'Pantheon',
		pages: '312',
		price: 25,
		stars: 4,
		purchaseUrl:
			'https://www.amazon.com.br/Marvelocity-Marvel-Comics-Alex-Ross/dp/1101871970/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=marvelocity&qid=1566489188&s=books&sr=1-1',
	},
	{
		title: 'DC Comics: Anatomy of a Metahuman',
		description:
			'Explore the powers of DC Comics\' greatest characters like never before through stunning anatomical cutaways and in-depth commentary from the Dark Knight. Concerned about the threat that so-called \'metahumans\' may pose to the world, Batman has begun compiling a detailed dossier on their incredible physiology and abilities. From villains like Killer Croc, Bane, and Brainiac, to Batman\'s own comrades, including Superman and Cyborg, the file brings together the Dark Knight\'s fascinating personal theories on the unique anatomical composition of these formidable individuals. Using beautifully illustrated anatomical cross sections depicting twelve different DC characters, the book, told from Batman\'s unique perspective, will explore how these \'metahumans\' physical makeup differs significantly from that of the average person.',
		image:
			'https://images-na.ssl-images-amazon.com/images/I/614r0HOC3oL._SX361_BO1,204,203,200_.jpg',
		author: 'Pocket Books',
		pages: '160',
		price: 132,
		stars: 2,
		purchaseUrl:
			'https://www.amazon.com.br/DC-Comics-Metahuman-S-D-Perry/dp/1608875016/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=DC+Comics%3A+Anatomy+of+a+Metahuman&qid=1566489207&s=books&sr=1-1',
	},
	{
		title: 'Marvel Encyclopedia: The Definitive Guide to the Characters of the Marvel Universe',
		description:
			'Timed perfectly with Marvel\'s 75th Anniversary, DK\'s bestselling Marvel Encyclopedia is now fully revised, extended, and updated. Bring the Marvel Universe home with this all-inclusive encyclopedia detailing little-known facts and information about the iconic Marvel characters.',
		image:
			'https://images-na.ssl-images-amazon.com/images/I/61oiB4vZQ0L._SX411_BO1,204,203,200_.jpg',
		author: 'DK Publishing ',
		pages: '439',
		price: 125,
		stars: 5,
		purchaseUrl:
			'https://www.amazon.com.br/Marvel-Encyclopedia-Definitive-Characters-Universe/dp/1465415939',
	},
];

async function createBooks() {
	connectDatabase();
	const addBooks = books.map(async (book) => {
		const newBook = await new Book(book);
		await newBook.save();
	});

	return addBooks;

	// process.exit();
}

createBooks();
