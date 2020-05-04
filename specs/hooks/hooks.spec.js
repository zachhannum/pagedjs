const TIMEOUT = 10000; // Some book might take longer than this to renderer

describe("hooks", () => {
	let page;
	beforeAll(async () => {
		page = await loadPage("hooks/hooks.html");
		return page.rendered;
	}, TIMEOUT);

	afterAll(async () => {
		if (!DEBUG) {
			await page.close();
		}
	});

	it("should render text", async () => {
		let text = await page.evaluate(() => document.body.textContent);
		expect(text).toContain("Chapter 1. Loomings.");
		expect(text).toContain("Node through hooks.");
	});

	it("should render 1 page", async () => {
		let pages = await page.$$eval(".pagedjs_page", (r) => r.length);
		expect(pages).toBe(5);
	});

	if (!DEBUG) {
		it("should create a pdf", async () => {
			let pdf = await page.pdf(PDF_SETTINGS);

			expect(pdf).toMatchPDFSnapshot(1);
		});
	}
});

describe("hooks-async", () => {
	let page;
	beforeAll(async () => {
		page = await loadPage("hooks/hooks-async.html");
		return page.rendered;
	}, TIMEOUT);

	afterAll(async () => {
		if (!DEBUG) {
			await page.close();
		}
	});

	it("should render text", async () => {
		let text = await page.evaluate(() => document.body.textContent);
		expect(text).toContain("Chapter 1. Loomings.");
		expect(text).toContain("Node through hooks.");
	});

	it("should render 1 page", async () => {
		let pages = await page.$$eval(".pagedjs_page", (r) => r.length);
		expect(pages).toBe(5);
	});

	if (!DEBUG) {
		it("should create a pdf", async () => {
			let pdf = await page.pdf(PDF_SETTINGS);

			expect(pdf).toMatchPDFSnapshot(1);
		});
	}
});
