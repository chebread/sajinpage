const cssVars = {
  mobile: {
    // css variables for mobile
    header_height: '3rem',
    nav_height: '3rem',
    content_full_height: 'calc(100% - 6rem)',
  },
  desktop: {
    // css variables for desktop
    header_height: '4rem',
    nav_height: '4rem',
    content_full_height: 'calc(100% - 8rem)', // header를 제외한 최대 height
  },
  all: {
    // css variables
    sat: 'env(safe-area-inset-top)',
    sar: 'env(safe-area-inset-right)',
    sab: 'env(safe-area-inset-bottom)',
    sal: 'env(safe-area-inset-left)',
    hover_color: '',
  },
};

export default cssVars;
