// desktop 사이즈면 desktop 객체의 값이 적용되며, mobile 사이즈면 mobile 객체의 값이 적용됨
// 그냥 cssVars를 사용할때 귀찮게 @media (${destkopVp}) 를 사용하여 height를 구분지어서 사용할 필요 없이 미리 globalStyles에서 상황에 맞게 desktop viewport면 cssVars.desktop이 적용되며, mobile viewport면 cssVars.mobile이 적용되게 됨
// 편리하게 cssVarsPalette.header_height로 접근할 수 있음!
// 꼭 cssVars.desktop의 크기를 구분지어서 사용해야 하는 경우라면 그냥 styled에서 cssVars를 바로 접근하여 사용하면 됨!

const cssVars = {
  mobile: {
    header_height: '3rem',
    nav_height: '3rem',
    content_full_height: 'calc(100% - 6rem)',
  },
  desktop: {
    header_height: '4rem',
    nav_height: '4rem',
    content_full_height: 'calc(100% - 8rem)', // header를 제외한 최대 height
  },
  custom: {
    env_sat: 'env(safe-area-inset-top)',
    env_sar: 'env(safe-area-inset-right)',
    env_sab: 'env(safe-area-inset-bottom)',
    env_sal: 'env(safe-area-inset-left)',
    constant_sat: 'constant(safe-area-inset-top)',
    constant_sar: 'constant(safe-area-inset-right)',
    constant_sab: 'constant(safe-area-inset-bottom)',
    constant_sal: 'constant(safe-area-inset-left)',
  },
};

export default cssVars;
