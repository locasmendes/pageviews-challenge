export async function getPageViews(db: D1Database, key: string): Promise<number> {
	const record = await db.prepare(`SELECT * FROM pageviews WHERE key = ?`).bind(key).first();
	if (record === undefined || record === null) {
        await db.prepare(`INSERT INTO pageviews (key, views) VALUES (?, 1)`).bind(key).run();
		return 1;
	}
	if (typeof record.views === 'number') {
		return record.views;
	} else {
        await db.prepare(`INSERT INTO pageviews (key, views) VALUES (?, 1)`).bind(key).run();
		return 1;
	}
}

export async function incrementPageViews(db: D1Database, key: string, views: number): Promise<boolean> {
    await db.prepare(`UPDATE pageviews SET views = ? WHERE key = ?`).bind(views + 1, key).run();
    return true;
}
