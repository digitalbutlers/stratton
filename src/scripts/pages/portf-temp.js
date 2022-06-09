function setRichTextWrps(richTextSelector) {
	const richText = document.querySelector(`${richTextSelector}`);
	const richTextChilds = document.querySelectorAll(`${richTextSelector} > *`);
	const text = { tags: ['h2', 'h3', 'p'], needWrp: [], type: 'text' };
	const fig = { tags: ['figure'], needWrp: [], type: 'fig' };

	function createWrp(shapeType, n) {
		shapeType.needWrp.push(richTextChilds[n]);

		if (
			n + 1 >= richTextChilds.length
      || !shapeType.tags.includes(richTextChilds[n + 1].tagName.toLowerCase())
		) {
			const wrp = document.createElement('div');

			richText.append(wrp);
			let j;
			const alignments = ['left', 'center', 'right'];
			let align = 'left';
			for (j = 0; j < shapeType.needWrp.length; j += 1) {
				// eslint-disable-next-line no-loop-func
				alignments.forEach((a) => {
					if (shapeType.needWrp[j].textContent.indexOf(`[${a}]`) !== -1) {
						// eslint-disable-next-line no-param-reassign
						shapeType.needWrp[j].textContent = shapeType.needWrp[j].textContent.replace(`[${a}]`, '');
						align = a;
					}
				});

				wrp.append(shapeType.needWrp[j]);
			}

			if (shapeType.type === 'fig') {
				wrp.className = `rich__${shapeType.type}-wrp--${j}`;
				j = 0;
			} else {
				wrp.className = `rich__${shapeType.type}-wrp--${align}`;
			}


			// eslint-disable-next-line no-param-reassign
			shapeType.needWrp = [];
		}
	}

	for (let i = 0; i < richTextChilds.length; i += 1) {
		if (text.tags.includes(richTextChilds[i].tagName.toLowerCase())) {
			createWrp(text, i);
		}
		if (fig.tags.includes(richTextChilds[i].tagName.toLowerCase())) {
			createWrp(fig, i);
		}
	}
}

setRichTextWrps('.case__main-rich');


// eslint-disable-next-line no-undef
if (window.innerWidth <= breakpointXL) {
	// eslint-disable-next-line
  const caseSwiper = new Swiper('.case__swiper', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 1,
		autoplay: {
			delay: 5000,
		},
		speed: 500,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	});
}
