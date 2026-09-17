// Liste des fichiers VCF présents dans le dossier documents/
const vcfFiles = [
	"Guillaume Forestier Président - Ingénieur - Fondateur.vcf"
];

function encodePath(name) {
	// Encode les composants d'URL tout en conservant les slashs
	return name.split('/').map(encodeURIComponent).join('/');
}

function buildList() {
	const list = document.getElementById('vcf-list');
	if (!list) return;
	if (vcfFiles.length === 0) {
		list.innerHTML = '<li>Aucun fichier VCF trouvé.</li>';
		return;
	}

	vcfFiles.forEach(filename => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = 'documents/' + encodePath(filename);
		a.textContent = filename;
		a.setAttribute('download', filename);
		a.className = 'vcf-link';
		li.appendChild(a);
		list.appendChild(li);
	});
}

document.addEventListener('DOMContentLoaded', buildList);

