// eslint-disable-next-line no-undef
if (window.innerWidth <= breakpointXL) {
	// eslint-disable-next-line
  const mobileSwiper = new Swiper('.wwa__swiper', {
		spaceBetween: 20,
		slidesPerView: 'auto',
	});
}

function setBiosLineClamp() {
	const bios = document.querySelectorAll('.wwa__team-bio');

	bios.forEach((bio) => {
		const height = parseFloat(window.getComputedStyle(bio.parentNode).height)
      - parseFloat(window.getComputedStyle(bio.parentNode).paddingBlock) * 2;
		const lineHeight = parseFloat(window.getComputedStyle(bio).lineHeight);

		// eslint-disable-next-line no-param-reassign
		bio.style['-webkit-line-clamp'] = Math.floor(height / lineHeight);
	});
}

function teamMembersPopups() {
	const teamMembers = document.querySelectorAll('.wwa__team-m');

	teamMembers.forEach((teamMember) => {
		teamMember.addEventListener('click', (event) => {
			const { target } = event;
			if (target.classList.contains('team-popup__cross')) {
				teamMember.classList.remove('js--active');
				// eslint-disable-next-line
      body.style.overflow = 'visible';
			} else {
				teamMember.classList.add('js--active');
				// eslint-disable-next-line
      body.style.overflow = 'hidden';
			}
		});
	});
}

window.addEventListener('load', teamMembersPopups);
window.addEventListener('load', setBiosLineClamp);
window.addEventListener('resize', setBiosLineClamp);
