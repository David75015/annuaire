let vcfFiles = [];

function encodePath(name) {
	return name.split('/').map(encodeURIComponent).join('/');
}

function renderList(filter = '') {
	const list = document.getElementById('vcf-list');
	if (!list) return;
	list.innerHTML = '';

	const q = filter.trim().toLowerCase();
	const results = q ? vcfFiles.filter(f => f.toLowerCase().includes(q)) : vcfFiles.slice();

	if (results.length === 0) {
		const li = document.createElement('li');
		li.textContent = 'Aucun fichier VCF trouvé.';
		list.appendChild(li);
		return;
	}

	results.forEach(filename => {
		const li = document.createElement('li');
		li.className = 'vcf-card';

		const left = document.createElement('div');
		left.className = 'vcf-card-left';
		const title = document.createElement('div');
		title.className = 'vcf-title';
		// Remove extension for display
		title.textContent = filename.replace(/\.vcf$/i, '');
		left.appendChild(title);

		const right = document.createElement('div');
		right.className = 'vcf-card-right';
		const a = document.createElement('a');
		a.href = 'documents/' + encodePath(filename);
		a.setAttribute('download', filename);
		a.className = 'download-btn';
		a.textContent = 'Télécharger';
		right.appendChild(a);

		li.appendChild(left);
		li.appendChild(right);
		list.appendChild(li);
	});
}

async function loadVcfList() {
	try {
		const res = await fetch('sources/vcf-list.json', {cache: 'no-cache'});
		if (!res.ok) throw new Error('Liste non disponible');
		const data = await res.json();
		if (Array.isArray(data.files)) vcfFiles = data.files;
	} catch (err) {
		console.warn('Impossible de charger sources/vcf-list.json, liste vide', err);
		vcfFiles = [];
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	const search = document.getElementById('search');
	await loadVcfList();
	renderList();
	if (search) {
		search.addEventListener('input', (e) => renderList(e.target.value));
	}
});

