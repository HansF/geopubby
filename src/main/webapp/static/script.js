function init() {
	initLongLiterals();
}

let longLiteralCounter = 0;
const longLiteralSpans = {};
const longLiteralTexts = {};

function initLongLiterals() {
    const spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].className !== 'literal') continue;
        const span = spans[i];
        const textNode = span.firstChild;
        const text = textNode.data;
        if ((typeof text === 'undefined') || text.length < 300) continue;
        const match = text.match(/([^\0]{150}[^\0]*? )([^\0]*)/);
        if (!match) continue;
        span.insertBefore(document.createTextNode(match[1] + ' ... '), span.firstChild);
        span.removeChild(textNode);
        const link = document.createElement('a');
        link.href = 'javascript:expand(' + longLiteralCounter + ');';
        link.appendChild(document.createTextNode('\u00BBmore\u00BB'));
        link.className = 'expander';
        span.insertBefore(link, span.firstChild.nextSibling);
        longLiteralSpans[longLiteralCounter] = span;
        longLiteralTexts[longLiteralCounter] = textNode;
        longLiteralCounter = longLiteralCounter + 1;
    }
}

function expand(i) {
    const span = longLiteralSpans[i];
    span.removeChild(span.firstChild);
    span.removeChild(span.firstChild);
    span.insertBefore(longLiteralTexts[i], span.firstChild);
}

function showAllMetadata(name) {
	const ele = document.getElementById(name);
	if (ele === null) return;
	const tables = document.getElementsByTagName('table');
	for (let i = 0; i < tables.length; i++) {
		tables[i].style.display = 'block';
	}
}