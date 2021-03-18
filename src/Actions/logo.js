const set = (logo) => ({type: 'SET-LOGO', logo: logo});
const reset = () => ({type: 'RESET-LOGO'});

const Logo = {
  set,
  reset,
}

export default Logo;
