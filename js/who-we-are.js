if (window.innerWidth <= 991) {
  // eslint-disable-next-line
  const mobileSwiper = new Swiper('.wwa__swiper', {
    spaceBetween: 20,
    slidesPerView: 'auto',
  });
}

const bios = document.querySelectorAll('.wwa__team-bio');
const teamMembers = document.querySelectorAll('.wwa__team-m');


function setBiosLineClamp() {
  bios.forEach((bio) => {
    const height = parseFloat(window.getComputedStyle(bio.parentNode).height)
      - parseFloat(window.getComputedStyle(bio.parentNode).paddingBlock) * 2;
    const lineHeight = parseFloat(window.getComputedStyle(bio).lineHeight);

    bio.style['-webkit-line-clamp'] = Math.floor(height / lineHeight);
  });
}

function teamMembersPopups() {
  teamMembers.forEach((teamMember) => {
    teamMember.addEventListener('click', (e) => {
      const { target } = e;
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
